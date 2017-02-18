<?php namespace Repositories\Job\Writing;

use Repositories\Db\Connection\GetConnection as Connection;

class ArchiveJob {

    public function __construct()
    {

    }

    public function archiveJob($job_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {

            $archiveQuery = sprintf("UPDATE job SET job_archived = 'Yes' WHERE job_id = %s", $job_id);
            if($DbConnection->connection->query($archiveQuery) == TRUE)
            {
                return TRUE;
            }
        } else {
            getError('no db connection');
        }
    }

}