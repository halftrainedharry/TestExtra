<?php
namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Product;
use TestExtra\Model\Vendor;
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
        // Add a column with the vendor name to display in the grid
        $c->select($this->modx->getSelectColumns(Product::class, 'Product'));
        $c->select($this->modx->getSelectColumns(Vendor::class, 'Vendor', 'vendor_', ['name']));
        $c->leftJoin(Vendor::class, 'Vendor');

        // Alternative way to add a column with the vendor name to display in the grid
        // $c->select($this->modx->getSelectColumns(Product::class, 'Product'));
        // $c->select(
        //     [
        //        '(SELECT IFNULL(name, \'\') FROM ' . $this->modx->getTableName(Vendor::class) . ' WHERE id = Product.vendor_id) AS vendor_name'
        //     ]
        // );

        return parent::prepareQueryAfterCount($c);
    }
}