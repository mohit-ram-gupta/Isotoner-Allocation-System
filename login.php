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
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        $email = $dData['email'];
        $password = md5($dData['password']);
        $result = "";

        if($email != "" and $password != ""){
            $sql = "SELECT * FROM allocation_system_login WHERE email='$email';";
            $res = mysqli_query($conn, $sql);

            if(mysqli_num_rows($res) != 0){
                $row = mysqli_fetch_array($res);
                if($password != $row['password']){
                    $result = "Invalid password!";
                }
                else{
                    $user_data = array(
                        'id' => $row['id'],
                        'email' => $row['email'],
                        'first_name' => $row['first_name'],
                        'last_name'=>$row['last_name'],
                        'phone number'=>$row['phone number'],
                        'address'=>$row['address'],
                        'username'=>$row['username'],
                        'dob'=>$row['dob']
                    );
    
                    $_SESSION['user'] = $user_data;
                    $_SESSION['loggedin'] = true;
                $result = "Loggedin successfully! Redirecting...";
                }
            }
            else{
                $result = "Invalid email!";
            }
        }
        else{
            $result = "";
        }

        $conn -> close();
        $response[] = array("result" => $result);
        echo json_encode($response);
    }

?>