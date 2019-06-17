import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label } from 'semantic-ui-react';


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
            url: '/Product/List',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            processData: false,
            beforeSend: function(){ // loading...
            }
        }).done((data) => {
            this.setState({
                serviceList: data
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
            url: "/Product/Update",
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

    add(event) {
        // ajax call logic     
        const formData = new FormData(event.target)
        let dataJSON = {}

        event.preventDefault()
        
        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1]
        }
        
        console.log(dataJSON)
        
        fetch('/Product/Add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataJSON)
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                window.location.reload();
            })
        })
    }

    delete(ID) {

        var ans = confirm("Are you sure you want to delete this Record?");

        if(ans){

            $.ajax({
                url: "/Product/Delete/" + ID,
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

    render() {

        let serviceList = this.state.serviceList;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service =>

                <tr key={service.ProdId}>
                    <td className="two wide">{service.ProdId}</td>
                    <td className="six wide">{service.ProdName}</td>
                    <td className="ten wide">{service.ProdPrice}</td>

                    <td className="two wide">
                    <div className="ui buttons">
                    <Modal id="modal" trigger={<Button color="yellow" ><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details Products</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.ProdId)}>
                                    <Form.Field>
                                    <label>Name</label><br />
                                    <input id="name_update" type="text" placeholder="Type a name" name="name" placeholder={service.ProdName} 
                                            onChange={this.handleChange} required minLength="3" maxLength="20" /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Price</label><br />
                                        <input id="price_update" placeholder="Type the price" name="Price" placeholder={service.ProdPrice} onChange={this.handleChange} required /><br />
                                    </Form.Field>
                                    <Button type=' '><Icon name="save" />save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                        <Button color="red" onClick={this.delete.bind(this, service.ProdId)}><Icon name="trash" />Delete</Button>
                        </div>
                    </td>
                </tr>

            )
        }
        return (
            
            <React.Fragment>
                <div>           
                    <Modal id="add" trigger={<Button color="blue" id="buttonModal">Add a new Product</Button>}  >
                        <Modal.Header >Add a new Store</Modal.Header>
                        <Modal.Content>
                        <Form onSubmit={this.add} ref="form" method="POST">
                            <Form.Field>
                                <label>Name</label><br />
                                <input type="text" placeholder="Type a name" name="ProdName" required 
                                        minlength="3" maxlength="20" /><br />  
                            </Form.Field>   
                            <Form.Field>                         
                                <label>Price</label><br />
                                <input placeholder="Type an address" name="ProdPrice" required /><br />
                            </Form.Field>
                            <Button type='submit'><Icon name="save" />save</Button>         
                        </Form>
                    </Modal.Content>
                    </Modal>
                </div>      

                <table className="ui striped table">
                
                    <thead>
                        <tr>
                            
                            <th className="two wide">#</th>
                            <th className="ten wide">Name</th>
                            <th className="ten wide">Price</th>
                            <th className="two wide">Actions</th>
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
    <div><h1 className="anim">Product Details</h1>

    <ListingTable /></div>,
    document.getElementById('main')
);