import { connectDB } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/user.model.js"
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User doesn't exist"
            })
        }

        // Send verification mail
        await sendMail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Reset Email sent"
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        })
    }
}