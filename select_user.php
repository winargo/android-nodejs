<?php
   include('index.php');

   if (mysqli_connect_errno($con)) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }

   $username = isset($_POST['username']) ? mysql_real_escape_string($_POST['username']) : "";
   $password = isset($_POST['password']) ? mysql_real_escape_string($_POST['password']) : "";
   $result = mysqli_query($con,"SELECT * FROM user where username='$username' 
      and Password='$password'");

   $row = mysqli_fetch_array($result);
   $data = $row[0];

   if($data){
      echo $data;
   }
   mysqli_close($con);
?>