testextra.panel.Features = function (config) {
    config = config || {};
    config.preview_size = "160";

    var items = [
        {
            id: 'testextra-panel-product-title',
            html: '<h2>' + (config.isUpdate ? 'Edit Product' : 'New Product') + '</h2>',
            border: false,
            cls: 'modx-page-header'
        },
        {
            xtype: 'textfield', // use 'hidden' for production
            name: 'id',
            readOnly: true
        },
        {
            cls: 'main-wrapper',
            xtype: 'panel',
            layout: 'form',
            labelAlign: 'top',
            labelSeparator: '',
            items: [{
                name: 'name',
                xtype: 'textfield',
                fieldLabel: 'Name',
                anchor: '100%',
                enableKeyEvents: true,
                listeners: {
                    keyup: {
                        fn: function(tf) {
                            this.onUpdateTitle(tf.getValue());
                        },
                        scope: this
                    }
                }
            },{
                id: 'description-richtext',
                xtype: 'textarea',
                fieldLabel: 'Description',
                name: 'description',
                anchor: '100%',
                listeners   : {
                    afterrender : {
                        fn: function(event) {
                            MODx.loadRTE(event.id);
                        }
                    }
                }
            // },{
            //     // (ACE) Code-Editor
            //     xtype: Ext.ComponentMgr.isRegistered('modx-texteditor') ? 'modx-texteditor' : 'textarea',
            //     mimeType: 'text/html',
            //     name: 'description',
            //     // hideLabel: true,
            //     anchor: '100%',
            //     height: 400,
            //     grow: false,
            //     // value: '',
            //     listeners: {
            //         render: function () {
            //             // if ((this.xtype === 'modx-texteditor') && this.editor){
            //             //     this.editor.getSession().setMode('ace/mode/twig')
            //             // }
            //         }
            //     }
            },{
                xtype: 'xdatetime',
                fieldLabel: 'Release Date',
                name: 'release_date',
                allowBlank: true,
                dateFormat: MODx.config.manager_date_format,
                timeFormat: MODx.config.manager_time_format,
                dateWidth: 120,
                timeWidth: 120
                // startDay: parseInt(MODx.config.manager_week_start),
	            // offset_time: MODx.config.server_offset_time
            },{
                xtype: 'numberfield',
                allowDecimals: false,
                allowNegative: false,
                fieldLabel: 'Stock',
                name: 'stock',
                anchor: '100%',
                // allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Text field',
                maxLength: 100,
                name: 'txt',
                anchor: '100%',
                // regex: /^(([a-zA-Z0-9_\+\.\-]+)@([a-zA-Z0-9_.\-]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
                vtype: 'email'
            },{
                name: 'img',
                xtype: 'modx-combo-browser',
                fieldLabel: 'Product Image',
                triggerClass: 'x-form-image-trigger', // image icon
                anchor: '100%',
                id: 'product-img',
                source: MODx.config['textextra.image_media_source'],
                allowBlank: true,
                listeners: {
                    select: {
                        fn: function (data) {
                            this.updateImgPreview('product-img','img-preview');
                        },
                        scope: this
                    },
                    change: {
                        fn: function (cb, newValue) {
                            this.updateImgPreview('product-img','img-preview');
                        },
                        scope: this
                    }
                }
            },{
                id: 'img-preview',
                html: `<img src="https://via.placeholder.com/${config.preview_size}x${config.preview_size}?text=No+image" style="max-height: ${config.preview_size}px;max-width: ${config.preview_size}px;margin-top: 15px;">`
            // },{
            //     xtype: 'text-password',
            //     name: 'txt',
            //     fieldLabel: 'Password field',
            //     anchor: '100%',

            }]
        }
    ];

    // Only show grid with the features when the product is updated
    if (config.isUpdate){
        items.push({
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
        });
    }

    Ext.apply(config, {
        id: 'testextra-panel-product', // ID of the MODx.FormPanel. Necessary for the 'Save' button to work
        border: false,
        baseCls: 'modx-formpanel',
        cls: 'container',
        url: MODx.config.connector_url,
        baseParams: {
            action: config.isUpdate ? 'TestExtra\\Processors\\Product\\Update' : 'TestExtra\\Processors\\Product\\Create'
            // id: MODx.request.productid
        },
        useLoadingMask: true,
        items: items,
        listeners: {
            setup: {
                fn: this.setup,
                scope: this
            },
            success: {
                fn: this.success,
                scope: this
            },
            ready: {
                fn: this.ready,
                scope: this
            }
        }
    });
    testextra.panel.Features.superclass.constructor.call(this, config);
};
Ext.extend(testextra.panel.Features, MODx.FormPanel, {
    initialized: false,
    setup: function() {
        if (!this.initialized) {
            if (this.config.isUpdate) {
                var r = testextra.config.record;
                this.getForm().setValues(r);
                this.onUpdateTitle(r.name);

                // set preview image
                this.updateImgPreview('product-img','img-preview');

                this.fireEvent('ready', r);
                MODx.fireEvent('ready');

                // load existing data
                // MODx.Ajax.request({
                //     url: this.config.url,
                //     params: {
                //         action: 'TestExtra\\Processors\\Product\\Get',
                //         id: MODx.request.productid
                //     },
                //     listeners: {
                //         'success': {
                //             fn: function(r) {
                //                 this.getForm().setValues(r.object);
                //                 this.onUpdateTitle(r.object.name);

                //                 this.fireEvent('ready', r.object);
                //                 MODx.fireEvent('ready');
                //             },
                //             scope: this
                //         }
                //     }
                // });
            } else {
                var default_values = {};
                this.getForm().setValues(default_values);

                this.fireEvent('ready', {});
                MODx.fireEvent('ready');
            }

            // Alternative way to init richtext editor
            // var rtes = [];
            // rtes.push('description-richtext');
            // setTimeout(function() { // timeout probably not needed
            //     if (rtes.length > 0 && MODx.loadRTE) {
            //         Ext.each(rtes, function(id, index) {
            //             MODx.loadRTE(id);
            //         });
            //     }
            // }, 150);

            this.initialized = true;
        }
    },
    updateImgPreview: function (cmp_id, preview_cmp_id) {
        var img_cmp = Ext.getCmp(cmp_id);
        if (img_cmp) {
            var value = img_cmp.getValue();
            var source = MODx.config['textextra.image_media_source'] ? MODx.config['textextra.image_media_source'] : 1;
            if (!value) {
                value = `https://via.placeholder.com/${this.config.preview_size}x${this.config.preview_size}?text=No+image`;
            } else {
                value = MODx.config.base_url + `connectors/system/phpthumb.php?w=${this.config.preview_size}&h=${this.config.preview_size}&aoe=0&far=0&f=png&src=${value}&wctx=web&source=${source}`; //&source={$source}&version={$hash}
            }
            var img_preview_cmp = Ext.getCmp(preview_cmp_id);
            if (img_preview_cmp){
                img_preview_cmp.el.dom.querySelector('img').src = value;
            }
        }
    },
    ready: function(r) {
    },
    success: function(o, r) {
        // product successfully saved
        if (!this.config.isUpdate) {
            // Reload the page to change the 'Create' state to 'Update'
            MODx.loadPage('?a=features&namespace=' + MODx.request.namespace + '&productid=' + o.result.object.id);
        }
    },
    onUpdateTitle: function(title) {
        Ext.getCmp('testextra-panel-product-title').getEl().update('<h2>Edit Product "' + Ext.util.Format.stripTags(title) + '"</h2>');
    },
});
Ext.reg('testextra-panel-features', testextra.panel.Features);
