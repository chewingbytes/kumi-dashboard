import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-white font-bold border-2 border-foreground rounded-full shadow-hard-md hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-lg active:translate-y-[2px] active:translate-x-[2px] active:shadow-hard-sm",
        secondary:
          "bg-transparent text-foreground font-bold border-2 border-foreground rounded-full hover:bg-tertiary hover:text-foreground transition-colors",
        outline:
          "border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
        ghost: "hover:bg-slate-100 text-slate-900",
        destructive: "bg-red-600 text-white hover:bg-red-500",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2 text-base",
        sm: "h-10 rounded-full px-4 text-sm",
        lg: "h-14 rounded-full px-8 text-lg",
        icon: "h-12 w-12 rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
