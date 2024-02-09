testextra.page.Manage = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [
            {
                xtype: 'testextra-panel-manage',
                renderTo: 'testextra-panel-manage-div'
            }
        ]
    });
    testextra.page.Manage.superclass.constructor.call(this, config);
};
Ext.extend(testextra.page.Manage, MODx.Component);
Ext.reg('testextra-page-manage', testextra.page.Manage);
