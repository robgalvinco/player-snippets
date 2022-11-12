$( document ).ready(function() {

    if(typeof(CoursePlayerV2) !== 'undefined') {
        const openPopup = function(ps_popup){
            console.log("opening pu",ps_popup,$("#ps-container-top").length,$("#ps-container-bottom").length);
            if(ps_popup.position=="top" && $("#ps-container-top").length==0){
                $("body").append('<div id="ps-container-top" style="position:fixed;z-index:9999;width:100%;top:4%">');
            }
            if(ps_popup.position=="bottom" && $("#ps-container-bottom").length==0){
                $("body").append('<div id="ps-container-bottom" style="position:fixed;z-index:9999;width:100%;bottom:4%">');
            }

            
            var html="";
            if(ps_popup.pu_type=="emoji_pill"){
                var animate_css = "animate__fadeInDownBig";
                if(ps_popup.position=="bottom"){
                    animate_css = "animate__fadeInUpBig"
                }
                html+='<div class="kapow-player kapow-popup-'+ps_popup.lesson_id+'">';
                html+='    <div class="pb-2">';
                html+='        <div class="';
                html+='                    animate__animated '+animate_css;
                html+='                    w-100 d-flex justify-content-center">';
                html+='            <div style="cursor:pointer;background-color:'+ps_popup.color_bg+';color:'+ps_popup.color_text+';" class="p-4 pill rounded-pill d-flex justify-content-center">';
                html+='             <span class="pe-2 pill-emoji">'+ps_popup.emoji+'</span> ';
                html +='            <span class="pill-text">'+ps_popup.heading+'</span></div>';
                html+='        </div>';
                html+='    </div>';
                html+='</div>';
            }
            if(html!="" && $(".kapow-popup-"+ps_popup.lesson_id).length==0){
                window.setTimeout(() => {
                    if(ps_popup.position=="top"){
                        $("#ps-container-top").append(html);
                    }
                    if(ps_popup.position=="bottom"){
                        $("#ps-container-bottom").append(html);
                    }
                    
                    if(ps_popup.autoclose!=0){
                        console.log("has autoclose",ps_popup.autoclose)
                        window.setTimeout(() => {
                            var id='.kapow-popup-'+ps_popup.lesson_id+' .animate__animated';
                            // console.log("closing",id);
                            $(id).addClass("animate__fadeOut");
                            $(id).html("");
                        }, ps_popup.autoclose*1000);
                    }

                    if(ps_popup.cta!=""){
                        $('.kapow-popup-'+ps_popup.lesson_id).click(function(){
                            if(ps_popup.cta_target=="new"){
                                window.open(ps_popup.cta);
                            } else {
                                window.location=ps_popup.cta;
                            }
                        })

                    }else {
                        $('.kapow-popup-'+ps_popup.lesson_id).click(function(){
                            var id='.kapow-popup-'+ps_popup.lesson_id+' .animate__animated';
                            // console.log("closing",id);
                            $(id).addClass("animate__fadeOut");
                            $(id).html("");
                        })
                    }
    

                }, ps_popup.delay*1000);
            }
        }
        CoursePlayerV2.on('hooks:contentWasCompleted', function(data) {
            // console.log("Content was completed",data);
            // check if any match in window.__playersnips_popups
            if(typeof(window.__playersnips_popups)!="undefined"){
                // console.log("window.__playersnips_popups",window.__playersnips_popups);
                window.__playersnips_popups.forEach(function(ps_popup){
                    // console.log("ps_popup",ps_popup);
                    if(ps_popup.course_id==data.course.id && ps_popup.lesson_id==data.lesson.id){
                        // console.log("found match",ps_popup);
                        openPopup(ps_popup)
                    }
                })
            }
        }); 
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
        //    console.log("Changed",data);
            window.setTimeout(function(){
               if($(".take .ps-popup").length>0){
                  $(".take .ps-popup").each(function(){
                        // console.log("Got Pop",$(this))
                        var trigger = "lesson_start"
                        if(typeof($(this).data("trigger"))!="undefined"){
                            trigger = $(this).data("trigger");
                        }  
                        var pu_type = "emoji-pill";                      
                        if(typeof($(this).data("pu-type"))!="undefined"){
                            pu_type = $(this).data("pu-type");
                        }                        
                        var ps_popup_options =     {
                            "course_id":data.course.id,
                            "lesson_id":data.lesson.id,
                            "pu_type":pu_type
                            }  
                        if(typeof($(this).data("color-bg"))!="undefined"){
                            ps_popup_options.color_bg = $(this).data("color-bg");
                        } else {
                            ps_popup_options.color_bg="#e9e9fd";
                        }                            
                        if(typeof($(this).data("color-text"))!="undefined"){
                            ps_popup_options.color_text = $(this).data("color-text");
                        } else {
                            ps_popup_options.color_text="#333333";
                        }                            
                        if(typeof($(this).data("delay"))!="undefined"){
                            ps_popup_options.delay = $(this).data("delay");
                        } else {
                            ps_popup_options.delay=1;
                        }
                        if(typeof($(this).data("autoclose"))!="undefined"){
                            ps_popup_options.autoclose = $(this).data("autoclose");
                        } else {
                            ps_popup_options.autoclose = 0;
                        }
                        if(typeof($(this).data("position"))!="undefined"){
                            ps_popup_options.position = $(this).data("position");
                        } else {
                            ps_popup_options.position = "top";
                        }
                        if(typeof($(this).data("cta"))!="undefined"){
                            ps_popup_options.cta = $(this).data("cta");
                        }  else {
                            ps_popup_options.cta ="";
                        }    
                        if(typeof($(this).data("cta-target"))!="undefined"){
                            ps_popup_options.cta_target = $(this).data("cta-target");
                        }  else {
                            ps_popup_options.cta_target ="new";
                        }    
                        if(typeof($(this).data("emoji"))!="undefined"){
                            ps_popup_options.emoji = $(this).data("emoji");
                        }  else {
                            ps_popup_options.emoji ="";
                        }    
                        if(typeof($(this).data("image_url"))!="undefined"){
                            ps_popup_options.image_url = $(this).data("image-url");
                        }  else {
                            ps_popup_options.image_url ="";
                        }   
                        if(typeof($(this).data("heading"))!="undefined"){
                            ps_popup_options.heading = $(this).data("heading");
                        }  else {
                            ps_popup_options.heading ="";
                        }  
                        if(typeof($(this).data("subheading"))!="undefined"){
                            ps_popup_options.subheading = $(this).data("subheading");
                        }  else {
                            ps_popup_options.subheading ="";
                        }  
                        if(typeof($(this).data("mp4"))!="undefined"){
                            ps_popup_options.mp4 = $(this).data("mp4");
                        }  else {
                            ps_popup_options.mp4 ="";
                        }  
                        if(typeof($(this).data("iframe"))!="undefined"){
                            ps_popup_options.iframe = $(this).data("iframe");
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