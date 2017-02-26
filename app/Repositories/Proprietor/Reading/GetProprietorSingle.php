<?php namespace Repositories\Job\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetProprietorSingle
{
    public function __construct()
    {

    }

    public function getSingleProprietorDetails($job_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $proprietorQuery = sprintf(
                "SELECT p.* FROM p.proprietor" .
                "INNER JOIN j.job" .
                "ON p.proprietor_id = j.job_proprietor_id" .
                "WHERE j.job_id = '%d';"
            , $job_id
            );
            $result = $DbConnection->connection->query($proprietorQuery);
            $proprietorDetails = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $proprietorDetails;
        } else {
            getError('no db connection');
        }
    }
}