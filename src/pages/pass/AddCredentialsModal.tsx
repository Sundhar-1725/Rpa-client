import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Select from 'react-select'
import './Password.css'
import { useState } from 'react'
import { postCredentialsApi } from './Api'
import { toast, ToastContainer } from 'react-toastify'

interface Emrname {
    name: string
}
interface SubEmrName {
    name: string
}

interface StateProps {
    isModelOpen: boolean,
    toggle: () => void,
    emrname: Emrname[],
    subemrname: SubEmrName[]
}

const AddCredentialsModal: React.FC<StateProps> = ({ isModelOpen, toggle, emrname, subemrname }) => {

    const [formData, setFormData] = useState({
        emrname: '',
        subemrname: '',
        updated_date: '',
        username: '',
        password: ''
    })


    const emrnameOptions = emrname.map((emr) => ({
        value: emr.name,
        label: emr.name,
    }));
    const subemrnameOptions = subemrname.map((emr) => ({
        value: emr.name,
        label: emr.name,
    }));

    const handleChange = (e: { target: { id: any; value: any } })=>{
        const {id,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [id]:value
        }))
    }

    const handleSelectChange = (selectedOption: any, actionMeta: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [actionMeta.name]: selectedOption ? selectedOption.value : ''
        }))
    }
    
        const handleSubmit = async()=>{
            try {
                
                const response = await postCredentialsApi.postCredentials(formData)
                if(response?.status === 201){
                    setFormData(response.data.data)
                    toast.success(response.data.message||"Credentials Data Updated Successfully ")
                    setTimeout(()=>toggle(),1500)
                }else{
                    console.log(response?.data.error)
                    toast.error(response?.data.error || "Failed to Update Credentials Data")
                }
                
            } catch (error) {
                console.log(error)
                toast.error("Something is wrong")
            }
        }

    return (
    <>
        <ToastContainer position='top-right' autoClose={2000}/>
        <Modal toggle={toggle} isOpen={isModelOpen} >
            <ModalHeader toggle={toggle} style={{ backgroundColor: "#1b2b54", color: "white" }}>
                Add Credentials
            </ModalHeader>
            <ModalBody>
                <div className='row' style={{ display: "flex", flexDirection: "row", padding: "1rem", gap: "1rem" }}>
                    <Select
                        options={emrnameOptions}
                        onChange={handleSelectChange}
                        name='emrname'
                        isClearable
                    />
                    <Select
                        options={subemrnameOptions}
                        onChange={handleSelectChange}
                        name='subemrname'
                        isClearable
                    />
                    <input type="date" id='updated_date' onChange={handleChange} />
                    <input type="text" placeholder='User Name' id='username' onChange={handleChange}/>
                    <input type="password" placeholder='Password' id='password' onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger' onClick={toggle}>Close</button>
                <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
            </ModalFooter>
        </Modal>
        </>
    )
}
export default AddCredentialsModal