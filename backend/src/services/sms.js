const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER
    });
    console.log('SMS sent successfully:', message.sid);
    return message;
  } catch (error) {
    console.error('SMS error:', error);
    throw new Error('Failed to send SMS');
  }
};

module.exports = { sendSMS };