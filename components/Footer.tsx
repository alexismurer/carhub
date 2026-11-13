import { getDictionary } from "@/i18n/server";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const t = getDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            CarHub {year} <br />
            {t.footer.rights} &copy;
          </p>
        </div>

        <div className="footer__links">
          {t.footer.links.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item} href="/" className="text-gray-500">
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4 mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>&copy;{year} CarHub. {t.footer.rights}</p>

        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500 whitespace-nowrap">
            {t.footer.privacy}
          </Link>
          <Link href="/" className="text-gray-500 whitespace-nowrap">
            {t.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
