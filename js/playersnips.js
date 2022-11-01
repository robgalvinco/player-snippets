/* MAKE SURE TO COPY TO GLITCH
https://glitch.com/edit/#!/assets-superpowerups?path=public%2Fplayersnips.js%3A27%3A3
*/

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

   const inject_js= function(){
    var f = document.getElementsByTagName("script")[0],
       j = document.createElement("script");
       j.async = false;
       j.src = "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets/js/player-confetti-cannon.js";
       f.parentNode.insertBefore(j, f);
}
    
    // Course player
    if(typeof(CoursePlayerV2) !== 'undefined') {
      inject_css();
      inject_js();
    } else {
        // not course player
        
    }

    
});