<?php
namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\GetProcessor;
use TestExtra\Model\Product;

class Get extends GetProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
}