var currBCodeStr = "noQvalue";
var currBCodeObj = {};
var oldBCodeObj = {};
var currBCAction = "scan";
var currBCBtnArr = [];
var currBCTtl = "";
var currBCDlgTtl = "";





function showBCodeDBres(tmpgBCSObj) {
 

atmpRetStr = "<div><br><span class=\"txtBold txtBig txtClrHdr\">DB Info:</span><br>";
tmoiiint = 0;
tmpIvar =  JSON.parse(tmpgBCSObj.rs);
tmpTvar = null;
tmpTvar = {};
tmpTvar = tmpIvar[0];
for(var gkey in tmpTvar) {
 switch(gkey) {
case "_id":
atmpRetStr += "<span class=\"txtBold txtClrRed\">" + gkey + ":</span> <span>" + tmpTvar[gkey] +  "</span><br>";
break;
default:
atmpRetStr += "<span class=\"txtBold\">" + gkey + ":</span> <span>" + tmpTvar[gkey] +  "</span><br>";
break;
}
}
appDecoder.doAppPopStr(atmpRetStr);
// JSSHOP.ui.popAndFillLbox(atmpRetStr);
}


function getSgstdBins(tmpgBCSObj) {

tmpBAarr = JSON.parse(tmpgBCSObj.rs);
if(tmpBAarr.length === 0) {
console.log("getSgstdBins.length: No db result set but:" + JSON.stringify(tmpgBCSObj));
} else {
console.log("getSgstdBins tmpgBCSObj.rs:" + JSON.stringify(tmpgBCSObj.rs));

var bslen = tmpBAarr.length;
var bsiint = 0;
bretStr = "";
bslts = null;
bslts = "";
bChilArr = null;
bChilArr = "";
bretStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Bins: </b>";
while(bsiint < bslen) {
bslts = tmpBAarr[bsiint];
batPCIDstr = bslts.qlogk_customid + " - " + bslts.qlogk_title;

 
bretStr += "&nbsp;&nbsp;<a href=\"javascript:alert('" + bslts._id + "');\">" + bslts.qlogk_customid + "</a>";
 
bsiint++;
}
bretStr += "<br>";
tabrdiv = document.createElement("div");
tabrdiv.innerHTML = bretStr;

// lightbox_content.appendChild(tabrdiv);
JSSHOP.ui.popAndFillLbox(bretStr);

}
}

function doSgstdBins() {
tmpFWDOs = null;
tmpFWDOs = {};
tmpFWDOs["ws"] = "where qlogk_load=? and qlogk_class=?";
tmpFWDOs["wa"] = [5,6];
tmpFWDOs["l"] = "3";
froi = getNuDBFnvp("qlogiracks",5,null,tmpFWDOs);
fbctac = null;
fbctac = nCurrCnxOb();
fbctac["q"] = froi["rq"];
fbctac["cb"] = "getSgstdBins";
// fbctac["hh"] = tmpfBCSObj;
doNurQComm(fbctac);
}


function getPaleteInfo() {
 showBCodeDBres(currBCodeObj);
}

function getJobInfo() {
showBCodeDBres(currBCodeObj);
 //  appDecoder.doAppPopStr(JSON.stringify(currBCodeObj));
}

function getPaltInRack(tmpfBCSObj) {
console.log("fillBCodeScan: " + JSON.stringify(tmpfBCSObj));

hasPalInRack = "no";
tFBCSrArr = tmpfBCSObj.rs;
tFBCSrStr = JSON.stringify(tmpfBCSObj.rs);

if(tFBCSrStr.indexOf("_id") != -1) {
hasPalInRack = "yes";
} else {
currBCBtnArr.push("aa-info-pallet");
currBCBtnArr.push("aa-getp-slot");
console.log("fillBCodeScan length1: No db result set but:" + JSON.stringify(tmpfBCSObj.rs));

}  
doScanPopBtns("har");
//console.log("fillBCodeScan1: " + JSON.stringify(tmpfBCSObj));
if(tmpfBCSObj["hh"]) {
tFF = {};
tFF = tmpfBCSObj["hh"];
// JSSHOP.ui.popAndFillLbox("<b>Newr: " + JSON.stringify(tFF) + "</b>");
}

}





function getPaltInStock(tmpttBCSObj) {
hasPalInStock = "no";
tTBCSrArr = tmpttBCSObj.rs;
if(tTBCSrArr.length === 0) {


console.log("tellBCodeScan length: No db result set but:" + JSON.stringify(tTBCSrArr[0]));
} else {
hasPalInStock = "yes";


tmpRWDOs = null;
tmpRWDOs = {};
tmpRWDOs["ws"] = "where qlogk_load=? and qlogk_class=?";
tmpRWDOs["wa"] = [tmpttBCSObj._id,6];
wroi = getNuDBFnvp("qlogiracks",5,null,tmpRWDOs);

rbctac = null;
rbctac = nCurrCnxOb();
rbctac["q"] = woi["rq"];
rbctac["cb"] = "getPaltInRack";
rbctac["hh"] = tmpttBCSObj;
doNurQComm(rbctac);
}
console.log("tellBCodeScan1: " + JSON.stringify(tmpttBCSObj));

}


