import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { set } from 'mongoose';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Searchinput() {
    const[values,setValues]=useSearch();
    const navigate=useNavigate();

    const handleSubmit =async (e) =>{
        e.preventDefault()
        try{
           const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product/search/${values.keyword}`)
           setValues({...values,results:data})
           navigate('/search');
        }
        catch(error)
        {
            console.log(error)
        }
    }
  return (
    <div>
        <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={values.keyword}
                    onChange = {(e)=>setValues({...values,keyword:e.target.value})}
                  />
                  <Button variant="outline-primary">Search</Button>
                </Form>
    </div>
  )
}

export default Searchinput