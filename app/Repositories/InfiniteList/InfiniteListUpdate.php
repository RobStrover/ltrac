<?php namespace Repositories\InfiniteList;

use Repositories\Db\Connection\GetConnection as Connection;

class GetProprietorSingle
{
	public $listType;
    public $searchArguments;

    public function getNextResults() {
    	die('you got there!!! your variables are:' $listType, $searchArguments);
    }
}