import { Manrope } from "next/font/google";
import { Footer, Navbar, LanguageProvider } from "@/components";
import { getDictionary, getLocale } from "@/i18n/server";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export function generateMetadata() {
  return getDictionary().meta;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();

  return (
    <html lang={locale}>
      <body className={`relative ${manrope.className}`}>
        <LanguageProvider locale={locale}>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
