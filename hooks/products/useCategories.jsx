import { useCallback, useEffect, useState } from "react";
import { useDBForCollection,DBs } from "../db/";
import { useDispatch } from "react-redux";
import { setCategories, setLoadingCategories } from "../../app/features/categoriesSlice";
setLoadingCategories
export function useCategories() {
  const {data, loadingDataDB} = useDBForCollection(DBs.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingDataDB) {
      const newCategories = [{ id: 0, nombre: "Todos los productos" }, ...data];
      dispatch(setCategories(newCategories));
      dispatch(setLoadingCategories(false));
    }
  }, [loadingDataDB, data]);
  return {  };

}
