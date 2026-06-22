import { supabase } from '../supabase';

export interface AuditEntry {
  eventType: string;
  componentId: string;
  complianceTag: string;
  shadowCss?: string;
  userAgent?: string;
  sessionId?: string;
}

export const auditService = {
  /**
   * Log an audit event
   */
  async logEvent(entry: AuditEntry): Promise<void> {
    try {
      const { error } = await supabase
        .from('ui_depth_audit')
        .insert({
          event_type: entry.eventType,
          component_id: entry.componentId,
          compliance_tag: entry.complianceTag || 'NAME-LAW-SECURETRACE',
          shadow_css: entry.shadowCss,
          user_agent: entry.userAgent || navigator.userAgent,
          session_id: entry.sessionId,
        });

      if (error) {
        console.error('Audit log failed:', error);
      }
    } catch (err) {
      console.error('Audit service error:', err);
    }
  },

  /**
   * Log authentication attempts
   */
  async logAuthAttempt(
    driverCodeHash: string,
    success: boolean,
    ipAddress?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('auth_audit')
        .insert({
          driver_code_hash: driverCodeHash,
          success,
          ip_address: ipAddress,
        });

      if (error) {
        console.error('Auth audit failed:', error);
      }
    } catch (err) {
      console.error('Auth audit service error:', err);
    }
  },

  /**
   * Log tracking updates
   */
  async logTrackingUpdate(
    trackingCode: string,
    previousStatus: string,
    newStatus: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('tracking_updates')
        .insert({
          tracking_code: trackingCode,
          previous_status: previousStatus,
          new_status: newStatus,
          timestamp: new Date().toISOString(),
        });

      if (error) {
        console.error('Tracking audit failed:', error);
      }
    } catch (err) {
      console.error('Tracking audit service error:', err);
    }
  },
};