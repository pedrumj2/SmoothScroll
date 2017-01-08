/*
    Generates a smooth scroll effect for the document.
    The dispatch parameter is function you want to call on the
    onscroll event. For example like a parallex effect 
*/
var SmoothScroll = function(__dispatch){
    var _self = this;
    _self.private = {  
        busy : false, 
        //the scroll animation duration
        ANIMETIME : 300, 
        //The time left for the scroll animation
        animTimeLeft : -1, 
        //the amount of scroll left for the animation
        scrollLeft : -1, 
        pastTimeStamp : -1, 
        scrollTotal : -1, 
        scrollDone : true, 
        dopixel : 0, 
        count : 0, 
        dispatch : __dispatch, 
     
        set_handlers(){
            window.addEventListener('wheel',  INNER.wheel_handler);
        }, 
         
        wheel_handler(evt){
            evt.preventDefault();
            //If the animation is not occuring at the moment
            if (INNER.busy == false){
                INNER.scrollLeft =  evt.deltaY;
                INNER.scrollTotal =  evt.deltaY;
                INNER.animTimeLeft = INNER.ANIMETIME;
                INNER.pastTimeStamp = Date.now();
                INNER.busy = true;
                window.requestAnimationFrame(INNER.create_effect);
            }
            //if the animation is happening
            else{
                //if the new scroll is in the same direction
                if (INNER.scrollTotal*evt.deltaY> 0 ){
                    INNER.scrollLeft = INNER.scrollLeft + evt.deltaY;
                    INNER.scrollTotal = INNER.scrollTotal + evt.deltaY;
                }
                else{
                    //if they are not in the same direction you
                    //want to start the animation over again
                    INNER.scrollLeft =  evt.deltaY;
                    INNER.scrollTotal =  evt.deltaY;
                }
                INNER.animTimeLeft = INNER.ANIMETIME;
            }
        }, 
   
        create_effect(){
            if (INNER.scrollDone == true){
                INNER.scrollDone = false;
                var _timeDiff = Date.now() - INNER.pastTimeStamp;
                INNER.animTimeLeft =  INNER.animTimeLeft-_timeDiff;
                INNER.count = Math.floor(INNER.animTimeLeft/16)+1;
                INNER.dopixel =INNER.get_pixel_quad(INNER.scrollLeft, INNER.scrollTotal); 
                //This is a function you want to call on the on scroll event.
                INNER.dispatch();
                window.requestAnimationFrame(INNER.do_scroll);
                
            }
        }, 
        do_scroll(){
            window.scrollBy(0, INNER.dopixel);
            INNER.pastTimeStamp=Date.now();
            INNER.scrollLeft =INNER.scrollLeft-INNER.dopixel;
            INNER.scrollDone = true;
            if (INNER.count > 1){
                    window.setTimeout(INNER.create_effect, 4);
                }
                else{
                    INNER.busy = false;
                }
        }, 
        //An exponential decay function
        get_pixel_quad(__left, __total){
             var _x = -10*Math.log(Math.abs(__left/__total));
             var _new = (1-Math.exp(-0.1*(_x+1)))*__total;
             var _return = (__left-(__total-_new));
             return _return;
        }

    };
    var INNER = _self.private;
    _self.private.set_handlers();
}















