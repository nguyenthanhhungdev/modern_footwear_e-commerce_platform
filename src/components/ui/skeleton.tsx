import * as React from "react"
import { Skeleton as RadixSkeleton } from "@radix-ui/themes"

interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof RadixSkeleton> {
  className?: string;
  width?: string;
  height?: string;
}

/**
 * A component that displays a loading skeleton.
 * Wraps the RadixSkeleton component with additional props.
 * 
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {ReactNode} [props.children] - Child elements to render inside the skeleton
 * @param {string|number} [props.width] - Width of the skeleton
 * @param {string|number} [props.height] - Height of the skeleton
 * @param {any} props.rest - Any other props are passed to RadixSkeleton
 * @returns {JSX.Element} A skeleton UI component
 */
export function Skeleton({ className, children, width, height, ...props }: SkeletonProps) {
  return (
    <RadixSkeleton 
      className={className}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </RadixSkeleton>
  )
}

export function OrderProcessingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton width="48px" height="48px" style={{ borderRadius: '9999px' }} />
        <div className="space-y-2">
          <Skeleton width="250px" height="16px" />
          <Skeleton width="200px" height="16px" />
        </div>
      </div>
      
      <Skeleton width="100%" height="16px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="75%" height="16px" />
      
      <div className="pt-4 space-y-2">
        <Skeleton width="100%" height="16px" />
        <Skeleton width="100%" height="16px" />
        <Skeleton width="66%" height="16px" />
      </div>
      
      <div className="flex justify-between items-center pt-4">
        <Skeleton width="96px" height="40px" style={{ borderRadius: '6px' }} />
        <Skeleton width="160px" height="40px" style={{ borderRadius: '6px' }} />
      </div>
    </div>
  )
}
