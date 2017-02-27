<?php

use \Repositories\Job\Reading\GetJobSingle as GetJobSingle;
use \Repositories\Job\Reading\GetJobCurrent as GetJobCurrent;
use \Repositories\Job\Reading\GetJobArchive as GetJobArchive;
use \Repositories\Job\Writing\FilterContent as FilterContent;
use \Repositories\Job\Writing\AddJob as AddJob;
use \Repositories\Job\Writing\SaveJob as SaveJob;
use \Repositories\Job\Writing\DeleteJob as DeleteJob;
use \Repositories\Job\Writing\ArchiveJob as ArchiveJob;
use \Repositories\Proprietor\Reading\GetProprietorSingle as GetProprietorSingle;

require_once 'start.php';

if($_SESSION['user']['authenticated'] !== TRUE) {
	getError('authentication');
	exit();
}

require_once 'globals.php';

if(array_key_exists('function',$_POST)){

    switch(filter_input(INPUT_POST, 'function', FILTER_SANITIZE_STRING)) {
        case 'saveJob':
            $jobId = filter_input(INPUT_POST, 'jobId', FILTER_SANITIZE_NUMBER_INT);
            $FilterContent = new FilterContent();
            $filteredJobContent = $FilterContent->filterJobContent($_POST['content']);
            $SaveJob = new SaveJob();
            if($SaveJob->saveJobContent($jobId, $filteredJobContent)){
                return true;
            }
            break;
        case 'addJob':
            $AddJob = new AddJob();
            $addedJob = $AddJob->addJob();
            $GetJobSingle = new GetJobSingle();
            $singleJob = $GetJobSingle->getSingleJob($addedJob);
            returnJson($singleJob);
            break;
        case 'deleteJob':
            $jobId = filter_input(INPUT_POST, 'jobId', FILTER_SANITIZE_NUMBER_INT);
            $DeleteJob = new DeleteJob();
            if($DeleteJob->deleteJob($jobId)){
                return true;
            }
            break;
        case 'archiveJob':
            $jobId = filter_input(INPUT_POST, 'jobId', FILTER_SANITIZE_NUMBER_INT);
            $ArchiveJob = new ArchiveJob();
            if($ArchiveJob->archiveJob($jobId)){
                return true;
            }
            break;
        case 'getSingleProprietorDetails':
            $job_id = filter_input(INPUT_POST, 'jobId', FILTER_SANITIZE_NUMBER_INT);
            $GetProprietorSingle = new GetProprietorSingle();
            $proprietorDetails = $GetProprietorSingle->getSingleProprietorDetails($job_id);
                returnJson($proprietorDetails);
            break;
        default:
            getError('no function requested');
            exit();
            break;
    }

} else {

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
        default:
            getError('no function requested');
            exit();
            break;
    }

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