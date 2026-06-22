import { supabase } from '../supabase';
import { auditService } from './audit.service';

const RATE_LIMIT = {
  maxAttempts: 5,
  windowMinutes: 15,
  lockoutMinutes: 30,
};

export const authService = {
  async verifyDriverCode(code: string, ip: string = '127.0.0.1'): Promise<{
    success: boolean;
    token?: string;
    cardData?: any;
    error?: string;
    remainingAttempts?: number;
    isLocked?: boolean;
  }> {
    // Validate code format
    if (!/^[A-Z0-9-]{8,20}$/.test(code)) {
      return { success: false, error: 'Invalid code format' };
    }

    // Rate limiting check
    const isLockedOut = await this.isLockedOut(ip);
    if (isLockedOut) {
      return { success: false, error: 'Account locked due to rate limiting', isLocked: true };
    }

    // Query driver_codes
    const { data, error: queryError } = await supabase
      .from('driver_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (queryError) {
      return { success: false, error: 'Database error' };
    }

    if (!data) {
      // Log failed attempt
      await this.logFailedAttempt(code, ip);
      const remaining = await this.getRemainingAttempts(ip);
      return { 
        success: false, 
        error: 'Code not found', 
        remainingAttempts: remaining,
        isLocked: remaining <= 0
      };
    }

    // Log successful audit entry
    await auditService.logVerificationAttempt({
      trackingCode: code,
      ipAddress: ip,
      userAgent: navigator.userAgent,
      complianceTag: 'NAME-LAW-SECURETRACE',
    });

    // Log successful auth attempt
    await this.logSuccessfulAttempt(code, ip);

    // Simulate JWT issuance
    const token = `mock-jwt-${code}`;

    return {
      success: true,
      token,
      cardData: {
        frontUrl: data.card_front_url,
        backUrl: data.card_back_url,
        category: data.category,
        reference: data.reference,
      },
      remainingAttempts: 5,
    };
  },

  async getRemainingAttempts(ip: string): Promise<number> {
    const { count } = await supabase
      .from('auth_audit')
      .select('id', { count: 'exact' })
      .eq('ip_address', ip)
      .eq('success', false)
      .gt('created_at', new Date(Date.now() - RATE_LIMIT.windowMinutes * 60 * 1000).toISOString());

    const failedAttempts = count ?? 0;
    const remaining = RATE_LIMIT.maxAttempts - failedAttempts;
    return Math.max(remaining, 0);
  },

  async isLockedOut(ip: string): Promise<boolean> {
    const { count } = await supabase
      .from('auth_audit')
      .select('id', { count: 'exact' })
      .eq('ip_address', ip)
      .eq('success', false)
      .gt('created_at', new Date(Date.now() - RATE_LIMIT.lockoutMinutes * 60 * 1000).toISOString());

    const failedAttempts = count ?? 0;
    return failedAttempts >= RATE_LIMIT.maxAttempts;
  },

  private async logFailedAttempt(code: string, ip: string): Promise<void> {
    const driverCodeHash = await this.hashString(code);
    const { count } = await supabase
      .from('auth_audit')
      .select('id', { count: 'exact' })
      .eq('ip_address', ip)
      .eq('success', false)
      .gt('created_at', new Date(Date.now() - RATE_LIMIT.windowMinutes * 60 * 1000).toISOString());

    await supabase.from('auth_audit').insert({
      driver_code_hash: driverCodeHash,
      success: false,
      ip_address: ip,
      attempt_count: (count ?? 0) + 1,
      created_at: new Date().toISOString(),
    });
  },

  private async logSuccessfulAttempt(code: string, ip: string): Promise<void> {
    const driverCodeHash = await this.hashString(code);
    await supabase.from('auth_audit').insert({
      driver_code_hash: driverCodeHash,
      success: true,
      ip_address: ip,
      attempt_count: 0,
      created_at: new Date().toISOString(),
    });
  },

  private async hashString(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },
};