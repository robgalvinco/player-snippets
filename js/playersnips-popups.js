$( document ).ready(function() {

    if(typeof(CoursePlayerV2) !== 'undefined') {
        const openPopup = function(ps_popup){
            console.log("opening pu",ps_popup);
            var html="";
            if(ps_popup.pu_type=="emoji_pill"){
                var position_css=ps_popup.position+ ":4%;"
                var animate_css = "animate__fadeInDownBig";
                if(ps_popup.position=="bottom"){
                    animate_css = "animate__fadeInUpBig"
                }
                html+='<div class="kapow-player kapow-popup-'+ps_popup.lesson_id+'">';
                html+='    <div style="position:fixed;z-index:9999;width:100%;'+position_css+'">';
                html+='        <div class="pu-002 ';
                html+='                    animate__animated '+animate_css;
                html+='                    w-100 d-flex justify-content-center">';
                html+='            <div class="p-4 pill rounded-pill d-flex justify-content-center">';
                html+='             <span class="pe-2 pill-emoji">'+ps_popup.emoji+'</span> ';
                html +='            <span class="pill-text">'+ps_popup.heading+'</span></div>';
                html+='        </div>';
                html+='    </div>';
                html+='</div>';
            }
            if(html!=""){
                window.setTimeout(() => {
                    $(body).append(html);
                }, ps_popup_options.delay*1000);
                if(ps_popup_options.autoclose!=0){
                    window.setTimeout(() => {
                        $('kapow-popup-'+ps_popup.lesson_id+' .animate__animated').addClass("fade");
                    }, ps_popup_options.autoclose*1000);
                }
            }
        }
        CoursePlayerV2.on('hooks:contentWasCompleted', function(data) {
            console.log("Content was completed",data);
            // check if any match in window.__playersnips_popups
            if(typeof(window.__playersnips_popups)!="undefined"){
                console.log("window.__playersnips_popups",window.__playersnips_popups);
                window.__playersnips_popups.forEach(function(ps_popup){
                    console.log("ps_popup",ps_popup);
                    if(ps_popup.course_id==data.course.id && ps_popup.lesson_id==data.lesson.id){
                        console.log("found match",ps_popup);
                        openPopup(ps_popup)
                    }
                })
            }
        }); 
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            window.setTimeout(function(){
               if($(".take .ps-popup").length>0){
                  $(".take .ps-popup").each(function(){
                        var trigger = $(this).data("trigger");
                        var pu_type = $(this).data("tf-type");
                        var ps_popup_options =     {
                            "course_id":data.course.id,
                            "lesson_id":data.lesson.id,
                            "id":id,
                            "pu_type":pu_type
                            }  
                        if(typeof($(this).data("pu-color-bg"))!="undefined"){
                            ps_popup_options.color_bg = $(this).data("pu-color-bg");
                        } else {
                            ps_popup_options.color_bg=0;
                        }                            
                        if(typeof($(this).data("pu-color-text"))!="undefined"){
                            ps_popup_options.color_bg = $(this).data("pu-color-text");
                        } else {
                            ps_popup_options.color_bg=0;
                        }                            
                        if(typeof($(this).data("pu-delay"))!="undefined"){
                            ps_popup_options.delay = $(this).data("pu-delay");
                        } else {
                            ps_popup_options.delay=0;
                        }
                        if(typeof($(this).data("pu-autoclose"))!="undefined"){
                            ps_popup_options.autoclose = $(this).data("pu-autoclose");
                        } else {
                            ps_popup_options.autoclose = 0;
                        }
                        if(typeof($(this).data("pu-position"))!="undefined"){
                            ps_popup_options.position = $(this).data("pu-position");
                        } else {
                            ps_popup_options.position = "top";
                        }
                        if(typeof($(this).data("pu-cta"))!="undefined"){
                            ps_popup_options.cta = $(this).data("pu-cta");
                        }  else {
                            ps_popup_options.cta ="";
                        }    
                        if(typeof($(this).data("pu-emoji"))!="undefined"){
                            ps_popup_options.emoji = $(this).data("pu-emoji");
                        }  else {
                            ps_popup_options.emoji ="";
                        }    
                        if(typeof($(this).data("pu-image_url"))!="undefined"){
                            ps_popup_options.image_url = $(this).data("pu-image_url");
                        }  else {
                            ps_popup_options.image_url ="";
                        }   
                        if(typeof($(this).data("pu-heading"))!="undefined"){
                            ps_popup_options.heading = $(this).data("pu-heading");
                        }  else {
                            ps_popup_options.heading ="";
                        }  
                        if(typeof($(this).data("pu-subheading"))!="undefined"){
                            ps_popup_options.subheading = $(this).data("pu-subheading");
                        }  else {
                            ps_popup_options.subheading ="";
                        }  
                        if(typeof($(this).data("pu-mp4"))!="undefined"){
                            ps_popup_options.mp4 = $(this).data("pu-mp4");
                        }  else {
                            ps_popup_options.mp4 ="";
                        }  
                        if(typeof($(this).data("pu-iframe"))!="undefined"){
                            ps_popup_options.iframe = $(this).data("pu-iframe");
                        }  else {
                            ps_popup_options.iframe ="";
                        }                                                                                                                                                                                                            
                        
                      if(trigger=="lesson_complete"){
                        if(typeof(window.__playersnips_popups)!="undefined" ){
                            
                        } else {
                            window.__playersnips_popups=[];
                        }     
                        var already_added = false;
                        window.__playersnips_popups.forEach(function(ps_popup){
                            if(ps_popup.course_id==data.course.id && ps_popup.lesson_id==data.lesson.id){
                                already_added = true; 
                                
                            }
                        })
                        if(!already_added){
                            window.__playersnips_popups.push(ps_popup_options);    
                        }
                        
                      } 
                      if(trigger=="lesson_start"){ 
                        openPopup(ps_popup_options);
                      }
                      
                      
                  })             
               }            
            }, 1000)           
    
    
        });      
    
     } else {
         // not course player do nothing         
     }     
 });