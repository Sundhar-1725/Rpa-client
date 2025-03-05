import { Link, useNavigate } from "react-router-dom"
import './ForgotSecretkey.css'
import { useState } from "react"
import { forgotSecretKeyApi } from "./Api"
import { toast, ToastContainer } from "react-toastify"
const ForgotSecretKey = () => {

    const [formData, setFormData] = useState({
        email: '',
        secret_key: ''
    })

    const navigate = useNavigate()

    const handleChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            const response = await forgotSecretKeyApi.updatePassword(formData)
            if (response?.status === 201) {
                setFormData(formData)
                toast.success(response.data.message)
                setFormData({ email: '', secret_key: '' })
                setTimeout(() => 
                    navigate('/secretkey'), 1500)
            } else {
                toast.error(response?.data.message)
            }

        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    }


    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} />
            <div className="row forgotsecretkey">
                <div className="card f-card">
                    <div className="card-header">FORGOT SECRETKEY</div>
                    <div className='card-body'>
                        <div className='row f-form'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Required' id="email" onChange={handleChange} />
                        </div>
                        <div className='row f-form'>
                            <label htmlFor="secret_key">SecretKey</label>
                            <input
                                type="number"
                                placeholder="Required"
                                id = "secret_key"
                                maxLength={6}
                                pattern="\d{6}"
                                title="Please enter exactly 6 digits"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, ''); 
                                    if (value.length <= 6) {
                                        handleChange(e); 
                                    }
                                }}
                            />
                            <p style={{color:"red",textAlign:"start"}}>Secret Key Should be Exactly 6 digits numbers</p>
                        </div>
                        <div className='row f-form'>
                            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className='f-form'>
                            <p>Back To Login <Link to={'/'}>Click Me</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotSecretKey