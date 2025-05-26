import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-200 border-t border-light-100">
      <div className="footer-container wrapper">
        <div className="flex items-center gap-1.5 py-10">
          <Image
            src="/assets/icons/logo.png"
            alt="Velora logo"
            width={40}
            height={40}
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <h1 className="text-base md:text-2xl font-bold text-dark-100">
            Velora
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-5">
          <p className="text-sm md:text-base font-normal text-gray-100">
            © {currentYear} <span className="text-primary-500 font-semibold">Velora</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
