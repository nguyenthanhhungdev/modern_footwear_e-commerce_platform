import * as React from "react"
import { TextArea as RadixTextArea } from "@radix-ui/themes"

// Define the allowed color options for Radix TextArea
type RadixColor = 
  | "tomato" | "red" | "crimson" | "pink" | "plum" | "purple" 
  | "violet" | "indigo" | "blue" | "cyan" | "teal" | "green" 
  | "grass" | "orange" | "brown" | "sky" | "mint" | "lime" 
  | "yellow" | "amber" | "gold" | "bronze" | "gray"

export interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixTextArea>, 'size'> {
  // Keep existing TextareaProps properties and extend with Radix-specific props
  radius?: "none" | "small" | "medium" | "large" | "full"
  variant?: "surface" | "classic" | "soft"
  color?: RadixColor
  size?: "1" | "2" | "3"
  resize?: "none" | "vertical" | "horizontal" | "both"
}

/**
 * A customizable textarea component that wraps RadixTextArea.
 * 
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {string} [props.variant="surface"] - The visual variant of the textarea
 * @param {string} [props.radius] - Border radius of the textarea
 * @param {string} [props.color] - Color theme of the textarea
 * @param {string} [props.size="2"] - Size of the textarea
 * @param {string} [props.resize="vertical"] - Resize behavior of the textarea
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props.other - Additional textarea attributes
 * 
 * @returns {React.ReactElement} A textarea component with the specified props
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "surface", radius, color, size = "2", resize = "vertical", ...props }) => {
    return (
      <RadixTextArea
        className={className}
        variant={variant}
        radius={radius}
        color={color}
        size={size}
        resize={resize}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
