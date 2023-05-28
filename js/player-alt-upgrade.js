/*
last release: <script src="https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.55/js/player-alt-upgrade.js" async></script>

expects 
kapow_player_alt_upgrades = [
    {
        courseid: "all",
        heading :"",
        subheading: "",
        btn_page:"",
        btn_text:"",
        no_thanks:""
    }
]

*/
$(document).ready(function () {
    var started_scan = false;
    var course = null;
    var is_free_trial = false;
    if(typeof(CoursePlayerV2) !== 'undefined' && typeof(kapow_player_alt_upgrades) !== 'undefined') {
        
        function anyalts(courseId) {
            for (let i = 0; i < kapow_player_alt_upgrades.length; i++) {
              if (kapow_player_alt_upgrades[i].courseid === courseId || kapow_player_alt_upgrades[i].courseid === "all") {
                return true;
              }
            }
            return false;
          }
          function findCourseObject(courseId) {
            let matchObject = null;
            
            for (let i = 0; i < kapow_player_alt_upgrades.length; i++) {
              if (kapow_player_alt_upgrades[i].courseid === courseId) {
                return kapow_player_alt_upgrades[i];
              }
              
              if (kapow_player_alt_upgrades[i].courseid === "all") {
                matchObject = kapow_player_alt_upgrades[i];
              }
            }
            
            return matchObject;
          }          

        function startScan() {
            console.log("Watching for upgrade.")
            var className = "content-blocked-modals__button-container"
            setInterval(function() {
                $('.' + className).each(function() {
                var anchor = $(this).find('a');
                
                if (anchor.length > 0) {
                    var alt = findCourseObject(course.id);
                    //console.log("found alt",alt);
                    if(alt!=null){
                        if(alt.heading!=""){
                            $("#playerModalTitle").text(alt.heading)
                        }
                        if(alt.subheading!=""){
                            $(".content-blocked-modals__content-container p").text(alt.subheading)
                        }   
                        if(alt.btn_page!=""){
                            $(".content-blocked-modals__button-container a").attr('href', alt.btn_page)
                        }
                        if(alt.btn_text!=""){
                            $(".content-blocked-modals__button-container a").text(alt.btn_text)
                        }
                        if(alt.no_thanks!=""){
                            $(".content-blocked-modals__button-container button").text(alt.no_thanks)
                        }

                    }
                    $('.player-modal__content').css('display', 'unset');
            
                    //anchor.attr('href', newhref);
                }
                });
            }, 250);
        }
        
     
      // check to see if we should scan (any alts, any free preview)
      // if so start scan
      CoursePlayerV2.on('hooks:contentDidChange', function(data) {
          
        console.log("data changed",data)
        course = data.course;
        is_free_trial = data.enrollment.is_free_trial;
        if(anyalts(data.course.id) && !started_scan && is_free_trial){
            started_scan= true;
            // hide content to avoid flickering
            $(body).append("<style>.player-modal__content{display:none;}</style>")
            startScan();
        }
      });
    }
  });
