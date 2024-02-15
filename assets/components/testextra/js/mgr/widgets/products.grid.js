testextra.grid.Products = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-products',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Product\\GetList'
        },
        fields: ['id', 'name', 'features_count'],
        autoHeight: true,
        paging: true,
        remoteSort: true,
        save_action: 'TestExtra\\Processors\\Product\\UpdateFromGrid',
        autosave: true,
        columns: [
            {
                header: 'Product ID',
                dataIndex: 'id',
                sortable: true,
                width: 100
            },
            {
                header: 'Product Name',
                dataIndex: 'name',
                sortable: true,
                editor: { xtype: 'textfield' },
                width: 200
            },
            {
                header: "Features",
                sortable: false,
                disabled: true,
                width: 50,
                align: "center",
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    value = "<i style='text-align:center; cursor:pointer;' class='icon icon-external-link icon-lg'></i>";
                    return value;
                },
                listeners: {
                    click: { fn:function(_this, grid, rowIndex, e) {
                        this.manageFeatures();
                    }, scope:this }
                }
            },
            {
                header: 'Features Count',
                dataIndex: 'features_count',
                sortable: true,
                width: 100
            },
            // {
            //     header: 'Actions',
            //     sortable: false,
            //     editable: false,
            //     width: 100,
            //     fixed: true,
            //     renderer: this.renderActions
            // }
        ],
        tbar: [{
            text: '<i class="icon icon-plus"></i>' + 'Create Product',
            handler: this.createProduct,
            cls: 'primary-button',
            scope: this
        }]
    });
    testextra.grid.Products.superclass.constructor.call(this, config);
};
Ext.extend(testextra.grid.Products, MODx.grid.Grid, {
    createProduct: function(btn, e){
        var win = MODx.load({
            xtype: 'testextra-window-product-create-update',
            title: 'Create Product',
            listeners: {
                'success': {fn: function() { this.refresh(); }, scope: this}
            }
        });
        win.show(e.target);
    },
    updateProduct: function(btn, e){
        if (!this.menu.record || !this.menu.record.id){
            return false;
        }
        var win = MODx.load({
            xtype: 'testextra-window-product-create-update',
            title: 'Update Product',
            action: 'TestExtra\\Processors\\Product\\Update',
            listeners: {
                'success': {fn: function() { this.refresh(); }, scope: this}
            }
        });
        win.fp.getForm().setValues(this.menu.record);
        win.show(e.target);
    },
    getMenu: function() {
        var m = [];
        m.push({
            text: '<i class="x-menu-item-icon icon icon-external-link"></i>' + 'Manage Features',
            handler: this.manageFeatures,
            scope: this
        });
        m.push('-');
        m.push({
            text: '<i class="x-menu-item-icon icon icon-edit"></i>' + 'Update Product',
            handler: this.updateProduct
        });
        m.push({
            text: '<i class="x-menu-item-icon icon icon-times"></i>' + 'Remove Product',
            handler: this.removeProduct
        });
        this.addContextMenuItem(m);
    },
    removeProduct: function(btn, e) {
        if (!this.menu.record){
            return false;
        }

        MODx.msg.confirm({
            title: 'Remove Product',
            text: 'Are you sure you want to remove this Product?',
            url: this.config.url,
            params: {
                action: 'TestExtra\\Processors\\Product\\Remove',
                id: this.menu.record.id
            },
            listeners: {
                'success': { fn: function() { this.refresh(); }, scope: this}
            }
        });
    },
    manageFeatures: function() {
        var sm = this.getSelectionModel();
        if (!sm.hasSelection()) {
            console.log("No selection");
            return;
        }
        // Selected row
        var selected = sm.getSelected();
        var selectedId = selected.data['id']; //selected.id


        var parentPanel = this.findParentByType('modx-tabs');
        var tabCmp = Ext.getCmp('testextra-tab-features');
        var gridCmp = Ext.getCmp('testextra-grid-features');
        if (tabCmp && gridCmp) {
            // Reset the tab title
            tabCmp.setTitle("Features" + " (" + selected.data['name'] + ")");
            gridCmp.current_product_id = selectedId; // set the selected product-id in the grid

            // Get the store and reload the  data
            var store = gridCmp.getStore();
            if (store) {
                store.baseParams = {
                    action:'TestExtra\\Processors\\Feature\\GetList',
                    product_id: selectedId
                };
                gridCmp.getBottomToolbar().changePage(1);
                gridCmp.refresh();
                gridCmp.getSelectionModel().clearSelections(true);

                // Update the parameters and reload (-> alternative way)
                // store.removeAll();
                // store.baseParams.product_id = selected.id;
                // store.lastOptions.params.product_id = selected.id;
                // store.lastOptions.params.start = 0;
                // store.lastOptions.params.search = "";
                // store.reload();
            }

            // Unhide the panel if its an existing hidden panel
            parentPanel.unhideTabStripItem(tabCmp);
            tabCmp.tabEl.classList.remove('x-hide-display');

            // Set the active tab
            parentPanel.setActiveTab(tabCmp);
        }
    },
    // renderActions: function(value, metaData, record, rowIndex, colIndex, store) {
    //     var tpl = new Ext.XTemplate('<tpl for=".">' +
    //         '<tpl if="actions !== null">' +
    //             '<ul class="x-grid-actions">' +
    //                 '<tpl for="actions">' +
    //                     '<li><button type="button" class="x-btn x-btn-small {className}" title="{title}">{text}</button></li>' +
    //                 '</tpl>' +
    //             '</ul>' +
    //         '</tpl>' +
    //     '</tpl>', {
    //          compiled : true
    //      });

    //     return tpl.apply({
    //         actions : [{
    //             className: 'icon icon-pencil action-edit',
    //             title: 'Update Product',
    //             text: ''
    //         },{
    //             className: 'icon icon-times action-remove',
    //             text: '',
    //             title: 'Remove Product'
    //         }]
    //     });
    // },
    // onClick: function(e) {
    //     var btn = e.getTarget();
    //     var cls = btn.className.split(' ');
    //     var record = this.getSelectionModel().getSelected();

    //     if (record) {
    //         this.menu.record = record.data;

    //         if (-1 !== cls.indexOf('action-edit')) {
    //             this.updateProduct(e.getTarget(), e);
    //         } else if (-1 !== cls.indexOf('action-remove')) {
    //             this.removeProduct(e.getTarget(), e);
    //         }
    //     }

    //     return false;
    // }
});
Ext.reg('testextra-grid-products', testextra.grid.Products);

// Window
testextra.window.CreateUpdateProduct = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        width: 500,
        closeAction: 'close',
        url: MODx.config.connector_url,
        action: 'TestExtra\\Processors\\Product\\Create',
        fields: [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                name: 'id',
                readOnly: true
            }
        ]
    });
    testextra.window.CreateUpdateProduct.superclass.constructor.call(this, config);
};
Ext.extend(testextra.window.CreateUpdateProduct, MODx.Window);
Ext.reg('testextra-window-product-create-update', testextra.window.CreateUpdateProduct);