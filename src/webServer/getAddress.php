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

   $result = $conn->query("SELECT city, State, street, postalCode, supID FROM Address");
   $numResults = mysqli_num_rows($result);
   $count = 0;
   $stack = array();
   echo('[');
   while($row = $result->fetch_assoc()){
      $myObj->street = $row['street'];
      $myObj->city = $row['city'];
      $myObj->state = $row['State'];
      $myObj->postalCode = $row['postalCode'];
      $myObj->id = $row['supID'];
      echo json_encode($myObj);                                                                                                                                                                                                                                                                 if (++$count != $numResults){                                                                                                                                                                                                                                                                echo (',');                                                                                                                                                                                                                                                                            }
   }

   echo (']');
   mysqli_close($conn);

?>
