import React, { useState } from "react";

import IteminCart from "../../components/IteminCart/IteminCart";

import "./cart.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Checkout from "../Checkout/Checkout";

const Cart = ({ user, setUser }) => {
  const [nums, setNums] = useState([]);
  const [sum, setSum] = useState(user.sum);
  const [currPage, setCurrPage] = useState("cart");
  useEffect(() => {
    axios
      .get(
        `https://tiny-blue-oyster.cyclic.app/api/users/getCartProduct?id=${user._id}`
      )
      .then((data) => {
        console.log(data.data);
        setNums(data.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleCheckout = () => {
    if (currPage == "cart") setCurrPage("checkout");
    else {
    }
  };

  console.log(nums);
  return (
    <>
      {" "}
      {currPage == "cart" ? (
        <>
          <div className="cart-main">
            {nums.length > 0 ? (
              <>
                <div className="product-cart-list">
                  <h2>Bag Details</h2>
                  {nums.map((item) => (
                    <IteminCart
                      item={item}
                      user={user}
                      setUser={setUser}
                      sum={sum}
                      setSum={setSum}
                    />
                  ))}
                </div>
                <div className="bill">
                  <div className="bill-details">
                    <h2 className="item-bill">Order Details: </h2>

                    <div className="item-bill">Bag Total: Rs.{user.sum}</div>
                    <h4 className="item-bill">Grand Total : Rs.{user.sum}</h4>
                  </div>

                  <Button variant="contained" onClick={handleCheckout}>
                    Check Out
                  </Button>
                </div>
              </>
            ) : (
              <h2>Your Cart is Empty!</h2>
            )}
          </div>
        </>
      ) : (
        <>
          <Checkout user={user} setUser={setUser} nums={nums} />
        </>
      )}
    </>
  );
};

export default Cart;
