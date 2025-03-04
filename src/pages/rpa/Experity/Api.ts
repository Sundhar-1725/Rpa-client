import { API } from "../../../utils/backApi";

class GetPatientRequestApi {
  async patientDetails() {
    try {
      const response = await API.get('/experity/rparequest');
      return response;
    } catch (error) {
      console.error('Error fetching patient details:', error);
      throw error;
    }
  }
}

class GetRpaRequestLoggerApi {
  async loggerDetails(requestId: string | null) {
    try {
      const response = await API.get(`/experity/log/${requestId}`);
      return response;
    } catch (error) {
      console.error('Error fetching logger details:', error);
      throw error;
    }
  }
}

export const getRpaRequestLoggerApi = new GetRpaRequestLoggerApi();
export const getPatientRequestApi = new GetPatientRequestApi();
