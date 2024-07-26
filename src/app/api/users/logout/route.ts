import { connectDB } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({
            success: true,
            status: 200,
            message: "Logout successfully"
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date()
        })

        return response;
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        })
    }
}