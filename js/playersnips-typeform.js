$( document ).ready(function() {

    if(typeof(CoursePlayerV2) !== 'undefined') {
        const openTypeform = function(ps_typeform){
            if(typeof(window._ps_tf_last)=="undefined"){
                window._ps_tf_last = {
                    id: ps_typeform.id
                }
                if(ps_typeform.tf_type=="popup"){
                    window._ps_tf_last.tf.createPopup(ps_typeform.id)
                }
                if(ps_typeform.tf_type=="slider"){
                    window._ps_tf_last.tf.createSlider(ps_typeform.id)
                }
                if(ps_typeform.tf_type=="sidetab"){
                    window._ps_tf_last.tf.createSidetab(ps_typeform.id)
                }
                if(ps_typeform.tf_type=="popover"){
                    window._ps_tf_last.tf.createPopover(ps_typeform.id)
                }
            } else {
                //open new typeform if not same
                if(window._ps_tf_last.id !=ps_typeform.id){
                    if(typeof(window._ps_tf_last.unmount())!="undefined"){
                        window._ps_tf_last.unmount();
                    }
                    if(ps_typeform.tf_type=="popup"){
                        window._ps_tf_last.tf.createPopup(ps_typeform.id)
                    }
                    if(ps_typeform.tf_type=="slider"){
                        window._ps_tf_last.tf.createSlider(ps_typeform.id)
                    }
                    if(ps_typeform.tf_type=="sidetab"){
                        window._ps_tf_last.tf.createSidetab(ps_typeform.id)
                    }
                    if(ps_typeform.tf_type=="popover"){
                        window._ps_tf_last.tf.createPopover(ps_typeform.id)
                    }    
                }
                window._ps_tf_last.id =ps_typeform.id;
            }
        }
        CoursePlayerV2.on('hooks:contentWasCompleted', function(data) {
            console.log("Content was completed",data);
            // check if any match in window.__playersnips_tf
            if(typeof(window.__playersnips_tf)!="undefined"){
                console.log("window.__playersnips_tf",window.__playersnips_tf);
                window.__playersnips_tf.forEach(function(ps_typeform){
                    console.log("ps_typeform",ps_typeform);
                    if(ps_typeform.course_id==data.course.id && ps_typeform.lesson_id==data.lesson.id){
                        console.log("found match",ps_typeform);
                        openTypeform(ps_typeform)
                    }
                })
            }
        }); 
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            window.setTimeout(function(){
               if($(".take .ps-typeform").length>0){
                  $(".take .ps-typeform").each(function(){
                      var id=$(this).data("id");
                      var trigger = $(this).data("trigger");
                      var tf_type = $(this).data("tf_type");
                      var ps_typeform_options =     {
                        "course_id":data.course.id,
                        "lesson_id":data.lesson.id,
                        "id":id,
                        "tf_type":tf_type
                        }   
                      if(trigger=="lesson_complete"){
                        if(typeof(window.__playersnips_tf)!="undefined" ){
                            
                        } else {
                            window.__playersnips_tf=[];
                        }     
                        var already_added = false;
                        window.__playersnips_tf.forEach(function(ps_typeform){
                            if(ps_typeform.course_id==data.course.id && ps_typeform.lesson_id==data.lesson.id){
                                already_added = true; 
                                
                            }
                        })
                        if(!already_added){
                            window.__playersnips_tf.push(ps_typeform_options);    
                        }
                        
                      } 
                      if(trigger=="lesson_start"){ 
                        openTypeform(ps_typeform);
                      }
                      
                      
                  })             
               }            
            }, 1000)           
    
    
        });      
    
     } else {
         // not course player do nothing         
     }     
 });