import { connectDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select("-password")
        if (!user) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Invalid Token"
            })
        }

        return NextResponse.json({
            success: false,
            status: 500,
            data: user,
            message: "User Found"
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        })
    }
}