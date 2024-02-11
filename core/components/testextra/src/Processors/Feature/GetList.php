<?php
namespace TestExtra\Processors\Feature;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Feature;

class GetList extends GetListProcessor
{
    public $classKey = Feature::class;
    public $objectType = 'testextra.feature';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
}