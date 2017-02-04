<?php namespace Repositories\Login\Authenticate;

use Repositories\Db\Connection\GetConnection as Connection;

class UserAuthentication
{
	public function __construct()
	{
		
	}

	public function requestAuthentication($username, $password)
	{
		if(empty($username) || empty($password))
		{
			return array(FALSE, "Please supply both a username and a password.");
		}
		$username = $this->sanitizeAuthString($username);
		$password = $this->md5AuthString($this->sanitizeAuthString($password));
		$authenticationResult = $this->authenticate($username, $password);
		return($authenticationResult);
	}

	private function authenticate($username, $password)
	{
		$DbConnection = new Connection;

		if(isset($DbConnection->connection)) {
		$userquery = sprintf("SELECT * FROM user WHERE user_username = '%s' and user_password = '%s'", $username, $password);
		$result = $DbConnection->connection->query($userquery);
		$user = mysqli_fetch_all($result,MYSQLI_ASSOC);

		if(!empty($user)){
			$this->populateUserSession($user);
			return array(TRUE, "Logging in now.");
		} else {
			return array(FALSE, "Username or password was incorrect.");
		}
		
		} else {
			return array(FALSE, 'DB Connection not set');
		}
	}

	private function sanitizeAuthString($string)
	{
		return filter_var($string, FILTER_SANITIZE_STRING);
	}

	private function md5AuthString($string)
	{
		return md5($string);
	}

	private function populateUserSession($user){
		$_SESSION['user']['authenticated'] = TRUE;
		$_SESSION['user']['user_id'] = $user[0]['user_id'];
		$_SESSION['user']['user_username'] = $user[0]['user_username'];
	}
}


?>