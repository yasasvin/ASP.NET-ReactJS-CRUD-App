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

    add(event) {
        // ajax call logic     
        const formData = new FormData(event.target)
        let dataJSON = {}

        event.preventDefault()
        
        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1]
        }
        
        console.log(dataJSON)
        
        fetch('/Customer/Add', {
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

    loadData() {

        $.ajax({
            url: '/Customer/List',
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
            CusName: $('#name_update').val(),
            CusAddress: $('#address_update').val(),
            CusId : id

        };
        $.ajax({
            url: "/Customer/Update",
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
                url: "/Customer/Delete/" + ID,
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


                <tr key={service.CusId}>
                    <td className="two wide">{service.CusId}</td>
                    <td className="six wide">{service.CusName}</td>
                    <td className="ten wide">{service.CusAddress}</td>

                    <td className="two wide">
                    <div className="ui buttons">
                    <Modal id="modal" trigger={<Button color="yellow" ><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details customer</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.CusId)}>
                                    <Form.Field>
                                    <label>Name</label><br />
                                    <input id="name_update" type="text" placeholder="Type a name" name="name" placeholder={service.CusName} 
                                            onChange={this.handleChange} required minLength="3" maxLength="20" /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Address</label><br />
                                        <input id="address_update" placeholder="Type an address" name="address" placeholder={service.CusAddress} onChange={this.handleChange} required /><br />
                                    </Form.Field>
                                    <Button type=' '><Icon name="save" />save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                        <Button color="mini red" onClick={this.delete.bind(this, service.CusId)}><Icon name="trash" />Delete</Button>
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
                                        <label>Name</label><br />
                                        <input type="text" placeholder="Type a name" name="CusName" required 
                                                minlength="3" maxlength="20" /><br />  
                                    </Form.Field>   
                                    <Form.Field>                         
                                        <label>Address</label><br />
                                        <input placeholder="Type an address" name="CusAddress" required /><br />
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
                            <th className="ten wide">Address</th>
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
}

ReactDOM.render(
    <div><h1 className="anim">Customer Details</h1>
        
    <ListingTable /></div>,
    document.getElementById('main')
);