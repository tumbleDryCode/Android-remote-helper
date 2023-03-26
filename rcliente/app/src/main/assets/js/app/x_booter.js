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
var quid = 0;
var content = "noQvalue";
var cartID = "noQvalue"
var currRQstr =  "noQvalue";
var currRQdb = "evenflow-local";  // the custom title given to database in javafx database properties dialog
var currRQtable = "qitem";
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
var currMCollItems = {}; // the acual menu button collection links object
var stxt = []; // languge file strings found in aa-en_us.js
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
var currLBoxDiv = ""; // ajax request to include the tplates/... file or not 
var currLBoxDPar = "";
var currRcntActStr = ""; // recent activity set as cookie string ie., seen products or searches 
var currRcntActArr = []; // recent activity parsed as array of objects from cookie string 
var currRcntActHstr = "";
var currVRPCLIresp = "";
var currRcntFavsStr = "";
var currRcntFavsArr = [];
var currSctrsArr = [];
var currFavsIdstr = "";
var currSortIdx = {};
var currGSarr = [];


path = shopDir;
n = path.lastIndexOf("/");
q = path.lastIndexOf("?");
if (n >= 0) {
shopDir = path.substring(0, n+ 1);
} else {
shopDir += "/";
}


var doNadaAlert = function(tmpa, tmpb, tmpc) {
alert("doNadaAlert: " + tmpb);
};
 
var doNada = function(tmpa, tmpb, tmpc) {
};
var donada = function(tmpa, tmpb, tmpc) {
};

function doDummyFocus() {
setTimeout("chkbxDummy.focus()", 500);
}
if(!window.JSSHOP){
var JSSHOP = new Object();
}

var getFrcCacheRLoad = function(tmpDRV) {
if(currUrlArr.fc){
return currUrlArr.fc;
} else {
return tmpDRV;
}
};

try {
tmpNvstr = navigator.userAgent;
if(tmpNvstr.indexOf("JavaFX") != -1) {
isJavaFx = "yes";
}
} catch(e) {
}

 

// creates a form component object for uniform
// events and validation
var nCurrFFieldOb = function() {
aCurrFFieldOb = null;
aCurrFFieldOb= {};
aCurrFFieldOb["fid"] = "noQvalue"; // field id
aCurrFFieldOb["fty"] = "noQvalue"; // field type - for future use
aCurrFFieldOb["fdc"] = "cls_input_text"; // field default class
aCurrFFieldOb["ffc"] = "cls_input_text cls_input_text_focus"; // field focus class
aCurrFFieldOb["fdv"] = "noQvalue"; // field default value
aCurrFFieldOb["fda"] = "false"; // field allow validation of default value - default is false
aCurrFFieldOb["fvr"] = "noQvalue"; // field validation - raw regex
aCurrFFieldOb["fve"] = "noQvalue"; // field validation error text
aCurrFFieldOb["fof"] = "noQvalue"; // field onfocus
aCurrFFieldOb["fob"] = "noQvalue"; // field onblur
aCurrFFieldOb["fcl"] = "noQvalue"; // click
aCurrFFieldOb["fku"] = "noQvalue"; // keyup
aCurrFFieldOb["fkd"] = "noQvalue"; // keydown
aCurrFFieldOb["lid"] = "noQvalue"; // labelid
aCurrFFieldOb["ltxt"] = "noQvalue"; // label text
return aCurrFFieldOb;
};



var nCurrCnxOb = function() {
acurrCnxOb = null;
acurrCnxOb = {};
acurrCnxOb["st"] = "noQvalue"; // status
acurrCnxOb["fn"] = "noQvalue"; // file name
acurrCnxOb["ts"] = "123"; // timepstamp
acurrCnxOb["fc"] = getFrcCacheRLoad("n"); // force cache. check if tc is passed in url
acurrCnxOb["lz"] = "n"; // zip compress
acurrCnxOb["ls"] = "n"; // lcl storage
acurrCnxOb["el"] = "noQvalue"; // element for callback
acurrCnxOb["cb"] = "noQvalue"; // callback
acurrCnxOb["q"] = "noQvalue"; // query string
acurrCnxOb["ur"] = shopDir + "_p/do.php?"; // ajax url
acurrCnxOb["rs"] = "noQvalue"; // response string
acurrCnxOb["er"] = "noQvalue"; // error string
acurrCnxOb["ui"] = "noQvalue"; // current user interface
acurrCnxOb["hh"] = {}; // object hitch-hiking. see popTransLabels in aa-edit-trips.js
return acurrCnxOb;
};

currCnxOb = nCurrCnxOb();
currFFielOb = nCurrFFieldOb();
/*
* opens up the item popup
*/


function getNuLclStrg(lsObj, lsKey, lsDefVal) {
	try {
        if (localStorage[lsKey]) {
           return localStorage[lsKey];
        } else {
		// alert("getNuLclStrg-nada: " + lsKey);
           return lsDefVal;
        }
	} catch(e) {
	// alert("getNuLclStrg: " + e);
           return lsDefVal;
	}
}
function clearNuLclStrg(lsObj, lsKey) {
	try {
    if(typeof(Storage) !== "undefined") {
		localStorage.removeItem(lsKey);
    }
	} catch(e) {
           alert("clearNuLclStrg: " + e);
	}
}
function setNuLclStrg(lsObj, lsKey, lsVal) {
	try {
	// alert("setNuLclStrg: " + " : " + lsKey + " : " + lsVal);
    if(typeof(Storage) !== "undefined") {
        localStorage[lsKey] = lsVal;
    }
	} catch(e) {
         //   alert("setNuLclStrg: " + e);
	}
}




function sendAlertMsg(tmpAlertDiv, tmpAlertCls, tmpAlertStr) {
try {
 document.getElementById(tmpAlertDiv).className = tmpAlertCls;;
JSSHOP.ui.setTinnerHTML(tmpAlertDiv, tmpAlertStr);
JSSHOP.ui.showHideElement(tmpAlertDiv, "show");
} catch(e) {
alert("sendAlertMsg error: " + e)
JSSHOP.logJSerror(e, arguments, "sendAlertMsg");
}
} 

function sendCoords(tmpLng, tmpLat) {
try {
tSCStr = app.setCoordsUpload(quid, "5", "ttccmsg", "tStrAA");
// alert("sendCoords : " + tSCStr);
} catch(e) {
alert("sendCoords error: " + e)
// JSSHOP.logJSerror(e, arguments, "sendCoords");
}
} 


function getLclStrg(lsName, lsDefVal) {
        if (localStorage[lsName]) {
           return localStorage[lsName];
        } else {
           return lsDefVal;
        }
}


function clearLclStrg(lsName) {
    if(typeof(Storage) !== "undefined") {
		localStorage.removeItem(lsName);
    }
}
function setLclStrg(lsName, lsVal) {
    if(typeof(Storage) !== "undefined") {
        localStorage[lsName] = lsVal;
    }
}


function doRecentActivity() {
currUrlArr["i_title"] = i_title.value;
currUrlArr["i_img"] = i_img.value;
tmpCUAstr = JSON.stringify(currUrlArr);
if(currRcntActStr.indexOf(tmpCUAstr) != -1) {
// alert("currRcntActStr.doRecentActivity.yes: " + currRcntActStr + " :: currUrlArr: " + tmpCUAstr)
} else { 
currRcntActArr.push(currUrlArr);
// alert("currRcntActStr.doRecentActivity.no: " + currRcntActStr + " :: currUrlArr:  " + tmpCUAstr)
JSSHOP.cookies.setCookie("recentActivity",LZString.compressToEncodedURIComponent(JSON.stringify(currRcntActArr)),"30","","","");
}

}

function doFavoritesRndr(favToggle, closeBtn, FavTitle, favCount) {
strRFHtml = "";
if(closeBtn == "y") {
strRFHtml = "<div onclick=\"JSSHOP.ui.closeLbox();\" class=\"slmtable txtClrRed txtBold brdrClrRed crsrPointer\" style=\"float:right\">Close</div>";
}

if(FavTitle == "y") {
strRFHtml += "<div><span class=\" txtClrDlg\"><i class=\"material-icons\" alt=\"favorite\" title=\"favorite\" value=\"favorite\">&#xe87d;</i> Favorites</span>";
}
tfi = 0;
fCount = 20;

if(currRcntFavsArr.length) {
if(favCount > 0) {
fCount = favCount;
}
if(fCount > currRcntFavsArr.length) {
fCount = currRcntFavsArr.length;
}
while(tfi < fCount) {
theTfavId = currRcntFavsArr[tfi]._id;
theTfavTtl = currRcntFavsArr[tfi].i_title;
theTfavUrl = currRcntFavsArr[tfi].i_url;
theITimgVal = currRcntFavsArr[tfi].i_img;
theIimgVal = "images/misc/example_thumb.png";
if(currRcntFavsArr[tfi].i_img) {
if((theITimgVal) && (theITimgVal.length > 3)){
theIimgVal = "images/pimgs//s_thumb" + theITimgVal;
} 
}
// strRFHtml += theTfavId + " :: " + theTfavUrl + " :: " + theTfavTtl + " :: " + theIimgVal + "<br>"; 

if(favToggle == "y") {
currFTclr = "material-icons txtClrRed";
strRFHtml += "<div><span class=\"cls_button cls_button-xxsmall bkgdClrWhite brdrClrDlg txtClrDlg\" onclick=\"javascript:doRecentFavorite('" + theTfavUrl + "','" +  theTfavTtl + "','" + theITimgVal + "','" + theTfavId + "','btnDynFavs" + theTfavId + "');\"><i id=\"btnDynFavs" + theTfavId + "\" class=\"" + currFTclr + "\" alt=\"favorite\" title=\"favorite\" value=\"favorite\">&#xe87d;</i></span>";
}
strRFHtml += "<img class=\"icnsmlbtn\" src=\"" + theIimgVal + "\" align=\"absmiddle\"> <a class=\"txtDecorNone\" href=\"" + theTfavUrl + "\">" + theTfavTtl + "</a>::";

tfi++;
}
} else {
strRFHtml += "No Favorites";

 
}
return strRFHtml;
}

