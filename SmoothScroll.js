 */
var SmoothScroll = function(__dispatch){
    var _self = this;
    _self.private = {
        expected_top: -1,
        set_handlers : function(){
            INNER.scroll_ele = $("#content")[0];
            INNER.expected_top = $(INNER.scroll_ele).scrollTop();
            $(INNER.scroll_ele).on('wheel',  function(event){
                if (!event.ctrlKey){
                   INNER.wheel_handler(event)
                }
            });
        },

        wheel_handler : function(evt){
            evt.preventDefault();
            $(INNER.scroll_ele).stop(true, false);
            console.log(evt.mod);
            var _delta =  INNER.expected_top - $(INNER.scroll_ele).scrollTop();
            if (_delta *evt.deltaY > 0) {
                INNER.expected_top = $(INNER.scroll_ele).scrollTop();
            }
            $(INNER.scroll_ele).animate({scrollTop: INNER.expected_top  -evt.deltaY*evt.deltaFactor}, 500, 'easeOutSine');
            INNER.expected_top =INNER.expected_top  -evt.deltaY*evt.deltaFactor*2;
        }

    };
    var INNER = _self.private;
    _self.private.set_handlers();
};
$( document ).ready(function() {
    SmoothScroll(function(){})
});