function procBCodeScan(tmptBCSObj) {
console.log("hhhhhhhhprocBCodeScan: " + JSON.stringify(tmptBCSObj));
if(tmptBCSObj.jtype) {
tCurrJtype = tmptBCSObj.jtype;
switch(tCurrJtype) {
case "qlogiload":
tmpWDOs = null;
tmpWDOs = {};
tmpWDOs["ws"] = "where qlogs_load_id=? and qlogs_palid=?";
tmpWDOs["wa"] = [tmptBCSObj._id,tmptBCSObj.iid];
woi = getNuDBFnvp("qlogistock",5,null,tmpWDOs);

bctac = null;
bctac = nCurrCnxOb();
bctac["q"] = woi["rq"];
bctac["cb"] = "getPaltInStock";
bctac["hh"] = tmptBCSObj;
doNurQComm(bctac);
// doQComm(woi["rq"], "tmp_qlogg_co_from", "doPlacesList");
// JSSHOP.ui.popAndFillLbox("<b>New: " + tmptBCSObj.jtype + "</b>");
break;
case "qlogiracks":
if(currBCAction = "getPSlot") {
currBCBtnArr = null;
currBCBtnArr = "";
currBCBtnArr = [];
currBCBtnArr.push("aa-setp-slot");
currBCDlgTtl = "Set : " + oldBCodeObj.iid + " to slot " + tmptBCSObj.customId + "?";
doScanPopBtns("ha");
} else {
tmpWDOs = null;
tmpWDOs = {};
tmpWDOs["ws"] = "where _id=?";
tmpWDOs["wa"] = [tmptBCSObj._id];
woi = getNuDBFnvp("qlogiracks",5,null,tmpWDOs);

bctac = null;
bctac = nCurrCnxOb();
bctac["q"] = woi["rq"];
bctac["cb"] = "showBCodeDBres";
}
bctac["hh"] = tmptBCSObj;
doNurQComm(bctac);
// doQComm(woi["rq"], "tmp_qlogg_co_from", "doPlacesList");
// JSSHOP.ui.popAndFillLbox("<b>New: " + tmptBCSObj.jtype + "</b>");
break;
case "jobinfo":

console.log("procBCodeScan.jobinfo: ");
// appDecoder.doAppPopStr("App Pop Str");
// appDecoder.doAppPopStr(JSON.stringify(tmptBCSObj));
// JSSHOP.ui.popAndFillLbox("<b>NewHu:</b>" + JSON.stringify(tmptBCSObj));
// doScanPopBtns("aa-info-job");
if(tmptBCSObj.jid) {
ftmjid = tmptBCSObj.jid;
doMLinkM('aa-show-job', 'pid=aa-show-job&tjid=' + ftmjid);
} else {
JSSHOP.ui.popAndFillLbox("<b>No Job Id:</b><br>" + JSON.stringify(tmptBCSObj));
}
break;
default:
appDecoder.doAppPopStr(JSON.stringify(tmptBCSObj));
// JSSHOP.ui.popAndFillLbox("<b>Default:</b>" + tCurrJtype);
break;
}
}
}


function fnshMCodeScan(atstrScanRet) {
try {
currBCBtnArr = null;
currBCBtnArr = "";
currBCBtnArr = [];
currBCodeObj= null;
currBCodeObj = {};
currBCodeStr = LZString.decompressFromEncodedURIComponent(atstrScanRet);
// tBCDstr = LZString.decompressFromEncodedURIComponent(atstrScanRet);
currBCodeObj = JSON.parse(currBCodeStr);
procBCodeScan(currBCodeObj);

 // JSSHOP.ui.popAndFillLbox("<textarea>" + tBCDstr + "</textarea>");
// console.log(atstrScanType + " - " + atstrScanId + " - " + atstrScanDef + " - " + tBCDstr);
} catch(e) {
JSSHOP.ui.popAndFillLbox("<b>fnshMCodeScan: " + e + "</b>");
}
}

 
 
 function doMCodeScan(tstrScanType, tstrScanId, tstrScanDef) {
try {
app.doBarCodeScan(tstrScanType, tstrScanId, tstrScanDef);
} catch(e) {
alert("only works with Android App and " + e);
}
}

function showScanStat(theScanStat) {
try {
tTmpOutput.innerHTML = theScanStat;
} catch(e) {
alert("only works with Android App and " + e);
}
}



 


function setPSlot() {
try {

} catch(e) {
JSSHOP.ui.popAndFillLbox("<b>setPSlot: " + e + "</b>");
}
}





