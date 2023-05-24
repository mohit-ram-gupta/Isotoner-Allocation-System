import { useNavigate } from 'react-router-dom';
 import './Style.css';
import { Link } from 'react-router-dom';

function Dashboard(){
    return(
        <div className="form">
            <h3>Dashboard Page</h3>

            <div class="row" style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card bg-light">
      <div class="card-body">
        <div class="box text-center">
           <button style={{border:"none"}}><Link to="/Sales" class="bg-light text-black" style={{textDecoration:"none"}} >Sales Dashboard</Link></button> 
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card bg-light">
      <div class="card-body">
        <div class="box text-center">
          <button style={{border:"none"}}><Link to="/StockDashboard" class="bg-light text-black" style={{textDecoration:"none"}}>Stock Dashboard</Link></button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card bg-warning">
      <div class="card-body">
        <div class="box text-center">
          <button class="bg-warning text-black" style={{border:"none"}}><Link to="/StoreAdministration"  class="text-black" style={{textDecoration:"none"}}>Store Administration</Link></button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>


  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card bg-warning">
      <div class="card-body">
        <div class="box text-center">
          <button class="bg-warning text-black" style={{border:"none"}}><Link to="/ProductAdministration" class="text-black" style={{textDecoration:"none"}}>Product  Administration</Link></button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>
</div>

<br></br>

<div class="row" style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card" style={{backgroundColor:"pink"}}>
      <div class="card-body">
        <div class="box text-center">
          <button class="text-black" style={{backgroundColor:"pink",  border:"none"}}><Link to="/SalesImport" class="text-black" style={{textDecoration:"none"}}> Sales Import</Link></button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card" style={{backgroundColor:"pink"}}>
      <div class="card-body">
        <div class="box text-center">
          <button class="text-black" style={{backgroundColor:"pink",  border:"none"}}  >Depot Stock</button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-8 col-lg-2 col-xlg-2">
    <div class="card" style={{backgroundColor:"pink"}}>
      <div class="card-body">
        <div class="box text-center">
          <button class="text-black" style={{backgroundColor:"pink",  border:"none"}}>Allocate Stock</button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>


  <div class="col-md-6 col-lg-2 col-xlg-2">
    <div class="card" style={{backgroundColor:"pink"}}>
      <div class="card-body">
        <div class="box text-center">
          <button class=" text-black" style={{backgroundColor:"pink", border:"none"}}>Allocation Tracker</button>
          <h6 class="text-white"></h6>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    );
}

export default Dashboard;


