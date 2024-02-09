<?php

namespace TestExtra\Processors\Category;

use MODX\Revolution\Processors\Model\RemoveProcessor;
use TestExtra\Model\Category;

class Remove extends RemoveProcessor
{
    public $classKey = Category::class;
    public $objectType = 'testextra.category';
    public $languageTopics = ['testextra:default'];    
}