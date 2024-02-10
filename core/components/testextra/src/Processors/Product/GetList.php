<?php
namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Product;
use TestExtra\Model\ProductCategory;
use TestExtra\Model\Category;
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
        // column with the assigned Category-IDs (separated by comma) that are then used in the update window
        $c->select(
            [
               '(SELECT IFNULL(GROUP_CONCAT(category_id SEPARATOR \',\'), \'\') FROM ' . $this->modx->getTableName(ProductCategory::class) . ' WHERE product_id = Product.id) AS categories'
            ]
        );
        // column with the names of the assigned categories (separated by comma) to display in the grid
        $c->select(
            [
               '(SELECT IFNULL(GROUP_CONCAT(C.name ORDER BY C.name ASC SEPARATOR \', \'), \'\') FROM ' . $this->modx->getTableName(ProductCategory::class) . ' INNER JOIN ' . $this->modx->getTableName(Category::class) . ' C ON C.id = category_id WHERE product_id = Product.id) AS category_names'
            ]
        );

        return parent::prepareQueryAfterCount($c);
    }
}