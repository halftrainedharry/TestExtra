// Code copied an attapted from the "Fred" extra
testextra.combo.Category = function (config, getStore) {
    config = config || {};

    if (!config.clearBtnCls) {
        if (MODx.config.connector_url) {
            config.clearBtnCls = 'x-form-trigger';
        } else {
            config.clearBtnCls = null;
        }
    }

    if (!config.expandBtnCls) {
        if (MODx.config.connector_url) {
            config.expandBtnCls = 'x-form-trigger';
        } else {
            config.expandBtnCls = null;
        }
    }

    Ext.applyIf(config, {
        name: 'categories',
        hiddenName: 'categories[]',
        displayField: 'name',
        valueField: 'id',
        fields: ['name', 'id'],
        mode: 'remote',
        triggerAction: 'all',
        typeAhead: true,
        editable: true,
        forceSelection: false,
        pageSize: 20,
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Category\\GetList'
        }
    });
    Ext.applyIf(config, {
        store: new Ext.data.JsonStore({
            url: config.url,
            root: 'results',
            totalProperty: 'total',
            fields: config.fields,
            errorReader: MODx.util.JSONReader,
            baseParams: config.baseParams || {},
            remoteSort: config.remoteSort || false,
            autoDestroy: true
        })
    });

    if (getStore === true) {
        config.store.load();
        return config.store;
    }
    
    testextra.combo.Category.superclass.constructor.call(this, config);
    this.config = config;
    return this;
};
Ext.extend(testextra.combo.Category, Ext.ux.form.SuperBoxSelect);
Ext.reg('testextra-combo-category', testextra.combo.Category);