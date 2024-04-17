import twilio from 'twilio'

// twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER

// initialize Twilio client
const client = new twilio(accountSid, authToken)

// function to send SMS
export const sendSMS = async (to, body) => {
  const message = await client.messages.create({
    to,            
    body,
    from: twilioNumber,
  })
}