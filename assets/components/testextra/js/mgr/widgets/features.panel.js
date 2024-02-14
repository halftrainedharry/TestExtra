testextra.panel.Features = function (config) {
    config = config || {};
    Ext.apply(config, {
        border: false,
        baseCls: 'modx-formpanel',
        cls: 'container',
        items: [
            {
                html: '<h2>' + 'Features' + '</h2>',
                border: false,
                cls: 'modx-page-header'
            },
            {
                xtype: 'modx-tabs',
                defaults: {
                    border: false,
                    autoHeight: true
                },
                border: true,
                activeItem: 0,
                hideMode: 'offsets',
                items: [
                    {
                        title: 'Features',
                        layout: 'form',
                        items: [
                            {
                                xtype: 'testextra-grid-features',
                                preventRender: true,
                                cls: 'main-wrapper'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    testextra.panel.Features.superclass.constructor.call(this, config);
};
Ext.extend(testextra.panel.Features, MODx.Panel);
Ext.reg('testextra-panel-features', testextra.panel.Features);
