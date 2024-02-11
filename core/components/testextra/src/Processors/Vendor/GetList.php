<?php
namespace TestExtra\Processors\Vendor;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Vendor;

class GetList extends GetListProcessor
{
    public $classKey = Vendor::class;
    public $objectType = 'testextra.vendor';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
}