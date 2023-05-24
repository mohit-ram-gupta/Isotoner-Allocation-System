<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");

    $conn = mysqli_connect("localhost", "root", "", "allocation_system");

    
    $query = "SELECT * FROM store_group";
    $result = mysqli_query($conn, $query);
    $results = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $total_data = mysqli_num_rows($result);

    $total_filtered = $total_data;
    $data = array();
    $no ='';

    foreach ($results as $val) {
        $no++;
        $row = array();
        //$row[] = $val['id'];
        $row[]= $no;
        $row[] = $val['store_name'];
        $row[] = '<button class="btn btn-warning" onclick="viewfun('.$val['id'].')">View Details...</button>';


        $data[] = $row;
    }

    $output = array(
        'recordsTotal' => $total_data,
        'recordsFiltered' => $total_filtered,
        'data' => $data
    );

    
    echo json_encode($output);

    mysqli_close($conn);

?>
