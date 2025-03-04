import { Link, useNavigate } from 'react-router-dom'
import './SecretKey.css'
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { postSecretKeyApi } from './Api';
import { toast, ToastContainer } from 'react-toastify';

const SecretKey = () => {
    const navigate = useNavigate()
    const [secret_key, setSecretKey] = useState('')

    const handleSubmit = async () => {
        try {
            const response = await postSecretKeyApi.postSecretKey({ secret_key })
            if (response?.status === 201) {
                toast.success(response.data.message || "Secret Key Verifycation Successfully!")
                setTimeout(() => navigate('/index'), 1500)
            } else {
                toast.error(response?.data.message || "Failed To SecretKey Verifycation")
                setSecretKey('')
            }

        } catch (error) {
            toast.error('Something went wrong. Please Verify Your Secret Key.');
            setSecretKey('')
        }
    }


    return (
        <div>
            <ToastContainer position='top-right' autoClose={3000} />
            <div className="row secretkey">
                <div className="card s-card">
                    <div className="card-header">SECRET KEY</div>
                    <div className='card-body secret-body' style={{ gap: "1rem" }}>
                        <div className='row s-form'>
                            <OtpInput value={secret_key} onChange={(secret_key) => setSecretKey(secret_key)} numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={{
                                    width: "3rem",
                                    height: "3rem",
                                    fontSize: "1.5rem",
                                    borderRadius: '8px',
                                    border: '1px solid #ced4da',
                                    textAlign: 'center',
                                }}
                                containerStyle={{
                                    display: "flex",
                                    gap: "0.2rem",
                                    justifyContent: "center"
                                }}
                            />
                        </div>
                        <div className='row s-form'>
                            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>

                        </div>
                        <div className='row s-form'>
                            <p>Forgot Secret Key <Link to={'/forgotsecretkey'}>Click Me</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SecretKey