<?php

namespace TestExtra\Processors\Vendor;

use MODX\Revolution\Processors\Model\RemoveProcessor;
use TestExtra\Model\Vendor;

class Remove extends RemoveProcessor
{
    public $classKey = Vendor::class;
    public $objectType = 'testextra.vendor';
    public $languageTopics = ['testextra:default'];
}