import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import NewsContainer from "@/components/NewsContainer";
import Activities from "@/components/Activities";
import DutCup from "@/components/DutCup";
import SchoolCup from "@/components/SchoolCup";
import CheckIn from "@/components/CheckIn";
import CardDIY from "@/components/CardDIY";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-[8vh]">
        <Section id="news">
          <NewsContainer />
        </Section>
        <Section id="activities">
          <Activities />
        </Section>
        <Section id="school-cup">
          <SchoolCup />
        </Section>
        <Section id="dut-cup">
          <DutCup />
        </Section>
        <Section id="check-in">
          <CheckIn />
        </Section>
        <Section id="card-diy">
          <CardDIY />
        </Section>
        <section 
          id="contact" 
          className="min-h-screen w-full flex flex-col"
        >
          <Contact />
          <Footer />
        </section>
      </div>
    </div>
  );
}
