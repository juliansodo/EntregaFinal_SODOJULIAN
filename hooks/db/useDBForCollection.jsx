import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import { useCallback, useEffect, useMemo, useState } from "react";



export function useDBForCollection(collectionSelected, filters = []) {
  const [data, setData] = useState([]);
  const [queryError, setQueryError] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");
  const [loadingDataDB, setLoadingDataDB] = useState(true);

  const initializeDB = useCallback(async () => {
    if (!collectionSelected) return;
    try {
      setLoadingDataDB(true);
      let collectionReference = collection(database, collectionSelected);

      let queryReference;
      if (filters && filters.length > 0) {
        const queryConditions = filters.map(filter =>
          where(filter.key, filter.opp, filter.value)
        );
        queryReference = query(collectionReference, ...queryConditions);
      } else {
        queryReference = collectionReference; 
      }

      const snap = await getDocs(queryReference);
      setData(snap.docs.map((p) => ({ id: p.id, ...p.data() })));
    } catch (err) {
      setQueryError(true);
      setErrorDetail(err.message);
    } finally {
      setLoadingDataDB(false);
    }
  }, [collectionSelected, filters]);

  useEffect(() => {
    initializeDB();
  }, [collectionSelected, JSON.stringify(filters)]); // si o si tengo que hacerle un stringify porque useEffect toma los arrays y objetos de dependencias por referencia, entonces tengo que serializar el array para convertirlo en string, que useffect lo tome por valor y que no se ejecute infinitamente.

  return {
    queryError,
    errorDetail,
    data,
    loadingDataDB,
  };
}