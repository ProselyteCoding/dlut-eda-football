import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import NewsContainer from "@/components/NewsContainer";
import ActivitiesContainer from "@/components/ActivitiesContainer";
import DutCup from "@/components/DutCup";
import CheckIn from "@/components/CheckIn";
import CardDIY from "@/components/CardDIY";
import Contact from "@/components/Contact";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* 视频 Hero Section - 全屏，不需要 padding */}
      <VideoHero />
      
      {/* 其他内容区域 */}
      <div>
        <Section id="news">
          <NewsContainer />
        </Section>
        
        {/* 活动部分：包含金秋杯、友谊赛、欧冠聚会三个section */}
        <ActivitiesContainer />
        
        <Section id="dut-cup">
          <DutCup />
        </Section>
        <Section id="check-in">
          <CheckIn />
        </Section>
        {/* 球星卡DIY - 仅在桌面端显示 */}
        <Section id="card-diy" className="hidden lg:block">
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
