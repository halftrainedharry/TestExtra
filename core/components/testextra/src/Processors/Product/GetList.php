<?php
namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Product;
use TestExtra\Model\Feature;
// use xPDO\Om\xPDOObject;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryAfterCount(xPDOQuery $c)
    {
        $c->select($this->modx->getSelectColumns(Product::class, 'Product'));
        // column with the count of available features of this product (that is then used in the grid)
        $c->select(
            [
               '(SELECT COUNT(id) FROM ' . $this->modx->getTableName(Feature::class) . ' WHERE product_id = Product.id) AS features_count'
            ]
        );

        return parent::prepareQueryAfterCount($c);
    }

    // Alternative way to query the feature count
    // public function prepareRow(xPDOObject $object)
    // {
    //     $objectArray = $object->toArray();

    //     $features_count = $this->modx->getCount(Feature::class, ['product_id' => $objectArray['id']]);
    //     $objectArray['features_count'] = $features_count;

    //     return $objectArray;
    // }
}