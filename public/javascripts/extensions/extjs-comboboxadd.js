/****
 * Ext.ux.form.ComboBoxAdd
 * a Combination of both ComboBox and TwinTriggerField.
 * adds an "add" button beside the std ComboBox trigger.
 * 
 * like this: [ selected value][v][+]  <--- an add button.
 * 
 * usage is identical to Ext.form.ComboBox.
 * listen to the "add" button via add event.
 * 
 * <script>
 * // create combo using standard ComboBox configuration.
 * var combo = new Ext.ux.form.ComboBoxAdd({...});
 * 
 * // listen to 2nd trigger via "add" event
 * combo.on('add', function(ev) {
 *     alert('you clicked the add button');  // <-- you might show a form on a dialog here
 * });
 * 
 * </script>
 * 
 * NB: you must supply your own style implementation for the 2nd trigger.  it has the class "x-form-add-trigger"
 * you might style it like so:
 * <style>
 * .x-form-add-trigger {
 *   background-image: url(/images/icons/add.png) !important;
 *   background-position: center center !important;    
 *   cursor: pointer;    
 *   border: 0 !important;    
 *   margin-left: 2px;
 * }
 * </style>
 * @author Chris Scott
 * @email christocracy@gmail.com
 *
 */
Ext.namespace("Ext.ux.form");
Ext.ux.form.ComboBoxAdd = function(config) {
    Ext.ux.form.ComboBoxAdd.superclass.constructor.apply(this, arguments);        
};
Ext.extend(Ext.ux.form.ComboBoxAdd, Ext.form.ComboBox, {
    
    /***
     * trigger classes.
     */
    trigger1Class: '',            
    trigger2Class: 'x-form-add-trigger',
    
    /***
     * initComponent
     */
    initComponent : function(){
        Ext.ux.form.ComboBoxAdd.superclass.initComponent.call(this);
        
        /***
         * @event add
         * @param {field: Ext.ux.form.ComboBoxAdd, button: Ext.Element}
         * fires when 2nd trigger is clicked
         */
        this.addEvents({add : true});
        
        // implement triggerConfig from Ext.form.TwinTriggerField
        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
        ]};
    },
    
    /***
     * getTrigger
     * copied from Ext.form.TwinTriggerField
     * @param {Object} index
     */
    getTrigger : function(index){
        return this.triggers[index];
    },
    
    /***
     * initTrigger
     * copied from Ext.form.TwinTriggerField
     */
    initTrigger : function(){
        var ts = this.trigger.select('.x-form-trigger', true);
        this.wrap.setStyle('overflow', 'hidden');
        var triggerField = this;
        ts.each(function(t, all, index){
            t.hide = function(){
                var w = triggerField.wrap.getWidth();
                this.dom.style.display = 'none';
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());
            };
            t.show = function(){
                var w = triggerField.wrap.getWidth();
                this.dom.style.display = '';
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());
            };
            var triggerIndex = 'Trigger'+(index+1);

            if(this['hide'+triggerIndex]){
                t.dom.style.display = 'none';
            }
            t.on("click", this['on'+triggerIndex+'Click'], this, {preventDefault:true});
            t.addClassOnOver('x-form-trigger-over');
            t.addClassOnClick('x-form-trigger-click');
        }, this);
        this.triggers = ts.elements;
    },
    
    /***
     * onTrigger1Click
     * defer to std ComboBox trigger method
     */
    onTrigger1Click : function() {
        this.onTriggerClick();    
    },
    
    /***
     * onTrigger2Click 
     * this is the "add" button handler.  fire 'add' event     
     */
    onTrigger2Click : function() {
        this.fireEvent('add', {field: this, button: this.triggers[1]});        
    },
        
	/***
	 * insert
	 * provide a convenience method to insert ONE AND ONLY ONE record to the store.	 	 	 	 
	 * @param {Object} index
	 * @param {Object} data (
	 */
	insert : function(index, data) {
        this.reset();
        
        var rec = new this.store.recordType(data);                
        rec.id = rec.data.id; 
        this.store.insert(index, rec);
		this.setValue(rec.data.id);
		this.fireEvent('select', this, rec, index);        
	}
});