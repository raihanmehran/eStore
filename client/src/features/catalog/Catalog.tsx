import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch, filtersLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchProductsAsync());
  }, [filtersLoaded]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products ..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
