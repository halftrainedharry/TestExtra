testextra.grid.Products = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-products',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Product\\GetList',
            sort: 'position' // Makes sure this is also the defaultSortField of the GetList processor (or change the processor to take this parameter into account)
        },
        fields: ['id', 'name', 'position'],
        autoHeight: true,
        paging: true,
        // pageSize: 30,
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
        }]
    });
    testextra.grid.Products.superclass.constructor.call(this, config);

    this.on('render', this.registerGridDropTarget, this);
    this.on('beforedestroy', this.destroyScrollManager, this);
};
Ext.extend(testextra.grid.Products, MODx.grid.Grid, {
    registerGridDropTarget: function() {

        var ddrow = new Ext.ux.dd.GridReorderDropTarget(this, {
            copy: false,
            sortCol: 'position',
            isGridFiltered: this.isGridFiltered.bind(this),
            listeners: {
                'beforerowmove': function(objThis, oldIndex, newIndex, records) {
                },

                'afterrowmove': function(objThis, oldIndex, newIndex, records) {
                    MODx.Ajax.request({
                        url: MODx.config.connector_url,
                        params: {
                            action: 'TestExtra\\Processors\\Product\\DDReorder',
                            idItem: records.pop().id,
                            oldIndex: oldIndex,
                            newIndex: newIndex
                        },
                        listeners: {
                            'success': {
                                fn: function(r) {
                                    this.target.grid.refresh();
                                }, scope: this
                            }
                        }
                    });
                },

                'beforerowcopy': function(objThis, oldIndex, newIndex, records) {
                },

                'afterrowcopy': function(objThis, oldIndex, newIndex, records) {
                }
            }
        });

        Ext.dd.ScrollManager.register(this.getView().getEditorParent());
    },
    destroyScrollManager: function() {
        Ext.dd.ScrollManager.unregister(this.getView().getEditorParent());
    },
    getDragDropText: function(){
        if (this.config.baseParams.sort != 'position') {
            if (this.store.sortInfo == undefined || this.store.sortInfo.field != 'position') {
                return 'Sort grid by <strong>position</strong> to use drag & drop sorting.';
            }
        }

        if (this.isGridFiltered()) {
            return 'Clear filters to use drag & drop sorting.';
        }

        return 'Change order of: ' + this.selModel.selections.items[0].data.name;
    },
    isGridFiltered: function () {
        var search = this.getStore().baseParams.search;
        if (search && search != '') {
            return true;
        }

        // var themeFilter = this.getStore().baseParams.theme;
        // if (!((themeFilter !== undefined) && (themeFilter !== null) && (themeFilter !== '') && (themeFilter !== 0))) {
        //     return true;
        // }

        return false;
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