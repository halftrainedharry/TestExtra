<?php
namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Product;

class GetList extends GetListProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
}