import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { decreaseQuantity, deleteCartfunc, increaseQuantity } from "../redux/cartSlice";
import { BsPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += parseFloat(item.product.price) * item.quantity;
    }
    setTotalAmount(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div>My Cart</div>
      {cart.length !== 0 ? (
        cart.map((item) => (
          <div
            key={item.product.id}
            className="border border-stone-100 rounded-md shadow-md hover:shadow-lg flex items-center justify-around flex-row w-full sm:w-1/2 lg:w-2/4 heigth-full sm:h-1/2 lg:h-1/4 m-5"
          >
            <img
              src={item?.product.url}
              alt=""
              className="w-full sm:w-1/2 lg:w-1/6 heigth-full sm:h-1/2 lg:h-1/6"
            />
            <div>{item?.product.name}</div>
            <div className="flex flex-row justify-between items-center ">
              <BsPlusCircleFill size={24} onClick={()=> dispatch(increaseQuantity(item.product))}/>
              <div className="ml-2 mr-2">{item.quantity}</div>
              <BiSolidMinusCircle size={28} onClick={()=> dispatch(decreaseQuantity(item.product))}/>
            </div>
            <div>{item?.product.price}$</div>
            <FaTrashAlt
              size={24}
              onClick={() => dispatch(deleteCartfunc(item.product.id))}
            />{" "}
          </div>
        ))
      ) : (
        <div className="border border-stone-100 rounded-md shadow-md hover:shadow-lg flex items-center justify-around flex-row w-full sm:w-1/2 lg:w-2/4 heigth-full sm:h-1/2 lg:h-1/4 m-5">
          Your Cart is Empty
        </div>
      )}{" "}
      <div className="flex flex-row justify-between items-center w-full sm:w-1/2 lg:w-2/4 border-t border-gray-200 px-4  ">
        <div>Total Amount</div>
        <div>{totalAmount ? totalAmount : 0}</div>
      </div>
    </div>
  );
};

export default Cart;
