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
            $preparedContent = $this->addJobStatusDate($jobContent, $preparedContent);

            $saveQuery = sprintf("UPDATE job SET %s WHERE job_id = %s", $preparedContent, $jobId);

            if($DbConnection->connection->query($saveQuery) == TRUE)
            {
                return TRUE;
            }
        } else {
            getError('no db connection');
        }
    }

    private function addJobStatusDate($jobContent, $preparedContent)
    {
        $jobStatus = str_replace('-','_',$jobContent['job_status']);
        $dateTimezone = new \DateTimeZone('GMT');
        $dateNow = new \DateTime('now', $dateTimezone);
        $dateNow = $dateNow->format('Y-m-d H:i:s');
        $preparedContent = $preparedContent .= 'job_status_'.$jobStatus.'_date="'.$dateNow.'"';

        return $preparedContent;
    }

    private function prepareContent($jobContent)
    {
        $preparedJobContent = '';
        foreach($jobContent as $key => $value)
        {
            $preparedJobContent = $preparedJobContent .= $key.'="'.$value.'",';
        }
        return $preparedJobContent;
    }
}

?>