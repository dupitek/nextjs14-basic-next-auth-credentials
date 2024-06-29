'use server'

import { db } from "@/lib/db";
import { ProfileSchema } from "@/lib/schemas";
import { User } from "@prisma/client";
import { z } from "zod";

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        return user
    } catch (error) {
        console.error("getUserByEmail", error)
        
        return null
    }
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        })

        return user
    } catch (error) {
        console.error("getUserById", error)
        
        return null
    }
}

export async function updateUser(id: string, request: z.infer<typeof ProfileSchema>) {
    const validatedFields = ProfileSchema.safeParse(request)

    if (!validatedFields.success) return {
        success: false,
        message: 401,
        error: validatedFields.error.flatten().fieldErrors
    }

    try {
        const user = await db.user.update({
            where: {
                id
            },
            data: validatedFields.data
        })

        if(user) {
            return {
                success: true,
                message: "Success update user"
            }
        }
    } catch (error) {
        console.log("updateUser", error)
        return {
            success: false,
            message: "Something wrong",
            data: error
        }
    }
}