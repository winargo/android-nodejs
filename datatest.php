<?php
   include('index.php');

   if (mysqli_connect_errno($con)) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }

   //$android = isset($_POST['android']) ? mysql_real_escape_string($_POST['android']) : "";
    $android = isset($_POST['android']) ? $_POST['android'] : "";
   $result = mysqli_query($con,"SELECT * FROM connection where data='".$android."'");

   $row = mysqli_fetch_array($result);
   $data = $row['data'];

   if($data){
      echo $data;
   }
   mysqli_close($con);
?>