import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);


    //get cat
    const getAllCategories = async()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`)
            setCategories(data?.category);
        }
        catch(error)
        {
            console.log(error)
        }
    };
    useEffect(()=>{
        getAllCategories();
    },[]);
    return categories;
}