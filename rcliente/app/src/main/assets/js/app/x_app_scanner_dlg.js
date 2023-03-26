var currBCodeStr = "noQvalue";
var currBCodeObj = {};
var oldBCodeObj = {};
var currBCAction = "scan";
var currBCBtnArr = [];
var currBCTtl = "";
var currBCDlgTtl = "";



 


var fnishOptLoad = function(theElem, theResp, marble) {
console.log("fnishVehLoad: " + theResp);
tmpFelem = document.getElementById(theElem);
tmpFelem.innerHTML = theResp;
JSSHOP.shared.setDynFrmVals(document['rscanjob'], 'tmp');
xae = tmpFelem.getElementsByTagName("ti");
var iint = 0;
while(iint < xae.length) {
nuDW(xae[iint]);
iint++;
}
};

function fnshScanJobAdd(tsa, tsb, tsc) {
console.log("fnshScanJobAdd: " + tsa + " " + tsb + " " + tsc);
document.getElementById("dvRJobItems").innerHTML = tsb;
}
var doScanJobAdd = function() {
try {
    tmpFobj = null;
    tmpFobj = {};
 
    tmpFobj["knvp"] = JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["rscanjob"], "tmp_"));

if(currUrlArr.tpid) {
	tmpFobj["ws"] = "where _id=?";
    tmpFobj["wa"] = [tpid];
    oi = getNuDBFnvp("rscanjob", 7, null, tmpFobj);
} else {
	oi = getNuDBFnvp("rscanjob", 6, null, tmpFobj);
}
	// alert("OI: " + oi["rq"]);
    doQComm(oi["rq"], null, "fnshScanJobAdd");
	
	//appDlg.setEpMDcom(200, oi["rq"]);
	console.log("ClieAct.io[rq] " + oi["rq"]);
	} catch(e) {
	console.log("ClieAct.io[rq] " + e);
        alert("dClieAct.io[rq] " + e);
    }
};

function doScanJobUpd(tsa, tsb, tsc) {
console.log("doScanJobUpd: " + tsa + " " + tsb + " " + tsc);
document.getElementById("dvRJobItems").innerHTML = tsb;

}
var doScanJobGet = function() {
try {

    tmpFobj = null;
    tmpFobj = {};
    oi = null;
    oi = {};
    tmpFobj["knvp"] = JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["rscanjob"], "tmp_"));

	    tmpFobj["ws"] = "where _id>?";
    tmpFobj["wa"] = [0];
    oi = getNuDBFnvp("rscanjob", 5, null, tmpFobj);
   console.log("dClieAct.io[rq] " + oi["rq"]);
    doQComm(oi["rq"], null, "doScanJobUpd");

	} catch(e) {
	         console.log("dClieAct.io[rq] " + e);
        // alert("dClieAct.io[rq] " + e);
    }
};


var doCPointsStr = function() {
tPtrSTr = appDlg.getCtrlrPoints();
fldChallArray.value = tPtrSTr;
ntPtrSTr = fldChallArray.value;
if(ntPtrSTr.indexOf("/") != -1) {
ntPsplt = ntPtrSTr.split("/");
tPtXstr = ntPsplt[1];
tPtYstr = ntPsplt[3];
tPtrSTr = tPtXstr + ":" + tPtYstr;
}
console.log("ClienteDlg:doCPointsStr: " + tPtrSTr);
return tPtrSTr;
};
