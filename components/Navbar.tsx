import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary } from "@/i18n/server";

const Navbar = () => {
  const t = getDictionary();

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <CustomButton
            title={t.nav.signIn}
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white sm:min-w-[130px] max-sm:px-3"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
