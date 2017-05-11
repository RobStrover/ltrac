<?php namespace Repositories\Db\Connection;

class GetConnection {

    public $connection;


	public function __construct() {
         $this->getConnection();
	}


	private function getConnection(){

            $ThisHost = getenv('db_host');
            $ThisUsername = getenv('db_username');
            $ThisPassword = getenv('db_password');
            $ThisDatabase = getenv('db_name');

            $this->connection = new \mysqli($ThisHost, $ThisUsername, $ThisPassword, $ThisDatabase);

            if(mysqli_connect_error()){
                return array(FALSE, "Could not connect to the database. ".mysqli_connect_error());
            }

            mysqli_set_charset($this->connection,"utf8");
            if(!empty($this->connection->connect_error)) {
                //error handler here.
            }
            return $this->connection;
	}
}

?>