import { lazy, Suspense } from "react";
import Nav from "./../Components/Nav";
import InfiniteScroll from "react-infinite-scroll-component";
const ProductTemp = lazy(() => import("../Components/ProductTemp"));
import LoadingProduct from "../Components/LoadingProduct";
import useInfinte from "../utils/useInfinte";

const Products = () => {
  const { products, hasmore, FetchProducts } = useInfinte();

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
