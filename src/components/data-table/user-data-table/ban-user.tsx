'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { User } from '@/db/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { cn } from '@/lib/utils';
import z from 'zod';

const formSchema = z.object({
  banReason: z.string().min(1, 'Ban reason is required'),
  banDuration: z.string().min(1, 'Ban duration is required'),
});

interface BanUserProps {
  user: User;
}

const banDurationOptions = [
  { value: '3600', label: '1 Hour' },
  { value: '86400', label: '1 Day' },
  { value: '604800', label: '1 Week' },
  { value: '2592000', label: '1 Month' },
  { value: '7776000', label: '3 Months' },
  { value: '31536000', label: '1 Year' },
  { value: 'permanent', label: 'Permanent' },
];

export const BanUser = ({ user }: BanUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      banReason: '',
      banDuration: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async (values) => {
      const banExpiresIn =
        values.value.banDuration === 'permanent' ? undefined : parseInt(values.value.banDuration);

      const { data, error } = await authClient.admin.banUser({
        userId: user.id,
        banReason: values.value.banReason,
        ...(banExpiresIn && { banExpiresIn }),
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success('User banned successfully');
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setIsOpen(false);
        resetForm();
      }
    },
  });

  const resetForm = () => {
    form.reset();
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <DropdownMenuItem className="text-destructive">Ban user</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban user</DialogTitle>
          <DialogDescription>
            Ban <span className="text-primary font-bold">{user.name}</span> from the platform. This
            action will prevent them from accessing the application.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="banReason"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className={cn(field.state.meta.errors.length > 0 && 'text-red-500')}
                >
                  Ban Reason
                </Label>
                <Textarea
                  id={field.name}
                  name="banReason"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter the reason for banning this user"
                  rows={3}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />

          <form.Field
            name="banDuration"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className={cn(field.state.meta.errors.length > 0 && 'text-red-500')}
                >
                  Ban Duration
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ban duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {banDurationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />

          <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-3">
            <p className="text-destructive text-sm">
              <strong>Warning:</strong> Banning {user.name} will immediately prevent them from
              accessing the application. This action can be reversed by unbanning the user.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
              {([isSubmitting, canSubmit]) => (
                <Button type="submit" variant="destructive" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Banning user...</span>
                    </>
                  ) : (
                    'Ban user'
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
