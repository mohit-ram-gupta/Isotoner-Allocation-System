
import React ,{ Component } from 'react';
import axios from 'axios';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import Swal from 'sweetalert2';
 import 'bootstrap/dist/css/bootstrap.css';
 import 'bootstrap/dist/js/bootstrap.js';


 class App extends Component {


  constructor(props){
    super(props);
    this.state= {
      site_url:'',
      error:'',
      btnLoading:'',
      first_name:'',
      last_name:'',
      phone:'',
      data: [],
      address:'',
      email:''
    }
    
    this.onChange = this.onChange.bind(this);
  }

    componentWillMount() {
      this.setState({
        site_url: window['site_url'],
      });
    }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick = () => {
    window.insertfun();
  }
  componentDidMount() {
    $('#table').DataTable({
      processing: true,
      serverSide: false,
      ajax: {
        url: this.state.site_url + '/welcome/fetchData',
        method: 'POST'
      }
    });

    window.deletefun = function(id) {
      //alert(id);
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete your records!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowEnterKey: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url:'index.php/welcome/deleteData',
            method:"POST",
            data:{id:id},
            success:function(data)
            {
              Swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              );
              $('#table').DataTable().ajax.reload();
            },
            error:function()
            {
              Swal.fire(
                'Error!',
                'An error occurred while deleting the file.',
                'error'
              );
            }
          });
        }
      });
    }

    window.editfun = function(id) {
      $.ajax({
        url: 'index.php/welcome/getData',
        method: 'POST',
        data: {id: id},
        dataType: 'json',
        success: function(data) {
          console.log(data);
          Swal.fire({
            title: 'Edit Employee Data<hr>',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            allowEnterKey: false,
            allowEscapeKey: false,
            html:
            '<form>' +
            '<div class="container">'+
            '<div class="form-group row">' +
            '<label class="col-md-3 col-form-label">First Name:</label>' +
            '<div class="col-md-9">' +
            '<input type="text" class="form-control" id="first_name" name="name" value="' + data.first_name + '">' +
            '</div>' +
            '</div>' +
            '<div class="form-group row">' +
            '<label class="col-md-3 col-form-label" for="last_name">Last Name:</label>' +
            '<div class="col-md-9">' +
            '<input type="text" class="form-control" id="last_name" name="email" value="' + data.last_name + '">' +
            '</div>' +
            '</div>' +
            '<div class="form-group row">' +
            '<label class="col-md-3 col-form-label" for="phone">Phone:</label>' +
            '<div class="col-md-9">' +
            '<input type="tel" class="form-control" id="phone" name="phone" value="' + data.phone + '">' +
            '</div>' +
            '</div>' +
            '<div class="form-group row">' +
            '<label class="col-md-3 col-form-label" for="email">Address:</label>' +
            '<div class="col-md-9">' +
            '<input type="text" class="form-control" id="address" name="address" value="' + data.address + '">' +
            '</div>' +
            '</div>' +
            '<div class="form-group row">' +
            '<label class="col-md-3 col-form-label" for="email">E-mail:</label>' +
            '<div class="col-md-9">' +
            '<input type="email" class="form-control" id="email" name="email" value="' + data.email + '">' +
            '</div>' +
            '</div>' +
            '</div>'+
            '</form>',

            confirmButtonText: 'Update',
            confirmButtonColor: '#3085d6',
            preConfirm: () => {
              const first_name = Swal.getPopup().querySelector('#first_name').value;
              const last_name = Swal.getPopup().querySelector('#last_name').value;
              const phone = Swal.getPopup().querySelector('#phone').value;
              const address = Swal.getPopup().querySelector('#address').value;
              const email = Swal.getPopup().querySelector('#email').value;
              return { first_name: first_name, last_name: last_name, phone: phone, address:address, email:email };
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              // Send an AJAX request to the server to update the data
              $.ajax({
                url: 'index.php/welcome/updateData',
                method: 'POST',
                data: {id: id, first_name: result.value.first_name, email: result.value.email, last_name: result.value.last_name, phone: result.value.phone, address: result.value.address},
                success: function(data) {
                  Swal.fire(
                    'Updated!',
                    'Your data has been updated.',
                    'success'
                  );
                  $('#table').DataTable().ajax.reload();
                },
                error: function() {
                  Swal.fire(
                    'Error!',
                    'An error occurred while updating the data.',
                    'error'
                  );
                }
              });
            }
          });
        },
        error: function() {
          Swal.fire(
            'Error!',
            'An error occurred while getting the data.',
            'error'
          );
        }
      });
    }; 

    window.insertfun = function() {
  Swal.fire({
    title: 'Add Employee Data<hr>',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowEnterKey: false,
    allowEscapeKey: false,
    html:
    '<form>' +
    '<div class="container">'+
    '<div class="form-group row">' +
    '<label class="col-md-3 col-form-label">First Name:</label>' +
    '<div class="col-md-9">' +
    '<input type="text" class="form-control" id="first_name" name="name" value="">' +
    '<span id="first_name_error" class="text-danger"></span>'+
    '</div>' +
    '</div>' +
    '<div class="form-group row">' +
    '<label class="col-md-3 col-form-label" for="last_name">Last Name:</label>' +
    '<div class="col-md-9">' +
    '<input type="text" class="form-control" id="last_name" name="email" value="">' +
    '</div>' +
    '</div>' +
    '<div class="form-group row">' +
    '<label class="col-md-3 col-form-label" for="phone">Phone:</label>' +
    '<div class="col-md-9">' +
    '<input type="tel" class="form-control" id="phone" name="phone" value="">' +
    '</div>' +
    '</div>' +
    '<div class="form-group row">' +
    '<label class="col-md-3 col-form-label" for="email">Address:</label>' +
    '<div class="col-md-9">' +
    '<input type="text" class="form-control" id="address" name="address" value="">' +
    '</div>' +
    '</div>' +
    '<div class="form-group row">' +
    '<label class="col-md-3 col-form-label" for="email">E-mail:</label>' +
    '<div class="col-md-9">' +
    '<input type="email" class="form-control" id="email" name="email" value="">' +
    '</div>' +
    '</div>' +
    '</div>'+
    '</form>',

    confirmButtonText: 'Add',
    confirmButtonColor: '#3085d6',
    preConfirm: () => {
      const first_name_input = Swal.getPopup().querySelector('#first_name');
      const first_name = first_name_input.value.trim();

      const last_name_input = Swal.getPopup().querySelector('#last_name');
      const last_name = last_name_input.value.trim();

      const phone_input = Swal.getPopup().querySelector('#phone');
      const phone = phone_input.value.trim();

      const address_input = Swal.getPopup().querySelector('#address');
      const address = address_input.value.trim();

      const email_input = Swal.getPopup().querySelector('#email');
      const email = email_input.value.trim();

    


      if (first_name === '') {
        first_name_input.classList.add('is-invalid');
        Swal.showValidationMessage('<strong style="color: red;">Please enter a first name.</strong>');
        return false;
      } else {
        first_name_input.classList.remove('is-invalid');
      } 
      

      if (last_name === '') {
        last_name_input.classList.add('is-invalid');
        Swal.showValidationMessage('<strong style="color: red;">Please enter a last name.</strong>');
        return false;
      } else {
        last_name_input.classList.remove('is-invalid');
      } 

      if (phone === '') {
        phone_input.classList.add('is-invalid');
        Swal.showValidationMessage('<strong style="color: red;">Please enter a phone number.</strong>');
        return false;
      } else {
        phone_input.classList.remove('is-invalid');
      } 

      
      if (address === '') {
        address_input.classList.add('is-invalid');
        Swal.showValidationMessage('<strong style="color: red;">Please enter a address.</strong>');
        return false;
      } else {
        address_input.classList.remove('is-invalid');
      } 

      if (email === '') {
        email_input.classList.add('is-invalid');
        Swal.showValidationMessage('<strong style="color: red;">Please enter a email.</strong>');
        return false;
      } else {
        email_input.classList.remove('is-invalid');
      } 
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage('<strong style="color: red;">Please enter a valid email address.</strong>');
        return false;
      }
    
    
      return { 
        first_name: first_name, 
        last_name: last_name, 
        phone: phone, 
        address:address, 
        email:email 
      };
    },
    
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      // Send an AJAX request to the server to insert the data
      $.ajax({
        url: 'index.php/welcome/submit',
        method: 'POST',
        data: {first_name: result.value.first_name, email: result.value.email, last_name: result.value.last_name, phone: result.value.phone, address: result.value.address},
        success: function(data) {
          Swal.fire(
            'Inserted!',
            'Your data has been added.',
            'success'
          );
          $('#table').DataTable().ajax.reload();
                },
                error: function() {
                  Swal.fire(
                    'Error!',
                    'An error occurred while inserting the data.',
                    'error'
                  );
                }
              });
            }
          });
    }; 


   }
  
  render(){
    const inputStyle = {
      padding: "10px",
      border: "1px solid black",
      borderRadius: "50px",
      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
      fontSize: "20px",
      marginBottom: "10px",
      color: "black",
    };
    
  return (
    <div className="App">
          <h1>Registration Form</h1>
          <table>
             <button
               disabled={this.state.btnLoading}
              onClick={this.handleClick}
              type="submit" style={{backgroundColor: 'blue', padding:"9px", height:"45px", width:"170px", borderRadius: "30px", fontSize: "20px", color: 'white', padding: '10px'}}>{this.state.btnLoading ? 'Loading.....' : 'INSERT'}
            </button> 
          </table>

          <h1>Employees</h1>
        <table class="display"  id="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>E-mail</th>
              <th>Created At</th>
               <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

  </div>
  );
}
  }

export default App;
