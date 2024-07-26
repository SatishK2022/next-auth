import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model.js"
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token)

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Invalid Token"
            })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Email Verified Successfully"
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        })
    }
}