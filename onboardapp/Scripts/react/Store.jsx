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
            url: '/Store/List',
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
            url: "/Store/Update",
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
                url: "/Store/Delete/" + ID,
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
                    <td className="two wide">{service.StoreId}</td>
                    <td className="six wide">{service.StoreName}</td>
                    <td className="ten wide">{service.StoreAddress}</td>

                    <td className="two wide">
                    <div className="ui buttons">
                    <Modal id="modal" trigger={<Button color="yellow" ><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details customer</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.StoreId)}>
                                    <Form.Field>
                                    <label>Name</label><br />
                                    <input id="name_update" type="text" placeholder="Type a name" name="name" placeholder={service.StoreId} 
                                            onChange={this.handleChange} required minLength="3" maxLength="20" /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Address</label><br />
                                        <input id="address_update" placeholder="Type an address" name="address" placeholder={service.StoreAddress} onChange={this.handleChange} required /><br />
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
}``

ReactDOM.render(
    <div><h1 className="anim">Store Details</h1><ListingTable /></div>,
    document.getElementById('main')
);