'use server'

import { auth, signIn, signOut } from "@/auth"
import { LoginSchema } from "@/lib/schemas"
import { AuthError } from "next-auth"
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

export const logoutUser = async () => {
    await signOut()
}

export const currentUser = async () => {
    const session = await auth();
  
    return session?.user;
};

export const currentRole = async () => {
    const session = await auth();
  
    return session?.user?.role;
};