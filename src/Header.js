import React from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from 'react-router-dom';
function Header(){

  const naviget = useNavigate();
    function logoutSubmit(){
        localStorage.setItem("login", "");
        localStorage.setItem("loginStatus", "Logged out successfully!")
        naviget("/");
    }
    return(
        <div>
          
           <nav class="navbar navbar-expand-lg navbar-light bg-dark" >
  <a class="navbar-brand" href="#" style={{color: "white", padding:"20px"}}>Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav text-white mr-auto">
      <li class="nav-item active">
        <Link to ="/Dashboard" class="nav-link"  style={{color: "white",textDecoration:"none"}}>Home</Link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" style={{color: "white"}}>Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" style={{color: "white"}}>Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" style={{color: "white"}}>Disabled</a>
      </li>
    </ul>
    
    <button class="btn btn-outline-danger my-2 my-sm-0" onClick={logoutSubmit} style={{marginLeft:"1200px"}}>Logout</button>

    <button class="btn btn-outline-primary my-2 my-sm-0"  style={{marginLeft:"-190px"}}>User Admin</button>
  </div>
</nav>
</div>
    );
}
export default Header;