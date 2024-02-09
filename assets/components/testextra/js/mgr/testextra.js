var TestExtra = function (config) {
    config = config || {};
    TestExtra.superclass.constructor.call(this, config);
};
Ext.extend(TestExtra, Ext.Component, {

    page: {},
    window: {},
    grid: {},
    tree: {},
    panel: {},
    combo: {},
    field: {},
    config: {},

});
Ext.reg('testextra', TestExtra);
testextra = new TestExtra();
