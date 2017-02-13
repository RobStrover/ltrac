<?php namespace Repositories\Job\Writing;

use Repositories\Db\Connection\GetConnection as Connection;

class DeleteJob {

    public function __construct()
    {

    }

    public function deleteJob($job_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {

            $deleteQuery = sprintf("UPDATE job SET job_deleted = '1' WHERE job_id = %s", $job_id);

            if($DbConnection->connection->query($deleteQuery) == TRUE)
            {
                return TRUE;
            }
        } else {
            getError('no db connection');
        }
    }

}