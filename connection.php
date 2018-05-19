<?php
include('index.php');

// Create connection
$con = new mysqli($servername, $username, $password, $database);
// Check connection
if ($con->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}
else{
    echo 'connected';
}
?>