import { lazy, Suspense } from "react";
import Nav from "./../Components/Nav";
import InfiniteScroll from "react-infinite-scroll-component";
const ProductTemp = lazy(() => import("../Components/ProductTemp"));
import LoadingProduct from "../Components/LoadingProduct";
import useInfinte from "../utils/useInfinte";
import Header from "../Components/Header";
import { useSelector } from "react-redux";
import { filterProducts, normalizeQuery } from "../utils/searchUtils";

const Products = () => {
  const { products, hasmore, FetchProducts } = useInfinte();
  const query = useSelector((state) => state.search?.query ?? "");

  const q = normalizeQuery(query);
  const filteredProducts = filterProducts(products, q);

  return (
    <>
      {q ? (
        <>
          <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 justify-center pb-10 mt-35 lg:mt-40 bg-gray-100 py-5 rounded-2xl">
            {products.length === 0 ? (
              <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 justify-center pb-36">
                <LoadingProduct count={6} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className=" text-center w-full p-auto">No products found</div>
            ) : (
              filteredProducts.map((product) => (
                <Suspense key={product.id} fallback={<LoadingProduct />}>
                  <ProductTemp product={product} />
                </Suspense>
              ))
            )}
          </div>
          <Nav />
        </>
      ) : (
      <InfiniteScroll
        className="mt-35 lg:mt-40 bg-gray-100 py-5 rounded-2xl"
        dataLength={products.length}
        next={FetchProducts}
        hasMore={hasmore}
        loader={
          <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 justify-center pb-36">
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
          <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 justify-center pb-10">
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
      )}

      <Header />
    </>
  );
};

export default Products;
