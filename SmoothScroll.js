/*
    Generates a smooth scroll effect for the document. 
*/
var SmoothScroll = function(){
    var _self = this;
    _self.private = {  
        busy : false, 
        //the scroll animation duration
        ANIMETIME : 400, 
        //The time left for the scroll animation
        animTimeLeft : -1, 
        //the amount of scroll left for the animation
        scrollLeft : -1, 
        pastTimeStamp : -1, 
        scrollTotal : -1, 
     
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
            var _timeDiff = Date.now() - INNER.pastTimeStamp;
            INNER.animTimeLeft =  INNER.animTimeLeft-_timeDiff;
            var _count = Math.floor(INNER.animTimeLeft/16)+1;
            var _pixel =INNER.get_pixel_quad(INNER.scrollLeft, INNER.scrollTotal); 
            window.scrollBy(0, _pixel);
            if (_count > 1){
                window.requestAnimationFrame(INNER.create_effect);
                INNER.pastTimeStamp=Date.now();
                INNER.scrollLeft =INNER.scrollLeft-_pixel;
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















