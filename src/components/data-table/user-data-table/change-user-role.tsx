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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@/types/users';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface ChangeUserRoleProps {
  user: User;
}

export const ChangeUserRole = ({ user }: ChangeUserRoleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<UserRole | null>(user.role as UserRole | null);
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleChangeRole = async () => {
    startTransition(async () => {
      if (!role) toast.error('Please select a role');
      if (user.role === role) toast.error('Please select a different role');

      const { data, error } = await authClient.admin.setRole({
        userId: user.id,
        role: role as UserRole,
      });
      if (error) toast.error(error.message);
      if (data) toast.success('Role changed successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsOpen(false);
    });
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setRole(user.role as UserRole | null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setRole(user.role as UserRole | null);
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
        <DropdownMenuItem>Change role</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change role</DialogTitle>
          <DialogDescription>
            Change the role of <span className="text-primary font-bold">{user.name}</span> to a new
            role. Be careful, this action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Select
          value={role ?? undefined}
          onValueChange={(value) => {
            setRole(value as UserRole);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(UserRole).map((role: UserRole) => (
              <SelectItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {user.role !== role && role && (
          <p className="text-destructive/80 text-sm">
            Changing the role of {user.name} to{' '}
            <span className="text-destructive font-bold">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleChangeRole} disabled={user.role === role || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Changing role...</span>
              </>
            ) : (
              'Change role'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
