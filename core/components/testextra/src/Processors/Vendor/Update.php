<?php

namespace TestExtra\Processors\Vendor;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use TestExtra\Model\Vendor;

class Update extends UpdateProcessor
{
    public $classKey = Vendor::class;
    public $objectType = 'testextra.vendor';
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