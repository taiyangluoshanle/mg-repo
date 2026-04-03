"use client";

import { ToolbarRoot, ToolbarGroup, ToolbarButton, ToolbarSeparator, ToolbarLink } from "@mg/ui";

export const ToolbarBasicDemo = () => {
  return (
    <ToolbarRoot>
      <ToolbarGroup>
        <ToolbarButton aria-label="加粗">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
        </ToolbarButton>
        <ToolbarButton aria-label="斜体">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#">帮助</ToolbarLink>
    </ToolbarRoot>
  );
};
