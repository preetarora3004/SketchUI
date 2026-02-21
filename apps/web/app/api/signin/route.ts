import { NextResponse, NextRequest } from "next/server";
import { client } from "@workspace/db/index";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { username, password } = body;

    try {
        const user = await client.user.findFirst({
            where: {
                username,
                password
            }
        })

        if (!user) return NextResponse.json({
            message: "Invalid credentials"
        }, { status: 401 });

        const payload = {
            id: user.id,
            username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        return {
            token
        }
    }
    catch (err) {
        return NextResponse.json({
            message: "Server could not process the request",
            error: err
        }, { status: 500 });
    }
}