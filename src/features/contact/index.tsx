import React from "react";
import ArticleList from "@/components/widget/ArticleBlog";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/widget/Footer";

const Contact: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ArticleList />
      <Footer />
    </div>
  );
};

export default Contact;
