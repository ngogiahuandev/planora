'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { faker } from '@faker-js/faker';
import { useQueryClient } from '@tanstack/react-query';
import { UserPlus, Loader2 } from 'lucide-react';
import { emailToSlug } from '@/lib/slug';

export const CreateManyUsersButton = () => {
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const createManyUsers = async () => {
    setIsCreating(true);

    try {
      // Generate 10 fake users
      const users = Array.from({ length: 10 }, () => ({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: '12345678',
      }));

      toast.info(`Creating ${users.length} users...`);

      // Sign up all users using Promise.all
      const signUpPromises = users.map(async (user) => {
        try {
          const result = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            slug: emailToSlug(user.email),
          });
          return { success: true, user: user.email, result };
        } catch (error) {
          console.error(`Failed to create user ${user.email}:`, error);
          return { success: false, user: user.email, error };
        }
      });

      const results = await Promise.all(signUpPromises);

      // Count successful and failed creations
      const successful = results.filter((r) => r.success).length;
      const failed = results.filter((r) => !r.success).length;

      // Show results
      if (successful === users.length) {
        toast.success(`Successfully created ${successful} users!`);
      } else if (successful > 0) {
        toast.warning(`Created ${successful} users successfully, ${failed} failed.`);
      } else {
        toast.error(`Failed to create all ${users.length} users.`);
      }

      // Log failed users for debugging
      const failedUsers = results.filter((r) => !r.success);
      if (failedUsers.length > 0) {
        console.log('Failed users:', failedUsers);
      }

      // Invalidate and refetch users query to update the table
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {
      console.error('Error creating bulk users:', error);
      toast.error('An unexpected error occurred while creating users.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button onClick={createManyUsers} disabled={isCreating} variant="outline" className="gap-2">
      {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
      {isCreating ? 'Creating...' : 'Create 10 Users'}
    </Button>
  );
};
