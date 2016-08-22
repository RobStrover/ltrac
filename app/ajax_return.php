<?php 

require_once 'start.php';

if($_SESSION['user']['authenticated'] !== TRUE) {
	getError('authentication');
	exit();
}

require_once 'globals.php';

$DbConnection = new Repositories\Db\Connection\Connection(getenv('db_host'), getenv('db_username'), getenv('db_password'), getenv('db_name'));

switch(filter_input(INPUT_GET, 'data', FILTER_SANITIZE_STRING)) {
	case 'current':
		getCurrentJobs();
		exit();
	break;
	case 'single':
		$jobId = filter_input(INPUT_GET, 'jobid', FILTER_SANITIZE_STRING);
		getSingleJob($jobId);
		exit();
	default:
	    getError('no type');
	    exit();
	break;
}

function getSingleJob($jobId){
		$connection = getConnectionObject();
		if($connection[0] == TRUE) {
			$jobQuery = sprintf("SELECT * FROM job WHERE job_id = '%d'", $jobId);
			$result = $connection[1]->query($jobQuery);
			$currentJob = mysqli_fetch_all($result,MYSQLI_ASSOC);
			returnJson($currentJob);
		} else {
			getError('no db connection');
		}
}

function getCurrentJobs() {

	$connection = getConnectionObject();

		if($connection[0] == TRUE) {
			$jobQuery = sprintf("SELECT job_id, job_name, job_status FROM job WHERE job_archived = 'No'");
		$result = $connection[1]->query($jobQuery);
		$currentJobs = mysqli_fetch_all($result,MYSQLI_ASSOC);
		returnJson($currentJobs);
	} else {
		getError('no db connection');
	}

}

function getConnectionObject(){
	global $DbConnection;
	return $DbConnection->getConnection();

}

function returnJson($data){
	header('Content-Type: application/json');
	echo json_encode($data);
}

function getError($reason = '') {
	header('Content-Type: application/json');
	echo json_encode(array(
							array(
								'job_id' => 0,
								'job_name' => 'Error getting data '.(getenv('debug_mode') == "TRUE") ? $reason : ''
								)
							)
	);
}

?>