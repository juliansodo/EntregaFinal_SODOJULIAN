import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../firebase/config";
import { doc, query, getDocs, collection, where, addDoc, updateDoc } from "firebase/firestore";

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['profile'],
  endpoints: (builder) => ({
    setImageProfile: builder.mutation({
      queryFn: async (info) => {
        try {
          if (!info?.user_id) {
            throw new Error('user_id es requerido');
          }

          const q = query(
            collection(database, 'profilePictures'),
            where('user_id', '==', info.user_id)
          );
          const querySnapshot = await getDocs(q);
          
          let docRef;
          if (querySnapshot.empty) {
            docRef = await addDoc(collection(database, 'profilePictures'), info);
          } else {
            const docId = querySnapshot.docs[0].id;
            //- console.log('DocID encontrado:', docId);
            
            if (!docId) {
              throw new Error('ID del documento no encontrado');
            }
            
            if (!database) {
              throw new Error('Database no inicializada');
            }
            
            docRef = doc(database, 'profilePictures', docId);
            await updateDoc(docRef, info);
          }
          
          if (!docRef) {
            throw new Error('No se pudo crear/actualizar el documento');
          }
          
          return { 
            data: { 
              id: docRef.id 
            }
          };
        } catch (error) {
          console.error('Error completo:', error);
          return { 
            error: error.message 
          };
        }
      },
      invalidatesTags: ['profile']
      
    }),
    getImageProfile: builder.query({
      queryFn: async (user_id) => {
        const q = query(collection(database, 'profilePictures'), where('user_id', '==', user_id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return { error: 'Imagen de perfil no encontrada' };
        }
        const doc = querySnapshot.docs[0];
        return { data: doc.data() };
      },
      providesTags: ['profile']
    })
  })
});

export const { useSetImageProfileMutation, useGetImageProfileQuery } = profileApi;