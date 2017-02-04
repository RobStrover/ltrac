<?php namespace Repositories\Job\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetJobCurrent
{
    public function __construct()
    {

    }

    public function getCurrentJobs() {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $jobQuery = sprintf("SELECT job_id, job_name, job_status FROM job WHERE job_archived = 'No'");
            $result = $DbConnection->connection->query($jobQuery);
            $currentJobs = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $currentJobs;
        } else {
            getError('no db connection');
        }
    }
}