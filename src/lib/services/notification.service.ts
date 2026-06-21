export const notificationService = {
  async sendEmailNotification(trackingCode: string, email: string): Promise<void> {
    // Simulate sending email
    console.log(`Sending email notification for tracking code ${trackingCode} to ${email}`);
    // In production, integrate with a real email service or Supabase edge function
  },
};