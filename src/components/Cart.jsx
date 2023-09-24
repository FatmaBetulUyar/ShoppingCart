import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleTotalCart = () => {
    const newTotal = calculateTotal();
    setTotalAmount(newTotal);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += parseFloat(item.price)
    }
    return total.toFixed(2);
  };

  useEffect(() => {
    handleTotalCart();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <div>My Cart</div>
      {cart &&
        cart.map((item) => (
          <div
            key={item.id}
            className="border border-stone-100 rounded-md shadow-md hover:shadow-lg flex items-center justify-around flex-row w-full sm:w-1/2 lg:w-2/4 heigth-full sm:h-1/2 lg:h-1/4 m-5"
          >
            <img
              src={item?.url}
              alt=""
              className="w-full sm:w-1/2 lg:w-1/6 heigth-full sm:h-1/2 lg:h-1/6"
            />
            <div>{item?.name}</div>

            {/* <div className="flex flex-col justify-between items-center">
              <BsPlusCircleFill size={24} />
              <BiSolidMinusCircle size={28} />
            </div> */}
        
            <div>0</div>
            <div>{item?.price}$</div>
            <FaTrashAlt size={24} />
          </div>
        ))}{" "}
      <div className="flex flex-row justify-between items-center w-full sm:w-1/2 lg:w-2/4 border-t border-gray-200 px-4  ">
        <div>Total Amount</div>
        <div>{totalAmount ? totalAmount : 0}</div>
      </div>
    </div>
  );
};

export default Cart;
