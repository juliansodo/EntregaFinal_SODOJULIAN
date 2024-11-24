import { useState, useEffect, useMemo } from "react";
import { useDBForCollection,DBs, useDBForID } from "../db/";
import { useDispatch } from "react-redux";
import { setProductsLoading, setProductsData, setProductsError } from "../../app/features/productsSlice";

export function useAllProducts() {
  const { data: products = [], loadingDataDB: loading = false, errorDetail = "", queryError = false } = useDBForCollection(DBs.products, []);
  const dispatch = useDispatch();
  const error = useMemo(() => ({ error: !!queryError, message: errorDetail }), [queryError, errorDetail]);

  useEffect(() => {
    dispatch(setProductsData([...products]));
    dispatch(setProductsLoading(loading));
    dispatch(setProductsError(error));
  }, [products, loading, error]);
  

  return { products, loading, error };
}


export function useProductsByCategory(category_id) {
  const dispatch = useDispatch();
  const filters = [{ key: "categoria_id", opp: "==", value: category_id }];
  const {
    data: products,
    loadingDataDB: loading,
    errorDetail,
    queryError,
  } = useDBForCollection(DBs.products, filters);
  const error = useMemo(() => ({ error: !!queryError, message: errorDetail }), [queryError, errorDetail]);

  useEffect(() => {

    dispatch(setProductsData([...products]));
    dispatch(setProductsLoading(loading));
    dispatch(setProductsError(error));
  }, [products, loading, error]);
  return { products, loading, error };
}

export function useProducts(category_id)
{
  if(category_id)
  {
    useProductsByCategory(category_id);
  }
  else
  {
    useAllProducts();
  }
}

export function useProduct(product_id) {
  const {
    data: products,
    loadingDataDB: loading,
    errorDetail,
    queryError,
  } = useDBForID(DBs.products, product_id);
  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    if (queryError) {
      setError({ error: true, message: errorDetail });
    }
  }, [queryError, errorDetail]);
  return { products, loading, error };
}
