import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import { setRegisterData } from "../../slices/Registerslice";
import { postRegisterApi } from "./Api";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await postRegisterApi.postUserData(formData);
            if (response?.status === 201) {
                dispatch(setRegisterData([formData]));
                toast.success(response.data.message);
                setFormData({ username: '', email: '', password: '' }); 
                setTimeout(()=>navigate('/'),2000)
            } else {
                toast.error(response?.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error('Error:', error);
        } 
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="row register">
                <div className="card r-card">
                    <div className="card-header">REGISTER</div>
                    <div className='card-body'>
                        <div className='row r-form'>
                            <label htmlFor="username">User Name</label>
                            <input type="text" placeholder='Required' value={formData.username} id="username" onChange={handleChange} />
                        </div>
                        <div className='row r-form'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Required' value={formData.email} id="email" onChange={handleChange} />
                        </div>
                        <div className='row r-form'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Required' value={formData.password} id="password" onChange={handleChange} />
                        </div>
                        <div className='row r-form'>
                            <button className='btn btn-success' onClick={handleSubmit} >Register
                            </button>
                        </div>
                        <div className='r-form'>
                            <p>Already have an account? <Link to={'/'}>Click Me</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
