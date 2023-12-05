// pages/index.tsx
import React from "react";
<<<<<<< HEAD
import HeroSection from "./components/HeroSection";
import BoardDetail from "./components/BoardDetail";
=======
import HeroSection from "@/components/widget/HeroSection";
import BoardDetail from "@/components/widget/BoardDetail";
>>>>>>> 9deb07d04353df662faa844beae8b1a10d53fbc5
import Footer from "@/components/widget/Footer";
import Navbar from "@/components/navigation/Navbar";

const Main: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BoardDetail />
      <Footer />
    </>
  );
};

export default Main;
