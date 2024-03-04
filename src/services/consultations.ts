import fetchToken from '../ultils/auth';
import isTokenExpired from '../ultils/isTokenExpired';

const url = process.env.NEXT_PUBLIC_API_URL! + '/public/consultations'
export default {
    async fetchLifePlanData(data: any, success: any, error: any) {
        let token = await fetchToken();

        if (isTokenExpired(token)) {
            token = await fetchToken(true);
        }

        const response = await fetch(  `${url}/life-plans/suggest?cityCode=${data.address}&dob=${data.year}&gender=${data.gender}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            error('API request failed');
        }
        const dataResponse = await response.json();
        success(dataResponse)
        return
    },
    async fetchReportData(data: any, success: any, error: any){
        let token = await fetchToken();
        if (isTokenExpired(token)) {
            token = await fetchToken(true);
        }
        const response = await fetch(  `${url}/report?cityCode=${data.address}&dob=${data.year}&gender=${data.gender}&ageDeath=${data.ageDeath}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            error('API request failed');
        }
        const dataResponse = await response.json();
        success(dataResponse)
        return
    }
}
