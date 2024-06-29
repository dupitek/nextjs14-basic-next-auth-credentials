import { User } from "@prisma/client";
import { create } from 'zustand';

interface Props {
    user: User | null
    setUser: (id: string) => void
}

export const useCurrentUser = create<Props>((set) => ({
    user: null,
    setUser: (id) => {
        getUserByIdClient(id).then((user: User | null) => set({user}))
    }
}))

const getUserByIdClient = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
        method: "GET",
        cache: "no-store"
    })

    const data = await res.json()

    return await data
}