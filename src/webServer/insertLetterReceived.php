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

   $id = $_GET['var'];

   $result = $conn->query("SELECT NOW() AS ts");
   $row = $result->fetch_assoc();
   $date = $row['ts'];
   echo ($date);

   if(!empty($id)){
      $conn->query("INSERT INTO LetterReceived(date, supID) VALUES ('$date', '$id')");
      echo nl2br("Insert successful \n");
   }
   else{
      echo nl2br("\n No ID found\n");
   }

   mysqli_close($conn);
?>
