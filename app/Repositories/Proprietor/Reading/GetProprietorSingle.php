<?php namespace Repositories\Proprietor\Reading;

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
                "SELECT * FROM proprietor" .
                " INNER JOIN job" .
                " ON proprietor.proprietor_id = job.job_proprietor_id" .
                " WHERE job.job_id = '%d';"
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