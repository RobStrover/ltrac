<?php

if(isset($_POST["login-btn"])) {
	$loginUsername = filter_input(INPUT_POST, "loginUsername", FILTER_SANITIZE_STRING);
	$loginPassword = filter_input(INPUT_POST, "loginPassword", FILTER_SANITIZE_STRING);

	$authenticationAttempt = $UserAuthentication->requestAuthentication($loginUsername, $loginPassword);
	if($authenticationAttempt[0] == TRUE) {
		//header("Location: ".$_SERVER['PHP_SELF']);
	}
}


?>
