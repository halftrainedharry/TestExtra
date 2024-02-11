<?php

namespace TestExtra\Processors\Feature;

use MODX\Revolution\Processors\Model\RemoveProcessor;
use TestExtra\Model\Feature;

class Remove extends RemoveProcessor
{
    public $classKey = Feature::class;
    public $objectType = 'testextra.feature';
    public $languageTopics = ['testextra:default'];
}