import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import { NextRequest } from "next/server"

export const apiPagination = async <T>(
    req: NextRequest,
    where: Prisma.Args<T, 'findMany' | 'count'>['where'],
    select?: Prisma.Args<T, 'findMany'>['select']
) => {
    const url = new URL(req.url)
        
    const totalTake = 10
    const take = url.searchParams.get("take") ? Number(url.searchParams.get("take")) : totalTake
    const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1
    const search = url.searchParams.get('search') ?? undefined
    const sort = url.searchParams.get('sort') ?? 'createdAt'
    const order = url.searchParams.get('order') ?? 'desc'

    const orderBy = {[sort]: order}

    const skip = (Number(page) * take) - take

    const result = await db.user.findMany({
        take: take,
        ...(skip && {
            skip
        }),
        ...(search && {
            where
        }),
        ...(select && {
            select
        }),
        orderBy
    })

    const count = await db.user.count({
        ...(search && {
            where
        })
    })

    const data  = {
        data: result,
        metaData: {
            total: count,
            hasNextPage: result.length > 0 && take == result.length,
            page: Number(count) < Number(page) ? Number(count) : page ?? 1,
            totalPage: Math.ceil(count / (take ? Number(take) : totalTake)),
        }
    }

    return data
}