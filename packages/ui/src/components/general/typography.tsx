import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const headingVariants = cva("font-semibold text-foreground tracking-tight", {
  variants: {
    level: {
      1: "text-4xl",
      2: "text-3xl",
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base",
    },
    variant: {
      sans: "font-sans",
      display: "font-display",
    },
  },
  defaultVariants: {
    level: 1,
    variant: "sans",
  },
});

type HeadingLevel = NonNullable<VariantProps<typeof headingVariants>["level"]>;

type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "children"> &
  VariantProps<typeof headingVariants> & {
    level?: HeadingLevel;
    children?: React.ReactNode;
  };

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, variant, children, ...props }, ref) => {
    const Comp = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return (
      <Comp
        className={cn(headingVariants({ level, variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Heading.displayName = "Heading";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      sans: "font-sans",
      display: "font-display",
    },
  },
  defaultVariants: {
    variant: "sans",
  },
});

type TextElement = "p" | "span";

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: TextElement;
  };

const Text = forwardRef<HTMLElement, TextProps>(({ className, as = "p", variant, ...props }, ref) => {
  const Comp = as;
  return (
    <Comp className={cn(textVariants({ variant }), className)} ref={ref as never} {...props} />
  );
});
Text.displayName = "Text";

export {
  Heading,
  Text,
  headingVariants,
  textVariants,
  type HeadingProps,
  type TextProps,
};
