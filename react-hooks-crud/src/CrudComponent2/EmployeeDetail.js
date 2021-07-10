import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=> {
        const URL = `http://localhost:8000/crud2/show/${id}`
        axios.get(URL)
        .then((res)=> {
            const data = res.data
            setData(data)
        })
        .catch((err)=> {
            throw err;
        })
    }, [id])

    return (  
        <div style={{marginTop: "8rem"}}>
                <br></br>
                <div className = "card col-md-6 offset-md-3 pt-4">
                    <h3 className = "text-center"> View Dish Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Image URL &nbsp; &nbsp;: </label>
                            <div> &nbsp; {<img src={`http://localhost:8000/${data.image}`} alt="images" style={{width: "100px"}} /> }</div>
                        </div>
                        <div className = "row">
                            <label>  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div>&nbsp; { data.name }</div>
                        </div>
                    </div>

                </div>
            </div>
      )  
}

export default Detail