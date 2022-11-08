$( document ).ready(function() {

    if(typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentWasCompleted', function(data) {
        }); 
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            window.setTimeout(function(){
               if($(".take .ps-lottie-inline").length>0){
                  $(".take .ps-lottie-inline").each(function(){
                      var lotti_json=$(this).data("src");
                      var lottie_html = '<lottie-player src="'+lotti_json+'"  background="transparent"  speed="1"  style="width: 100%;"  loop  autoplay></lottie-player>';
                      $(this).html(lottie_html);
                  })             
               }            
            }, 100)           
        });      
    
     } else {
         // not course player do nothing         
     }     
 });