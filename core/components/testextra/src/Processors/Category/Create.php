<?php

namespace TestExtra\Processors\Category;

use MODX\Revolution\Processors\Model\CreateProcessor;
use TestExtra\Model\Category;

class Create extends CreateProcessor
{
    public $classKey = Category::class;
    public $objectType = 'testextra.category';
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