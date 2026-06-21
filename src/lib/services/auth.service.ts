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
  }> {
    // Validate code format
    if (!/^[A-Z0-9-]{8,20}$/.test(code)) {
      return { success: false, error: 'Invalid code format' };
    }

    // Rate limiting check
    const remaining = await this.getRemainingAttempts(ip);
    if (remaining <= 0) {
      return { success: false, error: 'Account locked due to rate limiting' };
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
      return { success: false, error: 'Code not found' };
    }

    // Log audit entry
    await auditService.logVerificationAttempt({
      trackingCode: code,
      ipAddress: ip,
      userAgent: 'web',
      complianceTag: 'NAME-LAW-SECURETRACE',
    });

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
    };
  },

  async getRemainingAttempts(ip: string): Promise<number> {
    const { count } = await supabase
      .from('auth_audit')
      .select('id', { count: 'exact' })
      .eq('ip_address', ip)
      .eq('success', false)
      .gt('created_at', new Date(Date.now() - this.RATE_LIMIT.windowMinutes * 60 * 1000).toISOString());

    const failedAttempts = count ?? 0;
    const remaining = this.RATE_LIMIT.maxAttempts - failedAttempts;
    return Math.max(remaining, 0);
  },

  async isLockedOut(ip: string): Promise<boolean> {
    const { count } = await supabase
      .from('auth_audit')
      .select('id', { count: 'exact' })
      .eq('ip_address', ip)
      .eq('success', false)
      .gt('created_at', new Date(Date.now() - this.RATE_LIMIT.lockoutMinutes * 60 * 1000).toISOString());

    const failedAttempts = count ?? 0;
    return failedAttempts >= this.RATE_LIMIT.maxAttempts;
  },
};