import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Badge, Card, CardContent, Text } from "@mg/ui";

export interface AddressCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

export const AddressCard = forwardRef<HTMLDivElement, AddressCardProps>(
  ({ className, name, phone, address, isDefault, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Text as="span" className="font-semibold">{name}</Text>
            <Text as="span" className="text-sm text-foreground-secondary tabular-nums">
              {phone}
            </Text>
            {isDefault ? (
              <Badge variant="success" size="sm">
                默认
              </Badge>
            ) : null}
          </div>
          <Text as="p" className="text-sm leading-relaxed text-foreground-secondary">
            {address}
          </Text>
        </CardContent>
      </Card>
    );
  },
);

AddressCard.displayName = "AddressCard";
