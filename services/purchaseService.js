import { createApi ,  fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { database } from "../firebase";
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['orders'],
  endpoints: (builder) => ({
    savePurchase: builder.mutation({
      queryFn: async (purchase) => {
        try {
          const docRef = await addDoc(collection(database, 'orderList'), purchase);
          return { 
            
            data: { 
              status: "OK",
              ...purchase, 
              id: docRef.id 
            } 
          };
        } catch (error) {
          return { 
            data: { 
              status: "ERROR",
              error: error.message 
            } 
          };
        }
      },
      invalidatesTags: ['orders']
    }),
    getOrders: builder.query({
      queryFn: async (user_id) => {
        const q = query(
            collection(database, 'orderList'),
            where('user_id', '==', user_id)
          );
          
          const querySnapshot = await getDocs(q);
          const orders = [];
          
          querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
          });

          return { 
            data: {
              orders,
              isLoading: false
            }
          };
      },
      providesTags: ['orders']
    }),
  }),
});

export const { useSavePurchaseMutation, useGetOrdersQuery } = purchaseApi;
