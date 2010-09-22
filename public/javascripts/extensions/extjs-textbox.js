//http://www.extjs.com/forum/showthread.php?t=82837

Ext.ux.TextBox = Ext.extend(Ext.BoxComponent, {
    constructor : function(cfg) {
        cfg = cfg || {};
        this.autoEl = {
           tag  : 'div',
           html : cfg.text
        };
        Ext.ux.TextBox.superclass.constructor.apply(this, arguments);
    }
});

Ext.reg('textbox', Ext.ux.TextBox);
