<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = mysqli_connect("localhost", "root", "", "allocation_system");
//print_r($_REQUEST); die;
$merchant = isset($_REQUEST['request']) ? $_REQUEST['request'] : '';


$query = "SELECT  * FROM `store_lists`";

if ($merchant) {
    $query .= " WHERE `store_merchandiser` = '$merchant'";
} 

$result = mysqli_query($conn, $query);
$results = mysqli_fetch_all($result, MYSQLI_ASSOC);

$total_data = mysqli_num_rows($result);
$total_filtered = $total_data;

$data = array();
$no = 0;

foreach ($results as $val) {
    $row = array();
    $no++;
    $rowStyle = ($val['status'] == 'inactive') ? 'background-color: grey; color: white;' : '';

    $row[] = '<span style="' . $rowStyle . '">' . $no . '</span>';
    $row[] = '<span style="' . $rowStyle . '">' . $val['store_merchandiser'] . '</span>';

    $row[] = '<span style="' . $rowStyle . '">' . $val['store_name'] . '</span>';
    $row[] = '<span style="' . $rowStyle . '">' . $val['store_group'] . '</span>';
    $row[] = '<span style="' . $rowStyle . '">' . $val['store_type'] . '</span>';
    $row[] = '<span style="' . $rowStyle . '">' . $val['stock_range'] . '</span>';
    $row[] = '<span style="' . $rowStyle . '">' . $val['store_number'] . '</span>';
    $row[] = '<span style="' . $rowStyle . '">' . $val['store_stock_area'] . '</span>';

    $statusCell = '<span class="status" style="' . $rowStyle . '">' . $val['status'] . '</span>';
    $buttonCell = '<button class="btn btn-warning" onclick="viewfun(' . $val['id'] . ')">View Details...</button>';

    $row[] = $statusCell;
    $row[] = $buttonCell;

    $rowStyleAttribute = 'style="' . $rowStyle . '"';
    $row[] = $rowStyleAttribute;

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
