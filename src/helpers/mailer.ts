import User from "@/models/user.model";
import bcrypt from "bcryptjs"
import nodemailer, { TransportOptions } from "nodemailer";

export async function sendMail({ email, emailType, userId }: any) {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType == "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        } else if (emailType == "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }

        let verifyMail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a>to ${emailType == "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`;

        let resetMail = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here </a>to ${emailType == "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br>${process.env.DOMAIN}/resetPassword?token=${hashedToken}</p>`

        let transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        } as TransportOptions);

        let mailOptions = {
            from: "hello@nextauth.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
            html: emailType === "VERIFY" ? verifyMail : resetMail
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}