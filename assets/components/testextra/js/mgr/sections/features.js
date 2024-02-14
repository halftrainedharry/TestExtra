testextra.page.Features = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [
            {
                xtype: 'testextra-panel-features',
                renderTo: 'testextra-panel-features-div'
            }
        ],
        buttons: [{
            text: '<i class="icon icon-arrow-left"></i>' + 'Back to Products'
            ,id: 'testextra-btn-back-to-products'
            ,handler: function() {
                MODx.loadPage('?a=manage&namespace=' + MODx.request.namespace);
            }
            ,scope: this
        }]
    });
    testextra.page.Features.superclass.constructor.call(this, config);
};
Ext.extend(testextra.page.Features, MODx.Component);
Ext.reg('testextra-page-features', testextra.page.Features);
