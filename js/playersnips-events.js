$( document ).ready(function() {
    const __ps_events = [];
    const process_status = function(){
                // check to see if something changed
                const __ps_status = [];
                $(".course-player__content-item a").each(function(){
                    var href=$(this).attr("href");
                    var id = href.split("/")[5].split("-")[0];
                    var is_complete = $(this).parent().hasClass("content-item__progress--complete");        
                    __ps_status.push({
                        "lesson_id": id,
                        "is_complete": is_complete    
                    })
                });
                for (let index = 0; index < __ps_status.length; index++) {
                    if(__ps_status[index].is_complete != __ps_events[index].is_complete){
                        console.log("status changed",__ps_events[index], __ps_status[index]);
                        if(__ps_status[index].is_complete){
                            console.log("Lesson Completed",__ps_status[index]);
                        }
                        // set current status
                        __ps_events[index].is_complete =  __ps_status[index].is_complete;
                    }
                    
                }          
    }
    if(typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            if(__ps_events.length==0){
                // first time nothing changed
                $(".course-player__content-item a").each(function(){
                    var href=$(this).attr("href");
                    var id = href.split("/")[5].split("-")[0];
                    var is_complete = $(this).parent().hasClass("content-item__progress--complete");
        
                    __ps_events.push({
                        "lesson_id": id,
                        "is_complete": is_complete    
                    })
                });
                console.log("starting status",__ps_events);                
            } else {
                process_status();
            }
        });
        CoursePlayerV2.on('hooks:contentWasMarkedIncomplete', function(data) {
            process_status();
        });
        CoursePlayerV2.on('hooks:enrollmentWasCompleted', function(data) {
            process_status();
        });
        
    }
})