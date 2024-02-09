testextra.grid.Products = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-products',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Product\\GetList'
        },
        fields: ['id', 'name'],
        autoHeight: true,
        paging: true,
        remoteSort: true,
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
                width: 200
            }
        ],
        tbar: [{
            text: 'Create Product',
            handler: this.createProduct,
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
            text: 'Update Product',
            handler: this.updateProduct
        });
        m.push('-');
        m.push({
            text: 'Remove Product',
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
    }
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