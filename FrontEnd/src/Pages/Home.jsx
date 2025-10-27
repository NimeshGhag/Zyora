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
  const itemShow = 8;

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
          <div className="m-3 flex gap-2 w-fit pb-10  bg-gray-100 py-5 rounded-2xl ">
            {filteredProducts.length === 0 ? (
              <div className="m-3 flex gap-2 md:gap-3 w-max overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing lg:mb-30 ">
                <LoadingProduct count={8} />
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Suspense key={product.id} fallback={<LoadingProduct />}>
                  <ProductTemp product={product} />
                </Suspense>
              ))
            )}
          </div>
          <Nav className="lg:hidden" />
        </>
      ) : (
        /* ✅ Infinite scroll mode */
        <InfiniteScroll
          className=" bg-gray-100 py-5 rounded-2x "
          dataLength={visibleProducts.length}
          next={FetchProducts}
          loader={
            <div className="m-3 flex gap-2 w-fit md:gap-3 ">
              <LoadingProduct count={8} />
            </div>
          }
        >
          <div className="m-3 flex gap-2  md:gap-3 w-max overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing lg:mb-30 ">
            {visibleProducts.length === 0 ? (
              <LoadingProduct count={8} />
            ) : (
              visibleProducts.map((product) => (
                <Suspense key={product.id} fallback={<LoadingProduct />}>
                  <ProductTemp product={product} />
                </Suspense>
              ))
            )}
          </div>
          <Nav  className="lg:hidden"  />
        </InfiniteScroll>
      )}

    </>
  );
};

export default Home;
