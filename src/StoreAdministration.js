import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

function StoreAdministration() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName,setfirstName]= useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeNumber, setStoreNumber] = useState("");
  const [storeType,setStoreType]= useState("");
  const [storeGroup, setStoreGroup] = useState("");
  const [storeStock, setStoreStock] = useState("");
  const [stockArea, setStockArea] = useState("");

  const [storeAddress2, setStoreAddress2] = useState("");
  const [storeTown, setStoreTown] = useState("");
  const [storePostCode, setStorePostcode] = useState("");
  const [storeComments, setStoreComments] = useState("");
  const [thirdParty, setThirdParty] = useState("");
  const [dontAllocate, setDontAllocate] = useState("");
  const [status, setStatus] = useState("");








  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const [storeGroups, setStoreGroups] = useState([]); 

  const [Number, setNumber] = useState([]);
  const [filterNumber, setFilterNumber] = useState(''); 

  const [storeMerchant, setStoreMerchant] = useState([]); 
  const [filterMerchandiser, setFilterMerchandiser] = useState('');
  
  const[stock, SetStock]= useState([]);
  const [filterStock, setFilterStock] = useState('');

  const[type,SetType]=useState([]);
  const [filterType, setFilterType] = useState('');

  const[range,SetRange]=useState([]);
  const [filterRange, setFilterRange] = useState('');






 
  useEffect(() => {
    const table = $('#table').DataTable({
      processing: true,
      serverSide: false,
      ajax: {
        url: 'http://localhost/react_allocation_system/store_fetch.php',
        method: 'POST',    
      },
      order: [['0', 'DESC']]
    });
  }, []);

  const handleShow = () =>{
    setShowModal(true);
    $('#table').DataTable().ajax.reload();
  }
  const handleClose = () => setShowModal(false);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleSave = () => {
  
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("storeName", storeName);
    formData.append("storeAddress", storeAddress);
    formData.append("storeNumber", storeNumber);
    formData.append("storeType", storeType);
    formData.append("storeGroup", storeGroup);
    formData.append("storeStock",storeStock);
    formData.append("stockArea",stockArea);
    formData.append("storeAddress2",storeAddress2);
    formData.append("storeTown",storeTown);
    formData.append("storePostCode",storePostCode);
    formData.append("storeComments",storeComments);
    formData.append("thirdParty",thirdParty);
    formData.append("dontAllocate",dontAllocate);
    formData.append("status",status);


    
    fetch("http://localhost/react_allocation_system/store_insert.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        $('#table').DataTable().ajax.reload();
  
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  };

  
  const handleCancel = () => {
    setStoreName("");
    setStoreAddress("");
    handleClose();
  };

  window.viewfun = function(id) {
    alert(id);
    $.ajax({
        url: 'http://localhost/react_allocation_system/Store_view.php',
        method: 'POST',
        data: {id: id},
        dataType: 'json',
        success: function(data) {
      }

    });
};
 

  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost/react_allocation_system/store_fetch_dropdown.php');
      const newData = await response.json();
      setStoreGroups(newData);
    };
    fetchData();
  },[]);
    
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost/react_allocation_system/store_number_fetch.php');
      const newData = await response.json();
      setNumber(newData);
      // console.log(newData);
    };
    fetchData();
  },[]);


  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost/react_allocation_system/store_merchandiser.php');
      const newData = await response.json();
      setStoreMerchant(newData);
      // console.log(newData);
    };
    fetchData();
  },[]);


  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost/react_allocation_system/store_stock_area.php');
      const newData = await response.json();
      SetStock(newData);
      // console.log(newData);
    };
    fetchData();
  },[]);

  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost/react_allocation_system/store_type.php');
      const newData = await response.json();
      SetType(newData);
      // console.log(newData);
    };
    fetchData();
  },[]);


  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost/react_allocation_system/stock_range.php');
      const newData = await response.json();
      SetRange(newData);
    };
    fetchData();
  },[]);



