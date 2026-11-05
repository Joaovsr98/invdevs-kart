import Nav from "./components/Nav";
import AmbientMotion from "./components/AmbientMotion";
import Hero from "./components/Hero";
import AboutStats from "./components/AboutStats";
import FeaturedChampionship from "./components/FeaturedChampionship";
import HowItWorksCalendar from "./components/HowItWorksCalendar";
import RankingHallOfFame from "./components/RankingHallOfFame";
import GalleryPartnersTestimonials from "./components/GalleryPartnersTestimonials";
import DiscordFooter from "./components/DiscordFooter";

export default function App() {
  return (
    <div className="bg-asphalt relative">
      <AmbientMotion />
      <div className="relative z-10">
      <Nav />
      <Hero />
      <AboutStats />
      <FeaturedChampionship />
      <HowItWorksCalendar />
      <RankingHallOfFame />
      <GalleryPartnersTestimonials />
      <DiscordFooter />
      </div>
    </div>
  );
}
