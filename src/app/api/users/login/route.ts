import { connectDB } from "@/dbConfig/dbConfig"
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody)

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User doesn't exist"
            })
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET!,
            { expiresIn: '1d' }
        )

        const response = NextResponse.json({
            success: true,
            status: 200,
            message: "Logged in successfully"
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        })
    }
}