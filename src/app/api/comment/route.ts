import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            {
                message: "You are not authorized",
            },
            { status: 401 }
        );
    }

    const { text, postid }: { text: string; postid: string } =
        await request.json();

    await prisma.comment.create({
        data: {
            text,
            user: {
                connect: {
                    id: session.user.id
                }
            },
            post: {
                connect: {
                    id: postid
                }
            }
        }
    })
    return NextResponse.json(
        {
            message: "Created comment successfully",
        },
        {
            status: 200,
        }
    );
}
