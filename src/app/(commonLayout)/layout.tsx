import Navbar from "@/components/modules/home/Navbar";
import Footer from "@/components/modules/home/Footer";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}