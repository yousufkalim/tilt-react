import React from "react";
import Home from "../../Components/Home";
import Comment from "../../Components/Comment/index";
import Feature from "../../Components/Features/index";
import Apps from "../../Components/Apps/index";
import Footer from "../../Components/Footer/index";
import ContactForm from "../../Components/Contact/contactForm";

const HomePage = () => {
  return (
    <React.Fragment>
      <Home />
      <Comment />
      <Feature />
      <Apps />
      <ContactForm />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
