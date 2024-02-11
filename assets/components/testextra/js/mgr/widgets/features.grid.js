testextra.grid.Features = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'testextra-grid-features',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Feature\\GetList'
        },
        fields: ['id', 'content', 'product_id'],
        autoHeight: true,
        paging: true,
        remoteSort: true,
        columns: [
            {
                header: 'Feature ID',
                dataIndex: 'id',
                sortable: true,
                width: 100
            },
            {
                header: 'Feature Content',
                dataIndex: 'content',
                sortable: true,
                width: 200
            }
        ],
        tbar: [{
            text: 'Create Feature',
            handler: this.createFeature,
            scope: this
        }]
    });
    testextra.grid.Features.superclass.constructor.call(this, config);
};
Ext.extend(testextra.grid.Features, MODx.grid.Grid, {
    createFeature: function(btn, e){
        var win = MODx.load({
            xtype: 'testextra-window-feature-create-update',
            title: 'Create Feature',
            listeners: {
                'success': {fn: function() { this.refresh(); }, scope: this}
            }
        });
        win.show(e.target);
    },
    updateFeature: function(btn, e){
        if (!this.menu.record || !this.menu.record.id){
            return false;
        }
        var win = MODx.load({
            xtype: 'testextra-window-feature-create-update',
            title: 'Update Feature',
            action: 'TestExtra\\Processors\\Feature\\Update',
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
            text: 'Update Feature',
            handler: this.updateFeature
        });
        m.push('-');
        m.push({
            text: 'Remove Feature',
            handler: this.removeFeature
        });
        this.addContextMenuItem(m);
    },
    removeFeature: function(btn, e) {
        if (!this.menu.record){
            return false;
        }

        MODx.msg.confirm({
            title: 'Remove Feature',
            text: 'Are you sure you want to remove this Feature?',
            url: this.config.url,
            params: {
                action: 'TestExtra\\Processors\\Feature\\Remove',
                id: this.menu.record.id
            },
            listeners: {
                'success': { fn: function() { this.refresh(); }, scope: this}
            }
        });
    }
});
Ext.reg('testextra-grid-features', testextra.grid.Features);

// Window
testextra.window.CreateUpdateFeature = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        width: 500,
        closeAction: 'close',
        url: MODx.config.connector_url,
        action: 'TestExtra\\Processors\\Feature\\Create',
        fields: [
            {
                xtype: 'textfield',
                fieldLabel: 'Content',
                name: 'content',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                name: 'id',
                readOnly: true
            }
        ]
    });
    testextra.window.CreateUpdateFeature.superclass.constructor.call(this, config);
};
Ext.extend(testextra.window.CreateUpdateFeature, MODx.Window);
Ext.reg('testextra-window-feature-create-update', testextra.window.CreateUpdateFeature);