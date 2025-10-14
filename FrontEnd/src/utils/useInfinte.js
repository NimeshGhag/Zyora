import { useDispatch, useSelector } from "react-redux";
import axios from "../Api/axiosconfig";
import { lazyLoadProduct } from "../features/products/productslice";
import { useEffect, useState } from "react";

const useInfinte = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products ?? []);

  const [hasmore, sethasmore] = useState(true);
  const [loading, setLoading] = useState(false);
  const FetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );

      if (data.length === 0) {
        sethasmore(false);
      } else {
        sethasmore(true);
        dispatch(lazyLoadProduct(data));
      }
    } catch (error) {
      console.error("FetchProducts error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);
  return { products, hasmore, FetchProducts };
};

export default useInfinte;
