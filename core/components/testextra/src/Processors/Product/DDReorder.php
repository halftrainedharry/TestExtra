<?php
/**
 * Called after DragDrop in grid.
 * This code is copied from the extra "Collections" (https://github.com/modxcms/Collections)
*/

namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\ModelProcessor;
use TestExtra\Model\Product;

class DDReorder extends ModelProcessor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';

    public function process()
    {
        $idItem = $this->getProperty('idItem');
        $oldIndex = $this->getProperty('oldIndex');
        $newIndex = $this->getProperty('newIndex');

        $items = $this->modx->newQuery($this->classKey);
        $items->where([
            'id:!=' => $idItem,
            'position:>=' => min($oldIndex, $newIndex),
            'position:<=' => max($oldIndex, $newIndex),
        ]);

        $items->sortby('position', 'ASC');

        $itemsColumn = $this->modx->getCollection($this->classKey, $items);

        if (min($oldIndex, $newIndex) == $newIndex) {
            foreach ($itemsColumn as $item) {
                $itemObject = $this->modx->getObject($this->classKey, $item->get('id'));
                $itemObject->set('position', $itemObject->get('position') + 1);
                $itemObject->save();
            }
        } else {
            foreach ($itemsColumn as $item) {
                $itemObject = $this->modx->getObject($this->classKey, $item->get('id'));
                $itemObject->set('position', $itemObject->get('position') - 1);
                $itemObject->save();
            }
        }

        $itemObject = $this->modx->getObject($this->classKey, $idItem);
        $itemObject->set('position', $newIndex);
        $itemObject->save();


        return $this->success('', $itemObject);
    }

}
