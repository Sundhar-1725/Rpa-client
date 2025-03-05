import { useEffect, useState } from "react"
import { showLoader, hideLoader } from "../../slices/Loaderslice"
import { RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { getCredentialsDataApi, getEmrNameApi, getSubEmrNameApi } from "./Api"
import Loader from "../../components/Loader"
import './Password.css'
import Select from 'react-select';
import { FaEdit } from "react-icons/fa";
import AddCredentialsModal from "./AddCredentialsModal"
interface EmrName {
    id: string;
    name: string
}
interface SubEmrName {
    id: string,
    name: string
}
interface EmrCredentialsData{
    emrname:string,
    subemrname:string,
    updated_date:string,
    username:string,
    password:string
}

const Password = () => {
    const [emrName, setEmrName] = useState<EmrName[]>([])
    const [subEmrName, setSubEmrName] = useState<SubEmrName[]>([])
    const [isClearable, setClearable] = useState(true)
    const [selectedEmr,setSelectedEmr] = useState<string | null>(null)
    const [selectedSubEmr,setSelectedSubEmr] = useState<string | null>(null)
    const [isModelOpen,setModelOpen] = useState(false)

    const [credentialsData,setCredentialsData] = useState<EmrCredentialsData[]>([])

    const dispatch = useDispatch()
    const isLoading = useSelector((state: RootState) => state.loader.isLoading)

    const fetchEmrNameData = async () => {
        try {
            dispatch(showLoader())
            const response = await getEmrNameApi.getEmrDetails()
            const subemr_response = await getSubEmrNameApi.getSubEmrDetails()
            setEmrName(response?.data.data)
            setSubEmrName(subemr_response?.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(hideLoader())
        }
    }
    useEffect(() => {
        fetchEmrNameData()
    }, [])

    const emrOptions = emrName.map((emr) => ({
        value: emr.name,
        label: emr.name
    }))

    const subEmrOptions = subEmrName.map((emr) => ({
        value: emr.name,
        label: emr.name
    }))

    const handleSubmit = async()=>{
        try {
            dispatch(showLoader())
            const response = await getCredentialsDataApi.getCredentialsDetails({
                emrname:selectedEmr,
                subemrname:selectedSubEmr
            })
            if(response?.status === 201){
                setCredentialsData(response.data.data)
            }else{
                console.log(response?.data.error)
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            dispatch(hideLoader())
        }
    }

    const toggleModel = ()=>{
        setModelOpen(!isModelOpen)
    }

    return (
        <div>
            {
                isLoading ? (<Loader />) : (
                    <div className="row pass-firstsection">
                        <div className="col-md-2">
                            <Select
                                options={emrOptions}
                                isClearable={isClearable}
                                onChange={(selectedOption)=>{
                                    setSelectedEmr(selectedOption? selectedOption.value : null)
                                }}
                            />
                        </div>
                        <div className="col-md-2">
                            <Select
                                options={subEmrOptions}
                                isClearable={isClearable}
                                onChange={(selectedOption)=>{
                                    setSelectedSubEmr(selectedOption? selectedOption.value : null)
                                }}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn" style={{backgroundColor:"#2a3758",color:"white"}} onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="col-md-6" style={{display:"flex",justifyContent:"end"}}>
                            <button className="btn" style={{backgroundColor:"#2a3758",color:"white"}} onClick={toggleModel}>Add Credentials</button>
                        </div>
                    </div>

                )
            }
            <hr />
            <div className="table-section">
            <div className="card pass-card">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>EMR NAME</th>
                            <th>SUB EMR NAME</th>
                            <th>UPDATED DATE</th>
                            <th>USER NAME</th>
                            <th>PASSWORD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            credentialsData.length > 0 ?(
                         
                            credentialsData.map((list,index)=>(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{list.emrname}</td>
                                    <td>{list.subemrname? list.subemrname:"-"}</td>
                                    <td>{list.updated_date}</td>
                                    <td>{list.username}</td>
                                    <td>{list.password}</td>
                                </tr>
                            ))
                         ):(
                            <tr><td colSpan={6} style={{textAlign:"center"}}>Please Select EMR Details</td></tr>
                         )}
                    </tbody>
                </table>
            </div>
            </div>
            <AddCredentialsModal toggle ={toggleModel} isModelOpen ={isModelOpen} emrname={emrName} subemrname={subEmrName}/>
        </div>
    )
}
export default Password