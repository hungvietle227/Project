import React, { useEffect } from "react";
import Footer from "../footer";
import Header from "../header";
import StaffPage from "../rolePage/staffPage";
import Banner from "./banner";
import ListItem from "./listItem";
import useShopping from "../../hooks/useShopping";
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
      // { text: 'Ticket',id:"1"  },
      // { text: 'Info Animails', id:"2" },
      // { text: 'Zoo Trainer',id:"3"},
    ],
  },
  { text: "Feedback", link: "/contact" },
];
function Cart() {
  const { shoppingCart, handleSetShoppingCart } = useShopping();

  useEffect(() => {
    if (shoppingCart.length === 0) {
      const ShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      if (ShoppingCart != null) {
        handleSetShoppingCart(ShoppingCart);
      }
    }
  }, []);
  return (
    <div>
      <Header menuItems={menuItems} />
      <Banner />
      <ListItem />
      <Footer />
    </div>
  );
}

export default Cart;
