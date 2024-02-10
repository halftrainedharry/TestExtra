<?php
namespace TestExtra\Model\mysql;

use xPDO\xPDO;

class Product extends \TestExtra\Model\Product
{

    public static $metaMap = array (
        'package' => 'TestExtra\\Model\\',
        'version' => '3.0',
        'table' => 'testextra_product',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'name' => '',
            'published' => 0,
            'deleted' => 0,
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
            'published' => 
            array (
                'dbtype' => 'tinyint',
                'attributes' => 'unsigned',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => false,
                'default' => 0,
            ),
            'deleted' => 
            array (
                'dbtype' => 'tinyint',
                'attributes' => 'unsigned',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => false,
                'default' => 0,
            ),
        ),
        'composites' => 
        array (
            'ProductCategories' => 
            array (
                'class' => 'TestExtra\\Model\\ProductCategory',
                'local' => 'id',
                'foreign' => 'product_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
    );

}
