<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$id = isset($_POST['id']) ? $_POST['id'] : null;

if ($id === false) {
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

$conn = mysqli_connect("localhost", "root", "", "allocation_system");

$query = "SELECT * FROM store_lists WHERE id = '$id'";
$result = mysqli_query($conn, $query);

if ($result) {
    $results = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($results);
} else {
    echo json_encode(['error' => 'Error retrieving data from the database']);
}

mysqli_close($conn);
?>