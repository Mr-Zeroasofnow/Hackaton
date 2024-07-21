<?php
session_start();
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['gmail'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Prepared statement to select user
    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $name, $hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;
            header("Location: chatbot.html");
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with this email address.";
    }

    $stmt->close();
    $conn->close();
}
?>