function doRecentFavorite(theTfavUrl, theTfavTtl, theIimgVal, theIidVal, theTfavEl) {
if(currRcntFavsStr.indexOf(theTfavUrl) != -1) {
tii = 0;
nTmpArr = [];
if(currRcntFavsArr.length) {
while(tii < currRcntFavsArr.length) {
if(currRcntFavsArr[tii].i_url == theTfavUrl) {
// alert("a match");
nTmpArr = removeArrElement(currRcntFavsArr, tii);
currRcntFavsStr = JSON.stringify(nTmpArr);
currRcntFavsArr = null;
currRcntFavsArr = JSON.parse(currRcntFavsStr);

}
tii++;
}
}
// removeArrElement(currRcntFavsArr, 0);
document.getElementById(theTfavEl).className = "material-icons txtClrHdr";
} else {
currFavsObj = null;
currFavsObj = {};
currUrlArr["_id"] = theIidVal;
currUrlArr["i_title"] = theTfavTtl;
currUrlArr["i_url"] = theTfavUrl;
currUrlArr["i_img"] = theIimgVal;

currRcntFavsArr.push(currUrlArr);
// currRcntFavsArr.push(currFavsObj);
currRcntFavsStr = JSON.stringify(currRcntFavsArr);
document.getElementById(theTfavEl).className = "material-icons txtClrRed";
}
// alert("doRF: " + currRcntFavsStr);
JSSHOP.cookies.setCookie("recentFavs",LZString.compressToEncodedURIComponent(currRcntFavsStr),"30","","","");
}
 





var doPopItemMod = function() {
    loadJSModal("tplates/aa-mod-show-item.html?tt=" + JSSHOP.getUnixTimeStamp());
};

var doPopCartMod = function() {
    loadJSModal("tplates/aa-mod-show-cartadd.html?tt=" + JSSHOP.getUnixTimeStamp());
};

var doCAshow = function(theObj) {
JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'crsrPointer icndbtn slmtable bkgdClrTtl brdrClrHdr txtClrHdr fltrImgInvClr','crsrPointer icndbtn', function(){void(0)});
    JSSHOP.shared.setFrmVals("qitem",tmpVitemArr[tmpVindex],function() {doCartAddPop()});
};

var setPopItemMod = function(tmpIPopArr) {
    setCurrItemArr(tmpIPopArr);
    JSSHOP.shared.setFrmVals("qitem",tmpIPopArr,function() {doPopItemMod()});
};

var doCurrInfoStr = function() {
try { currPrefPrdV = arrUprefs["prfsSHOPuser"][0].scv; }catch (e) { currPrefPrdV = "r";}
try { currPrefPrdP = arrUprefs["prfsSHOPuser"][0].scp; } catch (e) { currPrefPrdP = "a"; }

currInfoStr += "userID: " + quid + "<br>";
currInfoStr += "Prefs: <br>";
currInfoStr += "Prd Layout: " + currPrefPrdV + "<br>";
currInfoStr += "Price: Order: " + currPrefPrdP + "<br>";
currInfoStr += "Shop Owner:  " + arrAllForms.qco[0].c_uid  + "<br>";
 

return currInfoStr;
};


var setCurrItemArr = function(tmpIarr) {
currItemArr = null;
currItemArr = tmpIarr;
};
var getCurrItemArr = function() {
return currItemArr;
};
var setCurrItemsArr = function(tmpIarr) {
currItemsArr = null;
currItemsArr = tmpIarr;
};
var getCurrItemsArr = function() {
return currItemsArr;
};
var setCurrMItemsArr = function(tmpIarr) {
currMItemsArr = null;
currMItemsArr = tmpIarr;
};
var getCurrMItemsArr = function() {
return currMItemsArr;
};


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



try {
cartID = app.fetchConfValString("cartID");
isJApp = "y";
} catch(e) {
	// alert("x_japp.css.error:" + e);
}
isJApp = "y";

var pfRet = function(theElem, theResp, marble) {
document.getElementById(theElem).innerHTML = theResp;
};


var doCloseAdd = function(theElem, theResp, marble) {
fullResp = "<div onclick=\"JSSHOP.ui.closeLbox();\" style=\"float:right\">Close</div>" + theResp;
document.getElementById(theElem).innerHTML = fullResp;
};

var loadNurJSModal = function (theMinc, theClass, theMbLCB) {
  
    if(theMinc.indexOf("images/") != -1) {
    JSSHOP.ui.popAndFillLbox("<img src=\"" + theMinc + "\">");
     // setTinnerHTML("lightbox_content", "<img src=\"" + theMinc + "\">");
    } else {
 	JSSHOP.ui.popAndFillLbox("spin"); 
 	JSSHOP.ajax.doNuAjaxPipe("lightbox_content", theMinc, theMbLCB);
    }
};

var loadNuJSModal = function (theMinc, theClass) {
    loadNurJSModal(theMinc, theClass, doCloseAdd);
};

var loadJSModal = function (theMinc) {
    loadNuJSModal(theMinc, "noQvalue");
};
 



var getShopDir = function(locorrem) {
tmpRetVal = "noQvalue";
tmpShopDir = "noQvalue";
if(locorrem == "local"){
tmpShopDir = document.location.href;
tmpPath = tmpShopDir;
n = tmpPath.lastIndexOf("/");
q = tmpPath.lastIndexOf("?");
if (n >= 0) {
tmpShopDir = tmpPath.substring(0, n+ 1);
} else {
tmpShopDir += "/";
}
} else {
tmpShopDir = JSSHOP.shared.getFrmFieldVal("qco","c_web","noQvalue");
}
tmpRetVal = tmpShopDir;
// alert("tmpRetVal " + tmpRetVal);
return tmpRetVal;
};




JSSHOP.logJSdbug = function(theFunction, theArgs, theMsg) {
tmpStrArgs = "noQvalue";
tmpAStrArgs = "noQvalue";
try {
// fullArgs = theArgs;
tmpStrArgs = JSON.stringify(theArgs);
} catch(e) {
tmpStrArgs = theArgs;
}
if(tmpStrArgs.length > 12) {
tmpAStrArgs = "<span onclick=\"javascript:alert(this.innerHTML);\" style=\"max-width:120px;max-height:90px;overflow:hidden;\">" + tmpStrArgs + "</span>";
} else {
tmpAStrArgs = tmpStrArgs;
}
currDBUGstr += "<br><br>: " + JSSHOP.getUnixTimeStamp() + " :: " + theFunction + " :: " + tmpAStrArgs + " :: " +  theMsg;
};


JSSHOP.logJSerror = function(theError, theArgs, theMsg) {
// alert(JSON.stringify(theError));
// 
fullArgs = new Array();
if(theArgs.length) {
fullArgs = theArgs;
fullArgs = JSON.stringify(theArgs);
} else {
fullArgs = "noQvalue";
}
// fullSError = theError.toString();
fullSError = JSON.stringify(theError);
if(theError.lineNumber) {
fullSError += "Line: " + theError.lineNumber + "\r\n";
}
if(theError.fileName) {
fullSError += "File: " + theError.fileName + "\r\n";
}
if(theError.msg) {
fullSError += "msg: " + theError.msg  + "\r\n";
}
if(theError.constructor) {
fullSError += theError.constructor;
}
// if(JSSHOP.cookies.getCookie("dbug")) {}
// alert("epconsole.error: " + fullSError + " :: " + fullArgs + " :: " +  theMsg);

    setTimeout(function() {
   ermsg = "epconsole.error: " + fullSError + " :: " + fullArgs + " :: " +  theMsg;

        throw new Error(ermsg);
    }, 0);
};
 

/* simple search function
*/

var getMainSearch = function(theSstr) {
document.location.href= "index.html?pid=aa-show-search&cid=" + cid + "&sw=" + theSstr + "&st=" + currSearchType;
};


