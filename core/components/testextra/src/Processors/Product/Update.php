<?php

namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use TestExtra\Model\Product;

class Update extends UpdateProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
    public $languageTopics = ['testextra:default'];
    
    // Necessary if xtype 'checkbox' is used instead of 'xcheckbox'
    // public function initialize()
    // {
    //     if (null === $this->getProperty('published')) {
    //         $this->setProperty('published', 0);
    //     }

    //     return parent::initialize();
    // }

    public function beforeSet()
    {
        // Convert string "true" to boolean; Problem with xtype 'combo-boolean'/'modx-combo-boolean' in window
        if ($this->getProperty('deleted') === "true"){
            $this->setProperty('deleted', true);
        }

        return parent::beforeSet();
    }

    public function beforeSave()
    {
        $name = $this->getProperty('name');
        if (empty($name)) {
            $this->addFieldError('name', 'Name can\'t be empty');
        }
        return parent::beforeSave();
    }
}