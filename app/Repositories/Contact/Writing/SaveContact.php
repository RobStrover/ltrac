<?php namespace Repositories\Contact\Writing;

use Repositories\Db\Connection\GetConnection as Connection;

class SaveContact
{
    public function __construct()
    {

    }

    public function saveContactContent($contactId, $contactContent)
    {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {

            $contactContent = $this->prepareContent($contactContent);

            $saveQuery = sprintf("UPDATE contact SET %s WHERE contact_id = %s", $contactContent, $contactId);

            if($DbConnection->connection->query($saveQuery) == TRUE)
            {
                return TRUE;
            }
        } else {
            getError('no db connection');
        }
    }

    private function prepareContent($contactContent)
    {
        $preparedJobContent = '';
        foreach($contactContent as $key => $value)
        {
            $preparedJobContent = $preparedJobContent .= $key.'="'.$value.'",';
        }
        return $preparedJobContent;
    }
}