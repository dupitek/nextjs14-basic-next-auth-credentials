'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { authenticate } from "@/actions/auths"
import { LoginSchema } from "@/lib/schemas"
import { AuthCard } from "@/components/auth/auth-card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "../ui/form-error"

export default function FormLogin() {
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>("")

  const router = useRouter()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setLoading(true)
    try {
      authenticate(values, String(callbackUrl))
        .then((data) => {
          if (!data?.success) {
            setErrors(data?.message)
          }

          router.push(callbackUrl ?? '/dashboard')
        })
    } catch (error) {
      console.log("error", error)
      setErrors(error)
    }
    setLoading(false)
  }

  return (
    <AuthCard
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      disabled={loading}
                      placeholder="john.doe@example.com or johndoe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={errors} />
            <Button
              disabled={loading}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}
