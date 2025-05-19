import Image from "next/image";
import { Models } from "node-appwrite";

interface UserAvatarProps {
  user: Models.Document;
  size?: number;
}

export const UserAvatar = ({ user, size }: UserAvatarProps) => {
  // Using user's email or name as the seed ensures the same user always gets the same avatar
  const seed = user?.email || user?.name || "anonymous";

  // You can choose different styles:
  const style = "initials";

  // Configure the avatar with parameters
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/png?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=256FF1`;

  return (
    <div className={`relative size-[${size}px]`}>
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
