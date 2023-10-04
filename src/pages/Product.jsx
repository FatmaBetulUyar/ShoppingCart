import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { createDatafunc, updateDatafunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SelectMenu from "../components/SelectMenu";
import { addCartFunc } from "../redux/cartSlice";

const Product = () => {
  //ilk modal modalSlice > initialState > modal
  //diğeri de store içindeki modal'ı temsil ediyor
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    category: {
      id: "",
      name: "",
    },
    url: "",
  });



  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location.search.split("=")[1];
  const locAsNumber = parseInt(loc, 10); //veri uyuşmazlığı sorunu için

  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id === locAsNumber));
    } else {
      // loc yoksa veya uygun bir veri bulunamazsa productInfo'yu temizle
      setProductInfo({
        name: "",
        price: "",
        category: {
          id: "",
          name: "",
        },
        url: "",
      });
    }
  }, [loc, data, locAsNumber]);

  const buttonFunc = () => {
    dispatch(createDatafunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDatafunc({ ...productInfo, id: locAsNumber }));
    dispatch(modalFunc());
    navigate("/");
  };
  const handleCategoryChange = (selectedCategory) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      category: selectedCategory,
    }));
    console.log("selected category:",selectedCategory);
  };

  const handleAddToCart = (product) => {
    dispatch(addCartFunc(product));
  };
  const contentModal = (
    <>
      {productInfo && (
        <>
          <Input
            value={productInfo.name}
            type={"text"}
            placeholder={"Add a Product"}
            name={"name"}
            id={"name"}
            onChange={(e) => onChangeFunc(e, "name")}
          />
          <Input
            value={productInfo.price}
            type={"text"}
            placeholder={"Add a Price"}
            name={"price"}
            id={"price"}
            onChange={(e) => onChangeFunc(e, "price")}
          />
          <SelectMenu
            onChange={(selectedCategory) =>
              handleCategoryChange(selectedCategory)
            }
          />
          {console.log("product info : ", productInfo)}
          <div className="flex items-center space-x-6 mx-3 my-4">
            <div className="shrink-0">
              <img
                className="h-20 w-16 object-cover rounded-full"
                src="https://cdn.pixabay.com/photo/2016/04/01/09/42/buy-1299519_1280.png"
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose a Photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-teal-70 file:text-teal-400
        hover:file:bg-violet-100"
                name={"url"}
                id={"url"}
                onChange={(e) => onChangeFunc(e, "url")}
              />
            </label>
          </div>

          <Button
            btnText={loc ? "Update the Product" : "Create a Product"}
            onClick={loc ? buttonUpdateFunc : buttonFunc}
          />
        </>
      )}
    </>
  );

  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredItems?.map((dt, i) => (
            <ProductCard key={i} dt={dt} onClick={() => handleAddToCart(dt)} />
          ))}
        </div>
      </div>
      {modal && (
        <Modal
          title={loc ? "Update the Product" : "Create a Product"}
          content={contentModal}
        />
      )}
    </div>
  );
};

export default Product;
