import React, { useState }  from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ForgotPassword() {
    const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/user/forgot-password`, { email, newPassword,answer});
      if (res && res.data.success) {
        toast.success(res.data.message || 'Login successful!');
                navigate( '/login');
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout title={'ForgotPassword - TrendyCart'}>
        <section className="py-2 bg-gray-50 sm:py-5 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
  <h2 className="text-2xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Forgot Your Password?</h2>
  <p className="max-w-xl mx-auto mt-2 text-base leading-relaxed text-gray-600">Enter your credentials below to reset your password.</p>
</div>

          <div className="relative max-w-md mx-auto mt-2 md:mt-2">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
              <div className="px-4 py-2 sm:px-8 sm:py-7">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2.5">
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
                          onChange={(e) => setEmail(e.target.value)}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                        </div>

                        <input
                          type="password"
                          value={newPassword}
                          required
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900"> Answer </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                        </div>

                        <input
                          type="text"
                          value={answer}
                          required
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Enter your answer"
                          className="block w-full py-2 pl-8 pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" name="agree" id="agree" className="w-5 h-5 text-green-500 bg-white border-gray-200 rounded" checked={true} />
                      <label className="ml-3 text-sm font-medium text-gray-500">
                        I agree to TrendyCart’s <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    <div>
                      <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                        Reset
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-base text-gray-600">Don't have an account? <a href="/register" className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline">Register here</a></p>
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

export default ForgotPassword