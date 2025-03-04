import { useSearchParams } from 'react-router-dom';
import './logger.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../../slices/Loaderslice';
import Loader from '../../../components/Loader';
import { RootState } from '../../../store/store';
import { setLoggerData } from '../../../slices/loggerSlice';
import { getRpaRequestLoggerApi } from './Api';



const ExperityLogger = () => {
    const [searchParams] = useSearchParams();
    const requestId = searchParams.get('requestId');
    const [timeResult, setTimeResult] = useState<string>('')

    const dispatch = useDispatch()

    const isLoading = useSelector((state: RootState) => state.loader.isLoading)
    const data = useSelector((state: RootState) => state.loggerData.data)

    const fetchLoggerData = async () => {
        try {
            dispatch(showLoader())
            const response = await getRpaRequestLoggerApi.loggerDetails(requestId);
            if (response.data && Array.isArray(response.data.data)) {
                dispatch(setLoggerData(response.data.data));
                setTimeResult(response.data.timeResult || '')

            } else {
                dispatch(setLoggerData([]));
                setTimeResult('')
            }
        } catch (error) {
            console.error('Error fetching logger data:', error);
        } finally {
            dispatch(hideLoader())
        }
    };

    useEffect(() => {
        if (requestId) {
            fetchLoggerData();
        }
    }, [requestId]);

    return (
        <>

            {
                isLoading ? (
                    <Loader />
                ) : (

                    <div>
                        <h4>Experity Integrations Request Id - {requestId} Automation Logger Details</h4>

                        <div>
                            <table className='first-table'>
                                <thead>
                                    <tr>
                                        <th>Total Time Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeResult.length ? (
                                        <tr>{timeResult}</tr>
                                    ) : (<tr>
                                        <td colSpan={1}>No data available</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className='py-2'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>Message</th>
                                        <th>Time Stamp [UTC Time]</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.length > 0 ? (
                                            data.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.level}</td>
                                                    <td>{data.message}</td>
                                                    <td>{data.timestamp}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3}>No Data Found</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ExperityLogger;
