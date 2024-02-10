<?php
namespace TestExtra\Processors\Category;

use MODX\Revolution\Processors\Model\GetListProcessor;
use TestExtra\Model\Category;
use TestExtra\Model\ProductCategory;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $classKey = Category::class;
    public $objectType = 'testextra.category';
    public $languageTopics = ['testextra:default'];

    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = $this->getProperty('query');

        if (!empty($query)) {
            $where = [];
            $valuesqry = $this->getProperty('valuesqry'); // This property is set in the inital request of the superboxselect to get the values of the existing selection.

            if ($valuesqry) {
                $ids = explode('|', $query);
                $ids = array_map('trim', $ids);
                $ids = array_filter($ids);

                if (!empty($ids)) {
                    $where['id:IN'] = $ids;
                }
            } else {
                $where['name:LIKE'] = '%' . $query . '%';
            }

            $c->where($where);
        }

        return $c;
    }
}