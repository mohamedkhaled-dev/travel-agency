import {
  FeaturedDestinations,
  Footer,
  HandpickedTrips,
  HeroSection,
  UserHeader,
} from "@/components";
import { getUser } from "@/lib/server/appwrite";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  let user = null;

  try {
    const existingUser = await getUser();
    if (existingUser) {
      user = {
        id: existingUser.$id ?? "",
        name: existingUser.name,
        email: existingUser.email,
        dateJoined: existingUser.joinedAt ?? "",
        imageUrl: existingUser.imageUrl ?? "",
        status: existingUser.status ?? "user",
      };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <main className="bg-white">
      <UserHeader user={user} />
      <HeroSection />
      <FeaturedDestinations />
      <HandpickedTrips />
      <Footer />
    </main>
  );
};

export default HomePage;
