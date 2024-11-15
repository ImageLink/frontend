import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

const client = twilio(accountSid, authToken);

export async function sendVerificationToken(phoneNumber: string) {
  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    
    return { success: true, status: verification.status };
  } catch (error) {
    console.error('Twilio verification error:', error);
    return { success: false, error: 'Failed to send verification code' };
  }
}

export async function verifyToken(phoneNumber: string, code: string) {
  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phoneNumber, code });
    
    return { success: true, status: verification.status };
  } catch (error) {
    console.error('Twilio verification check error:', error);
    return { success: false, error: 'Invalid verification code' };
  }
}