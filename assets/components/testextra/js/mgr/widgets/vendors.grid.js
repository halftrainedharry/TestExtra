testextra.grid.Vendors = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-vendors',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Vendor\\GetList'
        },
        fields: ['id', 'name'],
        autoHeight: true,
        paging: true,
        remoteSort: true,
        columns: [
            {
                header: 'Vendor ID',
                dataIndex: 'id',
                sortable: true,
                width: 100
            },
            {
                header: 'Vendor Name',
                dataIndex: 'name',
                sortable: true,
                width: 200
            }
        ],
        tbar: [{
            text: 'Create Vendor',
            handler: this.createVendor,
            scope: this
        }]
    });
    testextra.grid.Vendors.superclass.constructor.call(this, config);
};
Ext.extend(testextra.grid.Vendors, MODx.grid.Grid, {
    createVendor: function(btn, e){
        var win = MODx.load({
            xtype: 'testextra-window-vendor-create-update',
            title: 'Create Vendor',
            listeners: {
                'success': {fn: function() { this.refresh(); }, scope: this}
            }
        });
        win.show(e.target);
    },
    updateVendor: function(btn, e){
        if (!this.menu.record || !this.menu.record.id){
            return false;
        }
        var win = MODx.load({
            xtype: 'testextra-window-vendor-create-update',
            title: 'Update Vendor',
            action: 'TestExtra\\Processors\\Vendor\\Update',
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
            text: 'Update Vendor',
            handler: this.updateVendor
        });
        m.push('-');
        m.push({
            text: 'Remove Vendor',
            handler: this.removeVendor
        });
        this.addContextMenuItem(m);
    },
    removeVendor: function(btn, e) {
        if (!this.menu.record){
            return false;
        }

        MODx.msg.confirm({
            title: 'Remove Vendor',
            text: 'Are you sure you want to remove this Vendor?',
            url: this.config.url,
            params: {
                action: 'TestExtra\\Processors\\Vendor\\Remove',
                id: this.menu.record.id
            },
            listeners: {
                'success': { fn: function() { this.refresh(); }, scope: this}
            }
        });
    }
});
Ext.reg('testextra-grid-vendors', testextra.grid.Vendors);

// Window
testextra.window.CreateUpdateVendor = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        width: 500,
        closeAction: 'close',
        url: MODx.config.connector_url,
        action: 'TestExtra\\Processors\\Vendor\\Create',
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
    testextra.window.CreateUpdateVendor.superclass.constructor.call(this, config);
};
Ext.extend(testextra.window.CreateUpdateVendor, MODx.Window);
Ext.reg('testextra-window-vendor-create-update', testextra.window.CreateUpdateVendor);