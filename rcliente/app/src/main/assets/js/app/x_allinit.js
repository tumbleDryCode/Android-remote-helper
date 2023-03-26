var isPhP = "no";
var isJApp = "no"; 
var isJavaFx = "no";
var cweb = "noQvalue";
var currDocHref = document.location.href;

// Various Scripts pertaining to the pages.
var onlyNums = new RegExp(/^\d{10}$/); // allow only numbers 
// var pipeDir = "http://localhost/evenflow/webdroid/assets/quickorder/";
var jscssprefix = ""; // used with the yui javascript-css compressor in boil folder
var pipeDir = "noQvalue";
var forceCache = "no";
var currCacheVer = "1";
var timeout_handles = [];
var loaded_scripts = [];
var loaded_streams = [];
var arrUprefs = []; // prefs array from the cookie
var arrSprefs = {};
arrSprefs = {"layout":"default","alayout":"default","sia":"y"};
var arrSTmpprefs = {};
arrSTmpprefs = {"layout":"default","alayout":"default","sia":"y"};
var currPrefPrdV = "g"; // grid layout preference
var currPrefPrdP = "a"; // price order preference
var currInfoStr = ""; // above saved as html string
var trgr_bclck = [];
var canLoad = "no";
var quid = 0;
var qtype = "guest";
var pid = "index_main";
var ppid = 0;
var cid = 0;
var catid = 0;
var itemid = 0;
var threadid = 0;
var pgpq = "noQvalue";
var arrDBnDocFNames = []; 
var arrDBnDocFNVpar = [];
var arrDBFNames = [];
var arrAllForms = [];
var tmpSQBArr = [];
var tmpVindex = 0; 
var ntImgCtr = []; // array counter for images
var currMresp = "";
var content = "noQvalue";
var cartID = "noQvalue"
var currDBUGstr = "";
var currMenuObj;
var currACTBstr = "";
var currMenuArr = [];
var currItemArr = [];
var currItemsArr = [];
var currCartIArr = [];
var currMsgsIArr = [];
var currMediaBtnPrfx = "";
var currMediaBtnCB = "finishImgUload";
var currMediaFldr = "msgimgs";
var tmpMediaFldr = "msgimgs";
var currCartStr = "";
var currCartIttl = 0;
var currCartTtl = 0;
var currCartTShow = "no"; 
var currMItemsArr = [];
var currProdsArr = [];
var currQcommsArr = [];
var currFrmQArr = [];
var currPgTitle = "";
var currAdmnMode = "n";
var currImgSleep = 280; // sleeping before setting image source
var currUrlArr = {};
var currCnxOb = {};
var currFFieldOb = {};
var currFFinitArr = [];
var currPgIndex = 0; // pagination starts at 1
var currProdsPPg = 10; // pagination  - number of items per page
var currMCollItems = {}; // all links object found in x_menu
var stxt = []; // languge file strings found in aa-en_us.js
var svtxt = []; // array of language strings
var usrlang = "en_us"; // user language
var currSearchType = "products"; // companies (qco db table), messages (qmsgs, qmsg), etc;
var actbSearch;
var actbLoaded = false; // boolean show js_actb.js  is loaded
var shopDir = document.location.href;
var spinTextDiv = document.createElement("div");
var currSpinText = "noQvalue";
var currSpinType = "small";
var currSpinHtml = "noQvalue";
var currSpinTarget = "noQvalue";
var currIContent = "y"; // ajax request to include the tplates/... file or not 
var currLBoxDiv = "";  
var currLBoxDPar = "";
var currRcntActStr = ""; // recent activity set as cookie string ie., seen products or searches 
var currRcntActArr = []; // recent activity parsed as array of objects from cookie string 
var currRcntActHstr = "";
var currVRPCLIresp = "";
var currRcntFavsStr = "";
var currRcntFavsArr = [];
var currSctrsArr = [];
var currSctrsObj = {};
var currFavsIdstr = "";
var currSortIdx = {};
var currGSarr = [];
var currAppMStr = "No message yet";
var svftObj = {}; // the object that holds key value lang pairs for form dropdowns etc.
var currMLinksObj = {}; // the main links object used in x_menu.js
var currDefUPArr = [];  // user permissions array
var currUPrmsArr = [];  // user permissions array
var currNavLksObj = {};

path = shopDir;
n = path.lastIndexOf("/");
q = path.lastIndexOf("?");
if (n >= 0) {
shopDir = path.substring(0, n+ 1);
} else {
shopDir += "/";
}
if(currDocHref.indexOf("http") != -1) {
isPhP = "y";
}



