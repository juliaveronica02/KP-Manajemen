// This is servicecs folder.
// for API calls, we will using axios.
import axios from 'axios';

class CheckoutService {

    getAllData(){
        return axios.get('http://localhost:8000/checkout/show');
    }

    create(dish){
        return axios.post("http://localhost:8000/checkout/create", dish);
    }

    getDataById(checkoutId){
        return axios.get("http://localhost:8000/checkout/show/" + checkoutId);
    }

    updateDataById(dish, checkoutId){
        return axios.put("http://localhost:8000/checkout/edit/"+ checkoutId, dish);
    }

    deleteDataById(checkoutId){
        return axios.delete("http://localhost:8000/checkout/delete/" + checkoutId);
    }
}

export default new CheckoutService()