//http://extjs.com/forum/showthread.php?t=57571
/*
Ext.override(Ext.form.Field, {
    onRender : function(ct, position){
        Ext.form.Field.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = this.getAutoCreate();
            if(!cfg.name){
                cfg.name = this.name || this.id;
            }
            if(this.inputType){
                cfg.type = this.inputType;
            }
            //The rest of the onRender function is unchanged except here:
            //This code allows for the definition of a tooltip config object
            //with a tip and optional width
            if(this.tooltip){
                cfg['ext:qtip'] = this.tooltip.tip;
                cfg['ext:qwidth'] = this.tooltip.width || 100;
            }
            this.el = ct.createChild(cfg, position);
        }
        var type = this.el.dom.type;
        if(type){
            if(type == 'password'){
                type = 'text';
            }
            this.el.addClass('x-form-'+type);
        }
        if(this.readOnly){
            this.el.dom.readOnly = true;
        }
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        
        this.el.addClass([this.fieldClass, this.cls]);
        this.initValue();
    }
});
*/


//From Condor:
Ext.override(Ext.form.Field, {
	afterRender: Ext.form.Field.prototype.afterRender.createSequence(function(){
		if(this.qtip){
			var target = this.getTipTarget();
			if(typeof this.qtip == 'object'){
				Ext.QuickTips.register(Ext.apply({
					  target: target
				}, this.qtip));
			} else {
				target.dom.qtip = this.qtip;
			}
		}
	}),
	getTipTarget: function(){
		return this.el;
	}
});
//checkboxes and radios, the main element is a hidden input.
Ext.override(Ext.form.Checkbox, {
	getTipTarget: function(){
		return this.imageEl;
	}
});
