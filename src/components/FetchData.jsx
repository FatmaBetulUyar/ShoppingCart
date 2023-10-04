import axios from "axios";
import { useState,useEffect } from "react";

const FetchData = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("data",data);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    console.log("data",data);
    getData();
  }, []);

  return {data, error ,loading}
};

export default FetchData;