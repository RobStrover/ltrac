<?php namespace Repositories\Db\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class ReadQuery
{
    protected $readQuery;

    public function __construct($searchType, $searchArguments, $limitFrom, $queryMapping)
    {
        $searchArgumentsSanitised = $this->sanitiseSearchArguments($searchArguments);
        $searchArgumentsSql = $this->prepareSqlSearchArguments($searchArgumentsSanitised, $queryMapping);
        $this->readQuery = $this->buildQuery($searchType, $searchArgumentsSanitised, $limitFrom);
    }

    public function getReadQuery() {
        return $this->readQuery;
    }

    private function sanitiseSearchArguments($searchArguments) {
        $sanitisedSearchArguments = array();
        foreach ($searchArguments as $key => $value) {
            $sanitisedSearchArguments[$key] = FILTER_VAR($value, FILTER_SANITIZE_STRING);
        }
        return $sanitisedSearchArguments;
    }

    private function prepareSqlSearchArguments($searchArguments) {

        $sql = "";

        if (count($searchArguments == 0)) {
            return $sql;
        }

        $whereCount = 0;

        foreach ($searchArguments as $key => $value) {
            if ($whereCount == 0) {
                $sql = sprintf("WHERE %s = '%s'", $key, $value);
            } else {
                $sql .= sprintf(" AND %s = '%s'", $key, $value);
            }
        }

        var_dump($sql);
        exit();
    }

    private function buildQuery($searchType, $searchArgumentsSanitised, $limitFrom) {
        $sql = sprintf("SELECT * FROM %s ", $searchType);
    }
}