import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    {params}: {params: {id: string}}
) => {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    try {
        const user = await db.user.findFirst({
            where: {
                id: params.id
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log('api.admin.users', error)
        return new NextResponse("Internal server error", {status: 500})
    }
}