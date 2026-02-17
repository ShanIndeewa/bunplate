import { LanguageProvider } from "@/app/context/LanguageContext";
import { Footer } from "@/modules/layouts/footer";
import { Navbar } from "@/modules/layouts/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
