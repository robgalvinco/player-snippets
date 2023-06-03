/*
PowerUps by Rob Galvin
https://www.superpowerups.com
This will inject a permanent call to action into the course player
*/

$(document).ready(function () {
    var injected = false;
    var course = null;
    if(typeof(CoursePlayerV2) !== 'undefined' && typeof(kapow_player_ctas) !== 'undefined') {
        const inject_css = function () {
            var f = document.getElementsByTagName("script")[0];
            var playerbs_css = document.createElement("link");
            playerbs_css.rel = "stylesheet";
            playerbs_css.href =
              "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@vlatest/css/player-cta.css";
            f.parentNode.insertBefore(playerbs_css, f);
        

          };   
          inject_css();     
        function anyMatches(courseId) {
            for (let i = 0; i < kapow_player_ctas.length; i++) {
              if (kapow_player_ctas[i].courseid === courseId || kapow_player_ctas[i].courseid === "all") {
                return true;
              }
            }
            return false;
          }
        function findCourseObject(courseId) {
        let matchObject = null;
        
        for (let i = 0; i < kapow_player_ctas.length; i++) {
            if (kapow_player_ctas[i].courseid === courseId) {
            return kapow_player_ctas[i];
            }
            
            if (kapow_player_ctas[i].courseid === "all") {
            matchObject = kapow_player_ctas[i];
            }
        }
        
        return matchObject;
        }          

        function getLocation(placement){
            var location = ".course-progress__inner-container"; //under progress bar
            return location;
        }

        function generateButtonHTML(href, buttonText) {
            var cleanedButtonText = buttonText.replace(/\n/g, '').replace(/'/g, '&#39;');
            var htmlString = '<div style="padding: 16px 0;"><a href="' + href + '" target="_blank" class="brand-color__background brand-color__dynamic-text _button--default--small_142a8m _button--icon-right--small_142a8m" style="width:100%;text-decoration:none;"><div class="_content__container_142a8m" style="width:100%;justify-content: center;"><span>' + cleanedButtonText + '</span><i aria-hidden="true" class="toga-icon toga-icon-arrow-right"></i></div></a></div>';
            return htmlString;
          }
          
        function generateImageHTML(source,href) {
            var htmlString = '<img src="'+source+'" style="width:100%"/>';
            if(href!=""){
                htmlString = '<a href="'+href+'" target="_blank">'+htmlString+'</a>';
            }
            htmlString = '<p>'+htmlString+'</p>';
            return htmlString;
        }          

        function addAsCard(html,use_padding){
            // Select the parent div
            var parentDiv = $('.course-player__course-navigation').first();
            var padding = "section"
            if(!use_padding){
                padding = "div"
            }

            var card_html = '<div class="kapow_cta__card_container"><'+padding+'>'+html+'</'+padding+'></div>'
            // Inject the HTML after the first child div
            parentDiv.children('div:first-child').after(card_html);            
        }
        function addHtmlToPage(cta,html){
            if(cta.location=="card"){
                addAsCard(html,true)
            } 
            if(cta.location=="card_full"){
                addAsCard(html,false)
            } 
            if(cta.location=="under_progress"){
                var csslocation = getLocation(cta.location);
                $(csslocation).append(html);
            }
        }
        function injectCta(cta){
            var html=cta.html;
            if(cta.type=="html"){
               
            }
            if(cta.type=="button"){
                html = generateButtonHTML(cta.btn_page,cta.btn_text);
            }   
            if(cta.type=="image"){
                html = generateImageHTML(cta.image_url,cta.btn_page);
            }    
            addHtmlToPage(cta,html) ;                  
        }

        
     
      // check to see if we should scan (any alts, any free preview)
      // if so start scan
      CoursePlayerV2.on('hooks:contentDidChange', function(data) {
          
        course = data.course;
        if(anyMatches(course.id) && !injected ){
            injected= true;
            var match = findCourseObject(course.id);
            injectCta(match);                    
        }
      });
    }
  });
