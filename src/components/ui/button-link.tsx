import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

function ButtonLink({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href: string;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Link href={props.href}>
      <Comp
        data-slot="button-link"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    </Link>
  );
}

export { ButtonLink };
