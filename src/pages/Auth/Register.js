import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast';


const Register = () => {
    const[name,SetName] = useState("");
    const[email,SetEmail] = useState("");
    const[password,SetPassword] = useState("")
    const[phone,SetPhone] = useState("");
    const[address,SetAddress] = useState("")
    const[answer,SetAnswer] = useState("")
    const navigate=useNavigate();

    const handleSubmit =async(e) =>{
        e.preventDefault()
        try{
           const res=await axios.post(`${process.env.REACT_APP_API}/api/user/register`,{name,email,password,phone,address,answer});
           if(res && res.data.success){
             toast.success(res.data.message || "Registration successful!")
             navigate('/login')
             
           }
           else{
            toast.error(res.data.message || "Registration failed!")
           }
        }
        catch(error){
            console.log(error)
            toast.error('Something went error')
        }
    }
  return (
    <Layout title = "Register-Ecommerce App">
        <section className="py-2 bg-gray-50 sm:py-5 lg:py-20">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Create free account</h2>
            <p className="max-w-xl mx-auto mt-2 text-base leading-relaxed text-gray-600">You can create account in 2 minutes</p>
        </div>

        <div className="relative max-w-md mx-auto mt-2 md:mt-2">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
                <div className="px-4 py-2 sm:px-8 sm:py-7">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2.5">
                            <div>
                                <label className="text-base font-medium text-gray-900"> First & Last name </label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e)=>SetName(e.target.value)}
                                        placeholder="Enter your name"
                                        required
                                        className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-base font-medium text-gray-900"> Email address </label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>

                                    <input
                                        type="email"
                                        value={email}
                                        required
                                        onChange={(e)=>SetEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-base font-medium text-gray-900"> Password </label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        type="password"
                                        value={password}
                                        required
                                        onChange={(e)=>SetPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-base font-medium text-gray-900"> Phone Number </label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    
<svg  className="w-5 h-5"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>

                                    </div>

                                    <input
                                        type="tel"
                                        value={phone}
                                        required
                                        onChange={(e)=>SetPhone(e.target.value)}
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890"
                                        className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-base font-medium text-gray-900"> Address </label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

                                    </div>

                                    <input
                                        type="address"
                                        required
                                        value={address}
                                        onChange={(e)=>SetAddress(e.target.value)}
                                        placeholder="Enter your address"
                                        className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-base font-medium text-gray-900"> Answer </label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                    </svg>

                                    </div>

                                    <input
                                        type="text"
                                        value={answer}
                                        required
                                        onChange={(e)=>SetAnswer(e.target.value)}
                                        placeholder="What is your favorite sport"
                                        className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" name="agree" id="agree" className="w-5 h-5 text-green-500 bg-white border-gray-200 rounded" checked />

                                <label className="ml-3 text-sm font-medium text-gray-500">
                                    I agree to TrendyCart’s <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                                </label>
                            </div>

                            <div>
                                <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                    Submit
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-base text-gray-600">Already have an account? <a href="/login" className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline">Login here</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

    </Layout>
  )
}

export default Register