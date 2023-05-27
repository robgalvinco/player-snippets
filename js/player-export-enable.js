    const inject_player_export_tool_js = function () {
        var f = document.getElementsByTagName("script")[0],
          j = document.createElement("script");
        j.async = true;
        j.src =
          "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@latest/js/player-export.js";
        f.parentNode.insertBefore(j, f);
        j.addEventListener("load", function() {
            console.log("PLayer export tool enabled");
            
        });        
    };
inject_player_export_tool_js();
