import React from "react";
import "./HomePage.css";
import Header from "../../Components/Header/Header";
import SearchForm from "../../Components/SearchForm/SearchForm";
import Swapper from "../../Components/Swapper/Swapper";
import Footer from "../../Components/Footer/Footer";
import mobilebgimage from "../../images/mobile-homeland.jpg";

// *****************
import Company from "../../Components/Company/Company";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard.js";
import AddQuickCard from "../../Components/Cards/AddProperty/AddQuickCard.js";
import AllGovernorates from "../../Components/AllGovernorates/AllGovernorates.js";
import usePageSEO from "../../hooks/usePageSEO.js";

export default function HomePage() {

// Set SEO settings
usePageSEO({
  title: "فارندا - Varnda",
});
  return (
    <>
      <Header />
      <SearchForm backgroundImage={mobilebgimage} />
      <Swapper />
      <AddPropertyCard />
      <Company />
      <AddQuickCard />
      <AllGovernorates />
      <Footer />
    </>
  );
}
