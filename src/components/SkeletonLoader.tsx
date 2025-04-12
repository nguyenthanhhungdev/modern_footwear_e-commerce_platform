import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chiều cao của skeleton
   */
  height?: string | number;
  /**
   * Chiều rộng của skeleton
   */
  width?: string | number;
  /**
   * Có hiển thị skeleton hay không
   */
  isLoading?: boolean;
  /**
   * Nội dung hiển thị khi không loading
   */
  children?: React.ReactNode;
  /**
   * Hình dạng của skeleton (rounded, circular)
   */
  variant?: 'rectangular' | 'circular' | 'text';
  /**
   * Animation style
   */
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  height,
  width,
  isLoading = true,
  children,
  className,
  variant = 'rectangular',
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div
      className={cn(
        'bg-gray-200 animate-[var(--animation-fade-in)]',
        {
          'rounded-md': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'h-4 w-3/4 rounded': variant === 'text',
          'animate-pulse': animation === 'pulse',
          'animate-wave': animation === 'wave',
        },
        className
      )}
      style={{
        height,
        width,
      }}
      {...props}
      aria-hidden="true"
      aria-label="Loading..."
      role="status"
    />
  );
}

export function SkeletonText({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      variant="text"
      className={cn('w-full', className)}
      {...props}
    />
  );
}

export function SkeletonButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn('h-10 w-20 rounded-md', className)}
      {...props}
    />
  );
}

export function SkeletonCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <Skeleton className="h-[200px] w-full rounded-md" />
      <SkeletonText className="h-4 w-2/3" />
      <SkeletonText className="h-4 w-1/2" />
      <div className="flex items-center justify-between pt-2">
        <SkeletonText className="h-5 w-1/4" />
        <SkeletonButton className="h-9 w-16" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      variant="circular"
      className={cn('h-10 w-10', className)}
      {...props}
    />
  );
}

export function SkeletonNavbar() {
  return (
    <div className="w-full border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex space-x-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}