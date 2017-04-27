<?php namespace Repositories\Db\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class ReadQuery
{
    protected $readQuery;

    public function __construct($searchType, $searchArguments, $limitFrom)
    {


        $searchArgumentsSql = $this->processSearchArgumentsToSql($searchArguments);

    }

    public function showReadQuery() {
        return $this->readQuery;
    }
}