var getCurrUrl = function() {
var strTurl = "noQvalue";
strCurl = document.location.href;

if(strCurl.indexOf("?") != -1) {
strTurl = strCurl.substring(strCurl.indexOf('?') + 1);
}
// alert("getCurrUrl: " + strTurl);
if(isPhP == "no") {
try  {
strTurl = app.getCurrPageVars("nada");
document.getElementById("fldChallArray").value = strTurl;
strTurl = document.getElementById("fldChallArray").value;
// alert("getCurrUrl strTurl no php: " + strTurl);
} catch(e) {
alert("getCurrUrl: " + e);
}
}
return strTurl;
// if(strTurl == "noQvalue") {} else {}
// newArr = JSSHOP.shared.urlToArray(strTurl);
};


if(!window.JSSHOP){
var JSSHOP = new Object();
}

JSSHOP.loadScript = function(path, callback, filetype) {
		// alert(loaded_scripts.length);
        n = path.lastIndexOf("/");
        q = path.lastIndexOf("?");
        if (filetype == "js") { //if filename is a external JavaScript file
            var scr = document.createElement('script');
            scr.setAttribute("type", "text/javascript")
            scr.src = path;
        } else if (filetype == "css") { //if filename is an external CSS file
            var scr = document.createElement("link")
            scr.setAttribute("rel", "stylesheet")
            scr.setAttribute("type", "text/css")
            scr.href = path;
        } else {
            var scr = document.createElement('script');
            scr.setAttribute("type", "module")
            scr.src = path;
	  }
        var done = false;
        scr.onload = handleLoad;
        scr.onreadystatechange = handleReadyStateChange;
        scr.onerror = handleError;
        if (n >= 0) {
            if (q >= 0) {
                tid = path.substring(n + 1, q);
            } else {
                tid = path.substring(n + 1);
            }
            scr.id = tid;
        }
        document.getElementsByTagName("head")[0].appendChild(scr);
        // document.body.appendChild(scr);
        function handleLoad() {
            if (!done) {
                done = true;
                callback(path, "ok");
            }
        }

        function handleReadyStateChange() {
            var state;
            if (!done) {
                state = scr.readyState;
                if (state === "complete") {
                    handleLoad();
                }
            }
        }

        function handleError() {
            if (!done) {
                done = true;
                callback(path, "error");
            }
        }
     try {   } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.loadScript");
    }
};

JSSHOP.checkLoader = function(thePath, theMessage) {
    try {
        ttlLoaded = loaded_scripts.length;
        loaded_scripts[ttlLoaded] = thePath;
        //  alert(loaded_scripts[ttlLoaded] + " :: " + loaded_scripts.length + "msg: " + theMessage);
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.checkLoader");
    }
};

 
/* ajax
*/

if (!window.JSSHOP.ajax) {
    JSSHOP.ajax = new Object();
}


	JSSHOP.ajax.doNuAjaxPipe = function(theElem,pUrl,tmpCB) {
		try {
		   var oReq = JSSHOP.ajax.createXMLHTTPObject();
		 //  oReq.setRequestHeader("connection", "close");
		 tUTA = JSSHOP.shared.urlToArray(pUrl);
		   if(oReq == false) {
				   tmpCB(theElem,"Error",tUTA);

		  } else {
			oReq.onreadystatechange = function() {
				if (oReq.readyState == 4) {

				//  return oReq.responseText;
			  if(theElem == "give") {  } 
				   tmpCB(theElem,oReq.responseText,tUTA);
				}  
			}
			oReq.onerror = function() {
								   tmpCB(theElem,oReq.responseText,tUTA);
				  alert("yikes, we have a connection problem...");
	 
			}
			oReq.open("GET", pUrl, true);
			picr = oReq.send(null);
		   }
			} catch (e) { 
			alert("doNuAjaxPipe: " + e);
				   tmpCB(theElem,"Error: " + e,tUTA);
			  }
	};
	
	
/* cookies
*/

if (!window.JSSHOP.cookies) {
    JSSHOP.cookies = new Object();
}

JSSHOP.cookies.getCookie = function(check_name) {
var cretval;
var tval;
// if(isPhP == "no") {
if((isPhP == "no") || (isJavaFx == "ayes")) {

try {
if(check_name == "quid") {
tval = app.fetchConfValInt(check_name);
} else {
tval = app.fetchConfValString(check_name);
}

fldChallArray.value = tval;
cretval = fldChallArray.value;
// alert("getCookie.isJavaFx: " + cretval + tval);
	// alert("getCookie.isJavaFx: " + check_name + cretval);
// default null string for android preferences

if(cretval == "noQvalue")  { 
return null;
} else {
return cretval;
}
} catch(e) {
alert("getCookie: " + e);
return null;
}

} else {


	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}

}
};


