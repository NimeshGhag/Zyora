import React, { lazy, Suspense } from "react";
import Nav from "./../Components/Nav";
import Header from "../Components/Header";
const ProductTemp = lazy(() => import("../Components/ProductTemp"));
import LoadingProduct from "../Components/LoadingProduct";
import { filterProducts, normalizeQuery } from "../utils/searchUtils";
import useInfinte from "../utils/useInfinte";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import EcommerceBanner from "../Components/EcommerceBanner";

const Home = () => {
  const { products, hasmore, FetchProducts } = useInfinte();
  const query = useSelector((state) => state.search?.query ?? "");

  const q = normalizeQuery(query);
  const filteredProducts = filterProducts(products, q);
  const itemShow = 5;

  // ✅ Fixed slice bug
  const visibleProducts = (q ? filteredProducts : products || []).slice(
    0,
    itemShow
  );

  return (
    <>
      <Header />
      <EcommerceBanner />
      {/* ✅ Search mode */}
      {q ? (
        <>
          <div className="m-3 flex gap-2 w-fit pb-10  bg-gray-100 py-5 rounded-2xl">
            {filteredProducts.length === 0 ? (
              <div className="m-3 flex gap-2 w-fit">
                <LoadingProduct count={5} />
              </div>
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
        /* ✅ Infinite scroll mode */
        <InfiniteScroll
          className=" bg-gray-100 py-5 rounded-2xl"
          dataLength={visibleProducts.length}
          next={FetchProducts}
          loader={
            <div className="m-3 flex gap-2 w-fit">
              <LoadingProduct count={5} />
            </div>
          }
        >
          <div className="m-3 flex gap-2 w-fit">
            {visibleProducts.length === 0 ? (
              <LoadingProduct count={5} />
            ) : (
              visibleProducts.map((product) => (
                <Suspense key={product.id} fallback={<LoadingProduct />}>
                  <ProductTemp product={product} />
                </Suspense>
              ))
            )}
          </div>
          <Nav />
        </InfiniteScroll>
      )}

    </>
  );
};

export default Home;
