'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BreadcrumbItem as BreadcrumbItemType } from './types';

interface DashboardBreadcrumbProps {
  items: BreadcrumbItemType[];
}

export function DashboardBreadcrumb({ items }: DashboardBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  // If items are 5 or fewer, show all items
  if (items.length <= 5) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {index === items.length - 1 ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || '#'}>{item.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // If more than 5 items, show first item, ellipsis dropdown, and last 2 items
  const firstItem = items[0];
  const lastTwoItems = items.slice(-2);
  const middleItems = items.slice(1, -2);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* First item */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={firstItem.href || '#'}>{firstItem.title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separator */}
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="size-4" />
              <span className="sr-only">Show more breadcrumbs</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {middleItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href || '#'}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        {/* Separator */}
        <BreadcrumbSeparator />

        {/* Last two items */}
        {lastTwoItems.map((item, index) => (
          <div key={`last-${index}`} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === lastTwoItems.length - 1 ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href || '#'}>{item.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
