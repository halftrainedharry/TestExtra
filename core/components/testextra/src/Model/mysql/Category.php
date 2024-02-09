<?php
namespace TestExtra\Model\mysql;

use xPDO\xPDO;

class Category extends \TestExtra\Model\Category
{

    public static $metaMap = array (
        'package' => 'TestExtra\\Model\\',
        'version' => '3.0',
        'table' => 'testextra_category',
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
        'composites' => 
        array (
            'ProductCategories' => 
            array (
                'class' => 'TestExtra\\Model\\ProductCategory',
                'local' => 'id',
                'foreign' => 'category_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
    );

}
