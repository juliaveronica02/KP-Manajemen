// This is servicecs folder.
// for API calls, we will using axios.
import axios from 'axios';

class StockService {

    getAllData(){
        return axios.get('http://localhost:8000/addStock/show');
    }

    create(dish){
        return axios.post("http://localhost:8000/addStock/create", dish);
    }

    getDataById(stockId){
        return axios.get("http://localhost:8000/addStock/show/" + stockId);
    }

    updateDataById(dish, stockId){
        return axios.put("http://localhost:8000/addStock/edit/"+ stockId, dish);
    }

    deleteDataById(stockId){
        return axios.delete("http://localhost:8000/addStock/delete/" + stockId);
    }
}

export default new StockService()