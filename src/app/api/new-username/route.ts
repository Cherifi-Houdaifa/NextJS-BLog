import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
    console.log("hi11111111");
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            {
                message: "You are not allowed",
            },
            {
                status: 401,
            }
        );
    }
    const { newUsername }: { newUsername: string } = await request.json();

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name: newUsername,
        },
    });

    return NextResponse.json(
        {
            message: "You have changed your username",
        },
        {
            status: 200,
        }
    );
}
