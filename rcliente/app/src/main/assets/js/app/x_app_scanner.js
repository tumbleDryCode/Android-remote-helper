
var currBCSTaskObj = {};
var currBCSTLArr = [];
var currBCTskStr = "";
function doSetCurrBATsk(theTTTsk) {
try {
console.log("doSetCurrBATskSTR: " + theTTTsk);
tOBJBAK = null;
tOBJBAK = "";
tOBJBAK = {};

tOBJBAKArr = JSON.parse(theTTTsk);
currBCSTaskObj =  tOBJBAKArr[0];
console.log("doSetCurrBATskJSTR: " +  JSON.stringify(currBCSTaskObj));
currBCSTLArr = JSON.parse(LZString.decompressFromEncodedURIComponent(currBCSTaskObj.rjob_vala));
currBCTskStr = currBCSTLArr.toString();
console.log("doSetCurrBATskVARRSTR: " +  currBCTskStr);
console.log("doSetCurrBATskVARR: " +  JSON.stringify(currBCSTLArr));
app.doMsgSend("setBTsk:" + currBCTskStr);
// console.log("doSetCurrBATskVALA: " +  LZString.decompressFromEncodedURIComponent(tOBJBAK["rjob_vala"]));
} catch(e) {
alert("doSetCurrBATskEE: " + e);

}
}
function showScanStat(theScanStat) {
try {
tTmpOutput.innerHTML = theScanStat;
} catch(e) {
alert("only works with Android App and " + e);
}
}


function doScnrMsgSend(e, importantothervalue) {
try {
 // add event listener to form text input and get last key pressed

  console.log(e.key); // ex: "j"
  console.log(e.code); // ex: "KeyJ"
  console.log(importantothervalue)

app.doMsgSend(e.key);
} catch(e) {
JSSHOP.ui.popAndFillLbox("<b>doMsgSend: " + e + "</b>");-6
}
}

function doScnrResume() {
try {
app.doBCSresume();
} catch(e) {
JSSHOP.ui.popAndFillLbox("<b>doScnrResume: " + e + "</b>");-6
}
}
function doScnrStop() {
try {
app.doBCSstop();
} catch(e) {
JSSHOP.ui.popAndFillLbox("<b>doScnrStop: " + e + "</b>");-6
}
}
 

var doScnrTgl = function() {
try {
console.log("doScnrTgl");
var tmpBtn = document.getElementById("dvScnrTgl");
var tmpBtnId = tmpBtn.id;
var tmpBtnTxt = tmpBtn.innerHTML;
if(tmpBtnTxt.indexOf("bi-play") != -1) {
tmpBtn.innerHTML = "<div class=\"spinner-grow spinner-grow-sm text-light\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>";
app.doBCSresume();
} else {
tmpBtn.innerHTML = "<i class=\"bi bi-play\"></i>";
app.doBCSstop();
}
} catch(e) {
alert("doScnrTgl: " + e);
}
}
var doScnrBtnE = function(theBtn) {
try {
console.log("doScnrBtnE: " + theBtn.id + " " + theBtn.innerHTML);
var tmpBtn = theBtn;
var tmpBtnId = tmpBtn.id;
var tmpBtnTxt = tmpBtn.innerHTML;
switch(tmpBtnId) {
case "dvScnrTgl":
doScnrTgl();
break;
case "dvScnrKeys":
app.doEtxtFxus();
break;
case "dvScnrTask":
app.setPagePopUp("scanner_dlg2.html","noQvalue");
break;
case "dvScnrStngs":
app.setSettings();
break;
case "dvScnrHelp":
app.setPagePopUp("scanner_dlg.html","noQvalue");
// app.setPagePopUp("scanner_dlg_help.html","noQvalue");
break;
default:
alert("doScnrBtnE: " + tmpBtnId + " " + tmpBtnTxt);
break;

}

} catch(e) {
alert("doScnrBtnE: " + e);

}
};