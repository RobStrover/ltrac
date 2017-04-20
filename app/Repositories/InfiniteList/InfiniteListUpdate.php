<?php namespace Repositories\InfiniteList;

use Repositories\Db\Connection\GetConnection as Connection;

class InfiniteListUpdate
{
	public $listType;
    public $searchArguments;

    public function getNextResults() {
    	var_dump('you got there!!! your variables are:', $this->listType, $this->searchArguments);
    }
}