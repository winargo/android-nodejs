<?php
$servername   = "localhost";
$database = "cash";
$username = "root";
$password = "";

// Create connection
$con = new mysqli($servername, $username, $password, $database);
// Check connection
if ($con->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}
?>