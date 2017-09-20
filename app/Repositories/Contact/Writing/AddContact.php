<?php namespace Repositories\Contact\Writing;

use Repositories\Db\Connection\GetConnection as Connection;

class AddContact
{
    public function __construct()
    {

    }

    public function addContact()
    {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $createQuery = "INSERT INTO contact SET contact_name='New Contact', contact_contact_numbers='[{}]'";
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