JSSHOP.startNuIntrvlEvnt = function(theObjTag, theFunction, theInterval) {
try {
eval(theObjTag + " = " + window.setInterval(theFunction,theInterval));
// theObjTag = window.setInterval(theFunction,theInterval); 
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.startNuIntrvlEvnt");
}
};

JSSHOP.stopNuIntrvlEvnt = function(theObjTag) {
try {
window.clearInterval(theObjTag);
theObjTag = null;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.stopNuIntrvlEvnt");
}
};



JSSHOP.startIntervalEvent = function(theObjTag, theFunction, theInterval) {
try {
timeout_handles[theObjTag] = window.setInterval(theFunction,theInterval); 
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.startIntervalEvent");
}
};

JSSHOP.stopIntervalEvent = function(theObjTag) {
try {
window.clearInterval(timeout_handles[theObjTag]);
timeout_handles[theObjTag] = null;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.stopIntervalEvent");
}
};

JSSHOP.getUnixMiliStamp = function() {
try {
ts = Math.round(new Date().getTime());
return ts;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.getUnixTimeStamp");
}
};

JSSHOP.getUnixTimeStamp = function() {
try {
ts = Math.round(new Date().getTime() / 1000);
return ts;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.getUnixTimeStamp");
}
};
 



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











/* USer Functions */

if (!window.JSSHOP.user) {
    JSSHOP.user = new Object();
}

JSSHOP.user.decPrefCky = function(cString) {
	try {
        strPa = cString.split("x1").join("[{\"");
        strPb = strPa.split("x2").join("\":\"");
        strPc = strPb.split("x3").join("\",\"");
        strPd = strPc.split("x4").join("\":");
        strPe = strPd.split("x5").join(",\"");
        strPf = strPe.split("x6").join("\"}]");
        strPg = strPf.split("x7").join("}]");
	  return strPg;
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.decPrefCky");
	  return "noQvalue";
	}

};

JSSHOP.user.encPrefCky = function(cString) {
 
	try {
        strPa = cString.split("[{\"").join("x1");
        strPb = strPa.split("\":\"").join("x2");
        strPc = strPb.split("\",\"").join("x3");
        strPd = strPc.split("\":").join("x4");
        strPe = strPd.split(",\"").join("x5");
        strPf = strPe.split("\"}]").join("x6");
        strPg = strPf.split("}]").join("x7");
	  return strPg;
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.encPrefCky");
	  return "noQvalue";
	}
 
};


JSSHOP.user.setCkieUprefs = function(ckyP) {  
	if(ckyP == "prfsSHOPuser") {
		ckyP = "prefs" + quid;
	}
try {

if(JSSHOP.cookies.getCookie(ckyP)) {
JSSHOP.cookies.deleteCookie(ckyP, "","");
}
JSSHOP.cookies.setCookie(ckyP, JSSHOP.user.encPrefCky(JSON.stringify(arrUprefs[ckyP])), "30", "", "", "");
} catch(e) {
alert(e);
JSSHOP.logJSerror(e, arguments, "JSSHOP.user.setCkieUprefs");
}
};

JSSHOP.user.getCkiePrfKV = function(dCky,key,defval) {  
adefval = defval;
	if(dCky == "prfsSHOPuser") {
		dCky = "prefs" + quid;
	}
try {
adefval = arrUprefs[dCky][0][key];
return adefval;
} catch(e) {
	alert(e);
JSSHOP.logJSerror(e, arguments, "JSSHOP.user.getCkiePrfKV");
return adefval;
}
};

JSSHOP.user.setCkiePrfKV = function(dCky,key,val) {  
	if(dCky == "prfsSHOPuser") {
		dCky = "prefs" + quid;
	}
try {
arrUprefs[dCky][0][key] = val;
JSSHOP.user.setCkieUprefs(dCky);
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.user.setCkiePrfKV");
}
};

JSSHOP.user.setCkiePrfDispVal = function(ckyName,key,rowname) {
  tretval = "show";
	if(ckyName == "prfsSHOPuser") {
		ckyName = "prefs" + quid;
	}
	try {
    	
    	theRow = document.getElementById(rowname);
    	if (theRow.style.display=="none") {
       tretval = "hide";
    	} 
	arrUprefs[ckyName][0][key] = tretval;
	JSSHOP.user.setCkieUprefs(ckyName);
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.setCkiePrfDispVal");
	}

};



JSSHOP.user.doNuCkieUprefs = function(daCky) {
	if(daCky == "prfsSHOPuser") {
		daCky = "prefs" + quid;
	}

	try {
if(JSSHOP.cookies.getCookie(daCky)) { 
fldChallArray.value = JSSHOP.cookies.getCookie(daCky);

tval = fldChallArray.value;
arrUprefs[daCky] = JSON.parse(JSSHOP.user.decPrefCky(tval));
// alert("JSSHOP.user.doNuCkieUprefs: " + daCky + " : " + JSON.stringify(arrUprefs[daCky]));

} else {
arrUprefs[daCky] = [{"prfDspLmenu":false,"scv":"g","sAL":"y","sAT":"y","sia":"y"}];
JSSHOP.user.setCkieUprefs(daCky);
}
arrUprefs["prfsSHOPuser"] = arrUprefs[daCky];
return arrUprefs[daCky];
// alert("doCkieUprefs: " + JSON.stringify(arrUprefs[daCky]));
	}catch(e) {
		alert("JSSHOP.user.doNuCkieUprefs: " + e);
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.doNuCkieUprefs");
	}
};



JSSHOP.user.doCkieUprefs = function(daCky) {
		if(daCky == "prfsSHOPuser") {
		daCky = "prefs" + quid;
	}
	// alert("doCkieUprefs: " + daCky + " : " + JSON.stringify(arrUprefs[daCky]));
	try {
if(JSSHOP.cookies.getCookie(daCky)) { 

fldChallArray.value = JSSHOP.cookies.getCookie(daCky);
tval = fldChallArray.value;
arrUprefs[daCky] = JSON.parse(JSSHOP.user.decPrefCky(tval));
} else {
arrUprefs[daCky] = [{"prfDspLmenu":false,"scv":"g","sAL":"y","sAT":"y","sia":"y"}];
JSSHOP.user.setCkieUprefs(daCky);
}
// alert("doCkieUprefs: " + JSON.stringify(arrUprefs[daCky]));
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.doCkieUprefs");
	}
};



 



// cunstructs the sql statement

var getNuDBFnvp = function(t,m,da,de) {
icce = 0;
tmpV = [];
tmpFV = [];
xol = null;

xol = {};
xol["m"] = m; // mode
xol["t"] = t; // table
xol["c"] = null; // columns
xol["gb"] = null; // group by
xol["o"] = "_id Desc"; 
xol["l"] =  100; // limit
xol["knvp"] = null;
if(de != null) {
if(de["ws"] != null) {
xol["ws"] = de["ws"]; 
}
if(de["wa"] != null) {
xol["wa"] = de["wa"]; 
}
if(de["gb"] != null) {
xol["gb"] = de["gb"]; 
}
if(de["o"] != null) {
xol["o"] = de["o"]; 
}
if(de["l"] != null) {
xol["l"] = de["l"]; 
}
if(de["c"] != null) {
xol["c"] = de["c"]; 
}
if(de["knvp"] != null) {
xol["knvp"] = de["knvp"]; 
}
} else {
xol["ws"] = "where _id=?"; 
xol["wa"] = [ppid];

}



if(xol["knvp"] == null){

/**/
// len = xol["knvp"].length;
tlen = arrDBnDocFNames.length;
if(tlen > 0) {
} else {
nint = 0;
if(da != null) {
while(nint < da.length) {
arrDBnDocFNames.push(da[nint]);
arrDBFNames.push(da[nint]);
nint++;
}
}
}

arrDBnDocFNVpar = null;
arrDBnDocFNVpar = [];

while(icce < arrDBnDocFNames.length) {
nnvo = {};

nvk = arrDBnDocFNames[icce];
nvl = document.getElementById(arrDBnDocFNames[icce]).value;
nnvo["t"] = nvk;
nnvo["v"] = nvl;
tmpStrSWA = "";
arrDBnDocFNVpar.push(nnvo);
icce++;
}

xol["knvp"] = null;
xol["knvp"] = arrDBnDocFNVpar;

} // end if xol["knvp"] = null






len = xol["knvp"].length;
arrDBFNames["_id"] = ppid; // _id

if(xol["ws"] != null) {
tmpStrSWA = switchOccurrences(xol["ws"], "?", xol["wa"]);
}
sqs = "";
switch(m) {
case 5:
sqs = "select ";
if(xol["c"] != null) {
if(xol["c"].length > 0) {
sqs += xol["c"] + " ";
} else {
sqs += "* ";
}
} else {
sqs += "* ";
}
tGroupByStr = "";
if(xol["gb"] != null) {
tGroupByStr = " group by " + xol["gb"];
}
sqs += "from " + t + " " + tmpStrSWA + tGroupByStr + " order by " + xol["o"] + " limit " + xol["l"];
break;
case 6:
var iint = 0;
ts = "";
tv = "";
ark = [];
while(iint < len) {
if(xol["knvp"][iint].t == "_id") { // dont include it
} else {
ts += xol["knvp"][iint].t + ",";
theVstrClean = xol["knvp"][iint].v;
// theVstrClean = decodeURIComponent(removeDiacritics(xol["knvp"][iint].v));
tv += "'" + theVstrClean + "',";
}
iint++;
}
sqs = "insert into " + t + "(" +  ts.substring(0, ts.length-1) + ") values (" + tv.substring(0, tv.length-1) + ")";
break;
case 7:
var iint = 0;
ts = "";
tv = "";
ark = [];
while(iint < len) {
if(xol["knvp"][iint].t == "_id") { // dont include it
} else {
ts += xol["knvp"][iint].t + "=";
theVstrClean = decodeURIComponent(xol["knvp"][iint].v);
ts += "'" + theVstrClean + "',";
}
iint++;
}
sqs = "update " + t + " set " + ts.substring(0, ts.length-1) + " " + tmpStrSWA;
break;
case 8:
sqs = "delete from " + t + " " + tmpStrSWA;
break;

// trying the replace into function
case 9:

 
var iint = 0;
ts = "";
tv = "";
ark = [];
while(iint < len) {
 
ts += xol["knvp"][iint].t + ",";
theVstrClean = xol["knvp"][iint].v;
// theVstrClean = decodeURIComponent(removeDiacritics(xol["knvp"][iint].v));
tv += "'" + theVstrClean + "',";
iint++;
}

sqs = "replace into " + t + " values (" + tv.substring(0, tv.length-1) + ")";
iint = 0;
break;

default:
sqs = "select";
}
xol["rq"] = sqs;

return xol;
};


