<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = mysqli_connect("localhost", "root", "", "allocation_system");

$query = "SELECT DISTINCT  store_merchandiser FROM store_lists";
$result = mysqli_query($conn, $query);
$results = mysqli_fetch_all($result, MYSQLI_ASSOC);
//print_r($results); die;
$total_data = mysqli_num_rows($result);
$total_filtered = $total_data;

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($results);

?>
