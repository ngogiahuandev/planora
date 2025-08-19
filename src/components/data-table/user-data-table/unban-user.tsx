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
import { useState, useTransition } from 'react';
import { User } from '@/db/db';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface UnbanUserProps {
  user: User;
}

export const UnbanUser = ({ user }: UnbanUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleUnbanUser = async () => {
    startTransition(async () => {
      const { data, error } = await authClient.admin.unbanUser({
        userId: user.id,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success('User unbanned successfully');
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setIsOpen(false);
      }
    });
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
  };

  const handleCancel = () => {
    setIsOpen(false);
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
        <DropdownMenuItem>Unban user</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unban user</DialogTitle>
          <DialogDescription>
            Unban <span className="text-primary font-bold">{user.name}</span> and restore their
            access to the platform. They will be able to use the application again.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
          <p className="text-sm text-green-700 dark:text-green-300">
            <strong>Note:</strong> Unbanning {user.name} will immediately restore their access to
            the application. They will be able to sign in and use all features again.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleUnbanUser} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Unbanning user...</span>
              </>
            ) : (
              'Unban user'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