var doFrmQArr = function(strQ, theElem, theCB) {

nnvo = null;
nnvo = {};
nnvo["f"] = theCB;
nnvo["v"] = strQ;
nnvo["e"] = theElem;
currFrmQArr.push(nnvo);
};


var addFrmQArr = function(theForm, theTmpId, theTmpCB) {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where _id=?";
    tmpDOs["wa"] = [theTmpId];
    oi = getNuDBFnvp(theForm, 5, null, tmpDOs);
    doFrmQArr(oi["rq"],theForm,theTmpCB);
};

var addNuFrmQArr = function(theForm, theTmpFld, theTmpId, theTmpCB) {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where " + theTmpFld + "=?";
    tmpDOs["wa"] = [theTmpId];
    oi = getNuDBFnvp(theForm, 5, null, tmpDOs);
    doFrmQArr(oi["rq"],theForm,theTmpCB);
};

var doDynQArrComm = function(theTarr, strQ, theElem, theCB) {
 
nnvo = null;
nnvo = {};
nnvo["f"] = theCB;
nnvo["v"] = strQ;
nnvo["e"] = theElem;
theTarr.push(nnvo);

};



var doQArrComm = function(strQ, theElem, theCB) {
 
nnvo = null;
nnvo = {};
nnvo["f"] = theCB;
nnvo["v"] = strQ;
nnvo["e"] = theElem;
currQcommsArr.push(nnvo);

};


var addQArrComm = function(theForm, theTmpId, theTmpCB) {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where _id=?";
    tmpDOs["wa"] = [theTmpId];
    oi = getNuDBFnvp(theForm, 5, null, tmpDOs);
    doQArrComm(oi["rq"],theForm,theTmpCB);
};



  

var getCleanAppStr = function(theDASStr) {
document.getElementById("fldChallArray").value = theDASStr;
newCleanAppStr = document.getElementById("fldChallArray").value;
return newCleanAppStr;
};



var pfDRet = function(theElem, theResp, marble) {
document.getElementById("fldChallArray").value = theResp;
aresp = document.getElementById("fldChallArray").value;
// alert("pfDRet " + aresp);
};



navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();
 

var remp = function(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
};


 
var fnishCntLoad = function() {
};
var fnishCoForm = function() {
};
var fnishUserForm = function() {
};
var fnishCatForm = function() {
};
var fnishItemForm = function() {
};
var fnishMsgForm = function() {

};
var fnishExtrasForm = function() {
try {

tSPo = {};
tSvaKstr = JSSHOP.shared.getFieldVal("e_vala", "noQvalue");
if(tSvaKstr == "noQvalue") {

} else {
arrSprefs = null;
arrSprefs = JSON.parse(JSSHOP.shared.getFieldVal("e_valb", JSON.stringify(arrSprefs)));
arrSTmpprefs = null;
arrSTmpprefs = JSON.parse(JSSHOP.shared.getFieldVal("e_valb", JSON.stringify(arrSprefs)));

// alert("fnishExtrasForm arrSTmpprefs.layout: " + arrSTmpprefs.layout);

// alert("arrSprefs.layout: " + arrSprefs.layout);
}


if(pid.indexOf("aa-edit") != -1) {
tmpLStyle = arrSTmpprefs.alayout;
} else {
tmpLStyle = arrSTmpprefs.layout;
}

loadCssScript("css/x_custom_" + tmpLStyle + ".css", setNuLoadACTB);
} catch(e) {
alert("fnishExtrasForm: " + e);
setNuLoadACTB();
}
};

var fnishSctrsForm = function(theSObj) {
	alert("fnishSctrsForm: " + theSObj)
};
var fnishCartForm = function() {
};
var pushActbArr = function(theArr) {
};
var clearActbArr = function() {
};







var mfnishCntLoad = function() {

if(currAdmnMode == "y") {
tmpStrLgotxt = "Admin";
} else {
tmpStrLgotxt = JSSHOP.shared.getFieldVal("c_title", "Logipal");
}
JSSHOP.ui.setTinnerHTML("ancLogoTxt", tmpStrLgotxt);


 
xae = document.getElementsByTagName("ti");
var iint = 0;
while(iint < xae.length) {
nuDW(xae[iint]);
iint++;
}



setCartIplugs();
doCatTreeLoad();

/*  to delete. fixed.
if(isJavaFx == "yes") {
xid = document.getElementsByTagName("i");
var diint = 0;
    image = null;
    image = new Image();
    image.src = "images/trans.gif";
while(diint < xid.length) {
tmpItxt = xid[diint].innerText;
tmpNtxt = tmpItxt.substring(0, 1).toUpperCase();
// xid[diint].innerHTML = tmpNtxt;
// xid[diint].className = "txtXLrg";
diint++;
}
}

try {
currAppCoord = app.getAppCoord();
if(currAppCoord == "000:000"){
app.doAppLoad();
}
} catch (e) {
sendAlertMsg("dvDemoAlert", "txrClrHdr", "For performance, Use the App...");
}
*/



fnishCntLoad();

};
var mfnishCoForm = function() {
// alert("MfinishCoForm");
fnishCoForm();
};
var mfnishUserForm = function() {
fnishUserForm();
};
var mfnishCatForm = function() {
fnishCatForm();
};
var mfnishItemForm = function() {
fnishItemForm();
};
var mfnishMsgForm = function() {
fnishMsgForm();
};
var mfnishExtrasForm = function() {
fnishExtrasForm();
};
var mfnishSctrsForm = function() {
fnishSctrsForm();
};
var mfnishCartForm = function() {
fnishCartForm();
};

var mpushActbArr = function(tmpActArr) {
pushActbArr(tmpActArr);
};

var mclearActbArr = function() {
clearActbArr();
}; 





var doNurQComm = function(tComObj) { 
try {
strQ = tComObj.q;
if(pipeDir == "noQvalue") {
if(isPhP == "no") {

atmpArrQ = app.getNuDBselectQ(tComObj.q);
document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
tmpNewArrO = null;
tmpNewArrO = {};
tmpNewArrO = JSON.parse(tmpArrQ);
var nNAxObj = null;
nNAxObj = tComObj;
nNAxObj["rs"] = tmpNewArrO.data;
if(tComObj.el == "give") {
return tmpArrQ;
} else {
mf = window[tComObj.cb];
mf(nNAxObj);
}

} else {
tmpArrQ = JSSHOP.ajax.doRequestPrep(tComObj);
doLclSych(strQ);
}

} else { // pipeDir is remote
tComObj.ur = pipeDir + "_p/do.php?";
tmpArrQ = JSSHOP.ajax.doRequestPrep(tComObj);
doLclSych(strQ);
}


} catch (e) {
alert(e);
// rstr = shopDir + "_p/jsdo.php?cb=" + tComObj.cb + "&" + tmpQstr;
// remp(rstr);
}
// alert(JSON.stringify(tComObj));
// alert(tmpQstr);

};




