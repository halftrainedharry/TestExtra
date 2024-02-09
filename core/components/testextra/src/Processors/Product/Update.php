<?php

namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use TestExtra\Model\Product;

class Update extends UpdateProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
    public $languageTopics = ['testextra:default'];    

    public function beforeSave()
    {
        $name = $this->getProperty('name');
        if (empty($name)) {
            $this->addFieldError('name', 'Name can\'t be empty');
        }
        return parent::beforeSave();
    }
}