useEffect(() => {
  if (tableRef.current && dataTableRef.current === null) {
    dataTableRef.current = $(tableRef.current).DataTable({
      processing: true,
      serverSide: false,
      ajax: {
        url: `http://localhost/react_allocation_system/store_fetch.php?request=${filterValue}`,
        method: 'POST',
      }

    });
  } else if (dataTableRef.current) {
    dataTableRef.current.ajax.url(`http://localhost/react_allocation_system/store_fetch.php?request=${filterValue}`).load();
  }
  
}, [filterValue]);

const HandleChange = (event) => {
  const value = event.target.value;
  setFilterValue(value);
  setIsLoading(true);
};
  

  // useEffect(() => {
  //   if (tableRef.current && dataTableRef.current === null) {
  //     dataTableRef.current = $(tableRef.current).DataTable({
  //       processing: true,
  //       serverSide: false,
  //       ajax: {
  //         url: `http://localhost/react_allocation_system/store_data.php?request=${filterNumber}`,
  //         method: 'POST',
  //       }
  //     });
  //   } else if (dataTableRef.current) {
  //     dataTableRef.current.ajax.url(`http://localhost/react_allocation_system/store_data.php?request=${filterNumber}`).load();
  //   }
  // }, [filterNumber]);

  // const HandleNumber = (event) => {
  //   setFilterNumber(event.target.value);
  // };

  // useEffect(() => {
  //   if (tableRef.current && dataTableRef.current === null) {
  //     dataTableRef.current = $(tableRef.current).DataTable({
  //       processing: true,
  //       serverSide: false,
  //       ajax: {
  //         url: `http://localhost/react_allocation_system/store_merchandiser_data.php?request=${filterMerchandiser}`,
  //         method: 'POST',
  //       }
  
  //     });
  //   } else if (dataTableRef.current) {
  //     dataTableRef.current.ajax.url(`http://localhost/react_allocation_system/store_merchandiser_data.php?request=${filterMerchandiser}`).load();
  //   }
  // }, [filterMerchandiser]);
  
  // const HandleMerchandiser = (event) => {
  //   setFilterMerchandiser(event.target.value);
  // };


  
  useEffect(() => {
    if (tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = $(tableRef.current).DataTable({
          processing: true,
          serverSide: false,
        });
      } else {
        dataTableRef.current.destroy(); // Destroy the existing DataTable instance
        dataTableRef.current = null; // Reset the dataTableRef
      }
    }
  }, [filterNumber, filterMerchandiser, filterStock, filterRange,filterType]);

  useEffect(() => {
    if (tableRef.current && filterNumber !== '') {
      dataTableRef.current = $(tableRef.current).DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: `http://localhost/react_allocation_system/store_data.php?request=${filterNumber}`,
          method: 'POST',
        },
      });
    }
  }, [filterNumber]);

  useEffect(() => {
    if (tableRef.current && filterMerchandiser !== '') {
      dataTableRef.current = $(tableRef.current).DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: `http://localhost/react_allocation_system/store_merchandiser_data.php?request=${filterMerchandiser}`,
          method: 'POST',
        },
      });
    }
  }, [filterMerchandiser]);

  useEffect(() => {
    if (tableRef.current && filterStock !== '') {
      dataTableRef.current = $(tableRef.current).DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: `http://localhost/react_allocation_system/store_stock_area_data.php?request=${filterStock}`,
          method: 'POST',
        },
      });
    }
  }, [filterStock]);

  useEffect(() => {
    if (tableRef.current && dataTableRef.current === null) {
      dataTableRef.current = $(tableRef.current).DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: `http://localhost/react_allocation_system/stock_range_data.php?request=${filterRange}`,
          method: 'POST',
        },
      });
    }
  },[filterRange]);

  useEffect(() => {
    if (tableRef.current && dataTableRef.current === null) {
      dataTableRef.current = $(tableRef.current).DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: `http://localhost/react_allocation_system/store_type_data.php?request=${filterType}`,
          method: 'POST',
        },
      });
    } 
  },[filterType]);

  const HandleNumber = (event) => {
    const value = event.target.value;
    setFilterNumber(value);
    setFilterMerchandiser('');
    setFilterStock('');
    setFilterType('');
    setFilterRange('');
  };

  const HandleMerchandiser = (event) => {
    const value = event.target.value;
    setFilterMerchandiser(value);
    setFilterRange('');
    setFilterNumber('');
    setFilterStock('');
    setFilterType('');
  };

  const HandleStock = (event) => {
    const value = event.target.value;
    setFilterStock(value);
    setFilterNumber('');
    setFilterMerchandiser('');
    setFilterType('');
    setFilterRange('');
  };

  const HandleRange = (event) => {
    const value = event.target.value;
    setFilterRange(value);
    setFilterNumber('');
    setFilterMerchandiser('');
    setFilterStock('');
    setFilterType('');
  };

  const HandleType = (event) => {
    const value = event.target.value;
    setFilterType(value);
    setFilterNumber('');
    setFilterMerchandiser('');
    setFilterStock('');
    setFilterRange('');
  };









  

  // useEffect(() => {
  //   if (tableRef.current && dataTableRef.current === null) {
  //     dataTableRef.current = $(tableRef.current).DataTable({
  //       processing: true,
  //       serverSide: false,
  //       ajax: {
  //         url: `http://localhost/react_allocation_system/store_stock_area_data.php?request=${filterStock}`,
  //         method: 'POST',
  //       }
  
  //     });
  //   } else if (dataTableRef.current) {
  //     dataTableRef.current.ajax.url(`http://localhost/react_allocation_system/store_stock_area_data.php?request=${filterStock}`).load();
  //   }
  // }, [filterStock]);
  
  // const HandleStock = (event) => {
  //   setFilterStock(event.target.value);
  // };


  // useEffect(() => {
  //   if (tableRef.current && dataTableRef.current === null) {
  //     dataTableRef.current = $(tableRef.current).DataTable({
  //       processing: true,
  //       serverSide: false,
  //       ajax: {
  //         url: `http://localhost/react_allocation_system/store_type_data.php?request=${filterType}`,
  //         method: 'POST',
  //       }
  //     });
  //   } else if (dataTableRef.current) {
  //     dataTableRef.current.ajax.url(`http://localhost/react_allocation_system/store_type_data.php?request=${filterType}`).load();
  //   }
  // }, [filterType]);

  // const HandleType = (event) => {
  //   setFilterType(event.target.value);
  // };


  // useEffect(() => {
  //   if (tableRef.current && dataTableRef.current === null) {
  //     dataTableRef.current = $(tableRef.current).DataTable({
  //       processing: true,
  //       serverSide: false,
  //       ajax: {
  //         url: `http://localhost/react_allocation_system/stock_range_data.php?request=${filterRange}`,
  //         method: 'POST',
  //       }
  //     });
  //   } else if (dataTableRef.current) {
  //     dataTableRef.current.ajax.url(`http://localhost/react_allocation_system/stock_range_data.php?request=${filterRange}`).load();
  //   }
  // }, [filterRange]);

  // const HandleRange = (event) => {
  //   setFilterRange(event.target.value);
  // };


  

  

  
  


  

  return (
    <div className="form">
      <h1>Stores Information</h1>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{step === 1 ? "Step 1" : "Step 2"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <form id="sform">
                <div className='form-group row'>
                <label htmlFor="first-name" className='col-sm-4 col-form-label'><b>Merchandiser:</b></label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter store owner name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
               </div>

               <div className='form-group row'>
              <label htmlFor="store-name" className='col-sm-4 col-form-label'><b>Store Name:</b></label>
              <input
                type="text"
                id="store-name"
                placeholder="Enter store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
                </div>

                <div className='form-group row'>
              <label htmlFor="store-address" className='col-sm-4 col-form-label'><b>Store Address 1:</b></label>
              <input
                type="text"
                placeholder="Enter store address "
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
              />
              </div>

              <div className='form-group row'>
                <label htmlFor="first-name" className='col-sm-4 col-form-label'><b>Store Address 2:</b></label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter store address"
                value={storeAddress2}
                onChange={(e) => setStoreAddress2(e.target.value)}
              />
               </div>

               <div className='form-group row'>
                <label htmlFor="first-name" className='col-sm-4 col-form-label'><b>Store Town:</b></label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter store town"
                value={storeTown}
                onChange={(e) => setStoreTown(e.target.value)}
              />
               </div>

               <div className='form-group row'>
                <label htmlFor="first-name" className='col-sm-4 col-form-label'><b>Store Post code:</b></label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter store area PIN Code"
                value={storePostCode}
                onChange={(e) => setStorePostcode(e.target.value)}
              />
               </div>

               <div className='form-group row'>
              <label htmlFor="snumber" className='col-sm-4 col-form-label' ><b>Store Region:</b></label>
              <input
                type="text"
                placeholder="Enter stock area"
                value={stockArea}
                onChange={(e) => setStockArea(e.target.value)}
              />
             </div>

               <div className='form-group row'>
                <label htmlFor="first-name" className='col-sm-4 col-form-label'><b>Comments:</b></label>
              <input
                type="text"
                placeholder="Enter comments"
                value={storeComments}
                onChange={(e) => setStoreComments(e.target.value)}
              />
               </div>
            </form>
          )}
          {step === 2 && (
            <form id='sform2'>
                <div className='form-group row'>
              <label htmlFor="store-phone" className='col-sm-4 col-form-label'><b>Store Group:</b></label>
              <input type="text" value={storeGroup} onChange={(e) => setStoreGroup(e.target.value)}  placeholder="Enter store group" />
                </div>

                <div className='form-group row'>
              <label htmlFor="store-email" className='col-sm-4 col-form-label'><b>Store Type:</b></label>
              <input type="text" id="df" placeholder="Enter store type" onChange={(e) => setStoreType(e.target.value)} value={storeType} />
                </div>

              <div className='form-group row'>
              <label htmlFor="snumber" className='col-sm-4 col-form-label' ><b>Store Number:</b></label>
              <input
                type="text"
                id="snumber"
                placeholder="Enter store license number"
                value={storeNumber}
                onChange={(e) => setStoreNumber(e.target.value)}
              />
             </div>
         
             <div className='form-group row'>
              <label htmlFor="snumber" className='col-sm-4 col-form-label' ><b>Availabel Range:</b></label>
              <input
                type="text"
                placeholder="Enter stock Range"
                value={storeStock}
                onChange={(e) => setStoreStock(e.target.value)}
              />
             </div>


             {/* <div className='form-group row'>
              <label htmlFor="snumber" className='col-sm-4 col-form-label' ><b>Stock Area:</b></label>
              <input
                type="text"
                placeholder="Enter stock area"
                value={stockArea}
                onChange={(e) => setStockArea(e.target.value)}
              />
             </div> */}
            
             <div class="form-group row">
              <label for="snumber" class="col-sm-4 col-form-label"><b>3rd Party Managed:</b></label>
              <div className='col-sm-8'>
                <label class="col-sm-4 col-form-label">
                  <input type="radio" checked={thirdParty === "YES"} value="YES" onChange={(e) => setThirdParty(e.target.value)} name="option"/> YES
                </label>
                <label class="col-sm-2 col-form-label">
                  <input type="radio" checked={thirdParty === "NO"} name="option"value="NO" onChange={(e) => setThirdParty(e.target.value)}/> NO
                </label>
                </div>
            </div>

            <div class="form-group row">
  <label for="snumber" class="col-sm-4 col-form-label"><b>Don't Allocate:</b></label>
  <div className="col-sm-8">
    <label class="col-sm-4 col-form-label">
      <input
        type="radio"
        value="YES"
        checked={dontAllocate === "YES"}
        onChange={(e) => setDontAllocate(e.target.value)}
        name="options"
      /> YES
    </label>
    <label class="col-sm-2 col-form-label">
      <input
        type="radio"
        value="NO"
        checked={dontAllocate === "NO"}
        onChange={(e) => setDontAllocate(e.target.value)}
        name="options"
      /> NO
    </label>
  </div>
</div>


            <div className="form-group row">
  <label htmlFor="snumber" className="col-md-4 col-form-label">
    <b>Status:</b>
  </label>
  <div className="col-sm-8">
    <select
      className="form-control col-md-9"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">Select Your Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
</div>





            </form>


          )}
        </Modal.Body>
        <Modal.Footer>
          {step === 2 && (
            <Button variant="warning" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          {step === 1 && (
            <Button variant="primary" onClick={handleNextStep} >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button variant="primary" onClick={handleSave}>
              ADD
            </Button>
        
          )}
        </Modal.Footer>
      </Modal>
      <div className='col-md-6'>
      <Button variant="dark" onClick={handleShow}>
          Add New Stores
        </Button>
        </div>
        <br/>
        
        <div className='row '>
        <div className='card col-md-2 bg-light' style={{boxShadow: "2px 3px 6px rgba(0,0,0,0.7)", height:"500px"}}>
          <div className='card-body'>
  <h3 style={{display:"flex",justifyContent:"center", marginTop:"50px"}}>Filter</h3>

<select name="fetchval"  id="fetchval" value={filterValue}  onChange={HandleChange} style ={{marginLeft:"15px", marginTop:"10px",  width:"180px"}}>
<option value="">Select Store By Group</option>
<option value="all">All</option>

 {storeGroups.map((group) =>(
  <option value={group.store_group} key={group.id} selected >{group.store_group}</option>
  
        ))}
       
      </select>
<br/>
<br/>
      <select onChange={HandleType} value={filterType} style={{marginLeft:"15px",width:"180px"}}>
        <option value="">Select Store Type</option>
        {type.map(stype =>(
  <option value={stype.store_type} key={stype.id} selected >{stype.store_type}</option>
  
        ))}
      </select>
      <br/>
      <br/>

      <select onChange={HandleNumber} value={filterNumber} style={{marginLeft:"15px", width:"180px"}}>
        <option value="">Select Store Number</option>
        <option value="">All</option>
        {Number.map((snumber) =>(
  <option value={snumber.store_number} key={snumber.id} selected >{snumber.store_number}</option>
        ))}
      </select>  
<br/>
<br/>

      <select onChange={HandleStock}  style={{marginLeft:"15px",marginBottom:"0px", width:"180px"}}>
        <option value="">Select Stock Area</option>
        {stock.map(sstock =>(
  <option value={sstock.store_stock_area} key={sstock.id}>{sstock.store_stock_area}</option>
        ))}
      </select>  
      <br/>
      <br/>
      <select onChange={HandleRange} style={{marginLeft:"15px",marginBottom:"0px", width:"180px"}}>
        <option value="">Select Stock Range</option>
        {range.map(srange =>(
  <option value={srange.stock_range} key={srange.id}>{srange.stock_range}</option>
        ))}
      </select>
<br/>
<br/>

      <select onChange={HandleMerchandiser} value={filterMerchandiser} style={{marginLeft:"15px",marginBottom:"0px", width:"180px"}}>
        <option value="">Select Merchandiser</option>
        <option value="">All</option>

        {storeMerchant.map(mname =>(
  <option value={mname.store_merchandiser} key={mname.id}>{mname.store_merchandiser}</option>
        ))}
      </select>
      <br/>
      <br/>
</div>
      </div>

      <div className='col-md-1' style={{margin:"0px 0px 0px -100px"}}></div>
      <div className='card col-md-9' style={{boxShadow: "2px 3px 6px rgba(0,0,0,0.7)"}}>
      <div className='card-body'>
      <table class="table"  id="table" ref={tableRef} style={{height:"100px"}}>
<thead>
  <tr>
    <th style={{width:"50px"}}>S No.</th>
    <th>Shop Owner</th>
    <th>Store Name</th>
    <th>Store Group</th>
    <th>Store Type</th>
    <th>Stock Range</th>
    <th>Store Number</th>
    <th>Store Stock Area</th>
    <th>Store Status</th>
    <th style={{width:"120px"}}>Details</th>
  </tr>
</thead>
<tbody>
</tbody>
</table>
</div>
</div>
</div>
    </div>
  );
  
}
export default StoreAdministration;
