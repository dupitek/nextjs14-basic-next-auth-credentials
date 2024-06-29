import { apiPagination } from "@/actions/api-pagination"
import { currentRole, currentUser } from "@/actions/auths"
import { Prisma, Role } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const user = await currentUser()
    const role = await currentRole()

    if (!user && role != Role.SUPERADMIN) {
        return NextResponse.json({message: 'Not Authenticated'}, {status: 401})
    }

    const url = new URL(req.url)
        
    const search = url.searchParams.get('search') ?? undefined

    const where: Prisma.UserWhereInput = {
        OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { username: { contains: search } }
        ]
    }

    const select: Prisma.UserSelect = {
        id: true,
        name: true,
        username: true,
        image: true,
        email: true,
        role: true
    }

    try {
        const data = await apiPagination(req, where, select)

        return Response.json(data, {status: 200})
    } catch (error) {
        console.log("USERS GET", error)
        return new Response("Internal Server Error", {status: 500})
    }
}