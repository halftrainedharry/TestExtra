<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

use TestExtra\Model\Product;

class TestExtraFeaturesManagerController extends TestExtraBaseManagerController
{
    // protected $product;

    public function process(array $scriptProperties = [])
    {
        // Read Request Parameter with the product ID
        // if (isset($scriptProperties['productid'])) {
        //     $this->product = $this->modx->getObject(Product::class, [
        //         'id' => $scriptProperties['productid']
        //     ]);
        // }

        // if ($this->product === null) {
        //     $this->failure('Product doesn\'t exist.');
        // }

        return '<div id="testextra-panel-features-div"></div>';
    }

    public function getPageTitle(): string
    {
        return $this->modx->lexicon('testextra') . " - Edit Product";
    }

    public function loadCustomCssJs(): void
    {
        // if ($this->product !== null) {
        //     $this->addHtml('<script type="text/javascript">
        //         Ext.onReady(function() {
        //             testextra.config.product_name = "' . addslashes($this->product->get('name')) . '";
        //         });
        //     </script>');
        // }

        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/features.panel.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/features.grid.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/sections/features.js');

        $this->addHtml(
            '
            <script type="text/javascript">
                Ext.onReady(function() {
                    MODx.load({ xtype: "testextra-page-features" });
                });
            </script>
        '
        );
    }

    public function getTemplateFile(): string
    {
        return '';
    }

}
