testextra.grid.Categories = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-categories',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Category\\GetList'
        },
        fields: ['id', 'name'],
        autoHeight: true,
        paging: true,
        remoteSort: true,
        columns: [
            {
                header: 'Category ID',
                dataIndex: 'id',
                sortable: true,
                width: 100
            },
            {
                header: 'Category Name',
                dataIndex: 'name',
                sortable: true,
                width: 200
            }
        ],
        tbar: [{
            text: 'Create Category',
            handler: this.createCategory,
            scope: this
        }]
    });
    testextra.grid.Categories.superclass.constructor.call(this, config);
};
Ext.extend(testextra.grid.Categories, MODx.grid.Grid, {
    createCategory: function(btn, e){
        var win = MODx.load({
            xtype: 'testextra-window-category-create-update',
            title: 'Create Category',
            listeners: {
                'success': {fn: function() { this.refresh(); }, scope: this}
            }
        });
        win.show(e.target);
    },
    updateCategory: function(btn, e){
        if (!this.menu.record || !this.menu.record.id){
            return false;
        }
        var win = MODx.load({
            xtype: 'testextra-window-category-create-update',
            title: 'Update Category',
            action: 'TestExtra\\Processors\\Category\\Update',
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
            text: 'Update Category',
            handler: this.updateCategory
        });
        m.push('-');
        m.push({
            text: 'Remove Category',
            handler: this.removeCategory
        });
        this.addContextMenuItem(m);
    },
    removeCategory: function(btn, e) {
        if (!this.menu.record){
            return false;
        }

        MODx.msg.confirm({
            title: 'Remove Category',
            text: 'Are you sure you want to remove this Category?',
            url: this.config.url,
            params: {
                action: 'TestExtra\\Processors\\Category\\Remove',
                id: this.menu.record.id
            },
            listeners: {
                'success': { fn: function() { this.refresh(); }, scope: this}
            }
        });
    }
});
Ext.reg('testextra-grid-categories', testextra.grid.Categories);

// Window
testextra.window.CreateUpdateCategory = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        width: 500,
        closeAction: 'close',
        url: MODx.config.connector_url,
        action: 'TestExtra\\Processors\\Category\\Create',
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
    testextra.window.CreateUpdateCategory.superclass.constructor.call(this, config);
};
Ext.extend(testextra.window.CreateUpdateCategory, MODx.Window);
Ext.reg('testextra-window-category-create-update', testextra.window.CreateUpdateCategory);