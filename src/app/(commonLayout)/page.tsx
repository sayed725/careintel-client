import Steps from "@/components/modules/home/Steps";
import TopDoctor from "@/components/modules/home/TopDoctor";
import Hero from "@/components/modules/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Steps />
      <TopDoctor />
    </main>
  );
}