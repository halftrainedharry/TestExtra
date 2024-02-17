<?php
abstract class TestExtraBaseManagerController extends modExtraManagerController {
    /** @var \TestExtra\TestExtra $testextra */
    public $testextra;

    public function initialize(): void
    {
        $this->testextra = $this->modx->services->get('testextra');

        $this->addCss($this->testextra->getOption('cssUrl') . 'mgr.css');
        $this->addJavascript($this->testextra->getOption('jsUrl') . 'mgr/testextra.js');

        $this->addHtml('
            <script type="text/javascript">
                Ext.onReady(function() {
                    testextra.config = '.$this->modx->toJSON($this->testextra->config).';
                });
            </script>
        ');

        parent::initialize();
    }

    public function getLanguageTopics(): array
    {
        return array('testextra:default');
    }

    public function checkPermissions(): bool
    {
        return true;
    }

    public function loadRTE() {
        // Check system settings if richtext editor should be used
        $useEditor = $this->modx->getOption('use_editor');
        $whichEditor = $this->modx->getOption('which_editor');
        if ($useEditor && !empty($whichEditor)) {
            // Invoke OnRichTextEditorInit event to prepare RTE
            $onRichTextEditorInit = $this->modx->invokeEvent('OnRichTextEditorInit', [
                'editor' => $whichEditor,
                'elements' => [],
            ]);
            if (is_array($onRichTextEditorInit)) {
                $onRichTextEditorInit = implode('', $onRichTextEditorInit);
            }

            return $onRichTextEditorInit;
        }
    }
}
