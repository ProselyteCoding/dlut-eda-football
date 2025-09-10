import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import News from "@/components/News";
import AutumnCup from "@/components/AutumnCup";
import DutCup from "@/components/DutCup";
import SchoolCup from "@/components/SchoolCup";
import CheckIn from "@/components/CheckIn";
import CardDIY from "@/components/CardDIY";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* 粘滞滚动的Section */}
        <Section id="news">
          <News />
        </Section>
        <Section id="autumn-cup">
          <AutumnCup />
        </Section>
        <Section id="orange-cup">
          <DutCup />
        </Section>
        <Section id="school-cup">
          <SchoolCup />
        </Section>
        <Section id="check-in">
          <CheckIn />
        </Section>
        <Section id="card-diy">
          <CardDIY />
        </Section>
        
        {/* 联系方式和Footer合并的Section - 使用特殊的粘滞效果 */}
        <section 
          id="contact" 
          className="h-screen w-full snap-start flex flex-col overflow-hidden"
        >
          {/* Contact占上部分70vh */}
          <Contact />
          {/* Footer占下部分30vh */}
          <Footer />
        </section>
      </div>
    </>
  );
}
