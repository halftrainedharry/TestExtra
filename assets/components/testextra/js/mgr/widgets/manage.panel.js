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
                listeners: {
                    beforetabchange: { fn: function( _this, newTab, currentTab ) {
                        // if tab is changed from "Features" back to "Products"
                        if (currentTab && currentTab.id == 'testextra-tab-features' && newTab.id == 'testextra-tab-products') {
                            // Reload the data in the "Products" grid
                            var productGrid = Ext.getCmp('testextra-grid-products');
                            if (productGrid){
                                productGrid.refresh();
                            }
                        }
                    }, scope: this},
                    tabchange: function(_this, newTab) {
                        if (newTab.id == 'testextra-tab-features') {
                            return; // Just return
                        }

                        // Get the index of the active tab
                        var index = _this.items.findIndex('id', newTab.id);
                        var keys = _this.items.keys || [];
                        if (index >= 0) {
                            // Hide all tabs with higher indexes
                            for (var i = index + 1; i < keys.length; i++) {
                                _this.hideTabStripItem(i);
                            }
                        }
                    }
                },
                items: [
                    {
                        id: 'testextra-tab-products',
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
                        id: 'testextra-tab-features',
                        title: 'Features',
                        layout: 'form',
                        tabCls: 'x-hide-display', //Hide tab
                        items: [
                            {
                                xtype: 'testextra-grid-features',
                                preventRender: true,
                                cls: 'main-wrapper'
                            }
                        ]
                    }
                    // {
                    //     title: 'Categories',
                    //     layout: 'form',
                    //     items: [
                    //         {
                    //             xtype: 'testextra-grid-categories',
                    //             preventRender: true,
                    //             cls: 'main-wrapper'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: 'Vendors',
                    //     layout: 'form',
                    //     items: [
                    //         {
                    //             xtype: 'testextra-grid-vendors',
                    //             preventRender: true,
                    //             cls: 'main-wrapper'
                    //         }
                    //     ]
                    // }
                ]
            }
        ]
    });
    testextra.panel.Manage.superclass.constructor.call(this, config);
};
Ext.extend(testextra.panel.Manage, MODx.Panel);
Ext.reg('testextra-panel-manage', testextra.panel.Manage);
