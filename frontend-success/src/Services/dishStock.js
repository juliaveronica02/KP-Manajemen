// This is servicecs folder.
// for API calls, we will using axios.
import axios from 'axios';

class StockService {

    getAllData(){
        return axios.get('http://localhost:8000/stock/show');
    }

    create(dish){
        return axios.post("http://localhost:8000/stock/create", dish);
    }

    getDataById(stockId){
        return axios.get("http://localhost:8000/stock/show/" + stockId);
    }

    updateDataById(dish, stockId){
        return axios.put("http://localhost:8000/stock/edit/"+ stockId, dish);
    }

    deleteDataById(stockId){
        return axios.delete("http://localhost:8000/stock/delete/" + stockId);
    }
}

export default new StockService()