<?php namespace Repositories\Job\Writing;

use Repositories\Db\Connection\GetConnection as Connection;

class SaveJob
{
    public function __construct()
    {

    }

    public function saveJobContent($jobId, $jobContent)
    {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $preparedContent = $this->prepareContent($jobContent);
            $saveQuery = sprintf("UPDATE job SET %s WHERE job_id = %s", $preparedContent, $jobId);
            if($DbConnection->connection->query($saveQuery) == TRUE)
            {
                return TRUE;
            }
        } else {
            getError('no db connection');
        }
    }

    private function prepareContent($jobContent)
    {
        $preparedJobContent = '';
        foreach($jobContent as $key => $value)
        {
            $preparedJobContent = $preparedJobContent .= $key.'="'.$value.'"';
            if(end(array_flip($jobContent)) !== $key) {
                $preparedJobContent .= ',';
            }
        }
        return $preparedJobContent;
    }
}

?>