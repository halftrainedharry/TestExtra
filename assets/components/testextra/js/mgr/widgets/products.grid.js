testextra.grid.Products = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-products',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Product\\GetList'
        },
        fields: ['id', 'name', 'position'],
        autoHeight: true,
        paging: true,
        ddGroup: 'mygridDD',
        enableDragDrop: true,
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
                header: 'Sort',
                dataIndex: 'position',
                sortable: true,
                editor: { xtype: 'numberfield' },
                width: 100
            },
            {
                header: 'Actions',
                sortable: false,
                editable: false,
                width: 100,
                fixed: true,
                renderer: this.renderActions
            }
        ],
        tbar: [{
            text: '<i class="icon icon-plus"></i>' + 'Create Product',
            handler: this.createProduct,
            cls: 'primary-button',
            scope: this
        }],
        listeners: {
            'render': {
                scope: this,
                fn: function(grid) {
                    new Ext.dd.DropTarget(grid.container, {
                        ddGroup: 'mygridDD',
                        copy: false,
                        notifyDrop: function(dd, e, data) { //dd = thing being dragged, e = event, data = data from dragged source
                            if (dd.getDragData(e)) {
                                var targetNode = dd.getDragData(e).selections[0];
                                var sourceNode = data.selections[0];

                                grid.fireEvent('sort',{
                                    target: targetNode,
                                    source: sourceNode,
                                    event: e,
                                    dd: dd
                                });
                            }
                        }
                    });
                }
            }
        }
    });
    testextra.grid.Products.superclass.constructor.call(this, config);
    this.addEvents('sort');
    this.on('sort', this.onSort, this);
};
Ext.extend(testextra.grid.Products, MODx.grid.Grid, {
    onSort: function(o) {
        MODx.Ajax.request({
            url: MODx.config.connector_url,
            params: {
                action: 'TestExtra\\Processors\\Product\\Sort',
                source: o.source.id,
                target: o.target.id
            },
            listeners: {
                'success': { fn: function() { this.refresh(); }, scope: this},
                'failure': { fn: function() { this.refresh(); }, scope: this}
            }
        });
    },
    getDragDropText: function(){
        return this.selModel.selections.items[0].data.name;
    },
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
            text: '<i class="x-menu-item-icon icon icon-edit"></i>' + 'Update Product',
            handler: this.updateProduct
        });
        m.push('-');
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
    renderActions: function(value, metaData, record, rowIndex, colIndex, store) {
        var tpl = new Ext.XTemplate('<tpl for=".">' +
            '<tpl if="actions !== null">' +
                '<ul class="x-grid-actions">' +
                    '<tpl for="actions">' +
                        '<li><button type="button" class="x-btn x-btn-small {className}" title="{title}">{text}</button></li>' +
                    '</tpl>' +
                '</ul>' +
            '</tpl>' +
        '</tpl>', {
             compiled : true
         });

        return tpl.apply({
            actions : [{
                className: 'icon icon-pencil action-edit',
                title: 'Update Product',
                text: ''
            },{
                className: 'icon icon-times action-remove',
                text: '',
                title: 'Remove Product'
            }]
        });
    },
    onClick: function(e) {
        var btn = e.getTarget();
        var cls = btn.className.split(' ');
        var record = this.getSelectionModel().getSelected();

        if (record) {
            this.menu.record = record.data;

            if (-1 !== cls.indexOf('action-edit')) {
                this.updateProduct(e.getTarget(), e);
            } else if (-1 !== cls.indexOf('action-remove')) {
                this.removeProduct(e.getTarget(), e);
            }
        }

        return false;
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