import { supabase } from '../supabase';

export const auditService = {
  async logVerificationAttempt(params: {
    trackingCode: string;
    ipAddress: string;
    userAgent: string;
    complianceTag: string;
  }): Promise<void> {
    // Simple SHA‑256 hash of the tracking code for driver_code_hash
    const driverCodeHash = await this.hashString(params.trackingCode);

    const { data, error } = await supabase
      .from('delivery_audit')
      .insert({
        driver_code_hash: driverCodeHash,
        stage: 'sorting',
        status: 'pending',
        timestamp: new Date().toISOString(),
        owner_email: null,
        ip_address: params.ipAddress,
        user_agent: params.userAgent,
        compliance_tags: [params.complianceTag],
        previous_hash: '',
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Audit log failed:', error);
    }
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