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

$stmt = $dbConn->prepare ( sprintf ( '
		INSERT INTO %s (username, email, password)
		VALUES (:username, :email, :password)', $table ) );

if(empty($_POST)){
	die('No data received');
}

$stmt->bindParam ( ':username', $_POST['username'] );
$stmt->bindParam ( ':email', $_POST['email']);
$stmt->bindParam ( ':password', sha1($_POST['password']) );

$result = null;

try {
	$result = $stmt->execute ();
} catch ( \PDOException $e ) {
	$response['exception'] = $e->getMessage();
}

$response = array();
		
if(!$result) {
	$response['error'] = 'Registration failed';
}else{
	$response['status'] = 'Registration successful';

}

echo json_encode($response);