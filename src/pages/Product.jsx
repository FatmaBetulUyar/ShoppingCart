import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { createDatafunc, updateDatafunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

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
    }
    else {
      // loc yoksa veya uygun bir veri bulunamazsa productInfo'yu temizle
      setProductInfo({
        name: "",
        price: "",
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

  const contentModal = (
    <>
      {productInfo && (
        <>
          <Input
            value={productInfo.name}
            type={"text"}
            placeholder={"Ürün Ekle"}
            name={"name"}
            id={"name"}
            onChange={(e) => onChangeFunc(e, "name")}
          />
          <Input
            value={productInfo.price}
            type={"text"}
            placeholder={"Fiyat Ekle"}
            name={"price"}
            id={"price"}
            onChange={(e) => onChangeFunc(e, "price")}
          />
          <Input
            type={"file"}
            placeholder={"Resim seç"}
            name={"url"}
            id={"url"}
            onChange={(e) => onChangeFunc(e, "url")}
          />
          <Button
            btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
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
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
          content={contentModal}
        />
      )}
    </div>
  );
};

export default Product;
