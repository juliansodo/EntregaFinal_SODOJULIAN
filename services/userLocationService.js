import React from 'react'
import { database  } from '../firebase/config'; 
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const userLocationApi = createApi({
  reducerPath: 'userLocationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['userLocationsCache'],
  endpoints: (builder) => ({
    saveLocation: builder.mutation({
      queryFn: async (location) => {
        try {
          
          const docRef = await addDoc(collection(database, 'userLocations'), location);
          //- console.log("docRef", docRef);
          return { 
            data: { 
              ...location, 
              id: docRef.id 
            } 
          };
        } catch (error) {
          return { 
            error: error.message 
          };
        }
      },
      invalidatesTags: ['userLocationsCache']
    }),
    
    getLocations: builder.query({
      queryFn: async (user_id) => {
        try {
          const q = query(
            collection(database, 'userLocations'),
            where('user_id', '==', user_id)
          );
          
          const querySnapshot = await getDocs(q);
          const locations = [];
          
          querySnapshot.forEach((doc) => {
            locations.push({ id: doc.id, ...doc.data() });
          });

          return { 
            data: {
              locations,
              isLoading: false
            }
          };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ['userLocationsCache']
    })
  })
});

export const { 
  useSaveLocationMutation,
  useGetLocationsQuery,
  useLazyGetLocationsQuery
} = userLocationApi;

