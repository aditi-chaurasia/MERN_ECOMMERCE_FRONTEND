import React ,{useState,useEffect}from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from "antd";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const{Option}= Select
function CreateProduct() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState("")
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")
  const [Photo,setPhoto]=useState("")



  //get all category
  const getAllCategory = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          }
        }
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate= async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('token'); 
    try{
       const productData = new FormData()
       productData.append("name",name)
       productData.append("description", description);
       productData.append("price", price);
       productData.append("quantity", quantity);
       productData.append("category", category);
       productData.append("Photo", Photo);
       const {data}=await axios.post(`${process.env.REACT_APP_API}/api/product/create-product`,
        productData,
        {
          headers: {
            Auth: auth.token,
          },
        }
      );
       if(data?.success){
        toast.success("Product created successfully")
        navigate("/dashboard/admin/products")
       }
       else{
        toast.error(data?.message || "Failed to create product")
       }
    }
    catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout title={"Dashboard - Create Product"}>
<div className='row'>
        <div className='col-md-3'>
           <AdminMenu/>
        </div>
        <div className='col-md-9'>
           <h1>Create Product</h1>
           <div className='m-1 w-75'>
            <Select bordered = {false} 
            placeholder="Select a category" 
            size="large" 
            showSearch 
            className='form-select mb-3' onChange={(value)=>{setCategory(value)}}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
              {categories?.map(c=>(
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
            <div className='mb-3'>
            <label className='btn btn-outline-secondary col-md-12'>
            {Photo ? Photo.name : " Upload Photo"}
            <input type="file" name="Photo" accept="images/*" 
            onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
            </label>
            </div>
            <div className='mb-3'>
              {Photo && (
                <div className='text-center'>
                  <img src= {URL.createObjectURL(Photo)} alt="Product_Photo" height ={"200px"}
                  fluid className="img-responsive"/>
                </div>
              )}
            </div>
            <div className="mb-3">
            <div className="mb-3">
  <input
    type="text"
    value={name}
    placeholder="Write a name"
    className="form-control"
    onChange={(e) => setName(e.target.value)}
  />
</div>
<div className="mb-3">
  <textarea
    value={description}
    placeholder="Write a description"
    className="form-control"
    onChange={(e) => setDescription(e.target.value)}
  />
</div>
<div className="mb-3">
  <input
    type="number"
    value={price}
    placeholder="Write a price"
    className="form-control"
    onChange={(e) => setPrice(e.target.value)}
  />
</div>
<div className="mb-3">
  <input
    type="number"
    value={quantity}
    placeholder="Write a quantity"
    className="form-control"
    onChange={(e) => setQuantity(e.target.value)}
  />
</div>
           <div className="mb-3">
            <Select
              size="large"
              bordered={false}
              placeholder="Select Shipping"
              showSearch
              className='form-select mb-3'
              onChange={(value) => setShipping(value)}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </Select>
          </div>
</div>
<div className='mb-3'>
<Button variant="primary" onClick={handleCreate}>CREATE PRODUCT</Button>
</div>
</div>
           
    </div>
        </div>
   
    </Layout>
  )
}

export default CreateProduct