import { lazy, Suspense, useEffect, useState } from "react";
import Nav from "./../Components/Nav";
import axios from "../Api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";
const ProductTemp = lazy(() => import("../Components/ProductTemp"));
import LoadingProduct from "../Components/LoadingProduct";

const Products = () => {
  // safe selector with fallback to empty array
  // const products = useSelector((state) => state.product?.products ?? []);

  const [products, setproducts] = useState([]);
  const [hasmore, sethasmore] = useState(true);
  const [loading, setLoading] = useState(false);

  const FetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );

      if (data.length === 0) {
        sethasmore(false);
      } else {
        sethasmore(true);
        setproducts([...products, ...data]);
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

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={FetchProducts}
      hasMore={hasmore}
      loader={
        <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center pb-36">
          {<LoadingProduct count={6} />}
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center", paddingBottom: "10rem" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <>
        <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center pb-10">
          {products.map((product) => (
            <Suspense key={product.id} fallback={<LoadingProduct />}>
              <ProductTemp product={product} />
            </Suspense>
          ))}
          ;
        </div>
        <Nav />
      </>
    </InfiniteScroll>
  );
};

export default Products;
