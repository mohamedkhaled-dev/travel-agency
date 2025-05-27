import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-light-200)] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[var(--radius-20)] shadow-[var(--shadow-300)] text-center max-w-md w-full flex flex-col items-center">
        {/* Place for Not Found Illustration */}
        <div className="mb-6">
          <Image
            src="/assets/images/err.svg"
            alt="Not Found Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>
        <p className="text-lg md:text-xl text-[var(--color-gray-100)] mb-6">
          The requested page could not be found.
        </p>
        <Link href="/" className="button-class h-9 px-4">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
