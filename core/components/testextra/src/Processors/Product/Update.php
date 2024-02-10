<?php

namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use TestExtra\Model\Product;
use TestExtra\Model\ProductCategory;

class Update extends UpdateProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';
    public $languageTopics = ['testextra:default'];    

    public function beforeSave()
    {
        $name = $this->getProperty('name');
        if (empty($name)) {
            $this->addFieldError('name', 'Name can\'t be empty');
        }
        return parent::beforeSave();
    }

    public function afterSave()
    {
        $categories = $this->getProperty('categories');
        if ($categories === null) return parent::afterSave();

        $categories = array_map('intval', $categories);
        $categories = array_filter($categories);

        // Delete all existing entries (for the current product)
        $this->modx->removeCollection(ProductCategory::class, ['product_id' => $this->object->id]);

        foreach ($categories as $category) {
            $productCategory = $this->modx->newObject(ProductCategory::class);
            $productCategory->set('product_id', $this->object->id);
            $productCategory->set('category_id', $category);
            $productCategory->save();
        }

        return parent::afterSave();
    }
}