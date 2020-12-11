import axios from 'axios';

const DISH_API_BASE_URL = "http://localhost:8000/dish";

class dishService {

    getAllData(){
        return axios.get('http://localhost:8000/dish/show');
    }

    create(dish){
        return axios.post("http://localhost:8000/dish/create", dish);
    }

    getDataById(dishId){
        return axios.get("http://localhost:8000/dish/show/" + dishId);
    }

    updateDataById(dish, dishId){
        return axios.put("http://localhost:8000/dish/edit/"+ dishId, dish);
    }

    deleteDataById(dishId){
        return axios.delete("http://localhost:8000/dish/delete/" + dishId);
    }
}

export default new dishService()