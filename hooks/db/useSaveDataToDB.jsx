import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebase";

export default async function useSaveDataToDB(dbCollection, data) {
    const result = {
        success: false,
        error: null,
        id:null
    }
  try {
    const docRef = await addDoc(collection(database, dbCollection), data);
    //- console.log("Documento agregado con ID: ", docRef.id);
    result.success = true;
    result.id = docRef.id;
    return result;
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
    result.success = false;
    result.error = e.message;
    return result;
  }
}
