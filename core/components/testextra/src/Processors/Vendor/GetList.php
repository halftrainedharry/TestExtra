<?php
namespace TestExtra\Processors\Vendor;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Vendor;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $classKey = Vendor::class;
    public $objectType = 'testextra.vendor';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        // Initial request from Combobox
        $id = (int) $this->getProperty('id');
        if (!empty($id)){
            $c->where(['id' => $id]);
            return $c;
        }

        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where([
                'name:LIKE' => '%' . $query . '%'
            ]);
        }
        return $c;
    }
}