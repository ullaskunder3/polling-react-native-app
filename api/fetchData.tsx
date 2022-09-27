import axios from "axios";

async function fetchPollingData(pageNumber:number) {
    console.log("page", pageNumber);
    
    try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`);           
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("ERROR:check axios:", error.message);
            return '404';
        }else{
            console.log("ERROR: something else", error);
            return "404"
        }
    }
}

export default fetchPollingData;