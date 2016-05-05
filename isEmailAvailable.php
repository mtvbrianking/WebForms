<?php

$host       =	'localhost';
$user       = 	'root';
$password   = 	'';
$database   = 	'tut_form';
$table		=	'user';

try {
    $dbConn = new \PDO("mysql:host=$host;dbname=$database", $user, $password);
	$dbConn->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
}catch(PDOException $err) {
    echo $err->getMessage();
}

$stmt = $dbConn->prepare ( sprintf ( "
		SELECT email FROM %s WHERE email = :email", 
		$table ) );

if(!empty($_POST['email'])){
	
	$email = $_POST['email'];

	$stmt->execute ( compact ( 'email' ) );
	$existsUser = $stmt->fetch ( \PDO::FETCH_ASSOC );
			
	if($existsUser['email'] == $email) {
		echo 'false';
	} else {
		echo 'true';
	}

}else{
	echo 'Email address not received';
}