<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

class TestExtraManageManagerController extends TestExtraBaseManagerController
{

    public function process(array $scriptProperties = []): void
    {
    }

    public function getPageTitle(): string
    {
        return $this->modx->lexicon('testextra');
    }

    public function loadCustomCssJs(): void
    {
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/manage.panel.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/products.grid.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/categories.grid.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/vendors.grid.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/features.grid.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/sections/manage.js');

        // load richtext editor
        $rte = $this->loadRTE();
        // if (!empty($rte)) {
        //     $this->addHtml($rte);
        // }

        $this->addHtml(
            '
            <script type="text/javascript">
                Ext.onReady(function() {
                    MODx.load({ xtype: "testextra-page-manage"});
                });
            </script>
        '
        );
    }

    public function getTemplateFile(): string
    {
        return $this->testextra->getOption('templatesPath') . 'manage.tpl';
    }

}
