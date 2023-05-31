
$(document).ready(function () {
    var downloads = []
    var autoscan = false;
    var finishedScan = false;
    var currentlessondata = {};
    function scanLesson(){
        $('a[data-lesson-id="'+currentlessondata.lesson.id+'"]').attr("data-auto-scanned","true");
        
        if(isDownloadLesson()){
            Swal.fire({
                title: 'We found a download lesson. Include these?',
                input: 'text',
                inputLabel: 'Tag with categories (seperated by a | symbol)',
                inputValue: "",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                console.log(result);
                if (result.isConfirmed) {
                    var categories = result.value;
                    Swal.fire({
                        title: 'Add additional keywords to this group',
                        input: 'text',
                        inputLabel: 'Tag with keywords (seperated by a | symbol)',
                        inputValue: "",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'Continue',
                        cancelButtonText: 'No',
                        
                    }).then((result) => {
                        var keywords = result.value;
                        getLessonDownloads(categories,keywords);
                    })
                    
                } else {
                    gotoNextUnscannedLesson();
                }
                
            })            
           
            
        } else {
            gotoNextUnscannedLesson();
        }        
    }
    function getLessonDownloads(categories, keywords){
        console.log("getting downloads")
        $('.course-player__download-files__list-item').each(function() {
            const nameElement = $(this).find('.course-player__download-files__label');
            const linkElement = $(this).find('a');
        
            const name = nameElement.text().trim();
            const link = linkElement.attr('href');
            const matchingImage = $('img[alt="' + name + '"]').first();
            const imageUrl = matchingImage.length ? matchingImage.attr('src') : '';
                  
            downloads.push({ name, link, imageUrl, categories, keywords });
        });     
        console.log(downloads);   
    }

    function exportToCSV() {
      
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'name,description,categories,linkUrl,imageUrl\n';
      
        downloads.forEach(function(item) {
          csvContent += `${item.name},,${item.categories},${item.link},\n`;
        });
      
        const encodedUri = encodeURI(csvContent);
        const link = $('<a>').attr({
          href: encodedUri,
          download: 'download_list.csv'
        }).css('display', 'none');
      
        $('body').append(link);
        link[0].click();
        link.remove();
    }  
    function isDownloadLesson(){
        if(currentlessondata.lesson.default_lesson_type_label=="Download" ){
            console.log("found download lesson")
            return true         
        } else {
            return false
        }
    }
    function start(){
        Swal.fire({
            imageUrl: "https://s3.amazonaws.com/thinkific-import/filestack-partner-portal/2QIv8OCvRnuBAeok10rq_Text%20Effects.png",
            imageWidth: 100,
            imageHeight: 100,
            title: 'Welcome to the Resource Library Export Tool',
            html: 'We will scan for download lessons and export a CSV file that you can use to import into your Resource Library 💥 Power Up.<br/><a href="https://docs-sitepagetemplates.superpowerups.com/the-collections/resource-library" target="_blank">View Help Guides</a>',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Begin Export'
            
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                autoscan=true;
                console.log("current lesson",currentlessondata);
                $(".content-item__progress--active a").first().attr("data-auto-scanned","true");
                gotoNextUnscannedLesson()
            } 
        })  
    }  
    const inject_swal = function () {
        var f = document.getElementsByTagName("script")[0],
          j = document.createElement("script");
        j.async = true;
        j.src =
          "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        f.parentNode.insertBefore(j, f);
        j.addEventListener("load", function() {
            // Script has finished loading
            console.log("Script loaded successfully");
            start();
            // You can now use the functionality provided by the script
        });        
    };
    function autoScanFinished(){
        if(downloads.length>0){
            exportToCSV();
            Swal.fire({
                imageUrl: "https://s3.amazonaws.com/thinkific-import/filestack-partner-portal/2QIv8OCvRnuBAeok10rq_Text%20Effects.png",
                imageWidth: 100,
                imageHeight: 100,
                title: 'You are ready for the next step',
                html: 'We just exported a CSV file <strong>with '+downloads.length+' items</strong> for you to enhance inside of Google Sheets and then use inside of the Resource Library 💥 PowerUp.',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Go To The Next Step',
                cancelButtontext:'Cancel'
                
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location="https://docs-sitepagetemplates.superpowerups.com/the-collections/resource-library/exporting-resources-from-a-course#step-3-import-the-csv-file-into-google-sheets";
                } 
            })    
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hmmm...',
                text: 'We did not find any downloads in this course. Be sure to have your downloads inside a Download Lesson type.!',
                footer: '<a href="https://docs-sitepagetemplates.superpowerups.com/the-collections/resource-library" target="_blank">Check the Help Guides</a>'
              })
        }
     
    }   
    const gotoNextUnscannedLesson = function(){
        console.log("finding next lesson");

        var all_scanned = true;
        var found_next = false;
        var found_href = "";
        $('a.course-player__content-item__link').each(function(){
            if(!$(this).attr("data-auto-scanned") && !found_next){
                found_href = $(this).attr("href");
                found_next = true;
                console.log("Found",$(this).attr("href"));
                all_scanned = false;
            }
        });

        console.log("Done checking. All scanned: "+all_scanned)
        if(found_next){
            var timeleft = 10;
            autoScanNumberofLessons = $('a.course-player__content-item__link').length;
            var numScanned = $('a.course-player__content-item__link[data-auto-scanned]').length; 
            
            var etop = $('a.course-player__content-item__link[href="'+found_href+'"]').offset().top;
            //var timeleft = 10;
            //var downloadTimer = setInterval(function(){
                //if(timeleft <= 0){
                  //clearInterval(downloadTimer);
                    $('a.course-player__content-item__link[href="'+found_href+'"]').click(); 
                //}
                //timeleft -= 1;
            //}, 1000);                            
            
        } else {
            finishedScan=true;
            console.log("******* ALL DONE ********", downloads)
            autoScanFinished();
        }
    }
      
    function init(){
        inject_swal();
      
    }
    if (typeof CoursePlayerV2 !== "undefined") {
        var loaded = false;
        if($(".course-player__preview-bar").length>0){
            if(!loaded){
                init();
                loaded=true;
            }            
        }
        CoursePlayerV2.on("hooks:contentDidChange", function (data) {
            //only activate for admins
            if($(".course-player__preview-bar").length>0){
                currentlessondata = data;
                // add lesson-id att
                $("a[href*='"+data.lesson.id+"']").attr("data-lesson-id",data.lesson.id);  
                if(!loaded){
                    init();
                    loaded=true;
                } else {
                    if(autoscan && !finishedScan){
                        scanLesson();
                    }
                    
                }          
            }

        });        
    }    
});
