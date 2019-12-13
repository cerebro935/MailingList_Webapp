<?php
   header("Access-Control-Allow-Origin: *");
   $url = '';
   $user = '';
   $pass = '';
   $db = '';
   $conn = mysqli_connect($url, $user, $pass, $db);

   if(!$conn){
      echo 'Connection to server could not be established';
      die('Could not establish connection: ' . mysql_error());
   }

   $result = $conn->query("SELECT supID, name FROM Supporter");
   $numResults = mysqli_num_rows($result);
   $count = 0;
   $stack = array();
   echo('[');
   while($row = $result->fetch_assoc()){
      $myObj->id = (int)$row['supID'];
      $myObj->name = $row['name'];

      $addResult = $conn->query("SELECT postalCode, street, city, State FROM Address WHERE supID='$myObj->id'");
      $addRow = $addResult->fetch_assoc();
      $dateResult = $conn->query("SELECT date FROM LetterReceived WHERE supID='$myObj->id'");
      $dateRow = $dateResult->fetch_assoc();

      $myObj->street = $addRow['street'];
      $myObj->city = $addRow['city'];
      $myObj->state = $addRow['State'];
      $myObj->postalCode = (int)$addRow['postalCode'];
      $myObj->date = $dateRow['date'];

      echo json_encode($myObj);
      if (++$count != $numResults){echo (',');}
   }
   echo (']');
   mysqli_close($conn);

?>
