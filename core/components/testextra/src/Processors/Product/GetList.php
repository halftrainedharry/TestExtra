<?php
namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Product;
use TestExtra\Model\Feature;
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
}