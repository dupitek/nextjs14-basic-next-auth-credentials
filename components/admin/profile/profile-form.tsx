"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateUser } from "@/actions/users";
import { ProfileSchema } from "@/lib/schemas";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { User } from "@prisma/client";

const ProfileForm = (
  {user}: {user: User | null}
) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false)


  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",
      image: user?.image ?? ""
    },
    values: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",
      image: user?.image ?? ""
    }
  });

  if (!user) {
    return null
  }

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await updateUser(user.id, values)
      if (response?.error) {
        setError("Something wrong")
        console.log(response.error)
      }
      setSuccess("Success update user")
      toast.success("Success update user")
    } catch (err) {
      console.log("onSubmit|ProfileForm", err);
      toast.error("Something went wrong")
    }
    setLoading(false)
  }

  return ( 
    <Card className="w-full">
      <CardHeader>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            className="space-y-6" 
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username without space"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        disabled={loading}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={loading}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
   );
}
 
export default ProfileForm;