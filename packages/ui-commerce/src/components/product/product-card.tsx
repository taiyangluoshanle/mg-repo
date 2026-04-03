import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";
import { Badge, Card, CardContent, Text } from "@mg/ui";

export interface ProductCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  image: string;
  title: string;
  price: ReactNode;
  tags?: string[];
  onClick?: () => void;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, image, title, price, tags = [], onClick, ...props }, ref) => {
    const interactive = Boolean(onClick);

    return (
      <Card
        ref={ref}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          "overflow-hidden transition-shadow hover:shadow-md",
          interactive && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        {...props}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-background-secondary">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
        <CardContent className="flex flex-col gap-2 p-4">
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} size="sm" variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
          <Text as="span" className="line-clamp-2 text-sm font-medium leading-snug">
            {title}
          </Text>
          <div className="text-base font-semibold text-brand">{price}</div>
        </CardContent>
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";
