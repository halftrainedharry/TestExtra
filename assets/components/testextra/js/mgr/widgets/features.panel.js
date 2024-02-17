testextra.panel.Features = function (config) {
    config = config || {};

    var items = [
        {
            id: 'testextra-panel-product-title',
            html: '<h2>' + (config.isUpdate ? 'Edit Product' : 'New Product') + '</h2>',
            border: false,
            cls: 'modx-page-header'
        },
        {
            xtype: 'textfield', // use 'hidden' for production
            name: 'id',
            readOnly: true
        },
        {
            cls: 'main-wrapper',
            xtype: 'panel',
            layout: 'form',
            labelAlign: 'top',
            labelSeparator: '',
            items: [{
                name: 'name',
                xtype: 'textfield',
                fieldLabel: 'Name',
                anchor: '100%'
            }]
        }
    ];

    // Only show grid with the features when the product is updated
    if (config.isUpdate){
        items.push({
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
                    title: 'Features',
                    layout: 'form',
                    items: [
                        {
                            xtype: 'testextra-grid-features',
                            preventRender: true,
                            cls: 'main-wrapper'
                        }
                    ]
                }
            ]
        });
    }

    Ext.apply(config, {
        id: 'testextra-panel-product', // ID of the MODx.FormPanel. Necessary for the 'Save' button to work
        border: false,
        baseCls: 'modx-formpanel',
        cls: 'container',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Product\\Create'
        },
        useLoadingMask: true,
        items: items,
        listeners: {
            setup: {
                fn: this.setup,
                scope: this
            },
            success: {
                fn: this.success,
                scope: this
            },
            ready: {
                fn: this.ready,
                scope: this
            }
        }
    });
    testextra.panel.Features.superclass.constructor.call(this, config);
};
Ext.extend(testextra.panel.Features, MODx.FormPanel, {
    setup: function() {
        if (this.config.isUpdate) {
            // load existing data
            MODx.Ajax.request({
                url: this.config.url,
                params: {
                    action: 'TestExtra\\Processors\\Product\\Get',
                    id: MODx.request.productid
                },
                listeners: {
                    'success': {
                        fn: function(r) {
                            this.getForm().setValues(r.object);

                            this.fireEvent('ready', r.object);
                            MODx.fireEvent('ready');
                        },
                        scope: this
                    }
                }
            });
        } else {
            var default_values = {};
            this.getForm().setValues(default_values);

            this.fireEvent('ready', {});
            MODx.fireEvent('ready');
        }
    },
    ready: function(r) {
    },
    success: function(o, r) {
        // product successfully saved
        if (!this.config.isUpdate) {
            // Reload the page to change the 'Create' state to 'Update'
            MODx.loadPage('?a=features&namespace=' + MODx.request.namespace + '&productid=' + o.result.object.id);
        }
    },
});
Ext.reg('testextra-panel-features', testextra.panel.Features);