var doNuQComm = function(strCQname, isRefrsh, dstamp, strQ, theElem, theCB) {
tmpArrQ = "noQvalue";
tmpQstr = "";


tmpQstr += "t=" + dstamp + "&";
tmpQstr += "f=" + isRefrsh + "&";
if(strCQname == "noQvalue") {
} else {
tmpQstr += "c=" + strCQname + "&";
}
// tmpQstr += "q=" + JSSHOP.shared.utf8_encode(strQ);
tmpQstr += "q=" + strQ;

// alert("doNuQComm: " + tmpQstr);
if(pipeDir == "noQvalue") {
if(isPhP == "no") {
try {
if(currDocHref.indexOf("_dlg") != -1) {
atmpArrQ = appDlg.getDBselectQ(strQ);
} else {
atmpArrQ = app.getDBselectQ(strQ);
}


document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
tmpNewArr = null;
tmpNewArr = [];
tmpNewArr = JSON.parse(tmpArrQ);

if(theElem == "give") {
return tmpArrQ;
} else {
mf = window[theCB];
mf(theElem, tmpArrQ, null);
}
} catch (e) {
console.log("doNuQComm: " + e);
rstr = shopDir + "_p/jsdo.php?cb=" + theCB + "&" + tmpQstr;
remp(rstr);
}

} else {
mf = window[theCB];
tmpArrQ = JSSHOP.ajax.doNuAjaxPipe(theElem, shopDir + "_p/do.php?" + tmpQstr, mf);
doLclSych(strQ);
}

} else { // pipeDir is remote
mf = window[theCB];
tmpArrQ = JSSHOP.ajax.doNuAjaxPipe(theElem, pipeDir + "_p/do.php?" + tmpQstr, mf);
doLclSych(strQ);
}
};


var doQComm = function(strQ, theElem, theCB) {
doNuQComm("noQvalue", "n", "123",  strQ, theElem, theCB);

};


var doRemoteSych = function(tSqstr) {
if((tSqstr.startsWith("select")) || (tSqstr.startsWith("batch")) || (isJApp == "no")) {
dval = "y";
} else {
atmpArrQ = app.getDBselectQ(tSqstr);
document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
}
};

var doLclSych = function(tSqstr) {
if((tSqstr.startsWith("select")) || (tSqstr.startsWith("batch")) || (isJApp == "no")) {
dval = "y";
} else {
dval = "n";
/*
atmpArrQ = app.getDBselectQ(tSqstr);
document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
*/
}
};



var doQSynchComm = function(strHst, strQ, theElem, theCB) {
try {
// alert(strHst);
mf = window[theCB];
tmpArrQ = JSSHOP.ajax.doNuAjaxPipe(theElem, strHst + "_p/do.php?q=" + JSSHOP.shared.utf8_encode(strQ), mf);
} catch (e) {
alert("doQSynchComm; " + e);
}
};

var doQAppComm = function(strQ, theElem, theCB) {
try {
atmpArrQ = app.getDBselectQ(strQ);
document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
if(theElem == "give") {
return tmpArrQ;
} else {
mf = window[theCB];
mf(theElem, tmpArrQ, null);
}
} catch (e) {
alert("Ooops, this should be done in our Android App: " + e);
}
};

var getQArr = function(tType, strQ) {
if(isPhP == "no") {
tmpArrQ = app.getDBselectQ(strQ);
document.getElementById("fldChallArray").value = tmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
pfDRet(null, tmpArrQ, null);
} else {
isJ = JSSHOP.ajax.doNuAjaxPipe(null, "do.php?q=" + strQ, pfDRet);
}
};

var getPageMContArr = function(mType, mID) {
switch(mType) {
	case 5:
	  q = "select * from users where _id = " + mID;
	  break;
	default:
	}
getQArr(mType, q);
}; 






var  getPVname = function(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
};

 


var loadLmenu = function() {

// alert("setLoadACTB: " + theACb);
// alert("mArrFb " + JSON.stringify(currMenuArr));

      var tmpmainUL = document.createElement("ul");
	tmpmainUL.className="animenu__nav";
 


      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";	
	tmpA = document.createElement('a');
	linkText = document.createTextNode("Recent");
	tmpA.appendChild(linkText);
	tmpA.title = "Recent";
	tmpLI.appendChild(tmpA);
	tmpRPUL = document.createElement("ul");
 
	// tmpRPUL.className="animenu__nav__child";
	tmpLI.appendChild(tmpRPUL);
	tmpmainUL.appendChild(tmpLI);



      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";	
	tmpA = document.createElement('a');
	linkText = document.createTextNode("Searches");
	// tmpA.appendChild(linkText);
	tmpA.title = "Searches";
	// tmpA.href = "void(";
	tmpLI.appendChild(tmpA);
	tmpRSUL = document.createElement("ul");
	// tmpRSUL.className="animenu__nav__child";
	tmpLI.appendChild(tmpRSUL);
	  tmpmainUL.appendChild(tmpLI);
	// tmpLI.appendChild(tmpUL);
	// tmpmainUL.appendChild(tmpLI);

strCatID =  "tip:ep:Smart Autocomplete|";
strCatName =  "This will be a smart auto-complete search box.|";
strULPID = "";
strULPTtl = "";
strULSID = "";
strULSTtl = "";
fullIDstr = "";
fullIDttl = "";



if(arrAllForms.qextras) {
theLMarr = arrAllForms.qextras; 
len = theLMarr.length;
tstr = "";
iint = 0;
inop = 0;
inos = 0;


var tmpSTrSorE = "show";
if(currAdmnMode == "y") {
tmpSTrSorE = "edit";
}

while(iint < len) {
ts = null
ts = theLMarr[iint];







switch(ts.e_rtype) {
case "10":

strLML = "index.html?pid=aa-" + tmpSTrSorE + "-item&itemid=" + ts.e_vala + "&cid=" + ts.e_valb + "&catid=" + ts.e_valc;
strLMTtl = ts.e_vald;


      if(inop < 12) {
      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";
 	
	tmpA = document.createElement('a');


	linkText = document.createTextNode(strLMTtl);
	tmpA.appendChild(linkText);
	tmpA.title = strLMTtl + "&nbsp;&nbsp;&nbsp;&nbsp;";
	tmpA.href = strLML;

	tmpLI.appendChild(tmpA); 
	tmpRPUL.appendChild(tmpLI);
	}
	inop++;
break;
case "11":
strLML = "index.html?pid=aa-show-search&cid=" + ts.e_valb + "&sw=" + ts.e_vala;
strLMTtl = ts.e_vala;



      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";
 	
	tmpA = document.createElement('a');


	linkText = document.createTextNode(strLMTtl);
	tmpA.appendChild(linkText);
	tmpA.title = strLMTtl + "&nbsp;&nbsp;&nbsp;&nbsp;";
	tmpA.href = strLML;

	tmpLI.appendChild(tmpA); 
	tmpRSUL.appendChild(tmpLI);
	inos++;
break;
default:
break;
}




iint++;
}

} // end of if arrAllForms.qextras
 





tmpMColStr = doCollsLoad();
if(document.getElementById('mmDdown')) {
tmpMMdownEl = document.getElementById("mmDdown");
strCHtml = "<div onclick=\"JSSHOP.ui.toggleVisibility('mmDdown');\" class=\"slmtable txtClrRed txtBold rxrBigger brdrClrRed crsrPointer\" style=\"float:right;text-align:right;margin-bottom:38px;max-width:14px;\" align=\"right\">X</div>";

tmpMMdownEl.innerHTML = "";
tmpMMdownEl.innerHTML =   strCHtml + tmpMColStr;
toLeft = tmpMMdownEl.offsetLeft + 40;

tmpMMdownEl.style.left= toLeft+"px";

// document.getElementById('mmDdown').innerHTML = tmpMColStr;
document.getElementById('tdLMenu').innerHTML = "";
tmpDV = document.createElement("div");
// tmpDV.className = "collection clsLeftMenu";
tmpDV.className = "collection";
tmpDV.innerHTML = tmpMColStr;
document.getElementById('tdLMenu').appendChild(tmpDV);
}

spinTextDiv.innerHTML = " ..... "; 
if(content == "noQvalue") {
JSSHOP.loadScript("js/app/" + jscssprefix + "x_" + pid + ".js", doMainContent,"js");
} else {
doMainContent(null, null);
}
};

























 






