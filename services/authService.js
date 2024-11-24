const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");
const { api_key, url_base_api } = require("../firebase/config");
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: url_base_api}),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({...auth}) => ({
                url: "accounts:signUp?key=" + api_key,
                method: "POST",
                body: auth
            })
        }),
        login: builder.mutation({
            query: ({...auth}) => ({
                url: "accounts:signInWithPassword?key=" + api_key,
                method: "POST",
                body: auth
            })
        }),
    })
    
})
//- console.log("AUTH..................", authApi)
export const {useLoginMutation, useSignUpMutation} = authApi;