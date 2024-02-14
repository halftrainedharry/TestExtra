<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

class TestExtraFeaturesManagerController extends TestExtraBaseManagerController
{

    public function process(array $scriptProperties = [])
    {
        return '<div id="testextra-panel-features-div"></div>';
    }

    public function getPageTitle(): string
    {
        return $this->modx->lexicon('testextra') . " - Manage Features";
    }

    public function loadCustomCssJs(): void
    {
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/features.panel.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/widgets/features.grid.js');
        $this->addLastJavascript($this->testextra->getOption('jsUrl') . 'mgr/sections/features.js');

        $this->addHtml(
            '
            <script type="text/javascript">
                Ext.onReady(function() {
                    MODx.load({ xtype: "testextra-page-features"});
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
