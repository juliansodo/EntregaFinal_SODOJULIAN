import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const api_key = "AIzaSyAmxeuWXe628yjOuVu4F6K_xNe121NScjY";
const url_base_api = "https://identitytoolkit.googleapis.com/v1/";
const firebaseConfig = {
  apiKey: "AIzaSyAmxeuWXe628yjOuVu4F6K_xNe121NScjY",
  authDomain: "coderhouse-prueba-jsodo.firebaseapp.com",
  projectId: "coderhouse-prueba-jsodo",
  storageBucket: "coderhouse-prueba-jsodo.appspot.com",
  messagingSenderId: "459900385309",
  appId: "1:459900385309:web:547e2a4bc7f5ced34a6ef4"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app)

export {database, api_key, url_base_api}