import { Nav } from "@/components/Nav";
import { ControlRing } from "@/components/ControlRing";
import { Hero } from "@/components/Hero";
import { WhyCtrldone } from "@/components/WhyCtrldone";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Otomate } from "@/components/Otomate";
import { Outcomes } from "@/components/Outcomes";
import { StartProject } from "@/components/StartProject";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ControlRing />
      <Nav />
      <main>
        <Hero />
        <WhyCtrldone />
        <Services />
        <Process />
        <Otomate />
        <Outcomes />
        <StartProject />
      </main>
      <Footer />
    </>
  );
}