var setNuLoadACTB = function() {
 doNuMMenuLd("doMnuFnsh");
tmpRAobj = {};
tmpRAobj["rs"] = currRcntActArr;



strCatID =  "tip:ep:Smart Autocomplete|";
strCatName =  "This will be a smart auto-complete search box.|";
strULPID = "";
strULPTtl = "";
strULSID = "";
strULSTtl = "";
fullIDstr = "";
fullIDttl = "";
var tmpSTrSorE = "show";
var arrToFill = null;
arrToFill = currRcntActArr;
tmpRAITitle = "noQvalue";

if(currAdmnMode == "y") {
tmpSTrSorE = "edit";
}

 

len = arrToFill.length;
if(len > 0) {
tstr = "";
iint = 0;
while(iint < len) {
ts = arrToFill[iint];



if(ts.i_title) {
tmpRAITitle = ts.i_title;
if(tmpRAITitle > 20) {
tmpRAITitle = tmpRAITitle.substring(0, 16) + "...";
}
}

if(ts.itemid) {
tULPID = "index.html?pid=" + ts.pid + "&itemid=" + ts.itemid + "&cid=" + ts.cid + "&catid=" + ts.catid;
strULPID += "ulp:ep:" + tULPID + "|";
strULPTtl += tmpRAITitle + "|";
if(iint < 12) {
tmpIimg = "images/misc/example_thumb.png";
if(ts.i_img) {
if(ts.i_img !== "0") {
tmpIimg = "images/pimgs/s_thumb" + ts.i_img;
}
}
currRcntActHstr += "<img class=\"icnsmlbtn\" src=\"" + tmpIimg + "\" align=\"absmiddle\"> <a class=\"txtDecorNone\" href=\"" + tULPID + "\">" + tmpRAITitle + "</a>::";
} 
}

iint++;
}

 
 
fullIDstr = strULSID + ":ea:" + strULPID;
fullIDttl = strULSTtl + ":ea:" + strULPTtl;
}
strCatID += fullIDstr + ":ea:";
strCatName += fullIDttl + ":ea:";

 


  
strCatID +=  "tip:ep:Suggestions|";
strCatName +=  "Suggestionsss are gathered from existing page arrays.|";


// ijUFeedSearch.value = "hehahs";
currACTBstr = strCatID + "::" + strCatName;

if(pid == "aa-show-category") {
 
} else {
// alert("strFArr: " + strFArr)
try {
actbSearch = setTimeout("loadListACTB('" + currACTBstr + "','ijUFeedSearch')", 600);
} catch(e) {
alert("setLoadACTB: " + e);
}

}
 loadLmenu();




};

var setLoadACTB = function(theACb) {

strCatID =  "tip:ep:Smart Autocomplete|";
strCatName =  "This will be a smart auto-complete search box.|";
strULPID = "";
strULPTtl = "";
strULSID = "";
strULSTtl = "";
fullIDstr = "";
fullIDttl = "";
var tmpSTrSorE = "show";


if(theACb.rs) {
var arrToFill = null;
arrToFill = JSON.parse(theACb.rs);
arrAllForms["qextras"] = arrToFill;
 

if(currAdmnMode == "y") {
tmpSTrSorE = "edit";
}



len = arrToFill.length;
tstr = "";
iint = 0;
while(iint < len) {
ts = arrToFill[iint];
tsDTtle = ts.e_vald;
tsATtle = ts.e_vala;

if(tsDTtle.length > 20) {
tsDTtle = tsDTtle.substring(0, 16) + "...";
}
if(tsATtle.length > 20) {
tsATtle = tsATtle.substring(0, 16) + "...";
}
switch(ts.e_rtype) {
case "10":
tULPID = "index.html?pid=aa-" + tmpSTrSorE + "-item&itemid=" + ts.e_vala + "&cid=" + ts.e_valb + "&catid=" + ts.e_valc;
strULPID += "ulp:ep:" + tULPID + "|";
strULPTtl += ts.e_vald + "|";
if(iint < 6) {
currRcntActHstr += "<a href=\"" + tULPID + "\">" + tsDTtle + "</a>::";
}
break;
case "11":
strULSID += "uls:ep:" + ts.e_vala + "|";
strULSTtl += ts.e_vala + "|";
currRcntActHstr += "<a href=\"" + ts.e_vala + "\">" + tsATtle + "</a>::";
break;
default:
break;
}

iint++;
}

 
 
fullIDstr = strULSID + ":ea:" + strULPID;
fullIDttl = strULSTtl + ":ea:" + strULPTtl;
}
strCatID += fullIDstr + ":ea:";
strCatName += fullIDttl + ":ea:";

 


  
strCatID +=  "tip:ep:Suggestions|";
strCatName +=  "Suggestionsss are gathered from existing page arrays.|";


// ijUFeedSearch.value = "hehahs";
currACTBstr = strCatID + "::" + strCatName;

if(pid == "aa-show-category") {
 
} else {
// alert("strFArr: " + strFArr)
try {
actbSearch = loadListACTB(currACTBstr, "ijUFeedSearch");
} catch(e) {
alert("setLoadACTB: " + e);
}

}
 loadLmenu();
};


var doLoadACTB = function() {


// doNuMMenuLd("doMnuFnsh");
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["l"] = "30"; 
    tmpDOs["ws"] = "where e_uid=?";
    tmpDOs["wa"] = [quid]; 
    oi = getNuDBFnvp("qextras",5,null,tmpDOs);
	// alert("doLoadACTB: " + oi["rq"]);
atac = null;
atac = nCurrCnxOb();
atac["q"] = oi["rq"];
atac["cb"] = "setLoadACTB";
atac["ls"] = "localStorage";
// atac["fc"] = "y";
// atac["lz"] = "y";
doNurQComm(atac);
};

 






// called when all content loaded
var fnish = function(a,b,c) {
// alert("fnish: " + JSON.stringify(c));

accA = null;
accA = [];
tmpAfnish = null;
tmpAfnish = [];
tmpAfnish = JSON.parse(b);

if(isJApp == "no") {} else {}
if(tmpAfnish.data) {
accA = tmpAfnish.data;
} else {
accA = tmpAfnish;
}

// accA = tmpAfnish[0];
// alert("fnish: " + JSON.stringify(accA));



for(var gkey in accA) {
try {
// alert(gkey);
 mf = window[accA[gkey].f];
 
 mf(accA[gkey].e, JSON.stringify(accA[gkey].v), null);
} catch(e) {
alert("fnish; " + e);
}
}




};
 


var doWinResizeE = function() {
var tmpSsstr = document.getElementById("dvSearchBox").innerHTML;
tmpSBox = "dvSearchBoxSlim";
if(getViewportWidth() > 500) {
tmpSBox = "dvSearchBox";
// JSSHOP.ui.showHideElement("tdLMenu", "show");
} else {
document.getElementById("dvSearchBoxSlim").innerHTML = "";
document.getElementById("dvSearchBox").innerHTML = "";
document.getElementById("dvSearchBoxSlim").innerHTML = tmpSsstr;
}
// JSSHOP.ui.toggleVisibility("dvSearchBoxSlim");
// doLoadACTB();
};



 
var finishCntLoad = function(a,b,c) {
try {
smlspinner.stop();
spinner.stop();
document.getElementById(a).innerHTML = b;

if(JSSHOP.user.getCkiePrfKV("prfsSHOPuser","TGL_MLM","show") == "show") {
JSSHOP.ui.toggleNuModule("dvLMenuTgl","tdLMenu");
} else {
JSSHOP.ui.toggleVisibility("tdXCMoreBtn");
}
// alert("TGL_MLM: " + JSSHOP.user.getCkiePrfKV("prfsSHOPuser","TGL_MLM","show"))

doWinResizeE(); // all things changed on window resize
setTimeout("mfnishCntLoad()", 500);



} catch(e) {
alert("finishCntLoad.error: " + a + " : " + e);
}
};

 

function mDynfnishCntLoad(a, b) {
setTimeout("mfnishCntLoad()", 500);
}
var finishDynCntLoad = function(a,b,c) {
try {
smlspinner.stop();
spinner.stop();
document.getElementById(a).innerHTML = b;
doWinResizeE(); // all things changed on window resize
// setTimeout("mfnishCntLoad()", 500);

JSSHOP.loadScript("js/app/" + jscssprefix + "x_" + pid + ".js", mDynfnishCntLoad,"js");


} catch(e) {
alert("finishCntLoad.error: " + a + " : " + e);
}
}; 


var doDynMainContent = function() {
try {

if(content == "noQvalue") {

spinTextDiv.innerHTML = " ... "; 
fCa = getFArr();
// this should be fixed. authentication.
if((pid.indexOf("edit-") != -1)  && ((quid == 0) || (quid == "noQvalue"))) {
// page requires user login
JSSHOP.loadScript("js/app/" + jscssprefix + "x_login.js", JSSHOP.checkLoader,"js");
JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/login.html", finishDynCntLoad);

} else {

JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/" + pid + ".html", finishDynCntLoad);
if(currIContent == "y") {} else {
finishCntLoad("lightbox_content","loading...","nada");}

}

} else {
JSSHOP.ajax.doNuAjaxPipe("includedContent", "content/" + content + ".html", finishDynCntLoad);
}
} catch(e) {
alert("doMainContent: "  + e);
}
};

