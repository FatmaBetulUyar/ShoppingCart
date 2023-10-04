import { MdPostAdd } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { modalFunc } from "../redux/modalSlice";
import { searchingDatafunc, sortingDatafunc } from "../redux/dataSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [totalQuantity, setQuantity] = useState(0);

  console.log("cart length", cart.length);

  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += parseFloat(item.quantity);
    }
    setQuantity(total);
    console.log("total", total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div className="flex items-center justify-between bg-teal-300 text-white px-4 py-3">
      <Link to="/">
        <div className="flex items-center justify-around">
          {" "}
          <HiMiniShoppingBag size={24} />
          <div className="text-3xl">betSHOP</div>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <div className="text-black">
          <select
            onChange={(e) => dispatch(sortingDatafunc(e.target.value))}
            className="h-10 rounded-lg px-4"
            name=""
            id=""
          >
            <option value="asc">asc order by price</option>
            <option value="desc">desc order by price</option>
          </select>
        </div>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 fill-slate-300"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 0a9 9 0 016.36 15.36l4.83 4.83a1 1 0 11-1.42 1.41l-4.83-4.83A9 9 0 119 0zm0 2a7 7 0 100 14A7 7 0 009 2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            onChange={(e) => dispatch(searchingDatafunc(e.target.value))}
            className="placeholder:italic placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            placeholder="Search for anything..."
          />
        </label>
        <div
          onClick={() => dispatch(modalFunc())}
          className="bg-teal-600 w-10 h-10  rounded-full flex items-center justify-center cursor-pointer"
        >
          <MdPostAdd size={24}   className=" w-10 h-10 relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-teal-600 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          />
        </div>

        <Link to="/cart">
          <div
            type="button"
            className=" w-10 h-10 relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-teal-600 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <IoMdCart size={28} />
            {totalQuantity > 0 && (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-pink-400 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                <span className="">{totalQuantity}</span>{" "}
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
