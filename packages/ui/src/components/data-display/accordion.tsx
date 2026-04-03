import * as React from 'react';
import { Accordion } from '@base-ui/react/accordion';
import { type ReactNode } from 'react';
import { cn } from '@mg/utils';

interface AccordionProps {
  className?: string;
  items: { label: ReactNode; value: string; content: ReactNode; icon?: ReactNode }[];
}

export function MGAccordion({ className, items }: AccordionProps) {
  return (
    <Accordion.Root className={cn("flex w-full flex-col justify-center text-gray-900", className)}>
      {
        items.map((item) => (
          <Accordion.Item key={item.value} className="border-b border-gray-200">
            <Accordion.Header>
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue-800">
                {item.label}
                {item.icon ?? <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-panel-open:scale-110 group-data-panel-open:rotate-45" />}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-base text-gray-600 transition-[height] ease-out data-ending-style:h-0 data-starting-style:h-0">
              {item.content}
            </Accordion.Panel>
          </Accordion.Item>
        ))
      }

    </Accordion.Root>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}
