import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

type LayoutProps = {
  children: React.ReactNode;
  showHeroImage?: boolean;
};

const Layout = ({ children, showHeroImage = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHeroImage && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
