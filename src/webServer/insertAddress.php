<?php
   $url = '';
   $user = '';
   $pass = '';
   $db = '';
   $conn = mysqli_connect($url, $user, $pass, $db);

   if(!$conn){
      echo 'Connection to server could not be established';
      die('Could not establish connection: ' . mysql_error());
   }

   echo nl2br("Connected successfully \n");

   $street = $_GET['var'];
   $city = $_GET['var2'];
   $state = $_GET['var3'];
   $postal = $_GET['var4'];
   $id = $_GET['var5'];

   if(!empty($id) && !empty($street) && !empty($city) && !empty($state) && !empty($postal) && !empty($id)){
      $conn->query("INSERT INTO Address(supID, street, city, state, postalCode) VALUES ('$id', '$street', '$city', '$state', '$postal')");
      echo nl2br("Insert successful \n");
   }
   else{
      echo nl2br("Please enter an argument in the URL. Example: ...php?var=... \r\n");
   }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   mysqli_close($conn);                                                                                                                                                                                                                                                                   ?>
?>
