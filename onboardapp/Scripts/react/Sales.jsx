import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label, Dropdown } from 'semantic-ui-react';


export class ListingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: []
        };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e){

        this.setState({
            [e.target.Name]: e.target.value
        })
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {

        $.ajax({
            url: '/ProductSold/List',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            processData: false,
            beforeSend: function(){ // loading...
            }
        }).done((data) => {
            console.log(data)
            this.setState({
                customersList: data[0],
                productsList: data[1],
                storesList: data[2],
                serviceList: data[3],


            })            
        });
    }
    update(id) {
        
        var data = {
            ProdName: $('#name_update').val(),
            ProdPrice: $('#price_update').val(),
            ProdId : id

        };
        $.ajax({
            url: "/ProductSold/Update",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done((data) => {
            console.log(data);
            this.setState({
                serviceList: data
            })
            
        });

    }

    delete(ID) {

        var ans = confirm("Are you sure you want to delete this Record?");

        if(ans){

            $.ajax({
                url: "/ProductSold/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    }
    fillDropdowncus(list){     
        let result = [];
        for (var key in list) {
            result.push({ key: list[key]["CusId"] , text: list[key]["CusName"] })
        }        
        return result;
    }

    fillDropdownprod(list){     
        let result = [];
        for (var key in list) {
            result.push({ key: list[key]["ProdId"] , text: list[key]["ProdName"] })
        }        
        return result;
    }

    fillDropdownstore(list){     
        let result = [];
        for (var key in list) {
            result.push({ key: list[key]["StoreId"] , text: list[key]["StoreName"] })
        }        
        return result;
    }

    render() {

        let serviceList = this.state.serviceList;

        let tableData = null;
        let add_sale = null; // modal to add a sale

        

        if (serviceList != "") {
            tableData = serviceList.map(service =>

                <tr key={service.ProdId}>
                    <td className="two wide">{service.SalesId}</td>
                    <td className="five wide">{service.ProdName.ProdName}</td>
                    <td className="ten wide">{service.CusName.CusName}</td>
                    <td className="ten wide">{service.StoreName.StoreName}</td>
                    <td className="ten wide">{service.DateSold}</td>



                    <td className="two wide">
                    <div className="ui buttons">
                    <Modal id="modal" trigger={<Button color="yellow" ><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details Products</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.ProdId)}>
                                    <Form.Field>
                                    <label>Select customer</label><br />
                                    <Dropdown selection options={this.fillDropdowncus(this.state.customersList)} onChange={this.handleChange} name="selectCustomer" placeholder='Select Customer' /><br />
                                    <label>Select Product</label><br />
                                    <Dropdown selection options={this.fillDropdownprod(this.state.productsList)} onChange={this.handleChange} name="selectProduct" placeholder='Select Product' /><br />

                                    <label>Select Store</label><br />
                                    <Dropdown selection options={this.fillDropdownstore(this.state.storesList)} onChange={this.handleChange} name="selecStore" placeholder='Select Store' /><br />

                                    </Form.Field>
                                    <Form.Field>
                                        <label>Price</label><br />
                                        <input id="price_update" placeholder="Type the price" name="Price" placeholder={service.ProdName.ProdPrice} onChange={this.handleChange} required /><br />
                                    </Form.Field>
                                    <Button type=' '><Icon name="save" />save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                        <Button color="mini red" onClick={this.delete.bind(this, service.ProdName.ProdId)}><Icon name="trash" />Delete</Button>
                        </div>
                    </td>
                </tr>

            )
        }
        return (
            <React.Fragment>
                <div>           
                    <Modal id="add" trigger={<Button color="blue" id="buttonModal">Add a new customer</Button>}  >
                        <Modal.Header >Add a new customer</Modal.Header>
                        <Modal.Content>
                        <Form onSubmit={this.add} ref="form" method="POST">
                            <Form.Field> 
                            <label>Select customer</label><br />
                                    <Dropdown selection options={this.fillDropdowncus(this.state.customersList)} onChange={this.handleChange} name="selectCustomer" placeholder='Select Customer' /><br />
                            <label>Select Product</label><br />
                            <Dropdown selection options={this.fillDropdownprod(this.state.productsList)} onChange={this.handleChange} name="selectProduct" placeholder='Select Product' /><br />

                            <label>Select Store</label><br />
                            <Dropdown selection options={this.fillDropdownstore(this.state.storesList)} onChange={this.handleChange} name="selecStore" placeholder='Select Store' /><br />

                            </Form.Field>
                            <Form.Field>
                                <label>Date</label><br />
                                <input type="date"  onChange={this.handleDate} name="selectDate" min={this.state.curTime} required /><br />
                            </Form.Field>
                            <Button type='submit'><Icon name="save" />save</Button>         
                        </Form>
                    </Modal.Content>
                    </Modal>
                </div>      

                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="two wide">Sales ID</th>
                            <th className="ten wide">Product</th>
                            <th className="ten wide">Customer</th>
                            <th className="two wide">Store</th>
                            <th className="two wide">Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}``

ReactDOM.render(
    <div><h1 className="anim">Sales Details</h1>
    
    
    <ListingTable /></div>,
    document.getElementById('main')
);