import { database } from "../../firebase";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export function useDBForID(collectionSelected, documentId) {
  const [data, setData] = useState(null);
  const [queryError, setQueryError] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");
  const [loadingDataDB, setLoadingDataDB] = useState(true);

  const initializeDB = useCallback(async () => {
    if (!collectionSelected || !documentId) return;
    
    try {
      setLoadingDataDB(true);
      const docRef = doc(database, collectionSelected, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setQueryError(true);
        setErrorDetail("No se encontró el producto");
      console.error("error")

      }
    } catch (err) {
      console.error(err)
      setQueryError(true);
      setErrorDetail(err.message);
    } finally {
      setLoadingDataDB(false);
    }
  }, [collectionSelected, documentId]);

  useEffect(() => {
    initializeDB();
  }, [collectionSelected, documentId]);

  return {
    queryError,
    errorDetail,
    data,
    loadingDataDB,
  };
}
