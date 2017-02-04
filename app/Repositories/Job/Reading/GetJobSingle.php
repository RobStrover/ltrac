<?php namespace Repositories\Job\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetJobSingle
{
    public function __construct()
    {

    }

    public function  getSingleJob($jobId)
    {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $jobQuery = sprintf("SELECT * FROM job WHERE job_id = '%d'", $jobId);
            $result = $DbConnection->connection->query($jobQuery);
            $singleJob = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $singleJob;
        } else {
            getError('no db connection');
        }
    }

}

?>