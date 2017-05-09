<?php namespace Repositories\Db\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class ReadQuery
{
    protected $readQuery;

    public function __construct($searchType, $searchArguments, $limitFrom, $queryMapping = array())
    {
        $searchArgumentsSanitised = $this->sanitiseSearchArguments($searchArguments);
        $searchArgumentsSql = $this->prepareSqlSearchArguments($searchArgumentsSanitised, $queryMapping);
        $this->readQuery = $this->buildQuery($searchType, $searchArgumentsSql, $limitFrom);
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

    private function prepareSqlSearchArguments($searchArguments, $queryMapping) {

        if(empty($queryMapping)) {
            exit('query mapping not set');
        }

        $sql = "";

        if (count($searchArguments) == 0) {
            return $sql;
        }

        $whereCount = 0;

        foreach ($searchArguments as $key => $value) {

            foreach ($queryMapping as $queryMappingItem) {
                if ($key == $queryMappingItem['form_field']) {

                    if ($whereCount == 0) {
                        $sql .= 'WHERE';
                    } else {
                        $sql .= ' OR';
                    }

                        $sql .= sprintf(" %s", $queryMappingItem['database_field']);

                    switch ($queryMappingItem['operator']) {
                        case 'like':
                            $sql .= sprintf(" LIKE '%%%s%%'", $value);
                            break;
                        case 'where':
                        default:
                            $sql .= sprintf(" = '%s'", $value);
                            break;
                    }
                }
                $whereCount ++;
            }
        }

        return($sql);
    }

    private function buildQuery($searchType, $searchArgumentsSql, $limitFrom) {
        $sql = sprintf("SELECT * FROM `%s` %s", $searchType, $searchArgumentsSql);
        var_dump($sql);
        exit();
    }
}