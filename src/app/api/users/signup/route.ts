import { connectDB } from "@/dbConfig/dbConfig"
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendMail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);
        
        // Validate the fields

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return NextResponse.json({
                status: 409,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        console.log("User: ", user)

        // Send verification mail
        await sendMail({ email, emailType: "VERIFY", userId: user._id })

        return NextResponse.json({
            success: true,
            user,
            message: "User Registered Successfully"
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}