/**
 * Created by csm on 18/4/2.
 */
'use strict';
$(document).ready(function(){
    var sub=$('#sub');
    var activeRow;
    var activeMenu;
    var timer;
    var mouseInSub=false;


    sub.on('mouseenter',function(e){
        mouseInSub=true;
    }).on('mouseleave',function(e){
        mouseInSub=false;
    });

    var mouseTrack=[];
   var moveHandler=function(e){
       mouseTrack.push({
           x:e.pageX,
           y:e.pageY
       })

       if(mouseTrack.length>3){
           mouseTrack.shift();
       }

   }

    $('#test').on('mouseenter',function(){
        sub.removeClass('none');

        $(document).bind('mousemove',moveHandler);
    }).on('mouseleave',function(){
        sub.addClass('none');
        if(activeRow){
            activeRow.removeClass('active');
            activeRow=null;
        }
        if(activeMenu){
            activeMenu.removeClass('none');
            activeRow=null;
        }

        $(document).unbind('mousemove',moveHandler);
    }).on('mouseenter','li',function(e){
        if(!activeRow){
            activeRow=$(e.target).addClass('active');
            activeMenu=$('#'+activeRow.data('id'));
            activeMenu.removeClass('none');
            return;
        }

        if(timer){
            clearTimeout(timer);
        }
        var curMouse=mouseTrack[mouseTrack.length-1];
        var leftMouse=mouseTrack[mouseTrack.length-2];
        var delay=isNeedDealy(sub,curMouse,leftMouse);

        if(delay){
            timer=setTimeout(function(){

                if(mouseInSub){
                    return;
                }

                activeRow.removeClass('active');
                activeMenu.addClass('none');

                activeRow=$(e.target);
                activeRow.addClass('active');
                activeMenu=$('#'+activeRow.data('id'));
                activeMenu.removeClass('none');
                timer=null;
            },300)
        }else{
            activeRow.removeClass('active');
            activeMenu.addClass('none');

            activeRow=$(e.target);
            activeRow.addClass('active');
            activeMenu=$('#'+activeRow.data('id'));
            activeMenu.removeClass('none');

        }



    }).on('mouseleave')
})