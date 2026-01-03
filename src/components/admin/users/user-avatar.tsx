import type { User } from "@/types/user";

type UserAvatarProps = {
  user: Pick<User, "name" | "avatar">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
};

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0 bg-cover bg-center ${className ?? ""}`}
      style={
        user.avatar
          ? { backgroundImage: `url("${user.avatar}")` }
          : undefined
      }
      aria-label={`${user.name}'s avatar`}
    />
  );
}

