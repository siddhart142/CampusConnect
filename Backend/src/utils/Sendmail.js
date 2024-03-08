import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv"
dotenv.config({
    path : './.env'
})
// Create a nodemailer transporter with configuration
const email = process.env.EMAIL
const key = process.env.EMAIL_KEY

console.log(process.env.MONGODB_URL,process.env.EMAIL)
// process.env.MONGODB_URL
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: email,
    pass: key,
  },
});


// Define a function to send an email with OTP
const sendMail = async (email, otp) => {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `"Campus Connect" <${process.env.EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: "OTP Verification", // Subject line
      text: otp, // plain text body
      html: `<b>Your OTP for verification is:</b> ${otp}`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw new ApiError(400, "Email Couldn't be sent, Please try again");
  }
};

// Export the sendMail function for use in other modules
export { sendMail };
