<?php

if(empty($_SESSION['user']['authenticated'])) {
	require __DIR__."/../ui/login/loginform.php";
} else {
	require __DIR__."/../ui/nav/main.php";
	require __DIR__."/../ui/tabs/main.php";
}

?>