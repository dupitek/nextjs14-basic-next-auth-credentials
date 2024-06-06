import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUserByEmail } from './actions/users';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
        authorize: async (credentials) => {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
    
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUserByEmail(email);
                if (!user) throw new Error("User or password wrong")

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (!passwordsMatch) throw new Error("User or password wrong")
 
                if (passwordsMatch) return user;
            }
            return null;
        }
    }),
  ],
});