import { loginWithGoogle } from "@/lib/server/oauth";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sign-in | Velora",
  description:
    "Sign in to Velora to manage your travel destinations, itineraries, and user activity with ease.",
};

const SignInPage = () => {
  return (
    <main className="auth relative">
      <Image
        src="/assets/images/auth-img.webp"
        alt="Auth Background"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 1024px, 1280px"
        className="object-cover"
        priority
        quality={85}
      />
      <section className="mx-auto glassmorphism flex-center px-6 z-10">
        <div className="sign-in-card">
          <header className="header pb-0">
            <Link href={"/"}>
              <Image
                width={50}
                height={50}
                src={"/assets/icons/logo.png"}
                alt="logo"
                className="size-[50px]"
              />
            </Link>
            <h1 className="p-28-bold text-[var(--color-primary-100)]">
              Velora
            </h1>
          </header>

          <article className="text-center">
            <h2 className="p-28-semi-bold text-[var(--color-dark-100)]">
              Start Your Travel Journey
            </h2>
            <p className="p-18-regular text-[var(--color-gray-100)] !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>
          <button
            className="button-class h-11 w-full cursor-pointer"
            onClick={loginWithGoogle}
          >
            <Image
              src={"/assets/icons/google.svg"}
              alt="Google"
              width={20}
              height={20}
              className="size-5"
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
