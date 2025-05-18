import { loginWithGoogle } from "@/lib/server/oauth";
import Image from "next/image";
import Link from "next/link";

const SignInPage = async () => {
  return (
    <main className="auth ">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link href={"/"}>
              <Image
                width={30}
                height={30}
                src={"/assets/icons/logo.svg"}
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>

          <article>
            <h2 className="p-28-semi-bold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>
          <button
            className="button-class h-11 w-full"
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
