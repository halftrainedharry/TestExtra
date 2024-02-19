<?php
/**
 * Called after DragDrop in grid.
 * This code is copied from the extra "Formalicious" (https://github.com/Sterc/Formalicious)
 * The positions of all the rows shown in the grid are set (beginning with "1"). This creates a problem with a grid that uses paging when rows on page 2 (or higher) are sorted.
*/

namespace TestExtra\Processors\Product;

use MODX\Revolution\Processors\Processor;
use TestExtra\Model\Product;

class Sort2 extends Processor
{
    public $classKey = Product::class;
    public $objectType = 'testextra.product';

    public function process()
    {
        $i = 1;

        foreach (explode(',', $this->getProperty('order')) as $id) {
            $item = $this->modx->getObject($this->classKey, ['id' => $id]);
            if ($item) {
                $item->set('position', $i);

                if ($item->save()) {
                    $i++;
                }
            }
        }

        return $this->success('', []);
    }
}
