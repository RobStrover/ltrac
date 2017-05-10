<?php namespace Repositories\InfiniteList;

use Repositories\Db\Reading\ReadQuery as ReadQuery;

class InfiniteListUpdate
{
	public $listType;
    public $searchArguments;
    public $searchLimitFrom;

    public function getNextResults() {
        $queryMapping = $this->mapSearchType($this->listType);
    	$infiniteListObject = new ReadQuery($this->listType, $this->searchArguments, $this->searchLimitFrom, $queryMapping);
    	$nextResults = $infiniteListObject->getReadResults();

    	return ($nextResults);
    }

    private function mapSearchType($listType) {
        switch($listType) {
            case 'proprietor':
                return array(
                   array(
                       'form_field' => 'clients-search-term',
                       'operator' => 'like',
                       'database_field' => 'proprietor_name'
                   ),
                   array(
                       'form_field' =>'clients-search-term',
                       'operator' => 'like',
                       'database_field' => 'proprietor_telephone_number'
                   )
                );
                break;
            case 'contact':
                return array(
                    array(
                        'form_field' => 'clients-search-term',
                        'operator' => 'like',
                        'database_field' => 'contact_name'
                    ),
                    array(
                        'form_field' =>'clients-search-term',
                        'operator' => 'like',
                        'database_field' => 'contact_contact_numbers'
                    )
                );
                break;
            default:
                return array();
                break;
        }
    }
}