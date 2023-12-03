import React, { useEffect } from "react";
import Header from "./header";
import SliderHero from "./sliderHero";
import SectionGap from "./sectionGap";
import SectionDiscover from "./sectionDiscover";
import SectionGapType from "./sectionGapType";
import SectionNoTop from "./sectionNoTop";
import GapNoBottomTwoHeading from "./gapNoBottom-twoHeading";
import Footer from "./footer";
import useShopping from "../hooks/useShopping";

const menuItems = [
  {
    text: "Home",
    link: "/",
    // subMenuItems: [
    //   { text: 'Home 1', link: 'index.html' },
    //   { text: 'Home 2', link: 'index-2.html' },
    //   { text: 'Home 3', link: 'index-3.html' },
    // ],
  },
  {
    text: "News",
    link: "/new",
    // subMenuItems: [
    //   { text: 'Our Blog', link: 'our-blog.html' },
    //   { text: 'Blog Details', link: 'blog-details.html' },
    // ],
  },
  {
    text: "Pages",
    subMenuItems: [
      { text: "Ticket", id: "1" },
      { text: "Info Animails", id: "2" },
      { text: "Zoo Trainer", id: "3" },
      { text: "Recent News", id: "4" },
    ],
  },
  { text: "Feedback", link: "/contact" },
];

// const { shoppingCart, handleSetShoppingCart } = useShopping();
// let ShoppingCart = localStorage.getItem("shoppingCart");
// if (ShoppingCart) {
//   try {
//     ShoppingCart = JSON.parse(ShoppingCart);
//   } catch (error) {
//     console.error("Lỗi khi chuyển đổi dữ liệu từ localStorage:", error);
//     ShoppingCart = null;
//   }
// }
// if(ShoppingCart) {
//   handleSetShoppingCart(ShoppingCart);
// }

function Index() {
  const { shoppingCart, handleSetShoppingCart } = useShopping();
  let ShoppingCart = localStorage.getItem("shoppingCart");
  useEffect(() => {
    if (ShoppingCart) {
      try {
        ShoppingCart = JSON.parse(ShoppingCart);
      } catch (error) {
        console.error("Lỗi khi chuyển đổi dữ liệu từ localStorage:", error);
        ShoppingCart = null;
      }
    }
    if (ShoppingCart) {
      handleSetShoppingCart(ShoppingCart);
    }
  }, [ShoppingCart]);
  return (
    <div>
      <Header menuItems={menuItems} />
      <SliderHero />
      <SectionGapType />
      <SectionGap />
      <SectionDiscover />
      <SectionNoTop />
      {/* <GapNoBottom/> */}
      <GapNoBottomTwoHeading />
      {/* <GapBackground/> */}
      <Footer />
    </div>
  );
}

export default Index;
