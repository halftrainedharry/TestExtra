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
            'vendor_id' => 0,
            'state' => '',
            'description' => '',
            'txt' => '',
            'stock' => 0,
            'release_date' => NULL,
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
            'vendor_id' => 
            array (
                'dbtype' => 'int',
                'attributes' => 'unsigned',
                'precision' => '10',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'state' => 
            array (
                'dbtype' => 'varchar',
                'phptype' => 'string',
                'precision' => '100',
                'null' => false,
                'default' => '',
            ),
            'description' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'txt' => 
            array (
                'dbtype' => 'varchar',
                'phptype' => 'string',
                'precision' => '200',
                'null' => false,
                'default' => '',
            ),
            'stock' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'release_date' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
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
            'Features' => 
            array (
                'class' => 'TestExtra\\Model\\Feature',
                'local' => 'id',
                'foreign' => 'product_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
        'aggregates' => 
        array (
            'Vendor' => 
            array (
                'class' => 'TestExtra\\Model\\Vendor',
                'local' => 'vendor_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
