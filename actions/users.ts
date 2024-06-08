import { db } from "@/lib/db";
import { User } from "@prisma/client";

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