var doMainContent = function(a,b) {
try {

if(content == "noQvalue") {

spinTextDiv.innerHTML = " ... "; 
fCa = getFArr();
// this should be fixed. authentication.
if((pid.indexOf("edit-") != -1)  && ((quid == 0) || (quid == "noQvalue"))) {
// page requires user login
JSSHOP.loadScript("js/app/" + jscssprefix + "x_login.js", JSSHOP.checkLoader,"js");
JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/login.html", finishCntLoad);

} else {
if(currIContent == "y") {
JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/" + pid + ".html", finishCntLoad);
} else {
finishCntLoad("lightbox_content","loading...","nada");
}
}

} else {
JSSHOP.ajax.doNuAjaxPipe("includedContent", "content/" + content + ".html", finishCntLoad);
}
} catch(e) {
alert("doMainContent: "  + e);
}
};










JSSHOP.ajax.mDynfnishCntLoad = function(a, b) {
scrollToElement("dvHdr");
window.scrollTo(0,0);
setTimeout("mfnishCntLoad()", 500);
};

JSSHOP.ajax.finishDynCntLoad = function(a,b,c) {
try {
ajxspinner.stop();
// spinner.stop();
document.getElementById(a).innerHTML = b;
// document.getElementById("dvSpinnerIcn").innerHTML = "<a href=\"javascript:JSSHOP.ui.doDefCBBCC('ahHomeIcon', null, document.location.href='index.html?&cid=' + cid);\"><i class=\"material-icons\" style=\"margin-top: 5px;font-size:27px;margin-right:6px;\" alt=\"home\" title=\"home\">&#59530;</i></a>";
doWinResizeE(); // all things changed on window resize
// setTimeout("mfnishCntLoad()", 500);
if(content == "noQvalue") {
JSSHOP.loadScript("js/app/" + jscssprefix + "x_" + pid + ".js", JSSHOP.ajax.mDynfnishCntLoad,"js");
} else {
alert("finishDynCntLoad: " + content);

JSSHOP.loadScript("js/app/" + jscssprefix + "x_content.js", JSSHOP.ajax.mDynfnishCntLoad,"js");

}
} catch(e) {
alert("JSSHOP.ajax.mDynfnishCntLoad.error: " + a + " : " + e);
}
}; 


JSSHOP.ajax.doDynMainContent = function() {
try {
// alert("JSSHOP.ajax.doDynMainContent: " + content)
if(content == "noQvalue") {

// spinTextDiv.innerHTML = " ... "; 
fCa = getFArr();
// this should be fixed. authentication.
if((pid.indexOf("edit-") != -1)  && ((quid == 0) || (quid == "noQvalue"))) {
// page requires user login
JSSHOP.loadScript("js/" + jscssprefix + "x_login.js", JSSHOP.checkLoader,"js");
JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/login.html", JSSHOP.ajax.finishDynCntLoad);

} else {
if(pid == "aa-contactus") {
currIContent = "no";
}
if(currIContent == "y") {
JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/" + pid + ".html", JSSHOP.ajax.finishDynCntLoad);
} else {
finishCntLoad("lightbox_content","loading...","nada");
}
}

} else {
alert("includedContent: " + content )
JSSHOP.ajax.doNuAjaxPipe("includedContent", "content/" + content + ".html", JSSHOP.ajax.finishDynCntLoad);
}
} catch(e) {
alert("JSSHOP.ajax.doDynMainContent: "  + e);
}
};


JSSHOP.ajax.doAjaxGVals = function(tDlMStr, tDlMUstr) {
content = "noQvalue";
currUrlArr = null;
currUrlArr = "";
currUrlArr = {};
pid = "index_main";
currUrlArr = "";
currUrlArr = "";
currUrlArr = {};
try {


if(tDlMStr == pid) {
tDlMObj = JSSHOP.shared.urlToArray(document.location.href); 
} else if(tDlMStr == "noQvalue") {
tDlMObj = JSSHOP.shared.urlToArray(document.location.href); 
} else {
tDlMObj = JSSHOP.shared.strToObj(tDlMUstr); 

}
for(var aRsRgkey in tDlMObj) {
dcdedRk = decodeURIComponent(tDlMObj[aRsRgkey]);
$aRsRgkey = dcdedRk;
window[aRsRgkey] = dcdedRk;
currUrlArr[aRsRgkey] = dcdedRk;
// currUrlArr[aRsRgkey] = decodeURIComponent(JSSHOP.shared.encode_utf8(tDlMObj[aRsRgkey]));
}
 
if(tDlMObj.pid) {
pid = tDlMObj.pid;
}
if(tDlMObj.content) {
alert("content: " + content);
content = tDlMObj.content;
currUrlArr["content"] = content;
}

if(currUrlArr.mk){
currPUrlObj.mk = currUrlArr.mk;
currPUrlObj.make = currUrlArr.make;
}
if(currUrlArr.si){
currPUrlObj.si = currUrlArr.si;
currPUrlObj.series = currUrlArr.series;
}
if(currUrlArr.md){
currPUrlObj.md = currUrlArr.md;
currPUrlObj.model = currUrlArr.model;
} else {
if(currUrlArr.si){
currPUrlObj.md = currUrlArr.si;
currPUrlObj.model = currUrlArr.series;
}
}
if(currUrlArr.prti){
currPUrlObj.prti = currUrlArr.prti;
currPUrlObj.part = currUrlArr.part;
}
if(currUrlArr.y){
currPUrlObj.y = currUrlArr.y;
}
switch(tDlMStr) {
case "aa-add-trip-pickup":
currUrlArr.ttid = undefined;
delete currUrlArr["ttid"];
currUrlArr.ttype = "pickup";
pid = "aa-add-trip";
break;
case "aa-edit-trip":
pid = "aa-edit-trip";
break;
case "aa-edit-trips":
pid = "aa-edit-trips";
break;
default:
break;
}
JSSHOP.ajax.doDynMainContent();
} catch(e) {
alert("JSSHOP.ajax.doAjaxGVals: " + e);
}
}

 



 





var fillMFormArr = function(theRobj) {
try {
tmpAforms = [];
tmpAforms = JSON.parse(theRobj.rs);
arrAllForms = tmpAforms;

if(arrAllForms.qco) {
JSSHOP.shared.setFrmVals("qco",arrAllForms.qco.v[0],function() {void(0)});
}
if(arrAllForms.quser) {
JSSHOP.shared.setFrmVals("quser",arrAllForms.quser.v[0],function() { void(0) });
}
if(arrAllForms.qcat) {
JSSHOP.shared.setFrmVals("qcat",arrAllForms.qcat.v[0],function() { void(0) });
}
if(arrAllForms.qitem) {
JSSHOP.shared.setFrmVals("qitem",arrAllForms.qitem.v[0],function() { void(0) });
}
if(arrAllForms.qmsgs) {
JSSHOP.shared.setFrmVals("qmsgs",arrAllForms.gmsgs.v[0],function() {  void(0) });
}
if(arrAllForms.qlogiplaces) {
currSctrsArr = arrAllForms.qlogiplaces.v;
JSSHOP.shared.setFrmVals("qlogiplaces",arrAllForms.qlogiplaces.v[0],function() {  void(0) });
}
if(arrAllForms.qextras.v[0]) {
JSSHOP.shared.setFrmVals("qextras",arrAllForms.qextras.v[0],function() { fnishExtrasForm() });
} else {
fnishExtrasForm()
}
/*
if(arrAllForms.qcartitem) {
JSSHOP.shared.setFrmVals("qcartitem",arrAllForms.qcartitem.v[0],);
}

*/

qlogf_coid.value = cid;
qlogf_uid.value = quid;
qlogf_dadded.value = JSSHOP.getUnixTimeStamp();


// 
// doLoadACTB();

} catch(e) {
alert("fillMFormArr; " + e);
setNuLoadACTB();
}
};

 


 





var doFrmQLoad = function(thePath, theMessage) {
 
try {

doCFrmQ = nCurrCnxOb();
doCFrmQ["q"] = "batch" + JSON.stringify(currFrmQArr);
//alert("doFrmQLoad:  " + JSON.stringify(currFrmQArr));
doCFrmQ["cb"] = "fillMFormArr";
doNurQComm(doCFrmQ);
} catch(e) {
 alert("doFrmQLoad; " + e + " " + doCFrmQ["q"]);
}	
};

 
function getCurrITEMID(tmpPIDUrl) {
tmpiid = "0";
tmpcurrUrlArr = null;
tmpcurrUrlArr = {};
try {
if(tmpPIDUrl == "noQvalue") {
} else {
tmpcurrUrlArr = JSSHOP.shared.urlToArray(tmpPIDUrl); 
if(tmpcurrUrlArr.itemid){
tmpiid = tmpcurrUrlArr.itemid;
}
}
} catch(e) {
alert("getCurrITEMID: " + e);
return tmpiid;
}
return tmpiid;
} 


function getCurrPID() {
tmppid = "index_main";
tmpcurrUrlArr = null;
tmpcurrUrlArr = {};
try {
tmpPIDUrl = getCurrUrl();
if(tmpPIDUrl == "noQvalue") {
} else {
tmpcurrUrlArr = JSSHOP.shared.urlToArray(tmpPIDUrl); 
if(tmpcurrUrlArr.pid){
tmppid = tmpcurrUrlArr.pid;
}
}
} catch(e) {
alert("getCurrPIDerror: " + e)
}
return tmppid;
}


