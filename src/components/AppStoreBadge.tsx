import { cn } from "@/lib/utils";
import { APP_STORE_URL } from "@/lib/app-store";

interface AppStoreBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 px-4 text-xs gap-2",
  md: "h-12 px-5 text-sm gap-2.5",
  lg: "h-14 px-6 text-base gap-3",
};

const iconSizes = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
};

const AppStoreBadge = ({ className, size = "md" }: AppStoreBadgeProps) => {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center rounded-xl bg-foreground text-background font-medium hover:opacity-90 hover:scale-105 transition-all shadow-elevated",
        sizeClasses[size],
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={iconSizes[size]}
        aria-hidden
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] opacity-80 font-normal">Télécharger sur l&apos;</span>
        <span className="font-semibold">App Store</span>
      </span>
    </a>
  );
};

export default AppStoreBadge;
