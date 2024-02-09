<?php

namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\RemoveProcessor;
use TestExtra\Model\Product;

class Remove extends RemoveProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
    public $languageTopics = ['testextra:default'];    
}