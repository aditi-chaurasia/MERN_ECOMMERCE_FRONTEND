import React, { Children } from 'react'
import { useState,useContext,createContext,useEffect } from 'react'
import axios from 'axios'

const AuthContext=createContext()

const AuthProvider = ({children}) =>{
    const[auth,setAuth]=useState({
        user:null,
        token:"",
    });

    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data)
            setAuth({
                user:parseData.user,
                token:parseData.token
            });
            axios.defaults.headers.common['Authorization']=auth?.token

        }
        //eslint-disable-next-line
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
//custom hook
const useAuth = () =>useContext(AuthContext);

export {useAuth,AuthProvider};