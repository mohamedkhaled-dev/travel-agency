import Image from "next/image";
import { User } from "@/types";

interface UserAvatarProps {
  user: User;
  size?: number;
  className?: string;
}

export const UserAvatar = ({ user, size, className }: UserAvatarProps) => {
  // Using user's email or name as the seed ensures the same user always gets the same avatar
  const seed = user?.email || user?.name || "anonymous";

  // You can choose different styles:
  const style = "initials";

  // Configure the avatar with parameters
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/png?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=256FF1`;

  return (
    <div className={`relative size-[${size}px] ${className}`}>
      <Image
        src={avatarUrl}
        alt={user?.name || "User"}
        width={size}
        height={size}
        className="rounded-full"
      />
    </div>
  );
};

export default UserAvatar;
