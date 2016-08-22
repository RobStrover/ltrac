<?php namespace Repositories\Db\Connection;

class Connection {
	private $_connection;
	private static $_instance;

	public static function getInstance() {
		if(!self::$_instance) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct($thishost, $thisusername, $thispassword, $thisdatabase) {
		$this->_connection = new \mysqli($thishost, $thisusername, $thispassword, $thisdatabase);

		if(mysqli_connect_error()){
			return array(FALSE, "Could not connect to the database. ".mysqli_connect_error());
		}
	}

	private function __clone() {

	}

	public function getConnection(){

		if(!empty($this->_connection->connect_error)) {
			return array(FALSE, $this->_connection);
		} else {
			return array(TRUE, $this->_connection);
		}
		
	}
}

?>