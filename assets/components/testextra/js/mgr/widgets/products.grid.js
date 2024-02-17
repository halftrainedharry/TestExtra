testextra.grid.Products = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-products',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Product\\GetList'
        },
        fields: ['id', 'name', 'features_count', 'description', 'txt', 'stock', 'release_date'],
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
                header: "Edit",
                id: "editProduct",
                sortable: false,
                disabled: true,
                width: 50,
                align: "center",
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    value = "<i style='text-align:center; cursor:pointer;' class='icon icon-external-link icon-lg'></i>";
                    return value;
                },
                listeners: {
                    click: {fn:function(_this, grid, rowIndex, e) {
                        this.updateProduct();
                    }, scope:this}
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
        var redirectUrl = '?a=features&namespace=' + MODx.request.namespace + '&productid=0';
        MODx.loadPage(redirectUrl);
    },
    getMenu: function() {
        var m = [];
        m.push({
            text: '<i class="x-menu-item-icon icon icon-external-link"></i>' + 'Update Product',
            handler: this.updateProduct
        });
        m.push('-');
        m.push({
            text: '<i class="x-menu-item-icon icon icon-edit"></i>' + 'Quick-Update',
            handler: this.quickUpdate
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
    updateProduct: function() {
        var selectedId = 0;
        if (this.menu.record){
            selectedId = this.menu.record.id;
        } else {
            var sm = this.getSelectionModel();
            if (!sm.hasSelection()) {
                return;
            }
            // Selected row
            var selected = sm.getSelected();
            var selectedId = selected.id;
        }

        var redirectUrl = '?a=features&namespace=' + MODx.request.namespace + '&productid=';
        redirectUrl += selectedId;
        MODx.loadPage(redirectUrl);
    },
    quickUpdate: function(btn, e){
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

    //     return true;
    // }
});
Ext.reg('testextra-grid-products', testextra.grid.Products);

// Window
testextra.window.CreateUpdateProduct = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        width: 1200,
        autoHeight: true,
        closeAction: 'close',
        url: MODx.config.connector_url,
        action: 'TestExtra\\Processors\\Product\\Create',
        fields: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name',
            anchor: '100%'
        },{
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            anchor: '100%'
            // height: 400,
            // grow: false
        },{
            xtype: 'textfield', // use 'hidden' in production
            name: 'id',
            readOnly: true
        }]
    });
    testextra.window.CreateUpdateProduct.superclass.constructor.call(this, config);
};
Ext.extend(testextra.window.CreateUpdateProduct, MODx.Window, {
});
Ext.reg('testextra-window-product-create-update', testextra.window.CreateUpdateProduct);