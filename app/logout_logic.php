<?php


if(isset($_POST["logout-btn"])) {

		session_unset();
		session_destroy();
		//header("Location: ".$_SERVER['PHP_SELF']);
}


?>
