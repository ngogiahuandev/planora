'use client';

import { useCallback, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortableFields, SortOrder } from '@/types/users';

const SORT_OPTIONS: { value: SortableFields; label: string }[] = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'role', label: 'Role' },
];

const DIRECTION_OPTIONS: { value: SortOrder; label: string; icon: typeof ArrowDown }[] = [
  { value: 'desc', label: 'Descending', icon: ArrowDown },
  { value: 'asc', label: 'Ascending', icon: ArrowUp },
];

export const UserDataTableSorting = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Get current values or defaults
  const currentSortBy = (searchParams.get('sortBy') as SortableFields) || 'createdAt';
  const currentSortOrder = (searchParams.get('sortOrder') as SortOrder) || 'desc';

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      // Reset offset when sorting changes
      params.delete('offset');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleSortByChange = (value: string) => {
    updateSearchParams('sortBy', value);
  };

  const handleSortOrderChange = (value: string) => {
    updateSearchParams('sortOrder', value);
  };

  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === currentSortBy)?.label || 'Created Date';
  const currentDirectionOption = DIRECTION_OPTIONS.find(
    (option) => option.value === currentSortOrder,
  );
  const DirectionIcon = currentDirectionOption?.icon || ArrowDown;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowUpDown className="h-4 w-4" />
          {currentSortLabel}
          <DirectionIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={currentSortBy} onValueChange={handleSortByChange}>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              onSelect={(e) => e.preventDefault()}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Direction</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={currentSortOrder} onValueChange={handleSortOrderChange}>
          {DIRECTION_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                onSelect={(e) => e.preventDefault()}
              >
                <Icon className="mr-2 h-4 w-4" />
                {option.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
