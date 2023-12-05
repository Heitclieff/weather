// pages/index.tsx
import React from "react";
import HeroSection from "./components/HeroSection";
import BoardDetail from "./components/BoardDetail";
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
