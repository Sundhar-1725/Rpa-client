import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import { postLoginApi } from './Api'
import { toast, ToastContainer } from 'react-toastify'



const Login = () => {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate()

    const handleChange = (e: { target: { id: any; value: any } })=>{
        const {id,value} = e.target;
        setFormData((prevData)=>({
             ...prevData,
             [id]:value 
        }))
    }

    const handleSubmit =async()=>{
        try {
            const response = await postLoginApi.postLoginData(formData)
            if(response?.status === 201){
               setFormData(formData)
               toast.success(response.data.message)
               setFormData({email:'',password:''})
               setTimeout(()=>{
                navigate('/secretkey'),1000
               })
            }else{
                toast.error(response?.data.message)
            }
            
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    }

    return (
        <div>
            <ToastContainer position='top-right' autoClose={3000}/>
            <div className="row login">
                <div className="card l-card">
                    <div className="card-header">LOGIN</div>
                    <div className='card-body'>
                        <div className='row form'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Required' id='email' value={formData.email} onChange={handleChange}/>
                        </div>
                        <div className='row form'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Required' id='password' value={formData.password} onChange={handleChange}/>
                        </div>
                        <div className='row form'>
                            <button className='btn btn-success' onClick={handleSubmit}>Login</button>
                        </div>
                        <div className='form'>
                            <p>Don't have an account?<Link to={'/register'}>Click Me</Link></p>
                            <p><Link to={'/forgotPassword'}>Forgot Password</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login