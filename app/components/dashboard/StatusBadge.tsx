"use client";

import React from "react";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: "success" | "default";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = "success",
}) => {
  const baseClasses = "flex flex-col justify-center px-1 py-0.5 text-xs font-medium leading-snug rounded-sm border-solid";
  const variantClasses = variant === "success" 
    ? "text-emerald-400 bg-emerald-800/50"
    : "text-gray-400 bg-gray-800/50";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="flex gap-0.5 items-center">
        <div className="self-stretch my-auto">{children}</div>
      </div>
    </div>
  );
};
