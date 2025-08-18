'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserDataTablePagingProps {
  total: number;
  limit: number;
  offset: number;
}

export const UserDataTablePaging = ({ total, limit, offset }: UserDataTablePagingProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const createPageURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      const newOffset = (page - 1) * limit;

      if (newOffset === 0) {
        params.delete('offset');
      } else {
        params.set('offset', newOffset.toString());
      }

      if (limit === 10) {
        params.delete('limit');
      } else {
        params.set('limit', limit.toString());
      }

      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname, limit],
  );

  const navigateToPage = useCallback(
    (page: number) => {
      const url = createPageURL(page);
      router.push(url);
    },
    [createPageURL, router],
  );

  const handlePageSizeChange = useCallback(
    (newLimit: string) => {
      const params = new URLSearchParams(searchParams);
      const limitValue = parseInt(newLimit);

      if (limitValue === 10) {
        params.delete('limit');
      } else {
        params.set('limit', limitValue.toString());
      }

      params.delete('offset');

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl);
    },
    [searchParams, pathname, router],
  );

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-muted-foreground text-sm">
        Current page: {currentPage} of {totalPages}
      </div>

      <div className="text-muted-foreground text-sm">{total} records</div>
      <div className="flex items-center gap-2">
        <Select value={limit.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Page Size</SelectLabel>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => navigateToPage(currentPage - 1)}
          size="icon"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => navigateToPage(currentPage + 1)}
          size="icon"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
