'use server'

import { signIn } from "@/auth"
import { LoginSchema } from "@/lib/schemas"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { z } from "zod"

export const authenticate = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string
) => {
    try {
        await signIn('credentials', values, callbackUrl)
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type == "CredentialsSignin" || "CallbackRouteError") {
                return {
                    success: false, 
                    message: "Wrong user or password"
                }
            } else {
                return {
                    success: false, 
                    message: 'Something went wrong'
                }
            }
        }
        throw error;
    }
}