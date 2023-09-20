/* eslint-disable react/prop-types */
import { BiDotsHorizontal } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteDatafunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";

const ProductCard = ({ dt }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFunc = () => {
    dispatch(modalFunc());
    setOpenEdit(false);
    navigate(`/?update=${dt?.id}`);
  };
  return (
    <div key={dt?.id} className="group relative">
      <Link to={`/detail/${dt?.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={dt?.url}
            alt=""
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between flex-col px-2">
          <div>
            <h3 className="text-2xl text-gray-900">
              <span aria-hidden="true" className="absolute inset-0" />
              {dt?.name}
            </h3>
          </div>
          <div className="flex flex-row justify-between">
            {" "}
            <p className="text-xs font-medium text-gray-400 italic">
              {dt?.category}
            </p>
            <p className="text-sm font-medium text-gray-900">{dt?.price}$</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <Button btnText={"Add to Cart"} />
      </div>

      <div
        onClick={() => setOpenEdit(!openEdit)}
        className="absolute top-0 right-2"
      >
        <BiDotsHorizontal color="white" size={24} />
      </div>
      {openEdit && (
        <div className="bg-black border border-white text-white absolute top-5 right-2 p-2 text-sm">
          <div
            onClick={() => dispatch(deleteDatafunc(dt?.id))}
            className="cursor-pointer"
          >
            Sil
          </div>
          <div onClick={updateFunc} className="cursor-pointer">
            Güncelle
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
