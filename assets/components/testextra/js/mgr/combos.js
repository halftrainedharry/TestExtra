testextra.combo.Vendors = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        hiddenName: 'vendor_id',
        url: MODx.config.connector_url,
        baseParams: {
            action: 'TestExtra\\Processors\\Vendor\\GetList'
        },
        fields: ['id', 'name'],
        valueField: 'id',
        displayField: 'name',
        pageSize: 15,
        // forceSelection: true,
        editable: true,
        typeAhead: true,
        enableKeyEvents: true,
        tpl: new Ext.XTemplate('<tpl for=".">' +
            '<div class="x-combo-list-item">' +
                '{name:htmlEncode} <span style="font-style: italic;">({id})</span>' +
            '</div>' +
        '</tpl>')
    });

    testextra.combo.Vendors.superclass.constructor.call(this, config);
};
Ext.extend(testextra.combo.Vendors, MODx.combo.ComboBox);
Ext.reg('testextra-combo-vendors', testextra.combo.Vendors);

// Combobox with local data
testextra.combo.ProductState = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        hiddenName: 'state',
        mode: 'local',
        store: new Ext.data.ArrayStore({
            fields: ['value', 'text'],
            data: [
                ['announced', 'Announced'],
                ['released', 'Released'],
                ['out_of_stock', 'Out of stock'],
                ['discontinued', 'Discontinued']
            ]
        }),
        valueField: 'value',
	    displayField: 'text'
    });

    testextra.combo.ProductState.superclass.constructor.call(this, config);
};
Ext.extend(testextra.combo.ProductState, MODx.combo.ComboBox);
Ext.reg('testextra-combo-product-state', testextra.combo.ProductState);