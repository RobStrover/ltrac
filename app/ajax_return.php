<?php

use \Repositories\Job\Reading\GetJobSingle as GetJobSingle;
use \Repositories\Job\Reading\GetJobCurrent as GetJobCurrent;
use \Repositories\Job\Reading\GetJobArchive as GetJobArchive;
use \Repositories\Job\Writing as SaveJob;

require_once 'start.php';

if($_SESSION['user']['authenticated'] !== TRUE) {
	getError('authentication');
	exit();
}

require_once 'globals.php';

switch(filter_input(INPUT_GET, 'data', FILTER_SANITIZE_STRING)) {
	case 'current':
		$GetJobCurrent = new GetJobCurrent();
        $currentJobs = $GetJobCurrent->getCurrentJobs();
        returnJson($currentJobs);
	break;
	case 'single':
	    $GetJobSingle = new GetJobSingle();
		$jobId = filter_input(INPUT_GET, 'jobid', FILTER_SANITIZE_STRING);
		$singleJob = $GetJobSingle->getSingleJob($jobId);
        returnJson($singleJob);
	break;
	case 'archive':
	    $GetJobArchive = new GetJobArchive();
		$archivedJobs = $GetJobArchive->getArchiveJobs();
        returnJson($archivedJobs);
    break;
    case 'write':
        die('exiting here!');
        exit();
    break;
	default:

	    getError('no type');
	    exit();
	break;
}

function returnJson($data){
	header('Content-Type: application/json');
	echo json_encode($data);
    exit();
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