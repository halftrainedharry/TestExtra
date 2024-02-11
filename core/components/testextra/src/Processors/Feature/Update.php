<?php

namespace TestExtra\Processors\Feature;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use TestExtra\Model\Feature;

class Update extends UpdateProcessor
{
    public $classKey = Feature::class;
    public $objectType = 'testextra.feature';
    public $languageTopics = ['testextra:default'];

    public function beforeSave()
    {
        $content = $this->getProperty('content');
        if (empty($content)) {
            $this->addFieldError('content', 'Content can\'t be empty');
        }
        return parent::beforeSave();
    }
}