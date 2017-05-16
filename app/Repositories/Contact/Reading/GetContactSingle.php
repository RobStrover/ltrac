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

    private function getSingleContactDetails($contact_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $contactQuery = sprintf(
                "SELECT * FROM contact" .
                " WHERE contact_id = '%d';"
                , $contact_id
            );
            $result = $DbConnection->connection->query($contactQuery);
            $contactDetails = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $contactDetails;
        } else {
            getError('no db connection');
        }
    }

    private function getContactProprietors($contact_id) {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $contactQuery = sprintf(
                "SELECT * FROM proprietor AS p" .
                " INNER JOIN proprietor_contact AS pc" .
                " ON pc.proprietor_contact_proprietor_id = p.proprietor_id" .
                " WHERE pc.proprietor_contact_contact_id = '%d';"
                , $contact_id
            );
            $result = $DbConnection->connection->query($contactQuery);
            $proprietorDetails = mysqli_fetch_all($result,MYSQLI_ASSOC);
            return $proprietorDetails;
        } else {
            getError('no db connection');
        }
    }
}