import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useNavigate } from 'react-router-dom'



interface StateProps {
    isModelOpen: boolean,
    toggle: () => void,

}

const LogoutModal: React.FC<StateProps> = ({ isModelOpen, toggle }) => {


    const navigate = useNavigate()

    const handleSubmit = async () => {
        setTimeout(() => navigate('/'))
    }

    return (
        <Modal toggle={toggle} isOpen={isModelOpen} style={{marginTop:"5rem"}}>
            <ModalHeader toggle={toggle} style={{ backgroundColor: "#1b2b54", color: "white" }}>
                Logout
            </ModalHeader>
            <ModalBody>
                <h3>Do you want logout?</h3>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger' onClick={toggle}>No</button>
                <button className='btn btn-success' onClick={handleSubmit}>Yes</button>
            </ModalFooter>
        </Modal>

    )
}
export default LogoutModal