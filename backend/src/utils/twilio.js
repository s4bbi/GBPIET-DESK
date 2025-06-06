const twilio = require("twilio");
const { ServerConfig } = require("../config");
const BadRequestError = require("../errors/badRequest");
const client = twilio(
  ServerConfig.TWILIO_ACCOUNT_SID,
  ServerConfig.TWILIO_AUTH_TOKEN
);

async function sendOtp(phone, otp) {
  try {
    // Remove any non-digit characters from the phone number
    const cleanedPhone = phone.replace(/\D/g, "");

    // Check if the phone number is exactly 10 digits long
    if (cleanedPhone.length !== 10) {
      throw new BadRequestError("Phone number must be exactly 10 digits", {
        reason: "invalid_phone_length",
        phone: cleanedPhone,
      });
    }

    // Check if it's a valid 10-digit Indian phone number (must start with 6-9)
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      throw new BadRequestError("Invalid Indian phone number", {
        reason: "invalid_phone_number",
        phone: cleanedPhone,
      });
    }

    // Format the phone number for Twilio (assuming India)
    const formattedPhone = `+91${cleanedPhone}`;

    // Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: ServerConfig.TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    console.log("OTP sent successfully:", message.sid);
  } catch (error) {
    console.error("Error sending OTP:", error);

    // Throw a BadRequestError with detailed info
    throw new BadRequestError("Failed to send OTP", {
      reason: error.code || "service_error",
      phone: phone,
      details: error.message,
    });
  }
}

module.exports = {
  sendOtp,
};
