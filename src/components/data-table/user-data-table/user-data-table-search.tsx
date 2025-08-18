'use client';

import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';

export const UserDataTableSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSearch = searchParams.get('q') ?? '';

  const [searchValue, setSearchValue] = useState(currentSearch);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateSearchParams = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);

      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }
      params.delete('offset');

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl);
    },
    [searchParams, pathname, router],
  );

  const debouncedSearch = useDebouncedCallback((query: string) => {
    updateSearchParams(query);
  }, 500);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
    updateSearchParams('');
  }, [updateSearchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      debouncedSearch.cancel();
      updateSearchParams(searchValue);
    },
    [debouncedSearch, updateSearchParams, searchValue],
  );

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search users..."
          value={searchValue}
          onChange={handleInputChange}
          className="pr-10 pl-10"
        />
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearSearch}
            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
};
