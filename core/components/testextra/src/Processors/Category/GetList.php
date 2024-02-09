<?php
namespace TestExtra\Processors\Category;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Category;

class GetList extends GetListProcessor
{
    public $classKey = Category::class;
    public $objectType = 'testextra.category';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
}