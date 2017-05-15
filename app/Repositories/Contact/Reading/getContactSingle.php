<?php namespace Repositories\Contact\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetContactSingle
{
    public $contactDetails;
    public $contactProprietors;

    public function __construct($contact_id)
    {
        if($contact_id) {
            $this->contactDetails = $this->getSingleContactDetails($contact_id);
            $this->contactProprietors = $this->getContactProprietors($contact_id);
        }

    }

    private function getSingleContactDetails($proprietor_id) {
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

    private function getContactProprietors($proprietor_id) {
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