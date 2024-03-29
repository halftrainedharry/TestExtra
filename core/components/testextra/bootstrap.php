<?php
/**
 * @var \MODX\Revolution\modX $modx
 * @var array $namespace
 */

// Add your classes to modx's autoloader
$modx->addPackage('TestExtra\\Model\\', $namespace['path'] . 'src/', null, 'TestExtra\\');

if (!$modx->services->has('testextra')) {
    // Register base class in the service container
    $modx->services->add('testextra', function($c) use ($modx) {
        return new \TestExtra\TestExtra($modx);
    });

    // Load packages model, uncomment if you have DB tables
    //$modx->addPackage('TestExtra\Model', $namespace['path'] . 'src/', null, 'TestExtra\\');
}
