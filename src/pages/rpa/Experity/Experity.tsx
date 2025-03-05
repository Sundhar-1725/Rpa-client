import { useEffect, useState } from "react";
import "./Experity.css";
import { getPatientRequestApi } from "./Api";
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../../slices/Loaderslice";
import Loader from "../../../components/Loader";
import { setTableData } from "../../../slices/PatientRequestSlice";
import { RootState } from "../../../store/store";
import { Paginator } from 'primereact/paginator';


const Experity = () => {

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchData, setSearchData] = useState('')

  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.loader.isLoading)
  const data = useSelector((state: RootState) => state.patientRequestData.data)
  const fetchData = async () => {
    try {
      dispatch(showLoader())
      const response = await getPatientRequestApi.patientDetails();
      if (response.data && Array.isArray(response.data.data)) {
        dispatch(setTableData(response.data.data));
      } else {
        dispatch(setTableData([]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const openLoggerTab = (requestId: number) => {
    const loggerUrl = `/experity-logger?requestId=${requestId}`;
    window.open(loggerUrl, "_blank");
  };



  const onPageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };



  const filteredData = data.filter((item) => {
    const searchTermLower = searchData.toLowerCase()
    return (
      item.first_name.toLowerCase().includes(searchTermLower) ||
      item.last_name.toLowerCase().includes(searchTermLower) ||
      item.dob.includes(searchTermLower) ||
      item.request_id.toString().includes(searchTermLower)
    )
  })

  const paginatedData = filteredData.slice(first, first + rows);

  return (
    <div>
      <h2 className="py-1" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
        Experity Integrations
      </h2>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="main-content-section">
            <div className="card">
              <div className="card-tittle" style={{ padding: "1rem", marginTop: "0.1rem" }}>
                <div className="row">
                  <div className="col-md-3">   <input
                    type="text"
                    placeholder="Search patient data..."
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                  /></div>
                  <div className="col-md-3"><label htmlFor="afterDate" style={{ fontWeight: "bold", marginRight: "5px" }}>After Date</label><input type="date" /></div>
                  <div className="col-md-3"><label htmlFor="beforeDate" style={{ fontWeight: "bold", marginRight: "5px" }}>Before Date</label><input type="date" /></div>
                  <div className="col-md-3"><button className="btn" style={{backgroundColor:"#2a3758",color:"white"}}>Filter</button></div>
                </div>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Request Date</th>
                      <th>Exact Time</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Date Of Birth</th>
                      <th>Document Type</th>
                      <th>Emr Url</th>
                      <th>Request Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      paginatedData.length > 0 ? (
                        paginatedData.map((list, index) => (

                          <tr key={list.request_id}>
                            <td>{index + 1}</td>
                            <td>{format(new Date(list.timestamp), 'yyyy-MM-dd')}</td>
                            <td>{new Date(list.timestamp).toLocaleTimeString()}</td>
                            <td>{list.first_name}</td>
                            <td>{list.last_name}</td>
                            <td>{list.dob}</td>
                            <td>{list.document_type}</td>
                            <td>{list.emr_url}</td>
                            <td>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openLoggerTab(list.request_id);
                                }}
                              >
                                {list.request_id}
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (<tr><td colSpan={9}>Data Not Found</td></tr>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <Paginator first={first} rows={rows} totalRecords={data.length} onPageChange={onPageChange} className="paginator" />
            </div>
          </div>


        )
      }
    </div>
  );
};

export default Experity;
