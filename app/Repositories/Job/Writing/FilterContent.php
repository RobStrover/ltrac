<?php namespace Repositories\Job\Writing;

class FilterContent
{
    public function __construct()
    {

    }

    public function filterJobContent($jobContentItems)
    {
        $filterTypes = [];
        foreach ($jobContentItems as $jobContentItem => $value) {
            $filterTypes[$jobContentItem] = FILTER_SANITIZE_STRING;
        }
        $filteredJobContent = filter_var_array($jobContentItems, $filterTypes);
        return $filteredJobContent;
    }
}

?>