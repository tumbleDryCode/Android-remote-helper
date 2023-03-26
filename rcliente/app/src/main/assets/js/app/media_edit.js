var incImgFrameNum = 0;
function domedbg(tmpDbgSTr) {
document.getElementById("tTmpOutpu").innerHTML = document.getElementById("tTmpOutpu").innerHTML + tmpDbgSTr;
}
function doNePicGet() {
incImgFrameNum++;
doPicGet();
}
function doPicGet() {
try {
if(incImgFrameNum < 15) {
tAIstr = app_cutouts.getMovImgString(incImgFrameNum);
document.getElementById("fldChallArray").value = tAIstr;
tIstr = document.getElementById("fldChallArray").value;
retIstrI = "data:image/jpeg;base64, " + tIstr;
fullstr = "<img src=\"" + retIstrI + "\" class=\"clsThumbimg\" onclick=\"jacascript:app_dlg.getEpMDcom(60,'" + incImgFrameNum + "');\" onload=\"javascript:doNePicGet();\">";
adiv = document.createElement("div");
adiv.className = "clsThumbdv";
adiv.innerHTML = fullstr;
document.getElementById("dvImgGal").appendChild(adiv);
}
        } catch (e) {
		document.getElementById("tTmpOutpu").innerHTML = document.getElementById("tTmpOutpu").innerHTML + "doCUConfBundle.error: " + e;
        }
}



function doCUConfBundle() {
        try {
tmpMSArrQ = null;
tmpMSArrQ = {};
            tsret = app_cutouts.getCUConfBundle();

document.getElementById("fldChallArray").value = tsret;
tmpMStr = document.getElementById("fldChallArray").value;
document.getElementById("tTmpOutpu").innerHTML = tmpMStr;
tmpMSArrQ = JSON.parse(tmpMStr);
if(tmpMSArrQ.confCUuseDSpeak) {
if(tmpMSArrQ.confCUuseDSpeak == "yes") {
document.getElementById("prfMSdps").checked=true;
}
}

if(tmpMSArrQ.confCUTitleWmark) {
if(tmpMSArrQ.confCUTitleWmark== "yes") {
document.getElementById("prfMSptw").checked=true;
}
}
		// alert(ret);
tAInt = app_cutouts.getMovArrSize();
document.getElementById("fldChallArray").value = tAInt;
tInt = document.getElementById("fldChallArray").value;
document.getElementById("tTmpOutpu").innerHTML = "tInt : " + tInt;
doPicGet(); 
        } catch (e) {
		document.getElementById("tTmpOutpu").innerHTML = document.getElementById("tTmpOutpu").innerHTML + "doCUConfBundle.error: " + e;
        }

    }


function doCUChckbxStgs(tEl,tKey,tKtrue,tKfalse) {
        try {
    if(tEl.checked) {
app_cutouts.setCUConfValStr(tKey, tKtrue);
} else {
app_cutouts.setCUConfValStr(tKey, tKfalse);
}
        } catch (e) {
		document.getElementById("tTmpOutpu").innerHTML = document.getElementById("tTmpOutpu").innerHTML + "doCUChckbxStgs.error: " + e;
        }

    }





var dmyFnishCntLoad = fnishCntLoad;
fnishCntLoad = function () {
doCUConfBundle();
}

