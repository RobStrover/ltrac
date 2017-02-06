<?php namespace Repositories\Job\Writing;

use Repositories\Db\Connection\GetConnection as Connection;

class AddJob
{
    public function __construct()
    {

    }

    public function addJob()
    {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $createQuery = "INSERT INTO job SET job_status='new-enquiry', job_name='New Job'";
            if($DbConnection->connection->query($createQuery) == TRUE)
            {
                return($DbConnection->connection->insert_id);
            }
        } else {
            getError('no db connection');
        }
    }
}

?>