<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    session_start();
    $conn = new mysqli("localhost", "root", "", "allocation_system");
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
  
    else{
        //print_r($_POST); die;
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        $merchandiser=$_POST['firstName'];

        $type=$_POST['storeType'];

        $group=$_POST['storeGroup'];

        $stock=$_POST['storeStock'];

        $stockArea=$_POST['stockArea'];

        $storeAddress2=$_POST['storeAddress2'];

        $storeTown=$_POST['storeTown'];

        $storePostCode=$_POST['storePostCode'];

        $storePartyManaged=$_POST['thirdParty'];

        $dontAllocate=$_POST['dontAllocate'];

        $comments=$_POST['storeComments'];

        $status=$_POST['status'];

         //print_r($type); die;
        $storeName= $_POST['storeName'];

        $storeNumber= $_POST['storeNumber'];

        $storeAddress= $_POST['storeAddress'];

    
            $sql = "INSERT INTO store_lists (
                store_merchandiser,store_name,store_number,store_address,store_type,store_group,stock_range
            ,store_stock_area,store_address2,store_town,store_post_code,status,store_party_managed,dont_allocate,comments) VALUES ('$merchandiser','
            
            $storeName','$storeNumber','$storeAddress','$type','$group','$stock','$stockArea','$storeAddress2',' $storeTown','$storePostCode','
            $storePartyManaged','$dontAllocate','$comments','$status')"; 

          
           if( mysqli_query($conn, $sql)){
            echo "Data saved successfully";
           }else{
            echo "error";
           }

        $conn->close();
    }

?>