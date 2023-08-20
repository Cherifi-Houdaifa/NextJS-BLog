import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    const { title, content }: { title: string; content: string } =
        await request.json();

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            posts: {
                create: {
                    title,
                    content,
                },
            },
        },
    });
    return NextResponse.json(
        {
            message: "You have created a post",
        },
        {
            status: 200,
        }
    );
}
