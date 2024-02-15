<?php
namespace TestExtra\Processors\Feature;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Feature;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $classKey = Feature::class;
    public $objectType = 'testextra.feature';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $product_id = $this->getProperty('product_id');

        if (!empty($product_id)) {
            $c->where([
                'product_id' => $product_id
            ]);
        }

        return $c;
    }
}