function getPSlot() {
try {
currBCAction = "getPSlot";
oldBCodeObj = currBCodeObj;
appDecoder.doResume();
} catch(e) {
JSSHOP.ui.popAndFillLbox("<b>setPSlot: " + e + "</b>");
}
}



var doScanPopBtns = function(tmpScanAction) {
tmpDBtnObj = null;
tmpDBtnObj = {};
tmpDBtnItem = null;
tmpDBtnItem = {};
tmpDBtnArr = null;
tmpDBtnArr = [];
tmpDBtnArr = currBCBtnArr;
tmpDBtnItem = null;
tmpDBtnItem = {};
tmpDBtnItem["u"] = "getPSlot();";
tmpDBtnItem["mi"] = "&#xe869;"; // build
tmpDBtnItem["ti"] = "Slot";
tmpDBtnItem["c"] = "collection-item";
tmpDBtnObj["aa-getp-slot"] = tmpDBtnItem;


tmpDBtnItem = null;
tmpDBtnItem = {};
tmpDBtnItem["u"] = "setPSlot();";
tmpDBtnItem["mi"] = "&#xe869;"; // build
tmpDBtnItem["ti"] = "Set Slot";
tmpDBtnItem["c"] = "collection-item";
tmpDBtnObj["aa-setp-slot"] = tmpDBtnItem;





tmpDBtnItem = null;
tmpDBtnItem = {};
tmpDBtnItem["u"] = "getPaleteInfo();";
tmpDBtnItem["mi"] = "&#xe869;"; // build
tmpDBtnItem["ti"] = "Palete Info";
tmpDBtnItem["c"] = "collection-item";
tmpDBtnObj["aa-info-pallet"] = tmpDBtnItem;
 
 
 tmpDBtnItem = null;
tmpDBtnItem = {};
tmpDBtnItem["u"] = "getJobInfo();";
tmpDBtnItem["mi"] = "&#xe869;"; // build
tmpDBtnItem["ti"] = "Driver";
tmpDBtnItem["c"] = "collection-item";
tmpDBtnObj["aa-info-job"] = tmpDBtnItem;

switch(tmpScanAction) {
case "aa-getp-slot":
tmpDBtnArr.push("aa-getp-slot");
break;
case "aa-info-job":
tmpDBtnArr.push("aa-info-job");
break;
default:
break;
}
 

tmpStrbla = ""; 
tmpStrAdmnM = "";
iti = 0; 
while(iti < tmpDBtnArr.length) {
if(tmpDBtnArr[iti] == "break") {
tmpStrAdmnM += "<div>---</div>";
} else if(tmpDBtnArr[iti] == "recent") {
tmpStrbla += "<div class=\"collection-item txtSmall txtBold\" style=\"margin-left:10px\">Recent:<br>" + currRcntActHstr.replace(/::/g, "<br>") + "</div>";
} else {
 
tmpClsNoClctn = tmpDBtnObj[tmpDBtnArr[iti]].c;
tmpClscClctn = tmpClsNoClctn;
if(tmpDBtnObj[tmpDBtnArr[iti]].nm) {
mlinkNm = tmpDBtnObj[tmpDBtnArr[iti]].nm;
} else {
mlinkNm = tmpDBtnArr[iti];
}
if(tmpDBtnObj[tmpDBtnArr[iti]].h) {
tmpStrAdmnM += "<div class=\"bkgdClrDlg\"><b>" + tmpDBtnObj[tmpDBtnArr[iti]].h + "</b></div>";
}

tmpStrAdmnM += "<span name=\"btnP-" + mlinkNm + "\"><a href=\"javascript:void(0);\" onclick=\"javascript:JSSHOP.ui.setNuCBBClickClr(this,'kcoll-menu-item','" + tmpDBtnObj[tmpDBtnArr[iti]].c + "', function(){"  + tmpDBtnObj[tmpDBtnArr[iti]].u + ";}, 20);\" class=\"" + tmpDBtnObj[tmpDBtnArr[iti]].c + "\"><span><i class=\"menu-material-icons "  + tmpClscClctn + "\">" + tmpDBtnObj[tmpDBtnArr[iti]].mi + "</i></span><span style=\"vertical-align:super;padding-left:12px;\" class=\""  + tmpClscClctn + "\">" + tmpDBtnObj[tmpDBtnArr[iti]].ti + "</span></a>";
if(tmpDBtnObj[tmpDBtnArr[iti]].i) {
tmpStrAdmnM += tmpDBtnObj[tmpDBtnArr[iti]].i;
}
tmpStrAdmnM += "</span>";

if(tmpDBtnObj[tmpDBtnArr[iti]].f) {
tmpStrAdmnM += tmpDBtnObj[tmpDBtnArr[iti]].f;
}

}
 
iti++; 
}
JSSHOP.ui.popAndFillLbox(currBCDlgTtl + "<br>" + tmpStrAdmnM);
// return currBCDlgTtl + "<br>" + tmpStrAdmnM;
}; 