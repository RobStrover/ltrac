<?php namespace Repositories\Job\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetJobArchive
{
    public function __construct()
    {

    }

    public function getArchiveJobs() {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $jobQuery = sprintf("SELECT job_id, job_name, job_status FROM job WHERE job_archived = 'Yes' ORDER BY job_id DESC");
            $result = $DbConnection->connection->query($jobQuery);
            $archiveJobs = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $archiveJobs;
        } else {
            getError('no db connection');
        }
    }
}