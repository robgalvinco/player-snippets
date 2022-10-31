$( document ).ready(function() {

    
    const inject_css= function(){
        
        var f = document.getElementsByTagName("script")[0];
            var playerbs_css = document.createElement("link");
            playerbs_css.rel = "stylesheet";
            playerbs_css.href = "https://assets-robgalvinco.netlify.app/playersnips/kapow-playerbs.css";
            f.parentNode.insertBefore(playerbs_css, f);

           var snipps_css = document.createElement("link");
           snipps_css.rel = "stylesheet";
           snipps_css.href = "https://assets-robgalvinco.netlify.app/playersnips/text.css";
           f.parentNode.insertBefore(snipps_css, f);
   }     
    
    // Course player
    if(typeof(CoursePlayerV2) !== 'undefined') {
      inject_css();
    } else {
        // not course player
        
    }

    
});