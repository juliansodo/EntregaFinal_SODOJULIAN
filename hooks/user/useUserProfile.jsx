import React from 'react'
import { useDispatch } from 'react-redux'
import { setImageUser } from '../../app/features/userSlice'
import { DBs, useDBForID, useUpdateDataToDB } from '../db'
export function getUserProfile() {
    const getUserProfileImage =  (userId) => {
       return useDBForID(DBs.profile_pictures, userId)
    }
    const setUserProfileImage = (userId, data) => {
        return //- console.log(useUpdateDataToDB(DBs.profile_pictures, data, userId))
    
    }
    return { getUserProfileImage, setUserProfileImage }
}
