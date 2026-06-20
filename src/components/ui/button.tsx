import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow hover:bg-[position:right_center] hover:shadow-glow-lg active:scale-[0.98]',
        secondary:
          'border border-rose-200 bg-white text-rose-700 shadow-card hover:border-rose-300 hover:shadow-card-hover dark:border-white/10 dark:bg-white/5 dark:text-rose-200',
        outline:
          'border border-border bg-transparent text-foreground hover:border-rose-300 hover:text-rose-600',
        ghost: 'text-foreground hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-white/5',
        link: 'text-rose-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        md: 'h-11 px-6',
        lg: 'h-13 px-8 text-[15px] py-3.5',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