JSSHOP.cookies.setCookie = function(name,value,expires,path,domain,secure) 
{

// if(isPhP == "no") {

if((isPhP == "no") || (isJavaFx == "ayes")) {
try {

if(name == "quid") {
app.setConfValInt(name,value);
} else {
app.setConfValString(name,value); 
}
} catch(e) {
alert("setCookie.E: " + e)
}

} else {
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );
/*
if the expires variable is set, make the correct 
expires time, the current script below will set 
it for x number of days, to make it for hours, 
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );
document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
( ( path ) ? ";path=" + path : "" ) + 
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );

}
};

JSSHOP.cookies.deleteCookie = function(name,path,domain) {
// if(isPhP == "no") {
if((isPhP == "no") || (isJavaFx == "ayes")) {
try {

if(name == "quid") {
app.setConfValInt(name,0);
} else {
app.setConfValString(name,"noQvalue"); 
}
} catch(e) {
alert("setCookie.E: " + e)
}

} else {
if(JSSHOP.cookies.getCookie(name)) document.cookie = name + "=" + ( ( path ) ? ";path=" + path : "") + ( ( domain ) ? ";domain=" + domain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
};


 
if (!window.JSSHOP.shared) {
    JSSHOP.shared = new Object();
}

JSSHOP.shared.endsWith = function(str,suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};



JSSHOP.shared.urlToArray = function(urla) {
// alert(url);
    try {
	    urlb = urla.replace("%","");
	    urlc = urlb.replace("%","");
	    url = urlc;
        var request = {};
        var arr = [];
        var pairs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');

          //check we have an array here - add array numeric indexes so the key elem[] is not identical.
          if(JSSHOP.shared.endsWith(decodeURIComponent(pair[0]), '[]') ) {
              var arrName = decodeURIComponent(pair[0]).substring(0, decodeURIComponent(pair[0]).length - 2);
              if(!(arrName in arr)) {
                  arr.push(arrName);
                  arr[arrName] = [];
              }

              arr[arrName].push(decodeURIComponent(pair[1]));
              request[arrName] = arr[arrName];
          } else {
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
        }
        return request;
    } catch (e) {
	alert("JSSHOP.shared.urlToArray: " + e);
       //  JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.urlToArray");
        return "noQvalue";
    }

    };






JSSHOP.shared.strToObj = function(url) {
// alert(url);
    try {
        var request = {};
        var arr = [];
        var pairs = url.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');

          //check we have an array here - add array numeric indexes so the key elem[] is not identical.
          if(JSSHOP.shared.endsWith(decodeURIComponent(pair[0]), '[]') ) {
              var arrName = decodeURIComponent(pair[0]).substring(0, decodeURIComponent(pair[0]).length - 2);
              if(!(arrName in arr)) {
                  arr.push(arrName);
                  arr[arrName] = [];
              }

              arr[arrName].push(decodeURIComponent(pair[1]));
              request[arrName] = arr[arrName];
          } else {
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
        }
        return request;
    } catch (e) {
	// alert(e);
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.urlToArray");
        return "noQvalue";
    }

    };




currUrlArr = JSSHOP.shared.urlToArray(getCurrUrl()); 
if(currUrlArr.debug) {
JSSHOP.loadScript("js/fl/chrome-extension-beta/firebug-lite-beta.js", JSSHOP.checkLoader,"js");
}

try {
tmpNvstr = navigator.userAgent;
if(tmpNvstr.indexOf("JavaFX") != -1) {
isJavaFx = "yes";
JSSHOP.loadScript("css/x_japp.css", JSSHOP.checkLoader,"css");

}
} catch(e) {
alert("x_japp.css faied: "+ e);
}


function urlToArray(urla) {
// alert(url);
    try {
	    urlb = urla.replace("%","");
	    urlc = urlb.replace("%","");
	    url = urlc;
        var request = {};
        var arr = [];
        var pairs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');

          //check we have an array here - add array numeric indexes so the key elem[] is not identical.
          if(JSSHOP.shared.endsWith(decodeURIComponent(pair[0]), '[]') ) {
              var arrName = decodeURIComponent(pair[0]).substring(0, decodeURIComponent(pair[0]).length - 2);
              if(!(arrName in arr)) {
                  arr.push(arrName);
                  arr[arrName] = [];
              }

              arr[arrName].push(decodeURIComponent(pair[1]));
              request[arrName] = arr[arrName];
          } else {
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
        }
        return request;
    } catch (e) {
	// alert(e);
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.urlToArray");
        return "noQvalue";
    }

    }
	
	
var dw = function(theElem, tStr) { theElem.innerHTML = tStr; };

var nuDW = function(theElem) { 
if(theElem.getAttribute("data-isscript") != null) {
try {
tDison = theElem.getAttribute("data-isscript");
eval(tDison);
} catch(e) {
alert("nuDW-EVAL: " + tDison + "::" + e);
}
} else if(theElem.getAttribute("data-ison") != null) {
try {
tDison = theElem.getAttribute("data-ison");
theElem.innerHTML = eval(tDison);
} catch(e) {
alert("nuDW: " +tDison + "::" + e);
}
}
};

var getFArr = function() {
return new Array("index_header", "index_nav", "index_main", "index_footer");
};
var pfBoot = function(theElem, theResp, marble) {
console.log("seq.pfBoot");
document.getElementById(theElem).innerHTML = theResp;
setTimeout("doBootLoad()", 800);
};