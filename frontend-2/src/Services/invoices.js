// This is servicecs folder.
// for API calls, we will using axios.
import axios from 'axios';

class InvoiceService {

    getAllData(){
        return axios.get('http://localhost:8000/invoice/show');
    }

    create(dish){
        return axios.post("http://localhost:8000/invoice/create", dish);
    }

    getDataById(invoiceId){
        return axios.get("http://localhost:8000/invoice/show/" + invoiceId);
    }

    updateDataById(dish, invoiceId){
        return axios.put("http://localhost:8000/invoice/edit/"+ invoiceId, dish);
    }

    deleteDataById(invoiceId){
        return axios.delete("http://localhost:8000/invoice/delete/" + invoiceId);
    }
}

export default new InvoiceService()