<?php

require_once 'app/start.php';

require_once 'app/globals.php';

if(getenv('debug_mode') == "TRUE") {
error_reporting(E_ALL); ini_set('display_errors', 'On');
}

$DbConnection = new Repositories\Db\Connection\Connection(getenv('db_host'), getenv('db_username'), getenv('db_password'), getenv('db_name'));
$UserAuthentication = new Repositories\Login\Authenticate\UserAuthentication();

require __DIR__."/app/login_logic.php";
require __DIR__."/app/logout_logic.php";

require_once 'ui/header.php';

require_once 'app/user_interface.php';

if(getenv('debug_mode') == "TRUE") {
	require_once 'ui/debug_layer.php';
}

require_once 'ui/footer.php';

?>