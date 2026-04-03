"use client";

import { Avatar } from "@mg/ui";

export const AvatarBasicDemo = () => {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm" fallback="S" />
      <Avatar size="md" fallback="MG" />
      <Avatar size="lg" fallback="L" />
      <Avatar
        size="xl"
        src="https://api.dicebear.com/7.x/initials/svg?seed=MG"
        alt="MG"
        fallback="MG"
      />
    </div>
  );
};
