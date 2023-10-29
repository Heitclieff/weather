"use client";
// pages/index.tsx
import React from "react";
import HeroSection from "@/components/widget/HeroSection";
import BoardDetail from "@/components/widget/BoardDetail";
import Footer from "@/components/widget/footer";
import Navbar from "@/components/navigation/Navbar";

const Main: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <BoardDetail />
      <Footer />
    </div>
  );
};

export default Main;
