import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authConfig } from "@workspace/utils/authconfig"

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { title } = body;
    const session = await getServerSession(authConfig);

    if(!session || !session.user) return NextResponse.json({
        message : "User not authorized"
    }, { status : 401 });

    try {
        const project = await client.project.create({
            data: {
                title,
                userId: session.user.id
            }
        })

        return {
            id: project.id,
            name: project.title
        }
    }
    catch (err) {
        return NextResponse.json({
            message: err
        }, { status: 500 });
    }
}