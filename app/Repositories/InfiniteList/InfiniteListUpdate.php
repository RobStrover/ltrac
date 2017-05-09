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
            case 'proprietor':
                return array(
                   array(
                       'form_field' => 'clients-search-term',
                       'operator' => 'like',
                       'database_field' => 'company_name'
                   ),
                   array(
                       'form_field' =>'clients-search-term',
                       'operator' => 'like',
                       'database_field' => 'company_telephone_number'
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