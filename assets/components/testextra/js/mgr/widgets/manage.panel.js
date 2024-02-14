testextra.panel.Manage = function (config) {
    config = config || {};
    Ext.apply(config, {
        border: false,
        baseCls: 'modx-formpanel',
        cls: 'container',
        items: [
            {
                html: '<h2>' + _('testextra.manage.page_title') + '</h2>',
                border: false,
                cls: 'modx-page-header'
            },
            {
                xtype: 'modx-tabs',
                defaults: {
                    border: false,
                    autoHeight: true
                },
                border: true,
                activeItem: 0,
                hideMode: 'offsets',
                items: [
                    {
                        title: 'Products',
                        layout: 'form',
                        items: [
                            {
                                xtype: 'testextra-grid-products',
                                preventRender: true,
                                // showActionsColumn: false, // hide default grid action column
                                cls: 'main-wrapper'
                            }
                        ]
                    },
                    {
                        title: 'Categories',
                        layout: 'form',
                        items: [
                            {
                                xtype: 'testextra-grid-categories',
                                preventRender: true,
                                cls: 'main-wrapper'
                            }
                        ]
                    },
                    {
                        title: 'Vendors',
                        layout: 'form',
                        items: [
                            {
                                xtype: 'testextra-grid-vendors',
                                preventRender: true,
                                cls: 'main-wrapper'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    testextra.panel.Manage.superclass.constructor.call(this, config);
};
Ext.extend(testextra.panel.Manage, MODx.Panel);
Ext.reg('testextra-panel-manage', testextra.panel.Manage);
