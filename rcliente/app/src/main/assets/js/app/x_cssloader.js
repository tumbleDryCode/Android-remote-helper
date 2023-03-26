var loadCssScript = function(path, callback) {
		// alert(loaded_scripts.length);
        n = path.lastIndexOf("/"); 
        q = path.lastIndexOf("?");
 
            var scr = document.createElement("link")
            scr.setAttribute("rel", "stylesheet")
            scr.setAttribute("type", "text/css")
            scr.href = path;
 
        var done = false;
        scr.onload = handleCssLoad;
        scr.onreadystatechange = handleCssReadyStateChange;
        scr.onerror = handleCssError;
        if (n >= 0) {
            if (q >= 0) {
                tid = path.substring(n + 1, q);
            } else {
                tid = path.substring(n + 1);
            }
            scr.id = tid;
        }
        document.getElementsByTagName("head")[0].appendChild(scr);
 
        function handleCssLoad() {
            if (!done) {
                done = true;
                callback(path, "ok");
            }
        }

        function handleCssReadyStateChange() {
            var state;
            if (!done) {
                state = scr.readyState;
                if (state === "complete") {
                    handleLoad();
                }
            }
        }

        function handleCssError() {
            if (!done) {
                done = true;
                callback(path, "error");
            }
        }
 
};

var checkCssLoader = function(thePath, theMessage) {
 ncc = "aa";
};
 


