//http://www.extjs.com/forum/showthread.php?t=19301

Ext.override(Ext.form.Field, {
  afterRender: function() {
        if(this.helpText){
            var label = findLabel(this);
            if(label){                
                 var helpImage = label.createChild({
                         tag: 'img', 
                         //src: '/vardb/images/extjs-information.png',
                         src: '../images/extjs/extjs-information.png',
                         cls: 'info-tooltip',
                         style: 'margin-bottom: 0px; margin-left: 5px; padding: 0px;'
                     });                        
                Ext.QuickTips.register({
                    target:  helpImage,
                    title: '',
                    text: this.helpText,
                    enabled: true
                });
            }
          }
          Ext.form.Field.superclass.afterRender.call(this);
          this.initEvents(); 
          this.initValue();
  }
});

var findLabel = function(field) {
    var wrapDiv = null;
    var label = null
    wrapDiv = field.getEl().up('div.x-form-item');    
    if(wrapDiv) {
        label = wrapDiv.child('label');        
    }
    if(label) {
        return label;
    }    
}
