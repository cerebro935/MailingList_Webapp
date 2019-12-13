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

   $options = $_GET['var'];
   $result = $conn->query("SELECT MAX(supID) AS supID FROM Supporter");
   $row = $result->fetch_assoc();
   $id = $row['supID'];
   if(!empty($id)){
    $id = $id + 1;
   }
   else{
    $id = 1;
   }

   if(!empty($options)){
      $conn->query("INSERT INTO Supporter(supID, name) VALUES ('$id','$options')");
      echo ($id);
   }
   else{
      echo nl2br("Please enter an argument in the URL. Example: ...php?var=... \r\n");
   }

   mysqli_close($conn);
?>
