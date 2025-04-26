import * as React from "react"
import { Button as RadixButton } from "@radix-ui/themes"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Giữ lại định nghĩa cũ cho tương thích ngược
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Map từ variant hiện tại sang Radix UI Theme variants
const variantMap: Record<string, "solid" | "soft" | "outline" | "ghost" | "surface" | "classic"> = {
  default: "solid",
  destructive: "solid",
  outline: "outline",
  secondary: "soft",
  ghost: "ghost",
  link: "surface", // Thay "link" bằng "surface" vì Radix UI Theme không có "link" variant
}

const sizeMap: Record<string, "1" | "2" | "3"> = {
  default: "2",
  sm: "1",
  lg: "3",
}

/**
 * A customizable Button component with various variants and sizes.
 * 
 * This component merges the flexibility of custom styling with Radix UI's Button component.
 * It supports both traditional button rendering and the "asChild" pattern for composability.
 * 
 * @component
 * @param {object} props - The properties for the Button component
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {string} [props.variant="default"] - Visual style variant of the button
 * @param {string} [props.size="default"] - Size of the button
 * @param {boolean} [props.asChild=false] - When true, renders as a Slot component to enable passing 
 *                                          the button's functionality to a child component
 * @param {React.ReactNode} props.children - The content to be rendered inside the button
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded to the underlying button element
 * 
 * @example
 * // Default button
 * <Button>Click me</Button>
 * 
 * @example
 * // Custom variant and size
 * <Button variant="destructive" size="sm">Delete</Button>
 * 
 * @example
 * // Using asChild with another component
 * <Button asChild>
 *   <Link href="/dashboard">Go to Dashboard</Link>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    // Nếu yêu cầu asChild, sử dụng Button cũ cho tương thích
    if (asChild) {
      const Comp = Slot;
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    // Chuyển đổi variants sang định dạng Radix
    const radixVariant = variantMap[variant as keyof typeof variantMap] || "solid";
    const radixSize = sizeMap[size as keyof typeof sizeMap] || "2";
    
    // Đơn giản hóa triển khai - chỉ sử dụng RadixButton và chỉ truyền các props cơ bản
    return (
      <RadixButton
        ref={ref as React.RefObject<HTMLButtonElement>}
        variant={radixVariant}
        size={radixSize}
        className={className}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {children}
      </RadixButton>
    );
  }
);
Button.displayName = "Button"

export { Button, buttonVariants }
