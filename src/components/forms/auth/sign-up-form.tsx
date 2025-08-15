'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomFormField } from '@/components/ui/custom-form-field';
import { Form } from '@/components/ui/form';
import { authClient } from '@/lib/auth-client';
import { emailToSlug } from '@/lib/slug';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { data, error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        slug: emailToSlug(values.email),
      });
      if (error) {
        console.error(error);
      }
      if (data) {
        console.log(data);
      }
    });
  }
  return (
    <Card className="bg-background mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
        <CardDescription className="">Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomFormField
              control={form.control}
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
            />
            <CustomFormField
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <CustomFormField
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <CustomFormField
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing up...
                </>
              ) : (
                'Sign up'
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
