'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { emailToSlug } from '@/lib/slug';
import { cn } from '@/lib/utils';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async (values) => {
      const { data, error } = await authClient.signUp.email({
        name: values.value.name,
        email: values.value.email,
        password: values.value.password,
        slug: emailToSlug(values.value.email),
      });
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        toast.success('Signed up successfully');
        router.push('/');
      }
    },
  });
  return (
    <Card className="bg-background mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
        <CardDescription className="">Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className={cn(field.state.meta.errors.length > 0 && 'text-red-500')}
                >
                  Name
                </Label>
                <Input
                  id={field.name}
                  name="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your name"
                  type="text"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />
          <form.Field
            name="email"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className={cn(field.state.meta.errors.length > 0 && 'text-red-500')}
                >
                  Email
                </Label>
                <Input
                  id={field.name}
                  name="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className={cn(field.state.meta.errors.length > 0 && 'text-red-500')}
                >
                  Password
                </Label>
                <Input
                  id={field.name}
                  name="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your password"
                  type="password"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className={cn(field.state.meta.errors.length > 0 && 'text-red-500')}
                >
                  Confirm Password
                </Label>
                <Input
                  id={field.name}
                  name="confirmPassword"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Confirm your password"
                  type="password"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Signing up...' : 'Sign up'}
              </Button>
            )}
          </form.Subscribe>
        </form>
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
