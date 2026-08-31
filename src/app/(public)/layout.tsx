import { Footer } from "@/components/site/footer";
import { Masthead } from "@/components/site/masthead";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="bg-crimson focus:ring-paper sr-only px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:ring-2"
      >
        Skip to content
      </a>

      <Masthead />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
