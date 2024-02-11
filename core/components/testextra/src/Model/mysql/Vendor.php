<?php
namespace TestExtra\Model\mysql;

use xPDO\xPDO;

class Vendor extends \TestExtra\Model\Vendor
{

    public static $metaMap = array (
        'package' => 'TestExtra\\Model\\',
        'version' => '3.0',
        'table' => 'testextra_vendor',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'name' => '',
        ),
        'fieldMeta' => 
        array (
            'name' => 
            array (
                'dbtype' => 'varchar',
                'phptype' => 'string',
                'precision' => '200',
                'null' => false,
                'default' => '',
            ),
        ),
        'aggregates' => 
        array (
            'Products' => 
            array (
                'class' => 'TestExtra\\Model\\Product',
                'local' => 'id',
                'foreign' => 'vendor_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
    );

}
