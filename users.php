<?php
$servername = "localhost";
$username = "root";
$password = ""; // Your MySQL root password
$dbname = "user_registration";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Encrypt password
$date_of_birth = $_POST['date_of_birth'];

// Insert data into database
$sql = "INSERT INTO users (name, email, password, date_of_birth) VALUES ('$name', '$email', '$password', '$date_of_birth')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
