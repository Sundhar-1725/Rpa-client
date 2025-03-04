import { Link, useNavigate } from "react-router-dom";
import './ForgotPassword.css';
import { useState } from "react";
import { forgotPasswordApi } from "./Api";
import { toast, ToastContainer } from "react-toastify";


const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await forgotPasswordApi.updatePassword(formData);
            if (response?.status === 201) {
                toast.success(response.data.message || 'Password updated successfully!');
                setFormData({ email: '', password: '', confirm_password: '' });
                setTimeout(() => navigate('/'), 1500);
            } else {
                toast.error(response?.data?.message || 'Failed to update password.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="row forgotpassword">
                <div className="card fp-card">
                    <div className="card-header">FORGOT PASSWORD</div>
                    <div className='card-body'>
                        <div className='row fp-form'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Required' id="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className='row fp-form'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Required' id="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className='row fp-form'>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" placeholder='Required' id="confirm_password" value={formData.confirm_password} onChange={handleChange} />
                        </div>
                        <div className='row fp-form'>
                            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className='r-form'>
                            <p>Back to Login <Link to={'/'}>Click Me</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
