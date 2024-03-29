// This is servicecs folder.
// for API calls, we will using axios.
import axios from 'axios';

class CheckoutService {

    getAllData(){
        return axios.get('http://localhost:8000/reduceStock/show');
    }

    create(dish){
        return axios.post("http://localhost:8000/reduceStock/create", dish);
    }

    getDataById(checkoutId){
        return axios.get("http://localhost:8000/reduceStock/show/" + checkoutId);
    }

    updateDataById(dish, checkoutId){
        return axios.put("http://localhost:8000/reduceStock/edit/"+ checkoutId, dish);
    }

    deleteDataById(checkoutId){
        return axios.delete("http://localhost:8000/reduceStock/delete/" + checkoutId);
    }
}

export default new CheckoutService()