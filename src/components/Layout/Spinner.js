import React,{useState,useEffect} from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import { useNavigate ,useLocation} from 'react-router-dom';

function Spinner({path = "login"}) {
const [count,setCount]=useState(5);
const navigate=useNavigate();
const location =useLocation();

useEffect(()=>{
  const interval=setInterval(()=>{
        setCount((prevValue) => --prevValue);
  },1000);
  count === 0 && navigate(`/${path}`,{
    state:location.pathname,
  })
  return () => clearInterval(interval)
  },[count,navigate,location,path]);
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1>Redirecting  you in {count} second</h1>
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
}

export default Spinner;