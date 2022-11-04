$( document ).ready(function() {

    
    const inject_css= function(){
        
        var f = document.getElementsByTagName("script")[0];
            var playerbs_css = document.createElement("link");
            playerbs_css.rel = "stylesheet";
            playerbs_css.href = "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets/css/kapow-playerbs.css";
            f.parentNode.insertBefore(playerbs_css, f);

           var snipps_css = document.createElement("link");
           snipps_css.rel = "stylesheet";
           snipps_css.href = "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets/css/text.css";
           f.parentNode.insertBefore(snipps_css, f);
   }    

   const inject_confetijs= function(){
    var f = document.getElementsByTagName("script")[0],
       j = document.createElement("script");
       j.async = true;
       //j.src = "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets/js/player-confetti-cannon.js";
       j.src = "https://assets.superpowerups.com/player-confetti-cannon.js";
       f.parentNode.insertBefore(j, f);
    }
   const inject_bsjs= function(){
    var f = document.getElementsByTagName("script")[0],
       j = document.createElement("script");
       j.async = true;
       j.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js";
       f.parentNode.insertBefore(j, f);
    }  
   const inject_sound= function(){
    var f = document.getElementsByTagName("script")[0],
       j = document.createElement("script");
       j.async = true;
       //j.src = "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@vlatest/js/playersnips-sound.js";
       j.src = "https://assets.superpowerups.com/playersnips-sounds.js";
       f.parentNode.insertBefore(j, f);
    }    
    
    // Course player
    if(typeof(CoursePlayerV2) !== 'undefined') {
      inject_css();
      inject_confetijs();
      inject_bsjs();
      inject_sound();
    } else {
        // not course player
        
    }

    
});