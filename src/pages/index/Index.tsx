import './index.css'
import raintree from '../../assets/images/raintree.png'
import modmed from '../../assets/images/modmed.png'
import athena from '../../assets/images/athenahealth.png'
import experity from '../../assets/images/experity.png'
import Experity from '../rpa/Experity/Experity'
import Raintree from '../rpa/Raintree'
import Modmed from '../rpa/Modmed'
import Athena from '../rpa/Athena'
import Password from '../pass/Password'
import pass from '../../assets/images/pass.jpg'
import { IoHomeOutline } from "react-icons/io5";
import { handleCard } from '../../slices/Cardslice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Index = () => {
    
    const dispatch = useDispatch()

    const { activeCard } = useSelector((state: any) => state.cards)
    const handleActiveCard = (value: any) => {
        dispatch(handleCard(value))
    }
    const experityTotalRequest = useSelector((state:RootState)=>state.patientRequestData.data)
    return (
        <div>
            <header>

                <IoHomeOutline className='home-icon' onClick={() => handleActiveCard('home')} />
                <h3>ROBOTIC PROCESS AUTOMATION</h3>
            </header>

            {activeCard === 'home' && (
                <div className='main-content'>
                    <div className='row'>
                        <div className='col-md-4'></div>
                        <div className='col-md-4'>
                            <div className='card index-card' onClick={() => handleActiveCard('pass')}>
                                <div className="card-header"><h4>CREDENTIALS MANAGER</h4></div>
                                <div className='card-body'>
                                    <h2 className='card-title' style={{textAlign:"center"}}>4 EMR DETAILS</h2>

                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'></div>
                    </div>
                    <hr style={{ color: "white" }} />
                    <div className='row py-2'>
                        <div className='col-md-4'>
                            <div className='card index-card' onClick={() => handleActiveCard('raintree')}>
                                <div className="card-header">
                                    <h4>RAINTREE INTEGRATIONS</h4>
                                </div>
                                <div className='card-body'>
                                    <p className='card-text'>Total Request 15</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card index-card' onClick={() => handleActiveCard('modmed')}>
                                <div className='card-header'>
                                    {/* <img src={modmed} alt="modmed" style={{ width: "8rem" }} /> */}
                                    <h4>MODMED INTEGRATIONS</h4>
                                    </div>
                                <div className='card-body'>
                                    {/* <h2 className='card-title'>Modmed Integrations</h2> */}
                                    <p className='card-text'>Total Request 15</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card index-card' onClick={() => handleActiveCard('athena')}>
                                <div className='card-header'>
                                    {/* <img src={athena} alt="athena" style={{ width: "19rem",height:"3rem" }} /> */}
                                    <h4>ATHENA INTEGRATIONS</h4>
                                </div>
                                <div className='card-body'>
                                    <p className='card-text'>Total Request 15</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-2'>
                        <div className='col-md-4'>
                            <div className='card index-card' onClick={() => handleActiveCard('experity')}>
                                <div className='card-header'>
                                    <h4>EXPERITY INTEGRATIONS</h4>
                                </div>
                                <div className='card-body'>
                                    <p className='card-text'>Total Request {experityTotalRequest.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {
                activeCard === 'pass' && (
                    <Password />

                )}
            {activeCard === 'experity' && (
                <Experity />
            )}
            {activeCard === 'raintree' && (
                <Raintree />
            )}
            {activeCard === 'modmed' && (
                <Modmed />
            )}
            {activeCard === 'athena' && (
                <Athena />
            )}

        </div>
    )
}

export default Index