var setCartIplugs = function() {
if(currCartIttl > 0) {
if(currCartIttl > 99) {
tmpCITstr = "+99";
}
spnCIcount.className = "icnbtn slmtable txtSmall txtClrHdr bkgdClrDlg brdrClrRed";
JSSHOP.ui.setTinnerHTML("spnCIcount", tmpCITstr);
if(currCartTShow == "y") {

/*
if(document.getElementsByName("spnCtotal")) {
intTiv = 0;
while(intTiv < document.getElementsByName("spnCtotal").length) {
retInhm = "<span style=\"float: right\"><i class=\"menu-material-icons txtClrHdr\" alt=\"shopping_cart\" title=\"shopping_cart\">&#xe8cc;</i> <span>  = <u>" + currCartTtl + "</u></span></span>";
document.getElementsByName("spnCtotal")[intTiv].innerHTML = retInhm;
intTiv++;
}
}
*/
}
}
};


var setMsgsIArr = function(a,b,c) {
try {
 
currMsgsIArr = JSON.parse(b);
} catch(e) {
alert("currMsgsIArr: " + e);
} 
};



var setCartIArr = function(a,b,c) {
try {
 
currCartIArr = JSON.parse(b);
tmpCIttls = JSSHOP.shop.renderNuCartItems("y", "n", 60);
if(tmpCIttls.indexOf("::") != -1) {
var tciap = tmpCIttls.split("::");
currCartIttl = Math.round(tciap[0]);
tmpCITstr = currCartIttl;
currCartTtl = tciap[1];
if(currCartIttl > 0) {
setCartIplugs();
} else {
spnCIcount.className = "nada";
JSSHOP.ui.setTinnerHTML("spnCIcount", "");
// spnCtotal.className = "nada";
// JSSHOP.ui.setTinnerHTML("spnCtotal", "");
}
}
if(a == "y") {
JSSHOP.cookies.setCookie("cCartStr",LZString.compressToEncodedURIComponent(b),"30","","","");
}
} catch(e) {
alert("setCartIArr: " + e);
} 
};



var doBootLoad = function() {



/**/
if((isJApp == "no") && (isJavaFx == "no")) {
tDoStng = "nada";
} else {
JSSHOP.loadScript("css/" + jscssprefix + "x_japp.css", JSSHOP.checkLoader,'css');
}

try {
tmpUrl = getCurrUrl();
if(tmpUrl == "noQvalue") {
} else {
currUrlArr = JSSHOP.shared.urlToArray(tmpUrl); 

// adding variable fc [index.html?...&fc=y] to end of url
// forces refreshing cache and using non compressed .js files.
if(currUrlArr.fc){
forceCache = currUrlArr.fc;
jscssprefix = ""; // null the .js file prefix. use normal js files.
}
if(currUrlArr.pid){ // page in tplates/folder
pid = currUrlArr.pid; 
if(pid.indexOf("edit-") != -1) {
currAdmnMode = "y"; // authenticate admin before this
}
}

if(currUrlArr.ppid){
ppid = currUrlArr.ppid;
}
if((currUrlArr.cid) && (currUrlArr.cid !== "0")){ // company ID
cid = currUrlArr.cid;
addFrmQArr("qco", cid, "fnishCoForm");
}
if(currUrlArr.content){
content = currUrlArr.content;
}
if(currUrlArr.catid){ // category ID
catid = currUrlArr.catid;
addFrmQArr("qcat", catid, "fnishCatForm");
}
if(currUrlArr.itemid){ // ...
itemid = currUrlArr.itemid;
addFrmQArr("qitem", itemid, "fnishItemForm");

// oiaqB = "select * from qitem, qmsgs, qco where qitem._id = " + itemid + " and qmsgs.msg_prodid = '" + itemid + "' and qco._id = " + cid + " group by qmsgs.msg_prodid order by qitem._id desc limit 50;";
// doQComm(oiaqB, null, "doNadaAlert");

}

if(currUrlArr.ocartid){ // ...
ocrtid = currUrlArr.ocartid;
 
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where msg_cartid=?";
    tmpDOs["wa"] = [ocrtid]; 
    oi = getNuDBFnvp("qmsgs",5,null,tmpDOs);
    doQComm(oi["rq"], "y", "setMsgsIArr");

// oiaqB = "select * from qitem, qmsgs, qco where qitem._id = " + itemid + " and qmsgs.msg_prodid = '" + itemid + "' and qco._id = " + cid + " group by qmsgs.msg_prodid order by qitem._id desc limit 50;";
// doQComm(oiaqB, null, "doNadaAlert");

 
}

}

if(JSSHOP.cookies.getCookie("quid") !== null) {
quid = JSSHOP.cookies.getCookie("quid");
// no need to get thif for now
if(pid == "aa-edit-user") {
if(currUrlArr.tuid){
quid = currUrlArr.tuid;
}
addFrmQArr("quser", quid, "fnishUserForm");
}
}


 
if(JSSHOP.cookies.getCookie("cartID") == null) {
tmpcid = Math.random().toString(36).slice(2);
JSSHOP.cookies.setCookie("cartID",tmpcid,"30","","","");
cartID = tmpcid;
} else {




cartID = JSSHOP.cookies.getCookie("cartID");
if((currUrlArr.cid) && (currUrlArr.cid !== "0")){ // company ID

if(JSSHOP.cookies.getCookie("cCartStr") !== null) {
currCartStr = LZString.decompressFromEncodedURIComponent(JSSHOP.cookies.getCookie("cCartStr"));
if(currCartStr.length > 5) {
setCartIArr("n", currCartStr, "n");
}
} else {


    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where ci_uid=? and ci_coid=? and ci_cartqty >? and ci_rtype=? and ci_cartid=?";
    tmpDOs["wa"] = [quid,cid,0,5,cartID]; 
    oi = getNuDBFnvp("qcartitem",5,null,tmpDOs);
    // doQComm(oi["rq"], "y", "setCartIArr");
}

    // doFrmQArr(oi["rq"], "qcartitem","fnishCartForm");
}
}
 



    tmpEDOs = null;
    tmpEDOs = {};
    tmpEDOs["ws"] = "where e_uid=? and e_vala=?";
    tmpEDOs["wa"] = [cid,"arrSprefs"]; 
    oi = getNuDBFnvp("qextras",5,null,tmpEDOs);
    doFrmQArr(oi["rq"], "qextras","fnishExtrasForm");


	    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where qlogp_category=?";
    tmpDOs["wa"] = [1];
    oi = getNuDBFnvp("qlogiplaces", 5, null, tmpDOs);
    doFrmQArr(oi["rq"],"qlogiplaces","fnishSctrsForm");
	
	
if(JSSHOP.cookies.getCookie("usrlang") !== null) {
usrlang = JSSHOP.cookies.getCookie("usrlang");
}

if(JSSHOP.cookies.getCookie("recentActivity") !== null) {
// currRcntActStr = JSSHOP.cookies.getCookie("recentActivity");
currRcntActStr = LZString.decompressFromEncodedURIComponent(JSSHOP.cookies.getCookie("recentActivity"));
if(currRcntActStr.length > 5) {
// alert("currRcntActStr.boot: " + currRcntActStr);
currRcntActArr = JSON.parse(currRcntActStr);
}
}


if(JSSHOP.cookies.getCookie("recentFavs") !== null) {
currRcntFavsStr = LZString.decompressFromEncodedURIComponent(JSSHOP.cookies.getCookie("recentFavs"));
if(currRcntFavsStr.length > 5) {
currRcntFavsArr = JSON.parse(currRcntFavsStr);
currFavsIdstr = "";
tii = 0;
if(currRcntFavsArr.length > 0) {
while(tii < currRcntFavsArr.length) {
currFavsIdstr += currRcntFavsArr[tii]._id + "::";
tii++;
}
}
}
// alert("currRcntFavsStr.boot: " + currFavsIdstr + "::" + currRcntFavsStr);
}





try {
tPSUObj = JSSHOP.user.doNuCkieUprefs("prefs" + quid);
// alert("uprefs: " + JSON.stringify(tPSUObj));
} catch(e) {
alert("tPSUObj.error: " + e);
} 



JSSHOP.loadScript("js/app/" + jscssprefix + "aa-" + usrlang + ".js", doFrmQLoad,"js");

} catch(e) {
alert("doBootLoad error: " + e)
// JSSHOP.logJSerror(e, arguments, "doBootLoad");
// JSSHOP.loadScript("js/" + jscssprefix + "aa-" + usrlang + ".js", doFrmQLoad,"js");

} 

};
var getDaCookies = function(){
		try {
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
  }
  alert("getDaCookies: " + JSON.stringify(cookies));
		} catch(e) {
			alert("getCookies.error: " + e);
		}
};