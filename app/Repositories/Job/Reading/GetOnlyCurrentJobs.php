<?php namespace Repositories\Job\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetOnlyCurrentJobs
{
    public function __construct()
    {

    }

    public function getOnlyCurrentJobs() {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $jobQuery = sprintf("SELECT * FROM job WHERE job_archived = 'No' AND job_deleted = '0' AND job_status = 'current-job' ORDER BY job_id ASC");
            $result = $DbConnection->connection->query($jobQuery);
            $currentJobs = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $currentJobs;
        } else {
            getError('no db connection');
        }
    }
}