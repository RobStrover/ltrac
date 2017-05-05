<?php namespace Repositories\InfiniteList;

use Repositories\Db\Reading\ReadQuery as ReadQuery;

class InfiniteListUpdate
{
	public $listType;
    public $searchArguments;
    public $searchLimitFrom;

    public function getNextResults() {
        $queryMapping = $this->mapSearchType($this->listType);
    	$nextResults = new ReadQuery($this->listType, $this->searchArguments, $this->searchLimitFrom, $queryMapping);
    }

    private function mapSearchType($listType) {
        switch($listType) {
            case 'company':
                return array(
                   array('company_name', 'like', 'clients-search-term'),
                   array('company_telephone_number', 'like', 'clients-search-term')
                );
                break;
            case 'contact':
                return array(
                    array('contact_name', 'like', 'clients-search-term'),
                    array('contact_telephone_number', 'like', 'clients-search-term')
                );
                break;
        }
    }
}