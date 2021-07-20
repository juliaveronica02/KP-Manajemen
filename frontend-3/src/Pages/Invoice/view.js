// this is view invoice component.
// Importing React since we are using React.
import React, { Component } from 'react'
import InvoiceService from '../../Services/invoices'

class ViewInvoiceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            invoice: {}
        }
    }

    componentDidMount(){
        InvoiceService.getDataById(this.state.id).then( res => {
            this.setState({invoice: res.data});
            console.log("invoice by id: ", res.data);
        })
    }

    render() {
        return (
            <div style={{marginTop: "8rem"}}>
                <br></br>
                <div className = "card col-md-6 offset-md-3 pt-4">
                    <h3 className = "text-center"> View Invoice Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Image URL &nbsp; &nbsp;: </label>
                            <div> &nbsp; { this.state.invoice.image }</div>
                        </div>
                        <div className = "row">
                            <label>  Sales name &nbsp;&nbsp;: </label>
                            <div>&nbsp; { this.state.invoice.sales_name }</div>
                        </div>
                        <div className = "row">
                            <label> Store &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.invoice.store_name }</div>
                        </div>
                        <div className = "row">
                            <label> Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.invoice.address }</div>
                        </div>
                        <div className = "row">
                            <label> Phone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.invoice.phone }</div>
                        </div>
                        <div className = "row">
                            <label> Description &nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.invoice.description }</div>
                        </div>
                        <div className = "row">
                            <label> Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.invoice.price }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewInvoiceComponent