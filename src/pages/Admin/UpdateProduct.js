import React ,{useState,useEffect}from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from "antd";
import Button from 'react-bootstrap/Button';
import { useNavigate,useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const{Option}= Select
function UpdateProduct() {
  const params = useParams()
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
  const[id,setId]=useState("")

  //get single product
const getSingleProduct =async()=>{
    try{
  const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`)
    setName(data.product.name)
    setDescription(data.product.description)
    setPrice(data.product.price);
    setCategory(data.product.category._id);
    setQuantity(data.product.quantity);
    setShipping(data.product.shipping);
    setId(data.product._id)
    }
    catch(error){
        console.log(error)
        toast.error("Something went wrong");
    }
}
useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-category`,
        {
          headers: {
            Auth: auth.token, // Include the token in the request headers
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

  //Update product function
  const handleUpadte= async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try{
       const productData = new FormData()
       productData.append("name",name)
       productData.append("description", description);
       productData.append("price", price);
       productData.append("quantity", quantity);
       Photo && productData.append("Photo", Photo);
       productData.append("category", category);
       const {data}= await axios.put(
        `${process.env.REACT_APP_API}/api/product/update-product/${id}`,
        productData,
        {
          headers: {
            Auth: auth.token,
          },
        }
      );
       if(data?.success){
        toast.success("Product updated successfully")
        navigate("/dashboard/admin/products")
       }
       else{
        toast.error(data?.message)
       }
    }
    catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  //delete product
  const handleDelete =async()=>{
    try{
        // let answer= window.prompt("Are you sure you want to delete?")
        // if(!answer) return;
         const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/product/delete-product/${id}`)
            toast.success('Product deleted successfully')
            navigate('/dashboard/admin/products');
    }
    catch(error){
        console.log(error)
        toast.error('Something went wrong')
    }
  }
  return (
    <Layout title={"Dashboard - Update Product"}>
<div className='row'>
        <div className='col-md-3'>
           <AdminMenu/>
        </div>
        <div className='col-md-9'>
           <h1>Update Product</h1>
           <div className='m-1 w-75'>
            <Select 
            bordered = {false} 
            placeholder="Select a category" 
            size="large" 
            showSearch 
            className='form-select mb-3' 
            onChange={(value)=>{setCategory(value)}}
            value={category}
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
              {Photo ? (
                <div className='text-center'>
                  <img src= {URL.createObjectURL(Photo)} 
                  alt="Product_Photo" height ={"200px"}
                  fluid className="img-responsive"/>
                </div>
              ):(
                <div className='text-center'>
                  <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${id}`} alt="Product_Photo" 
                  height ={"200px"}
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
              value = {shipping ? "yes":"no"}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </Select>
          </div>
</div>
<div className='mb-3'>
<Button variant="primary" onClick={handleUpadte}>UPDATE PRODUCT</Button>
</div>
<div className='mb-3'>
<Button variant="danger" onClick={handleDelete}>DELETE PRODUCT</Button>
</div>
</div>
           
    </div>
        </div>
   
    </Layout>
  )
}

export default UpdateProduct