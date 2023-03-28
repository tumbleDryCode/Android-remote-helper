var currBCodeStr = "noQvalue";
var currBCodeObj = {};
var oldBCodeObj = {};
var currBCAction = "scan";
var currBCBtnArr = [];
var currBCTtl = "";
var currBCDlgTtl = "";
var currBCActArr = [];

var setBCactObj = function() {
tCAobjstr = document.getElementById("tmp_rjob_coords").innerText;
tCAobjstr += "|" + JSSHOP.shared.getCurrSelectOpt(document.getElementById("tmp_rjob_rcode"));
currBCActArr.push(tCAobjstr);
listBCact();
};

var addBCact = function(theBCAstr) {
currBCActArr.push(theBCAstr);
listBCact();
};

var delBCact = function(theBCAidx) {
removeArrElement(currBCActArr, theBCAidx);
listBCact();
};

var setBCact = function(theBCAidx, theBCAstr) {
currBCActArr[theBCAidx] = theBCAstr;
listBCact();
};

var getBCact = function(theBCAidx) {
return currBCActArr[theBCAidx];
};

var getBCactArr = function() {
return currBCActArr;
}

var listBCact = function() {
var iint = 0;

JSSHOP.shared.setCurrSelectOpt(document.getElementById("tmp_rjob_rcode"), 0);

tmpLfstr = "";

while(iint < currBCActArr.length) {



tBAtstr = currBCActArr[iint];
tBATspl = tBAtstr.split("|");
tBACoordsStr = tBATspl[0];
tBActCode = tBATspl[1];
tBACordsSpl = tBACoordsStr.split(":");
tBACoordsX = tBACordsSpl[0];
tBACoordsY = tBACordsSpl[1];
tmpLfstr += "<tr><td>" + tBACoordsX + ":" + tBACoordsY + "</td>";
tmpLfstr += "<td>" + tBActCode + "</td>";
tmpLfstr += "<td><a href=\"javascript:delBCact(" + iint + ");\" class=\"txtBold txtBigger txtClrRed\">X</a></td></tr>";
console.log("listBCact: " + tBACoordsX + " " + tBACoordsY + " " + tBActCode);

console.log("listBCact: " + currBCActArr[iint]);
iint++;

}
tmpLfret = "<table><tr><td>Coords</td><td>Action</td><td>X</td></tr>" + tmpLfstr + "</table>";
document.getElementById("dvBCAlist").innerHTML = tmpLfret;
}


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
document.getElementById("tmp_rjob_title").value = "";
JSSHOP.shared.setCurrSelectOpt(document.getElementById("tmp_rjob_action"), 0);
document.getElementById("rjob_vala").value = "";
currBCActArr = null;
currBCActArr = "";
currBCActArr = [];
document.getElementById("dvBCAlist").innerHTML = "Helper Action Added";

}
var doScanJobAdd = function() {
try {

document.getElementById("rjob_vala").value = LZString.compressToEncodedURIComponent(JSON.stringify(currBCActArr));
console.log("doScanJobAdd: " + document.getElementById("rjob_vala").value);
    tmpFobj = null;
    tmpFobj = {};
 
    tmpFobj["knvp"] = JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["rscanjob"], "tmp_"));

if(currUrlArr.tcpid) {
	tmpFobj["ws"] = "where _id=?";
    tmpFobj["wa"] = [tpid];
    oi = getNuDBFnvp("rscanjob", 7, null, tmpFobj);
} else {
	oi = getNuDBFnvp("rscanjob", 6, null, tmpFobj);
}
	// alert("OI: " + oi["rq"]);
    doQComm(oi["rq"], null, "fnshScanJobAdd");
	
	//appDlg.setEpMDcom(200, oi["rq"]);
	console.log("doScanJobAdd ClieAct.io[rq] " + oi["rq"]);

	} catch(e) {
	console.log("doScanJobAdd ClieAct.io[rq] " + e);
        alert("dClieAct.io[rq] " + e);
    }
};

var fnshScanJobDel = function(tsa, tsb, tsc) {
console.log("fnshScanJobDel: " + tsa + " " + tsb + " " + tsc);
document.getElementById("tmp_rjob_title").value = "";
JSSHOP.shared.setCurrSelectOpt(document.getElementById("tmp_rjob_action"), 0);
document.getElementById("rjob_vala").value = "";
currBCActArr = null;
currBCActArr = "";
currBCActArr = [];


}
var doScanJobDel = function(theId) {
try {
    document.getElementById("rjob_rtype").value = "10";
    tmpFobj = null;
    tmpFobj = {};
    tmpFobj["ws"] = "where _id=?";
    tmpFobj["wa"] = [theId];
    oi = getNuDBFnvp("rscanjob", 8, null, tmpFobj);
    doQComm(oi["rq"], null, "fnshScanJobDel");
    console.log("ClieAct.io[rq] " + oi["rq"]);
    doScanJobGet();
    }  catch(e) {
    console.log("ClieAct.io[rq] " + e);
        alert("dClieAct.io[rq] " + e);

    }
}
function doScanJobUpd(tsa, tsb, tsc) {
console.log("doScanJobUpd: " + tsa + " " + tsb + " " + tsc);
tScanJLarr = JSON.parse(tsb);
tsb = "";
var iint = 0;
while(iint < tScanJLarr.length) {
tIObk = tScanJLarr[iint];
tsb += "<tr><td>" + tScanJLarr[iint]["_id"] + "</td>";
tsb += "<td><a href=\"javascript:appDlg.setCurrBATsk(" + tScanJLarr[iint]["_id"]  + ")\">" + tScanJLarr[iint]["rjob_title"] + "</a></td>";
// tsb += "<td>" + tScanJLarr[iint]["rcode"] + "</td>";
// tsb += "<td>" + tScanJLarr[iint]["action"] + "</td>";
// tsb += "<td>" + tScanJLarr[iint]["vala"] + "</td>";
tsb += "<td><a href=\"javascript:doScanJobDel(" + tScanJLarr[iint]["_id"] + ");\" class=\"txtBold txtBigger txtClrRed\">X</a></td></tr>";
iint++;


}
tfsb = "<table><tr><td>ID</td><td>Title</td><td>X</td></tr>" + tsb + "</table>";

document.getElementById("dvRJobItems").innerHTML = tfsb;

}
var doScanJobGet = function() {
try {

    tmpFobj = null;
    tmpFobj = {};
    oi = null;
    oi = {};
    tmpFobj["knvp"] = JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["rscanjob"], "tmp_"));

	    tmpFobj["ws"] = "where rjob_rtype=?";
    tmpFobj["wa"] = [5];
    oi = getNuDBFnvp("rscanjob", 5, null, tmpFobj);
   console.log("dClieAct.io[rq] " + oi["rq"]);
    doQComm(oi["rq"], null, "doScanJobUpd");
	} catch(e) {
	         console.log("dClieAct.io[rq] " + e);
        // alert("dClieAct.io[rq] " + e);
    }
};

var doMPointSet = function() {
document.getElementById('tmp_rjob_coords').innerHTML=doCPointsStr();
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
