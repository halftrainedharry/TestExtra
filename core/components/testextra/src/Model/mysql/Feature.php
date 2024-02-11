<?php
namespace TestExtra\Model\mysql;

use xPDO\xPDO;

class Feature extends \TestExtra\Model\Feature
{

    public static $metaMap = array (
        'package' => 'TestExtra\\Model\\',
        'version' => '3.0',
        'table' => 'testextra_feature',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'content' => '',
            'product_id' => 0,
        ),
        'fieldMeta' => 
        array (
            'content' => 
            array (
                'dbtype' => 'varchar',
                'phptype' => 'string',
                'precision' => '200',
                'null' => false,
                'default' => '',
            ),
            'product_id' => 
            array (
                'dbtype' => 'int',
                'attributes' => 'unsigned',
                'precision' => '10',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
        ),
        'aggregates' => 
        array (
            'Product' => 
            array (
                'class' => 'TestExtra\\Model\\Product',
                'local' => 'product_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
