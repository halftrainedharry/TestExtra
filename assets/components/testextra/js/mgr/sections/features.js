testextra.page.Features = function (config) {
    config = config || {};
    config.isUpdate = (MODx.request.productid && MODx.request.productid > 0) ? true : false;
    Ext.applyIf(config, {
        formpanel: 'testextra-panel-product', // ID of the MODx.FormPanel to save
        components: [
            {
                xtype: 'testextra-panel-features',
                renderTo: 'testextra-panel-features-div',
                isUpdate: config.isUpdate
            }
        ],
        buttons: [{
            text: 'Speichern',
            method: 'remote',
            cls: 'primary-button',
            process: config.isUpdate ? 'TestExtra\\Processors\\Product\\Update' : 'TestExtra\\Processors\\Product\\Create',
            checkDirty : true,
            keys: [{
                key: MODx.config.keymap_save || 's',
                ctrl: true
            }]
        },{
            text: '<i class="icon icon-arrow-left"></i>' + 'Back to Products'
            ,id: 'testextra-btn-back-to-products'
            ,handler: function() {
                // MODx.loadPage('?a=manage&namespace=' + MODx.request.namespace);
                MODx.loadPage('manage', 'namespace=' + MODx.request.namespace); // Alternative way
            }
            ,scope: this
        }]
    });
    testextra.page.Features.superclass.constructor.call(this, config);
};
Ext.extend(testextra.page.Features, MODx.Component);
Ext.reg('testextra-page-features', testextra.page.Features);