import * as React from "react"
import { TextField } from "@radix-ui/themes"

// Define the allowed color options for Radix TextField
type RadixColor = 
  | "tomato" | "red" | "crimson" | "pink" | "plum" | "purple" 
  | "violet" | "indigo" | "blue" | "cyan" | "teal" | "green" 
  | "grass" | "orange" | "brown" | "sky" | "mint" | "lime" 
  | "yellow" | "amber" | "gold" | "bronze" | "gray"

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<typeof TextField.Root>, 'size'> {
  // Keep existing InputProps properties and extend with Radix-specific props
  radius?: "none" | "small" | "medium" | "large" | "full"
  variant?: "surface" | "classic" | "soft"
  color?: RadixColor
  size?: "1" | "2" | "3"
  // For slot functionality
  slotContent?: React.ReactNode
  slotSide?: "left" | "right"
}

/**
 * A customizable Input component that wraps around Radix UI's TextField.
 * 
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {string} [props.variant="surface"] - Visual variant of the input field ("surface", "classic", etc.)
 * @param {string} [props.radius] - Border radius of the input field
 * @param {string} [props.color] - Color theme of the input field
 * @param {string} [props.size="2"] - Size of the input field
 * @param {ReactNode} [props.slotContent] - Content to be rendered in the slot area
 * @param {"left" | "right"} [props.slotSide] - Position of the slot ("left" or "right")
 * @param {InputHTMLAttributes<HTMLInputElement>} props.rest - Additional HTML input attributes
 * 
 * @returns {JSX.Element} A TextField component, either with or without a slot based on provided props
 * 
 * @example
 * // Basic input
 * <Input placeholder="Enter text" />
 * 
 * @example
 * // Input with an icon in a slot
 * <Input slotContent={<SearchIcon />} slotSide="left" placeholder="Search..." />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "surface", radius, color, size = "2", slotContent, slotSide, ...props }) => {
    // Handle the slot if provided
    if (slotContent) {
      return (
        <TextField.Root
          className={className}
          variant={variant}
          radius={radius}
          color={color}
          size={size}
          {...props}
        >
          <TextField.Slot side={slotSide}>
            {slotContent}
          </TextField.Slot>
        </TextField.Root>
      );
    }
    
    // Standard text field without slot
    return (
      <TextField.Root
        className={className}
        variant={variant}
        radius={radius}
        color={color}
        size={size}
        {...props}
      />
    );
  }
)
Input.displayName = "Input"

export { Input }
