import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "../../firebase";

export async function useUpdateDataToDB(dbCollection, data, docId) {
    const result = {
        success: false,
        error: null,
        id: null
    };
    try {
        const docRef = doc(collection(database, dbCollection), docId);
        await setDoc(docRef, data, { merge: true });
        //- console.log("Documento agregado o actualizado con ID: ", docRef.id);
        result.success = true;
        result.id = docRef.id;
        return result;
    } catch (e) {
        console.error("Error al agregar o actualizar el documento: ", e);
        result.success = false;
        result.error = e.message;
        return result;
    }
}