import { z } from 'zod';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { getUserByEmail, getUserById } from '@/actions/users';
import { db } from '@/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60 // 3 Day
  },
  providers: [
    Credentials({
        authorize: async (credentials) => {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
    
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUserByEmail(email);
                if (!user) return null

                const passwordsMatch = await bcrypt.compare(password, String(user.password));

                if (!passwordsMatch) return null
 
                if (passwordsMatch) return user;
            }
            return null;
        }
    }),
  ],
  callbacks: {
    jwt: async({token, user}) => {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      token.role = existingUser.role
      token.username = existingUser.username
      return token
    },
    session: async ({token, session}) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      session.user.role = token.role
      session.user.username = token.username

      return session
    }
  }
});