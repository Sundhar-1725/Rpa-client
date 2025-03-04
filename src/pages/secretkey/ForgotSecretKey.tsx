import { Link } from "react-router-dom"
import './ForgotSecretkey.css'
const ForgotSecretKey = ()=>{
    return(
        <div>
        <div className="row forgotsecretkey">
            <div className="card f-card">
                <div className="card-header">FORGOT SECRETKEY</div>
                <div className='card-body'>
                    <div className='row f-form'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Required' required />
                    </div>
                    <div className='row f-form'>
                        <label htmlFor="secret_key">SecretKey</label>
                        <input type="number" placeholder='Required' maxLength={6} pattern="\d{6}"  title="Please enter exactly 6 digits" required/>
                    </div>
                    <div className='row f-form'>
                            <button className='btn btn-success'>Submit</button>
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