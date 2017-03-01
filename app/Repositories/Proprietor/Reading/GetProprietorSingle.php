<?php namespace Repositories\Proprietor\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetProprietorSingle
{
    public $proprietorDetails;
    public $proprietorContacts;

    public function __construct($proprietor_id)
    {
        if($proprietor_id) {
            $this->proprietorDetails = $this->getSingleProprietorDetails($proprietor_id);
            $this->proprietorContacts = $this->getProprietorContacts($proprietor_id);
        }

    }

    private function getSingleProprietorDetails($proprietor_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $proprietorQuery = sprintf(
                "SELECT * FROM proprietor" .
                " WHERE proprietor_id = '%d';"
            , $proprietor_id
            );
            $result = $DbConnection->connection->query($proprietorQuery);
            $proprietorDetails = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $proprietorDetails;
        } else {
            getError('no db connection');
        }
    }

    private function getProprietorContacts($proprietor_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $proprietorQuery = sprintf(
                "SELECT * FROM contact" .
                " INNER JOIN proprietor_contact" .
                " ON pc.proprietor_contact_contact_id = c.contact_id" .
                " WHERE pc.proprietor_contact_proprietor_id = '%d';"
                , $proprietor_id
            );
            $result = $DbConnection->connection->query($proprietorQuery);
            $contactDetails = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $contactDetails;
        } else {
            getError('no db connection');
        }
    }
}