import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model.js"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { password, token } = reqBody;

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() }});

        if (!user) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: "Invalid Token"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Password Updated Successfully"
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        })
    }
}