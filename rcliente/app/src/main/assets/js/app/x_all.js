	if (!window.JSSHOP) {
		var JSSHOP = new Object();
	}
	if (!window.JSSHOP.ajax) {
		JSSHOP.ajax = new Object();
	}
	if (!window.JSSHOP.hookloader) {
		 JSSHOP.hookloader = new Object();
	}
	if (!window.JSSHOP.jndroid) {
		JSSHOP.jndroid = new Object();
	}
	if (!window.JSSHOP.shared) {
		 JSSHOP.shared = new Object();
	}
	if (!window.JSSHOP.ui) {
		JSSHOP.ui = new Object();
	}

	if (!window.JSSHOP.shop) {
		JSSHOP.shop = new Object();
	}


	   
			var intervals = [];
	 
			function clear(i){
				return function(){
					clearInterval(intervals[i]);
				}
			}
			function restart(i, fn, ts){ //Start AND restart
				return function(){
					clear(i)();
					// increase(i)();
					intervals[i] = setInterval(fn, ts);
				}
			}
	   
	function ntoast(tstrt) {
	JSSHOP.ui.popAndFillLbox(tstrt);
	}


	function scrollToElement(id) {

		var elem = document.getElementById(id);
		var x = 0;
		var y = 0;

		while (elem != null) {
			x += elem.offsetLeft;
			y += elem.offsetTop;
			elem = elem.offsetParent;
		}
		if(isJApp == "no") {
		window.scrollTo(0,y);
		} else {
		  app.getWVScrollPoint(0,y);
		  // window.scrollTo(0,y);
		}
	}



	function getViewportHeight() {
		if (window.innerHeight!=window.undefined) return window.innerHeight;
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
		if (document.body) return document.body.clientHeight;
		return window.undefined;
	}

	function getViewportWidth() {
		var offset = 17;
		if (window.innerWidth!=window.undefined) return window.innerWidth;
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth;
		if (document.body) return document.body.clientWidth;
		return offset;
	}


	function getScrollTop() {
		if (self.pageYOffset) // all except Explorer
		{
			return self.pageYOffset;
		}
		else if (document.documentElement && document.documentElement.scrollTop)
			// Explorer 6 Strict
		{
			return document.documentElement.scrollTop;
		}
		else if (document.body) // all other Explorers
		{
			return document.body.scrollTop;
		}
	}




	JSSHOP.shared.getAppReq = function(thefield) {
		try {
		app.doDB(document.getElementById(thefield).value)
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getAppReq");
		}
	};

	JSSHOP.shared.getQryVar = function(theUrlString, theVar) {
		try {
	  strQVal = null;
	  var query = theUrlString;
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == theVar) {
		  strQVal =  pair[1];
		}
	  }
	  return strQVal;
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getQryVar");
			return "NotGood";
		}
	};



	JSSHOP.shared.getElemDUrl = function(theElem) {
	try {
	if(theElem.getAttribute("data-ison") != null) {
	tDb = "";
	tDison = theElem.getAttribute("data-ison");
	tDa = tDison.replace(/:/gi,"&");
	tDb = tDa.replace(/;/gi,"=");
	tDb += "&v=" + theElem.value + "&n=" + theElem.name;
	return tDb;
	} else {
	return null;
	}
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.getElemDUrl");
	}
	};





	JSSHOP.shared.nodesToString = function(node) {
		if (typeof node === "string") {
			node = document.getElementById(node);
		}

		var arrayOfText = [];
				var tmpUstring = "";
	function walkTheDOM(node, func) {
		func(node);
		node = node.firstChild;
		while (node) {
			walkTheDOM(node, func);
			node = node.nextSibling;
		}
	}

		function pushVal(currentNode) {
				tmpNID = "";
			tmpNVal = "";

			if(currentNode.nodeType === 1) {
			if((currentNode.id) || (currentNode.name)) {
				if(currentNode.id){
					  tmpNID = currentNode.id;
				} else {
				tmpNID = currentNode.name;			
				}      
				tNodeName = currentNode.nodeName.toUpperCase();
				switch(tNodeName) {
				case "INPUT":
			tmpNVal = currentNode.value;
			break;
				case "TEXTAREA":
			tmpNVal = currentNode.value;
			break;
				case "SELECT":
			tmpNVal = currentNode.value;
			break;
			default:
			if(currentNode.firstChild.nodeValue) {
			tmpNVal = currentNode.firstChild.nodeValue;
			}
			}
			tmpUstring += "&" + tmpNID.trim() + "=" + tmpNVal.trim();		}		
	//		tmpUstring += "&" + escape(JSSHOP.shared.trim(tmpNID)) + "=" + escape(JSSHOP.shared.trim(tmpNVal));		}		
			}

		}
		walkTheDOM(node, pushVal);
		return tmpUstring;
	};
	 

	JSSHOP.shared.getOptIndex = function(selection, indexVal) {
				theOptIndex = 0;
	 
					for(var i = 0; i < selection.length; i++) {
						 currIndexVal = selection.options[i].value;
						if(currIndexVal == indexVal) {
							theOptIndex = i;
							break;
						}
	 
				}
				return theOptIndex;
	};

	JSSHOP.shared.setCurrSelectOpt = function(theObj, indexVal) {
				theIndexVal = "noQvalue";
				var selection = theObj;
				if(selection) {
					for(var i = 0; i < selection.length; i++) {
						var currIndexVal = selection.options[i].value;
						if(currIndexVal == indexVal) {
							theIndexVal = currIndexVal;
							selection.selectedIndex = i;
							break;
						}
					}
				}
				return theIndexVal;
			};

	JSSHOP.shared.getCurrSelectOpt = function(theObj) {
				var theSelIndex = theObj.selectedIndex;
				var theString = theObj.options[theSelIndex].text;
				var theVal = theObj.options[theSelIndex].value;
				// alert(theString +  " : " + theVal);
				return theVal;
			};

	JSSHOP.shared.addCurrSelectOpt = function(theObj, theVal, theText, theCssClsn) {
				theObj.options[theObj.options.length] = new Option(theText, theVal);
			};

	JSSHOP.shared.addOptAtIndex = function(theObj, theIndex, theVal, theText, theCssClsn) {
				theOpt = document.createElement("OPTION");
			theOpt.innerText = theText;
			theOpt.value = theVal;
			theOpt.className = theCssClsn;
				theObj.options.add(theOpt, theObj.options[theIndex]);
			};

	JSSHOP.shared.addOptAtVal = function(theObj, theIVal, theVal, theText, theCssClsn) {
				selection = null;
			selection = theObj;
			tmpVhasV = "no";
				if(theIVal == "noQvalue") {
					JSSHOP.shared.addOptAtIndex(theObj, theObj.options.length, theVal, theText, theCssClsn);
				} else {
					for(var i = 0; i < selection.length; i++) {
					tmpVhasV = "no";
						currIndexVal = selection.options[i].value;
						if(currIndexVal == theIVal) {
					 tmpVhasV = "yes";
						 JSSHOP.shared.addOptAtIndex(theObj, i+1, theVal, theText, theCssClsn);
						}
	 
					}
				if(tmpVhasV == "no") {
					// JSSHOP.shared.addOptAtIndex(theObj, theObj.options.length, theVal, theText, theCssClsn);
				}
			}
			};
	JSSHOP.shared.removeOptions = function(selectbox)
	{
		var iop;
		for(iop = selectbox.options.length - 1 ; iop >= 0 ; iop--)
		{
			selectbox.remove(iop);
		}
	};



	/*
	* validation method using data-ison attr in element 
	* to validate it (form fields)
	* parsing values delmited  by : 
	* data-ison="y:3:22"
	*/ 


	JSSHOP.shared.valVOarr = function(theVOarr, theErrDiv) {

		strVldErr = "<b>Oooops..</b>";
	document.getElementById(theErrDiv).innerHTML = "";
		iint = 0;
		isValid = true;
		isFValid = true;
		len = theVOarr.length;
		
		while (iint < len) {
		  isFValid = true;
			ts = null;
			ts = theVOarr[iint];
	theVB = null;
	theVB = document.getElementById(ts.fid);
	// alert(theVB.nodeName.toUpperCase());
	if(theVB.nodeName.toUpperCase() === "DIV") {

	theVBval = theVB.innerText;
	} else {
	theVBval = theVB.value;
	}
	if(document.getElementById(ts.lid)) {
	// document.getElementById(ts.lid).innerHTML = ts.ltxt;
	}
	if(ts.fvr !== "noQvalue") {
	ttest = ts.fvr;



	if(ts.fda == false) {
	if(theVBval == ts.fdv) {
	alert("shr: " + ts.fda);
		isValid = false;
		isFValid = false;
	}
	}
	if(!ttest.test(theVBval)) {
	alert("no ttest: " + theVBval);
		isValid = false;
		isFValid = false;
	}



	if(isFValid === false) {
	strVldErr += "<br>" + ts.fve;
	}




	}
	iint++;
	}

	if(isValid == false) {
	strVldErr += "<br>" + ts.fve;
	theEdiv = document.createElement("div");
	theEdiv.className = "cls-error-form";
	theEdiv.innerHTML = strVldErr;
	document.getElementById(theErrDiv).appendChild(theEdiv);
	}


	return isValid;
	};


	JSSHOP.shared.valFieldVals = function(theArrElem) {
	// n = null default do nada
	// v = validate
	isFullyVal = true;
	actType = "n";
	try {
	var len = theArrElem.length;
	var iint = 0;
	while (iint < len) {

	if(document.getElementById(theArrElem[iint])) {
	theElem = document.getElementById(theArrElem[iint]);
	if(theElem.getAttribute("data-ison") != null) {
	tDison = theElem.getAttribute("data-ison");
	if(tDison.indexOf(":") != -1) {
	tmpTDivars = tDison.split(":");
	actType = tmpTDivars[0];
	if(actType == "v") {
	veType = tmpTDivars[1];
	veMinLen = tmpTDivars[2];
	veMaxLength = tmpTDivars[3]; 
	veDefVal = tmpTDivars[4];
	veLblElID = tmpTDivars[5];
	veAlertStr = tmpTDivars[6]; 
	veDefTtl = tmpTDivars[7];
	veDefCls = tmpTDivars[8];


	// v:s:5:8:49:lbl_u_pass:2:49:clsFrmInpLabel


	document.getElementById(veLblElID).className = veDefCls;
	document.getElementById(veLblElID).innerHTML = stxt[veDefTtl];
	theElVal = theElem.value;
	if(theElVal.length < veMinLen) {
	isFullyVal = false;
	if(veDefVal == "null")  {
	} else {
	theElem.value = stxt[veDefVal];
	}
	theElem.focus();
	document.getElementById(veLblElID).className = "txtBold txtClrRed";
	document.getElementById(veLblElID).innerHTML = stxt[veAlertStr];
	}
	} 
	}
	}
	}

	iint++;
	}
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.valFieldVals");
	return false;
	}
	return isFullyVal;
	};



	JSSHOP.shared.initFrmComps = function(theFCmpArr) {
		iint = 0;
		 tAstr = "";
		len = theFCmpArr.length;
		while (iint < len) {

			ts = theFCmpArr[iint];

	theB = null;
	theB = document.getElementById(ts.fid);

	if(ts.fcl !== "noQvalue") {
	JSSHOP.ui.addEvent(theB,"click",ts.fcl);
	}
	if(ts.lid !== "noQvalue") {
	tlid = ts.lid;
	try {
	// document.getElementById(tlid).className = "txtSmall txtBold txtClrDDlg";
	document.getElementById(tlid).innerText = ts.ltxt;

	JSSHOP.ui.setLblHighlight(theB,ts.fdv,document.getElementById(tlid),ts.ltxt);
	} catch(e) {

	tAstr += e + " :: " +  JSON.stringify(ts) + "<br>";
	// alert("JSSHOP.shared.initFrmComps: "  + e + " :: " +  JSON.stringify(ts));
	}

	} else {

	}



	if(ts.fdv !== "noQvalue") {
	 
	if(ts.fty == "button") {
	theB.style.color = "#ffffff";
	} else {
	JSSHOP.ui.setDefFval(theB, ts.fdv, ts.fda);
	}

	}

	if(ts.fda !== "noQvalue") {

	}
	 
		  iint++;
		}

	// alert(tAstr);
	};


	JSSHOP.shared.setFieldVal = function(theField, theVal) {
		try {
		  document.getElementById(theField).value = theVal;
		} catch(e) {
		JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.setFieldVal");
		}
	};


	JSSHOP.shared.getFieldVal = function(theField, theVal) {
		try {
		  return document.getElementById(theField).value;
		} catch(e) {
		JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getFieldVal");
		return theVal;
		}
	};

	JSSHOP.shared.setFrmFieldVal = function(theForm, theField, theVal) {
		try {
		  document[theForm][theField].value = theVal;
		} catch(e) {
		JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.setFrmFieldVal");
		}
	};

	JSSHOP.shared.getFrmFieldVal = function(theForm, theField, theVal) {
		try {
		  return document[theForm][theField].value;
		} catch(e) {
		JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getFrmFieldVal");
		return theVal;
		}
	};







	JSSHOP.shared.sort = function(data, theIndex, theOrder) {
	  var i, j;
	  var currentValue;
	  var currentObj;
	  var compareObj;
	  var compareValue;
		
		if(theOrder == "sortAsc") {
	// this is where the order comparison is done:	
	// while(j >=0 && compareValue > currentValue) {

	  for(i=1; i<data.length;i++) {
		currentObj = data[i];
		currentValue = currentObj[theIndex];
		j= i-1;
		compareObj = data[j];
		compareValue = compareObj[theIndex];  
		while(j >=0 && compareValue > currentValue) {
		  data[j+1] = data[j];
		  j--;
		  if (j >=0) {
			compareObj = data[j];
			compareValue = compareObj[theIndex];
		  }        
		}
		data[j+1] = currentObj;
	  }
	  
		} else {
		
		
	  for(i=1; i<data.length;i++) {
		currentObj = data[i];
		currentValue = currentObj[theIndex];
		j= i-1;
		compareObj = data[j];
		compareValue = compareObj[theIndex];  
		while(j >=0 && compareValue < currentValue) {
		  data[j+1] = data[j];
		  j--;
		  if (j >=0) {
			compareObj = data[j];
			compareValue = compareObj[theIndex];
		  }        
		}
		data[j+1] = currentObj;
	  }
	  
		
		}
	  
	  return data;
	   }

	 



	 


	JSSHOP.shared.setArrVals = function(theMarr, theAIndx, theArr) {
		  tmpVpar =  null;
		  tmpVpar = [];
		  tmpSobj = null;
		  tmpSobj = {};
			var len = theArr.length;
			var iint = 0;

			  while (iint < len) {
			ts = theArr[iint];
		  tmpSobj = null;
		  tmpSobj = {};
			for (var gkey in ts) {
			  if(theMarr[theAIndx][gkey]) {
			theMarr[theAIndx][gkey] = ts[gkey];
			}
			}
			iint++;
			}
		   return theMarr;
	};

	JSSHOP.shared.getKNVParr = function(theArr) {
		  tmpVpar =  null;
		  tmpVpar = [];
		  tmpSobj = null;
		  tmpSobj = {};
			var len = theArr.length;
			var iint = 0;

			  while (iint < len) {
			ts = theArr[iint];

		  tmpSobj = null;
		  tmpSobj = {};
			for (var gkey in ts) {
			  tmpSobj["t"] = gkey;
			tmpSobj["v"] = ts[gkey];
			tmpVpar.push(tmpSobj);
			}
			iint++;
			}
		   return tmpVpar;
	};


	JSSHOP.shared.setDynFrmVals = function(oFormElement, dPrfx) {
	 
			var oField, sFieldType, nFile, sSearch;
			try {
		  tmpVpar =  null;
		  tmpVpar = [];
		  tmpSobj = {};
		  var allNs = "";
			for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
				oField = oFormElement.elements[nItem];
				if (!oField.getAttribute("name")) {
					continue;
				}
			tmpSobj = null;
			tmpSobj = {};
				sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
				if (sFieldType === "FILE") {
					for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
				} else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
				fn = oField.name;
			fv = oField.value;
			fnode = dPrfx + fn;

			if(dPrfx == "clear") {
			oField.value = "";
			} else {
				if(document.getElementById(fnode)) {



	 


			if((dPrfx == "dyn_") || (document.getElementById(fnode).nodeName.toUpperCase() == "DIV")){
			document.getElementById(fnode).innerHTML = fv;
			} else {
			allNs += fnode + ",";
			// alert(fnode + " ;; " + fv);
			JSSHOP.shared.setFieldVal(fnode, fv);
			}		
				}
	 
			}

			}
			}
	} catch(e) {
	alert("setDynFrmVals: " + e);
	}
	 // alert(allNs);
	};

	JSSHOP.shared.getDynFrmVals = function(oFormElement, dPrfx) {
	 
			var oField, sFieldType, nFile, sSearch;
		  tmpVpar =  null;
		  tmpVpar = [];
		  tmpSobj = null;
		  tmpSobj = {};
			for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
				oField = oFormElement.elements[nItem];
				if (!oField.getAttribute("name")) {
					continue;
				}
			tmpSobj = null;
			tmpSobj = {};
				sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
				if (sFieldType === "FILE") {
					for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
				} else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
				fn = oField.name;
			fnode = dPrfx + fn;
				if(document.getElementById(fnode)) {
			tNN = document.getElementById(fnode).nodeName.toUpperCase();
			if((tNN == "DIV") || (tNN == "SPAN")){
			fv = document.getElementById(fnode).innerHTML;		
			} else if(tNN == "SELECT") {
			fv = JSSHOP.shared.getCurrSelectOpt(document.getElementById(fnode));			      
			} else {
			fv = document.getElementById(fnode).value;
			}
			oField.value = fv;
				} else {
			fv = oField.value;
			}
			if(fv.indexOf("&") != -1) {
			// alert("FV/");
			tmpSobj[fn] = fv.replace("&", "-");
			// tmpSobj[fn] = escape(encodeURIComponent(fv));
			// alert("FV/: " + tmpSobj[fn]);
			} else {
			tmpSobj[fn] = fv;
			}
			// if(fv.length > 0) {
			// tmpSobj["t"] = fn;
			// tmpSobj["v"] = fv;
			tmpVpar.push(tmpSobj);
			// }
				}
			}
			 //alert("getDynFormVals: " + JSON.stringify(tmpVpar));
			return tmpVpar;
	};



	JSSHOP.shared.getFrmVals = function(oFormElement, oHdrStr) {


			var oField, sFieldType, nFile, sSearch;
		  tmpVpar =  null;
		  tmpVpar = [];
		  tmpSobj = {};
			for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
		try {          
				oField = oFormElement.elements[nItem];
				if (!oField.getAttribute("name")) {
					continue;
				}
			tmpSobj = null;
			  tmpSobj = {};
			 
				sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
				if (sFieldType === "FILE") {
					for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
				} else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
	 
			fva = oField.value;
			if(fva.length >= 0) {
		
			fvb = fva.replace("\"", " ");
			fvv = fva.replace("'", " ");
				fn = escape(oField.name);
			fv = fvv;

			
			tmpSobj["t"] = fn;
			tmpSobj["v"] = fv;
			tmpVpar.push(tmpSobj);
			}
				}


			} catch (e) {
			alert(e + " : " + oField.getAttribute("name"));
			// JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt");
			  }


			}
			// alert("getFormVals: " + JSON.stringify(tmpVpar));
			return tmpVpar;
	};



	JSSHOP.shared.setDynFieldVals = function(theResp, thePrefx) {

	if(theResp) {
	var len = theResp.length;
	 
	var arrToFill = theResp;
	 
	 
	var iint = 0;

	for(var gkey in theResp) {
	try {

	fnode = thePrefx + gkey;
	if(document.getElementById(fnode)) {
	tRKv = theResp[gkey];
	if(tRKv.indexOf("%3A") != -1) {
	retQkey = unescape(decodeURIComponent(tRKv));
	} else {
	retQkey = theResp[gkey];
	}
	document.getElementById(fnode).value = retQkey;
	}
	} catch(e) {
	}
	iint++;
	}
	}
	};


	JSSHOP.shared.setFrmVals = function(theForm, theResp, theTmpCB) {
	// alert("setFrmVals ; " + JSON.stringify(theResp));

	try {
	if(theResp) {
	// var arrToFill = theResp;
	var len = theResp.length;
	var iint = 0;

	for(var gkey in theResp) {
	if(document[theForm][gkey]) {
	document[theForm][gkey].value = theResp[gkey];
	// alert(JSON.stringify(theResp[gkey]));
	}
	}
	 
	theTmpCB();
	 
	}
	} catch(e) {
	console.log("JSSHOP.shared.setFrmVals: " + e);

	}
	};





	/*
	* will try to use this later as seen on the qmsm form in index.html
	* basically renders a web input form according to attributes in the actual forms fields
	* JSSHOP.shared.rndrDynFrmVals(document["qmsgs"], "tmp_");
	* save button still has to be added
	*/
	 
	JSSHOP.shared.rndrDynFrmVals = function(oFormElement, dPrfx, tFAllowed, tSavBtnObj) {
	 
			var oField, sFieldType, nFile, sSearch;
		  tmpVstr =  "";
			tmpFval = "";
			tmpFid = "noQvalue";
		  tmpLid = "noQvalue";
		  retRndrObj = null;
		  retRndrObj = {};
		  rndrFFObjArr = null;
		  rndrFFObjArr = [];  
			for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
				oField = oFormElement.elements[nItem];
		  tFNstr = oField.getAttribute("name");
		  if(tFAllowed == "noQvalue" || tFAllowed.indexOf(tFNstr) != -1) {


				tmpVstr += "<div>";

				if (!oField.getAttribute("data-flbl")) {

					continue;
				} else {
			tmpFlbl = oField.getAttribute("data-flbl");
			}
				if (oField.getAttribute("data-fid")) {
				atmpFid = oField.getAttribute("data-fid");
				if(atmpFid.indexOf("tmp_") != -1) {
				tmpFid = atmpFid + oField.getAttribute("name");
				} else {
				tmpFid = atmpFid;
				
				}
				tmpLid = "lbl_" + tmpFid;
				} 
				tmpVstr += "<span id=\"" + tmpLid + "\" style=\"min-width: 80%\">" + tmpFlbl + "</span>&nbsp;&nbsp;<br>";
				if (oField.getAttribute("data-fval")) {
				atmpFval = oField.getAttribute("data-fval");
				if(atmpFval.indexOf("thisval") != -1) {
				tmpFval = oField.getAttribute("value");
				} else {
				tmpFval = atmpFval;
				}
				} 

				if (oField.getAttribute("data-ftype")) {
				  switch(oField.getAttribute("data-ftype")) {
				case "span":
				tmpVstr += "<span  id=\"" + tmpFid + "\" style=\"min-width: 80%\">" + tmpFval + "</span>";
				break;
				case "tinput":
				tmpVstr += "<input value=\"" + tmpFval + "\" id=\"" + tmpFid + "\" style=\"min-width: 80%\"></input>";
				break;
				case "tarea":
				tmpVstr += "<textarea id=\"" + tmpFid + "\" style=\"min-width: 80%\">" + tmpFval + "</textarea>";
				break;
				default:
				break;
				}
				} 





	atfuh = null;
	atfuh = nCurrFFieldOb();
	atfuh.fid = tmpFid;
	atfuh.fdv = tmpFval;
	atfuh.lid = tmpLid; 
	atfuh.ltxt = tmpFlbl; 
	rndrFFObjArr.push(atfuh);

	tmpVstr += "</div>";
	}
	 }
	if(tSavBtnObj !== "noQvalue"){

	rndrFFObjArr.push(tSavBtnObj);
	tmpVstr += "<div align=\"center\"><button id=\"" + tSavBtnObj.fid + "\" class=\"cls_button cls_button-medium\"><ti data-ison=\"" + stxt[21] + "\" data-desc=\"btn_save\">" + stxt[21] + "</ti></button></div>";
	}
	retRndrObj["rndrStr"] = tmpVstr;
	retRndrObj["rndrFobj"] = rndrFFObjArr;
	return retRndrObj;
	};



	JSSHOP.shared.getTblHdrs = function(tHHdrArr) {
			tHdrStr = "";
			for(iha = 0; iha < tHHdrArr.length; iha++) {
		    tHlnkObj = tHHdrArr[iha];
			tHdrStr += "<th style=\"text-align: left\"><a href=\"javascript:rnderFItems('" + tHlnkObj.fld + "');\" class=\"txtBold txtClrHdr\">" + tHlnkObj.nm + "</a></th>";	
			}
			return tHdrStr;
	};

	JSSHOP.shared.getSrtdArr = function(tSortArr, tSrtIdx) {
	hasr = "n";
	fullstr = "";
	var arrToFill = "";
	var tmpSordr = "sortAsc";
	if(currSortIdx[tSrtIdx]) {
	if(currSortIdx[tSrtIdx] == "sortAsc") {
	tmpSordr = "sortDesc";
	currSortIdx[tSrtIdx] = "sortDesc";
	} else {
	tmpSordr = "sortAsc";
	currSortIdx[tSrtIdx] = "sortAsc";
	}
	} else {
	tmpSordr = "sortAsc";
	currSortIdx[tSrtIdx] = "sortAsc";
	}
	currSortIdx[tSrtIdx] = tmpSordr;
	return(JSSHOP.shared.sort(tSortArr, tSrtIdx, tmpSordr));
	};




	JSSHOP.shared.utf8_encode = function( argString ) {
		// http://kevin.vanzonneveld.net
		// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: sowberry
		// +    tweaked by: Jack
		// +   bugfixed by: Onno Marsman
		// +   improved by: Yves Sucaet
		// +   bugfixed by: Onno Marsman
		// +   bugfixed by: Ulrich
		// *     example 1: utf8_encode('Kevin van Zonneveld');
		// *     returns 1: 'Kevin van Zonneveld'

		var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

		var utftext = "";
		var start, end;
		var stringl = 0;

		start = end = 0;
		stringl = string.length;
		for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;

			if (c1 < 128) {
				end++;
			} else if (c1 > 127 && c1 < 2048) {
				enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
			} else {
				enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
			}
			if (enc !== null) {
				if (end > start) {
					utftext += string.substring(start, end);
				}
				utftext += enc;
				start = end = n+1;
			}
		}

		if (end > start) {
			utftext += string.substring(start, string.length);
		}

		return utftext;
	};





	// some shared user preferences functions
	// sets prefs by passing the checkbox, the preference array name, 
	// the preference key, selected and unselected values.
	JSSHOP.shared.setChckbxPref = function(tChckbx, tPrefArr, tPrefKey, tVsel, tVunsel) {
		try {
		if(tChckbx.checked) {
		JSSHOP.user.setCkiePrfKV(tPrefArr,tPrefKey,tVsel);
		} else {
		JSSHOP.user.setCkiePrfKV(tPrefArr,tPrefKey,tVunsel);
		}
		} catch (e) {
		alert(e);
			JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.setChckbxPref");
		}
	};

	// end of shared funtions




	//   ---- AJAX functions


	JSSHOP.ajax.fnishGeneric = function(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML) {
		try {
			document.getElementById(cbElem).innerHTML = cbElemHTML;
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.fnishGeneric");
		}
	};


	JSSHOP.ajax.procAjaxRet = function(strRet, prvdr, action, ukey, id, msg, cbElem, cbElemHTML) {
		try {
		switch (action) {
			case "parseU":
				JSSHOP.ajax.fnishGeneric(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML);
				break;
			default:
				JSSHOP.ajax.fnishGeneric(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML);
				break;
		}
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.procAjaxRet");
		}
	};


	JSSHOP.ajax.procRet = function(strRet, arrFelemnts) {
		try {

			if(arrFelemnts[0]["name"]) {
			if(arrFelemnts[0]["name"].toLowerCase() == "aaction") {
			tmpAVal = arrFelemnts[0]["value"];
		switch(tmpAVal) {
			case "CViewEditAdminSettings":
			JSSHOP.ui.popAndFillLbox("new: " + JSON.stringify(arrFelemnts) + " <br> " + strRet);
				break;
			default:
				JSSHOP.ajax.fnishGeneric(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML);
				break;
		}
		}
		}
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.procRet");
		}
	};

	JSSHOP.ajax.createXMLHTTPObject = function() {
		var xmlhttp = false;
	var XMLHttpFactories = [
		function() {
			return new XMLHttpRequest()
		},
		function() {
			return new ActiveXObject("Msxml2.XMLHTTP")
		},
		function() {
			return new ActiveXObject("Msxml3.XMLHTTP")
		},
		function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		}
	];
		for (var i = 0; i < XMLHttpFactories.length; i++) {
			try {
				xmlhttp = XMLHttpFactories[i]();
			} catch (e) {
				continue;
			}
			break;
		}
		return xmlhttp;
	};

	 
	JSSHOP.ajax.doNuResponse = function(tmpArrDRS) {
	// alert("doNuResponse: " + tmpArrDRS.cb + " : " + tmpArrDRS.rs);
	// JSSHOP.ui.popAndFillLbox("doNuResponse: " + tmpArrDRS.cb + " : " + tmpArrDRS.rs);
	tmpNArrDRS = null;
	tmpNArrDRS = {};
	tmpNArrDRS = tmpArrDRS;

	if(tmpArrDRS.st == "nofile") {
	JSSHOP.ajax.doResponseSave(tmpArrDRS);
	} else {
	if(tmpArrDRS.lz == "y") { 
	strTmpDAS = tmpArrDRS.rs;
	strTmpDS = strTmpDAS.replace("\"", "");
	tmpDFEUStr = LZString.decompressFromEncodedURIComponent(strTmpDS);
	tmpNArrDRS.rs = tmpDFEUStr;
	// alert("tmpDFEUStr: " + tmpDFEUStr);	
	}  

	if(tmpArrDRS.ls == "n") {
	} else {

	tLSStr = getNuLclStrg(tmpArrDRS.ls, tmpArrDRS.cb, "noQvalue");
	if(tLSStr == "noQvalue") {
	setNuLclStrg("localStorage", tmpArrDRS.cb, tmpArrDRS.rs);
	}
	 
	}

	}


	theRespCB = window[tmpArrDRS.cb];
	theRespCB(tmpNArrDRS);


	};


	JSSHOP.ajax.doResponseSave = function(tmpsArrDRS) {
	// alert("doResponseSave: " + tmpsArrDRS.cb  + " : " + tmpsArrDRS.fn + " : " + tmpsArrDRS.rs );
	if(tmpsArrDRS.lz == "y") { 
	JSSHOP.shared.setFrmFieldVal("qconn", "rs",  LZString.compressToEncodedURIComponent(tmpsArrDRS.rs));
	} else {
	JSSHOP.shared.setFrmFieldVal("qconn", "rs", tmpsArrDRS.rs.replace(/\\(.)/mg, "$1"));
	}	
	JSSHOP.shared.setFrmFieldVal("qconn", "fn", tmpsArrDRS.fn);
	JSSHOP.shared.setFrmFieldVal("qconn", "fc", "save");
	document["qconn"].submit();

	};



	JSSHOP.ajax.doRespConstruct = function(tmpDRCArr, tmpRCstr) {
	try {} catch(e) {
	alert("doRespConstruct: " + e);
	}
	// alert("doRespConstruct: " + tmpDRCArr.cb + " : " + tmpRCstr);
	tmpNDRCArr = null;
	tmpNDRCArr = {};
	tmpNDRCArr = tmpDRCArr;
	aRespArr = null;
	aRespArr = {};
			 // alert("doRespConstruct.tmpRCstr: " + " : " + tmpRCstr);	

			  aRespArr = JSON.parse(tmpRCstr);
			  tmpNDRCArr.st = "error";
	 
			tmpNDRCArr.rs = "noQvalue";
	 
	 
			tmpNDRCArr.rs = JSON.stringify(aRespArr.data);
			// alert(JSON.stringify("tmpNDRCArr.rs: " + tmpNDRCArr.rs));
			JSSHOP.ajax.doNuResponse(tmpNDRCArr);

	 
	};

	 


	JSSHOP.ajax.doNurAjaxPipe = function(theAxObj) {

	// going to stop spinner here
	hasLclStrg = "n";

	aRespArr = null;
	aRespArr = {};
	tmpQstr = "";
	tmpFRSstr = "";
	tmpQstr += "fc=" + theAxObj.fc + "&";
	tmpQstr += "ts=" + theAxObj.ts + "&";
	tmpQstr += "fn=" + theAxObj.fn + "&";
	tmpQstr += "lz=" + theAxObj.lz + "&";
	tmpQstr += "rs=" + theAxObj.rs + "&";
	tmpQstr += "q=" + JSSHOP.shared.utf8_encode(theAxObj.q);

	pUrl = theAxObj.ur + tmpQstr;

		   var oReq = JSSHOP.ajax.createXMLHTTPObject();
		 //  oReq.setRequestHeader("connection", "close");
		 tUTA = JSSHOP.shared.urlToArray(pUrl);

	 
		   if(oReq == false) {
			
				theCB(theNAxObj);
		  } else {

			oReq.onreadystatechange = function() {
				if (oReq.readyState == 4) {
				 // alert("oReq.readyState == 4: " + oReq.responseText);
					JSSHOP.ajax.doRespConstruct(theAxObj, oReq.responseText);
				
				}  
			}
			oReq.onerror = function() {
		  // theNAxObj.st = "error";
			// theNAxObj.rs = "error: " + oReq;
			alert("yikes, we have a connection problem..." + oReq);
			}
			oReq.open("GET", pUrl, true);
			picr = oReq.send(null);
		   }
	};



	// prepare the request 
	JSSHOP.ajax.doRequestPrep = function(tmppArrDRP) {

	tmppNArrDRP = null;
	tmppNArrDRP = {};
	tmppNArrDRP = tmppArrDRP;

	if(tmppArrDRP.ls == "n") {
	// alert("tmppArrDRP.ls ==  no");
	JSSHOP.ajax.doNurAjaxPipe(tmppArrDRP);
	} else {
	tLSStr = getNuLclStrg(tmppArrDRP.ls, tmppArrDRP.cb, "noQvalue");
	if(tLSStr == "noQvalue") {
	// alert("tLSStr ==  noQvalue");
	JSSHOP.ajax.doNurAjaxPipe(tmppArrDRP);
	} else {
	tmppNArrDRP.rs =  tLSStr;
	tmppNArrDRP.st = "saved";
	// alert("getNuLclStrg: " + tLSStr);
	// alert("tmppNArrDRP.st = saved");

	JSSHOP.ajax.doNuResponse(tmppNArrDRP);
	}  // tLSStr not noQvalue
	} // ls is not "n";

	};


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

	JSSHOP.ajax.doAjaxPipe = function(pUrl,tmpCB) {
		try {
		   JSSHOP.ajax.doNuAjaxPipe(null,pUrl,tmpCB);
			} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxPipe");
			  }
	};

	JSSHOP.ajax.prepAjaxSbmt = function(tmpBtn, oFormElement,tmpCB) {
		try {
		   tmpBtn.className="cls_button cls_button-medium cls_button-disabled";
		   tmpBtn.disabled=true;
		   JSSHOP.ajax.doAjaxSbmt(oFormElement,tmpCB);
			} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.prepAjaxSbmt");
				}
	};

	JSSHOP.ajax.prepAjaxPipe = function(tmpBtn,pUrl,tmpCB) {
		try {
		  if(tmpBtn != null) {
		   // tmpBtn.className="cls_button cls_button-medium cls_button-disabled";
		   tmpBtn.disabled=true;
		 }
		   JSSHOP.ajax.doNuAjaxPipe(tmpBtn,pUrl,tmpCB);
			} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.prepAjaxPipe");
			  }
	};

	JSSHOP.ajax.doAjaxSbmt = function(oFormElement,tmpCB) {
		try {
		if (!oFormElement.action) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt: !! No form action set !!");
			return;
		}
		var oReq = JSSHOP.ajax.createXMLHTTPObject();
			var oField, sFieldType, nFile, sSearch;
			for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
				oField = oFormElement.elements[nItem];
				if (!oField.getAttribute("name")) {
					continue;
				}
				sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
				if (sFieldType === "FILE") {
					for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
				} else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
					sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
				}
			}
			oReq.onreadystatechange = function() {
				if (oReq.readyState == 4) {
				   tmpCB(oReq.responseText,oFormElement.elements);
				}
			}
			oReq.open(oFormElement.method, oFormElement.action + "?" + sSearch, true);
			oReq.send(null);
			} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt");
			  }
	};


	/*
	* hookloader functions
	*/

	JSSHOP.hookloader.hooks = {};
	JSSHOP.hookloader.register = function(name, callback) {
		if('undefined' == typeof(JSSHOP.hookloader.hooks[name]))
		JSSHOP.hookloader.hooks[name] = [];
		JSSHOP.hookloader.hooks[name].push(callback);
	  };

	JSSHOP.hookloader.call = function(name, arguments) {
		if('undefined' != typeof(JSSHOP.hookloader.hooks[name]))
		  for(i = 0; i < JSSHOP.hookloader.hooks[name].length; ++i)
			if( true != JSSHOP.hookloader.hooks[name][i]( arguments )) { break; }
	};




	/*

	JSSHOP.ui.rndrDataTbl = function(tmpRndrObj) {
	tmpDTHdrsArr = tmpRndrObj.hdrsArr;
	tmpDTResArr = tmpRndrObj.resArr; 
	frstr = "";
	frstr += "<table class=\"striped\"  style=\"width: 100%;\"  cell-padding=\"15px\" cellspacing=\"0px\"><tr>";
	ihdrLen = tmpDTHdrsArr.length;
	iresLen = tmpDTResArr.length;
	ihdrInc = 0;
	iresInc = 0;
	while(ihdrInc < ihdrLen) {
	ihdrObj = tmpDTHdrsArr[ihdrInc];
	frstr += "<td><a id=\"aFld_" + theAQB + "_cp_symbol\" href=\"javascript:showMList('" + theAQB + "','cp_symbol','sortDesc');\" class=\"txtBig txtDecorNone\">Pair</a></td>";
	ihdrInc++;
	}

	frstr += "</tr>";


	while(iresInc < iresLen) {
	ihdrInc = 0;
	iresObj = tmpDTResArr[iresInc];
	frstr += "<tr>";
	while(ihdrInc < ihdrLen) {
	ihdrObj = tmpDTHdrsArr[ihdrInc];
	frstr += "<td>" + iresObj[ihdrObj.cn] + "</td>";
	ihdrInc++;
	}
	frstr += "</tr>";
	iresInc++;
	}



	frstr += "</table>";
	console.log("rndrDataTbl: " + frstr);
	// return frstr;

	};

	*/

	JSSHOP.ui.showShareBox = function(tmpMsgType, tmpMsgVal){
	try {
	JSSHOP.ui.popAndFillLbox(tmpMsgType + " :: " + tmpMsgVal);
	} catch(e) {
	alert("no JSSHOP.ui.showShareBox: " + e);
	}
	};

	var finishMMupload = function(theMMum) {
	try {


		image = null;
		image = new Image();
		image.src = "images/msgimgs/s_thumb" + theMMum;
		document.getElementById("mmprogressBar").appendChild(image);
		JSSHOP.shared.setFrmFieldVal("qmsgs", "msg_media", theMMum);
	} catch(e) {
	alert(e);
	}
	};



	var doMediaBtnSetup = function(tmpMBtnId, tmpMBtnPrfx, tmpMBtnCB, tmpMBtnFldr) {
	try {
	ttbtn = document.getElementById(tmpMBtnId);
	if((isJApp !== "no") && (isPhP == "no")) { 
	JSSHOP.ui.addEvent(ttbtn, "click", function() { JSSHOP.jndroid.doPagePopUp("logipal/media_chooser.html", "noQvalue");return false; });
	// app.setQIMeta(doQIMeta());
	} else {
	currMediaBtnPrfx = tmpMBtnPrfx;
	currMediaBtnCB = tmpMBtnCB;
	currMediaFldr = tmpMBtnFldr;
	JSSHOP.loadScript("js/app/sau.js", JSSHOP.checkLoader,"js");
	}
	} catch(e) {
	alert(e);
	}
	};

	var doMsgMediaSetup = function() {
	try {
 
	doMediaBtnSetup("mmuploadBtn", "mm", "finishMMupload", tmpMediaFldr);
	} catch(e) {
	alert("doMsgMediaSetup: " + e);
	}
	};



	JSSHOP.ui.doMsgThread = function(a,theResp,c) {
	// alert("doMsgThread :" + theResp);
	annewel = document.createElement('div');

	tfullstr = "";
	var tarrToFill = null;
	tarrToFill = [];
	tarrToFill = JSON.parse(theResp);
	var tlen = tarrToFill.length;
	var tiint = 0;
	var tpcid = 0;
	ttstr = "";
	while(tiint < tlen) {
	thasr = "n";
	tts = tarrToFill[tiint];
	ttstr = "<div style=\"min-height: 45px;margin:15px;margin-bottom:18px;\"  class=\"rtable bkgdClrTtl slmtblpadding\">";
	ttmpdate = new Date(tts.ms_dadded * 1000);
	ttmpdstr = "<b>" + ("0" + ttmpdate.getDate()).slice(-2) + "</b>/" + ("0" + (ttmpdate.getMonth() + 1)).slice(-2);
	ttstr += "<span class=\"txtClrHdr\"  style=\"margin-left: 17px\">" + ttmpdstr + " - " + quid + "</span><br>";
	ttstr += "<span class=\"txtClrHdr\"  style=\"margin-left: 17px\">" + tts.ms_matter + "</span>";
	ttstr += "<span><a href=\"javascript:JSSHOP.ui.showReplyMsgBox('nada','" + tts.ms_threadid + "','" + c + "');\">" + tts.ms_viewed + "</a></span>";
	ttstr += "</div>";
	annewel = document.createElement('div');
	annewel.innerHTML = ttstr;
	// 
	tDStr = "dvMsgT" + tts.ms_threadid;
	// tmpTDQI.innerHTML = "";
	if(currUrlArr.threadid){
	thasr = "y";
	tatmpTDQI = document.getElementById("includedContent");
	} else {
	if(document.getElementById(tDStr)) {
	tatmpTDQI = document.getElementById(tDStr);
	thasr = "y";
	}
	}
	if(thasr == "y") {
	tatmpTDQI.appendChild(annewel);
	}
	tiint++;
	}
	if(tarrToFill[0]) {

	} else {
	// ttstr = "<a href=\"index.html?pid=aa-add-shop\">" + stxt[1] + "</a>";
	}
	};


	JSSHOP.ui.doMsgList = function(a,theResp,ttcb) {
	 
	console.log("doMsgList: " + theResp);
	hasr = "n";
	fullstr = "";
	var arrToFill = null;
	arrToFill = [];
	arrToFill = JSON.parse(theResp);
	var len = arrToFill.length;
	var iint = 0;
	var pcid = 0;
	tstr = "";
	while(iint < len) {
	ts = arrToFill[iint];
	tstr += "<div id=\"dvMsgT" + ts._id + "\" style=\"min-height: 45px;margin:15px;margin-bottom:18px;\" class=\"rtable bkgdClrNrml slmtblpadding\">";
	tmpdate = new Date(ts.msg_dadded * 1000);
	tmpdstr = "<b>" + ("0" + tmpdate.getDate()).slice(-2) + "</b>/" + ("0" + (tmpdate.getMonth() + 1)).slice(-2);
	tstr += "<span class=\"txtClrHdr\" style=\"margin-left: 7px;\">" + tmpdstr + " : " + quid;
	if(ts.msg_to == quid ||ts.msg_from == quid || ts.msg_cartid == cartID  ) {
	tstr += "<a href=\"javascript:JSSHOP.ui.showReplyMsgBox('nada','" + ts._id + "','" + ttcb + "');\">" + ts.msg_status + "</a>";
	} else {
	tstr += " - " + ts.msg_status;
	}
	tstr += "</span><br>";
	tstr += "<div class=\"txtClrHdr\" style=\"margin-left: 7px\"><span><a href=\"index.html?pid=aa-show-messages&threadid=" + ts._id + "&cid=" + cid + "\"><b>" + ts.msg_subject + "</b></a></span><br>" + ts.msg_matter + "</div>";
	if(ts.msg_media.indexOf(".") != -1) {
	tstr += "<div class=\"txtClrHdr\" style=\"margin-left: 7px\"><span><a href=\"index.html?pid=aa-show-messages&threadid=" + ts._id + "&cid=" + cid + "\"><img src=\"images/msgimgs/s_thumb" + ts.msg_media + "\" class=\"icndbtn\"></a></span></div>";

	}

	tstr += "</div>";
	iint++;
	}
	 
	if(arrToFill[0]) {
	} else {
	}
	// tstr += "<a href=\"javascript:JSSHOP.ui.showMsgBox('product','" + ts._id + "','" + ttcb + "');\">" + stxt[700] + "</a>";

	return tstr;
	// document.getElementById("includedContent").innerHTML = tstr;
	};






	function showAReplyMsgSave(tamsg, tbmsg, tcmsg){
	try {
	JSSHOP.ui.doMsgThread(tamsg, JSON.stringify(JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["qmsg"], "tmp_"))), "doNada");
	// JSSHOP.ui.popAndFillLbox(tamsg + tbmsg + tcmsg);
	} catch(e) {
	alert("no showReplyMsgSave: " + e);
	}
	}

	function showReplyMsgSave(tamsg, tbmsg, tcmsg){
	try {
	// JSSHOP.ui.popAndFillLbox(tamsg + tbmsg + tcmsg);

	procNuUIitem("qmsgs","msg_dmodified",tamsg,JSSHOP.getUnixTimeStamp(),tamsg);
	 
	} catch(e) {
	alert("no showReplyMsgSave: " + e);
	}
	}
	 
	JSSHOP.ui.doReplyMsgSave = function(tmpMsgType, tmpMsgVal, tTrmsCB){
	try {
	alert("JSSHOP.ui.doReplyMsgSave: " + tmpMsgType + " .." + tmpMsgVal)
	JSSHOP.shared.setFrmFieldVal("qmsg","ms_threadid", tmpMsgVal);
	JSSHOP.shared.setFrmFieldVal("qmsg", "ms_from", cartID);
	JSSHOP.shared.setFrmFieldVal("qmsg", "ms_dadded", JSSHOP.getUnixTimeStamp()); 

	JSSHOP.shared.setFrmFieldVal("qmsgs", "msg_dmodified", JSSHOP.getUnixTimeStamp()); 
	JSSHOP.shared.setFrmFieldVal("qmsgs", "msg_modifiedby", cartID); 


	// JSSHOP.shared.setDynFrmVals(document["qmsg"], "tmp_");
	tmpDOs = null;
	tmpDOs = {};
	tmpDOs["knvp"] = JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["qmsg"], "tmp_"));
	oi = getNuDBFnvp("qmsg",6,null,tmpDOs);
	doQComm(oi["rq"], tTrmsCB, "showReplyMsgSave");


	// alert(oi["rq"]);
	// JSSHOP.ui.popAndFillLbox("Thank you!<b>" + oi["rq"]);
	} catch(e) {
	alert("no JSSHOP.ui.doReplyMsgSave: " + e);
	}
	};

	JSSHOP.ui.showReplyMsgBox = function(tmpMsgType, tmpMsgVal, theTcb){
	try {

	tfsb = nCurrFFieldOb();
	tfsb.fid = "btnMsgsave";
	tfsb.fty = "button";
	tfsb.fcl = function() { JSSHOP.ui.setSaveBtnClick(this, function(){JSSHOP.ui.doReplyMsgSave(tmpMsgType, tmpMsgVal, theTcb)}) };

	tAllowedStr = "ms_subjectms_matter";
	if(quid == "0") {
	// tAllowedStr += "msg_fromsg_emailmsg_fromsg_tel";
	}
	msgFObj =  JSSHOP.shared.rndrDynFrmVals(document["qmsg"], "tmp_", tAllowedStr, tfsb);
	retRndrObj["rndrStr"] = tmpVstr;
	retRndrObj["rndrFobj"] = rndrFFObjArr;
	JSSHOP.ui.popAndFillLbox("OK<br>" + msgFObj.rndrStr);
	setTimeout("JSSHOP.shared.initFrmComps(retRndrObj.rndrFobj)", 500);
	} catch(e) {
	alert("no JSSHOP.ui.showMsgBox: " + e);
	}
	};

	function showMsgSave(tamsg, tbmsg, tcmsg){
	JSSHOP.ui.popAndFillLbox(tamsg + tbmsg + tcmsg);
	}
	 
	JSSHOP.ui.doMsgSave = function(tmpMsgType, tmpMsgVal, tempCB){
	tmpmtid = Math.random().toString(36).slice(2);
	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_threadid", tmpmtid);
	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_userid", quid);
	// JSSHOP.shared.setFrmFieldVal("qmsgs","msg_cartid", cartID);
	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_prodid", itemid);
	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_dmodified", JSSHOP.getUnixTimeStamp()); 
	// JSSHOP.shared.setFrmFieldVal("qmsgs","msg_to", JSSHOP.shared.getFrmFieldVal("qco","c_uid",0));
	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_dadded", JSSHOP.getUnixTimeStamp()); 
	// JSSHOP.shared.setDynFrmVals(document["qmsgs"], "tmp_");
	tmpDOs = null;
	tmpDOs = {};
	tmpDOs["knvp"] = JSSHOP.shared.getKNVParr(JSSHOP.shared.getDynFrmVals(document["qmsgs"], "tmp_"));
	oi = getNuDBFnvp("qmsgs",6,null,tmpDOs);
	doQComm(oi["rq"], null, tempCB);
	// alert(oi["rq"]);
	// JSSHOP.ui.popAndFillLbox("Thank you!<b>" + oi["rq"]);
	};



	JSSHOP.ui.showNuMsgBox = function(tmpMsgToID, tmpMsgType, tmpMsgVal,atmpCB){
	try {

	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_from", quid);
	JSSHOP.shared.setFrmFieldVal("qmsgs","msg_to", tmpMsgToID);
	tfsb = nCurrFFieldOb();
	tfsb.fid = "btnMsgsave";
	tfsb.fty = "button";
	tfsb.fcl = function() { JSSHOP.ui.setSaveBtnClick(this, function(){JSSHOP.ui.doMsgSave(tmpMsgType, tmpMsgVal, atmpCB)}) };


	tsbstr = "<div id=\"mmprogressBar\"></div>"; 
	tsbstr += "<div id=\"mmprogressOuter\"></div>"; 
	tsbstr += "<div id=\"mmmsgBox\"></div>"; 
	tsbstr += "<div id=\"mmdragbox\"></div>"; 
	tsbstr += "<div id=\"dvUploadBtn\" onclick=\"JSSHOP.shared.setFrmFieldVal('qmsgs', 'msg_dadded', JSSHOP.getUnixTimeStamp());\"  style=\"display:block;visibility:visible;margin-right:10px\"><button id=\"mmuploadBtn\" class=\"cls_button cls_button-small\"><ti data-ison=\"" + stxt[70] + "\" data-desc=\"btn_save\">Add</ti></button></div>";
	 



	tAllowedStr = "msg_subjectmsg_matter";
	if(quid == "0") {
	tAllowedStr += "msg_fromsg_emailmsg_fromsg_tel";
	}
	msgFObj =  JSSHOP.shared.rndrDynFrmVals(document["qmsgs"], "tmp_", tAllowedStr, tfsb);
	retRndrObj["rndrStr"] = tmpVstr;
	retRndrObj["rndrFobj"] = rndrFFObjArr;
	JSSHOP.ui.popAndFillLbox("OK<br>" + msgFObj.rndrStr + "<br>" + tsbstr);
	setTimeout("JSSHOP.shared.initFrmComps(retRndrObj.rndrFobj);doMsgMediaSetup();", 500);



	// JSSHOP.ui.popAndFillLbox(JSSHOP.shared.rndrDynFrmVals(document["qmsgs"], "tmp_"));
	} catch(e) {
	alert("no JSSHOP.ui.showNuMsgBox: " + e);
	}
	};

	JSSHOP.ui.showMsgBox = function(tmpMsgType, tmpMsgVal,atmpCB){
	try {



	JSSHOP.ui.showNuMsgBox(0, tmpMsgType, tmpMsgVal,atmpCB);

	// JSSHOP.ui.popAndFillLbox(JSSHOP.shared.rndrDynFrmVals(document["qmsgs"], "tmp_"));
	} catch(e) {
	alert("no JSSHOP.ui.showMsgBox: " + e);
	}
	};





	JSSHOP.ui.showPopHelp = function(tmpHlpKey){
	try {
	tmpHlpD = document.createElement('div');
	if(hlpT[tmpHlpKey] && hlpC[tmpHlpKey]){
	tmpHlpD.innerHTML = "<b>" + hlpT[tmpHlpKey] + "</b><br><br>" + hlpC[tmpHlpKey];
	} else {
	tmpHlpD.innerHTML = hlpT["default"] + " key: "  + tmpHlpKey;
	}
	JSSHOP.ui.popAndAppendLbox(tmpHlpD,"y");
	} catch(e) {
	alert("no JSSHOP.ui.showPopHelp: " + e);
	}
	 
	};




	JSSHOP.ui.showNPopHelp = function(){
	try {

	tmpHlpD = document.createElement('div');
	if(hlpT[currHlpKey] && hlpC[currHlpKey]){
	tmpHlpD.innerHTML = "<b>" + hlpT[currHlpKey] + "</b><br><br>" + hlpC[currHlpKey];
	} else {
	tmpHlpD.innerHTML = hlpT["default"] + " key: "  + currHlpKey;
	}
	JSSHOP.ui.popAndAppendLbox(tmpHlpD,"y");
	} catch(e) {
	alert("no showPopHelp: " + e);
	}
	 
	};



	JSSHOP.ui.setNPopHelp = function(thePath){
	 try {
	setTimeout("JSSHOP.ui.showNPopHelp()", 700);
	} catch(e) {
	alert("no setPopHelp : " + e);
	}
	};

	var currHlpKey = "page";

	JSSHOP.ui.getPopHelp = function(tmpHlpStr){
	if(tmpHlpStr == "page") {
	tmpHlpStr = pid;
	}
	try {
	tmpv = hlpT.defval;
	JSSHOP.ui.showPopHelp(tmpHlpStr);
	} catch(e) {
	// alert("no getPopHelp : " + e);
	currHlpKey = tmpHlpStr;
	tmpGetHCO = "js/" + jscssprefix + "helpstrings_" + usrlang + ".js?"; // help-arr url
	JSSHOP.loadScript(tmpGetHCO, JSSHOP.ui.setNPopHelp,"js");
	}
	 
	};


	JSSHOP.ui.textAreaAdjust = function(theTarea){
	currH = theTarea.scrollHeight;
	theTarea.style.height = "1px";
	theTarea.style.height = "auto";
	theTarea.style.height = (25 + theTarea.scrollHeight);
	};


	JSSHOP.ui.setTinnerHTML = function(theElemId, theInnerHtml){
	if(theInnerHtml == "loading") { // just set the loading image
	theInnerHtml = "<img src=\"images/misc/loading.gif\">";
	}
	try {
	document.getElementById(theElemId).innerHTML = theInnerHtml;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "setTinnerHTML");
	alert("setTinnerHTML: " + theElemId + " :: " + theInnerHtml + " :: " + e);
	}
	};



	JSSHOP.ui.showHideElement = function(theEID, showHide) {
		try {
			theElement = document.getElementById(theEID);
			if (showHide == "show") {
				theElement.style.visibility = "visible";
				theElement.style.display = "block";
			} else {
				theElement.style.visibility = "hidden";
				theElement.style.display = "none";
			}
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.showHideElement");
		}
	};


	JSSHOP.ui.toggleCname = function(theEID, oldCname, newCname) {
		try {
			theElement = document.getElementById(theEID);
			if (theEID.className == oldCname) {
				theElement.className =  newCname;
			} else {
				theElement.className =  oldCname;
			}
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleCname");
		}
	};
	
	JSSHOP.ui.toggleVisibility = function(rowname) {
		try {
			theRow = document.getElementById(rowname);
			if(theRow.style.display == "none") {
				theRow.style.display = "block";
				theRow.style.visibility = "visible";
			} else {
				theRow.style.display = "none";
				theRow.style.visibility = "hidden";
			}
		} catch (e) {
		JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleVisibility");
		}
	};

	JSSHOP.ui.toggleMnuVisibility = function(rowname) {
	 
		try {
			theRow = document.getElementById(rowname);    
			 
			if((theRow.style.display == "block") || (theRow.style.display == "inline-block")) {
											  gmnu = document.getElementById("dvMnuT").innerHTML;
												document.getElementById("dvMnuT").innerHTML = "";
							 document.getElementById("mnuT").innerHTML = gmnu;

				theRow.style.display = "none";
				theRow.style.visibility = "hidden";

			} else {
									 gmnu = document.getElementById("mnuT").innerHTML;
								document.getElementById("mnuT").innerHTML = "";
							 document.getElementById("dvMnuT").innerHTML = gmnu;
				theRow.style.display = "block";
				theRow.style.visibility = "visible";
	 

			}
		
		} catch (e) {
		JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleVisibility");
		}
	};


	JSSHOP.ui.toggleModule = function(linkElem, tglElemID, showMore, showLess) {
		try {
			caption = document.getElementById(linkElem).innerHTML;
			JSSHOP.ui.toggleVisibility(tglElemID);
			if (showMore === "noQvalue") { // dont change inner HTML
			} else {
				if (caption === showMore) {
					document.getElementById(linkElem).innerHTML = showLess;
				} else {
					document.getElementById(linkElem).innerHTML = showMore;
				}
			}
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleModule");
		}
	};


	JSSHOP.ui.toggleNuModule = function(linkElem, tglElemID) {
		try {
			caption = document.getElementById(linkElem).innerHTML;
	 
			JSSHOP.ui.toggleVisibility(tglElemID);
	   
				if (caption.indexOf("more") != -1) {
					document.getElementById(linkElem).innerHTML = "<i class=\"small-material-icons\" style=\"font-size:24px\">expand_less</i>";
				} else {
					document.getElementById(linkElem).innerHTML = "<i class=\"small-material-icons\" style=\"font-size:24px\">expand_more</i>";
				}
	 
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleNuModule");
		}
	};

	JSSHOP.ui.tglPrefModule = function(linkElem, tglElemID, tglPrefKey) {
		try {
			caption = document.getElementById(linkElem).innerHTML;
		  tmpPrvVal = "show";
			JSSHOP.ui.toggleVisibility(tglElemID);
	   
				if (caption.indexOf("more") != -1) {
				
					document.getElementById(linkElem).innerHTML = "<i class=\"small-material-icons\" style=\"font-size:24px\" title=\"expand_less\">&#xe5ce;</i>";
				} else {
				tmpPrvVal = "hide";
					document.getElementById(linkElem).innerHTML = "<i class=\"small-material-icons\" style=\"font-size:24px\" title=\"expand_more\">&#xe5cf;</i>";
				}
	JSSHOP.user.setCkiePrfKV('prfsSHOPuser',tglPrefKey,tmpPrvVal);
	 
		} catch (e) {
			JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.tglPrefModule");
		}
	};


	JSSHOP.ui.setCBBClickEnd = function(theElem, theID, theCBclss, theCB) {
	 
		  theElem.className = theCBclss;
		  JSSHOP.stopIntervalEvent(trgr_bclck[theID]);
		  theCB();
		  return;
	};


	 
	JSSHOP.ui.setNuCBBClickClr = function(theElem, theCclss, theCBclss, theCB, theNBCDelay) {
		try {
				strJobThread = JSSHOP.getUnixTimeStamp();
			//  theMElem = document.getElementById(theElem);
				theElem.className = theCclss;
				if (theElem.getAttribute("data-dblclick") == null) { // preventing double clicks
				theElem.setAttribute("data-dblclick", 1);
				setTimeout(function () {
				if (theElem.getAttribute("data-dblclick") == 1) {
			JSSHOP.startIntervalEvent(trgr_bclck[strJobThread], function() { JSSHOP.ui.setCBBClickEnd(theElem, strJobThread, theCBclss, theCB);}, theNBCDelay);
				}
				theElem.removeAttribute("data-dblclick");
				}, 250);
				} else {
				theElem.removeAttribute("data-dblclick");
				}
		} catch(e) {
				JSSHOP.startIntervalEvent(trgr_bclck[strJobThread], function() { JSSHOP.ui.setCBBClickEnd(theElem, strJobThread, theCBclss, theCB);}, theNBCDelay);

			// alert(e);
			 JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.setCBBClickClr");
		}
	};

	 
	JSSHOP.ui.setCBBClickClr = function(theElem, theCclss, theCBclss, theCB) {
	JSSHOP.ui.setNuCBBClickClr(theElem, theCclss, theCBclss, theCB, 380); 
	};

	JSSHOP.ui.setNuSaveBtnEnd = function(theObj,theCB) {
	stopNuSpin(theObj.id);
	document.getElementById(theObj.id).disabled=false;
	JSSHOP.ui.setNuCBBClickClr(theObj,'cls_button-save bkgdClrDGreen txtClrWhite','cls_button-save', theCB, 380);
	};


	JSSHOP.ui.setNuSaveBtnClick = function(theObj,theCB,theBtnH) {
	theObj.innerHTML = "";
	theObj.disabled=true;
	doNuSpinSet(theObj.id, "small", null, theBtnH);
	JSSHOP.ui.setNuCBBClickClr(theObj,'icnbtn crsrPointer brdrClrHdr txtClrGrey','icnbtn crsrPointer', theCB, 380);
	};

	JSSHOP.ui.setSaveBtnClick = function(theObj,theCB) {
	theObj.innerHTML = "";
	theObj.disabled=true;
	doSpinSet(theObj.id, "small", null);
	JSSHOP.ui.setNuCBBClickClr(theObj,'cls_button-save txtClrGrey','cls_button-save', theCB, 410);
	};




	JSSHOP.ui.doDefBtn = function(tmpTxt, tmpCallback) {
	tmpRd = "<div class=\"crsrPointer\"><div onclick=\"javascript:JSSHOP.ui.setCBBClickClr(this,'slmtable brdrClrNrml','slmtable brdrClrHdr', function(){" + tmpCallback + "});\" class=\"txtBig slmtable brdrClrHdr\">";
	tmpRd += tmpTxt + "</div></div>";
	return tmpRd;
	};

	JSSHOP.ui.doDefCBBCC = function(theObj,b,dcb) {
	// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','txtClrHdr clsDummy', function() { dcb });
	JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'txtClrHdr','clsDummy', function() { dcb });

	};

	JSSHOP.ui.popLmenu = function() {
	try {
	timerID = setInterval("JSFX.MakeFloatingLayer.animate()", 30);
	setTimeout('clearInterval(timerID)', 2000);
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.popLmenu");
	}
	};

	JSSHOP.ui.deleteRow = function(r) {
	try {
		tmpTRowI = r.parentNode.parentNode.rowIndex;
		// document.getElementById("myTable").deleteRow(tmpTRowI);
		r.parentNode.parentNode.deleteRow(tmpTRowI);	
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.deleteRow");
	}
	};


	JSSHOP.ui.popAndAppendLbox = function(theFill, clearLB) {
	try {
	tmpLbox = document.getElementById('lightbox');
	tmpLCbox = document.getElementById('lightbox_content');
	tmpLbox.style.display='inline';

	if(clearLB == "y"){
	tmpLCbox.innerHTML = "";
	}
	tmpLCbox.appendChild(theFill);
	tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	if(tmpLCbox.clientHeight >= tmpVheight) {
	tmpLbox.style.position="absolute";
	newel = document.createElement('div');
	newel.innerHTML = "New Inserted";
	tmpLCbox.appendChild(newel);
	tmpLbox.style.height = tmpLCbox.clientHeight + 180;
	}
	tmpLCbox.style.display='block';
	tmpLCbox.style.position="relative";
	stop = getScrollTop();
	// tmpLCbox.style.top=stop+"px";
	scrollToElement("dvHdr");
	window.scrollTo(0,0);
	tmpLCbox.style.top="5px";

	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.popAndAppendLbox");
	}
	};

	JSSHOP.ui.popAndFillLbox = function(theFill) {
	JSSHOP.ui.popNuFillLbox(theFill, 5);
	}
	JSSHOP.ui.popNuFillLbox = function(theFill, theTofst) {
	// spinner.stop();
	try {
	tmpLbox = document.getElementById('lightbox');
	tmpLCbox = document.getElementById('lightbox_content');
	tmpLbox.style.display="inline";
	if(theFill == "noQvalue") {
	} else if(theFill == "spin") {
	} else if(theFill == "dbug") {
	tmpLCbox.innerHTML= "<div style=\"overflow:auto;min-height: 231px; min-width: 368px\"  contenteditable=\"true\">" + currDBUGstr + "</div>";
	// tmpLCbox.className = "lightbox_table";
	} else {
	tmpLCbox.innerHTML=theFill;
	}
	tmpLCbox.style.position="absolute";
	tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	if(tmpLCbox.clientHeight >= tmpVheight) {
	// tmpLbox.style.position="absolute";
	newel = document.createElement('div');
	newel.innerHTML = "New Inserted";
	tmpLCbox.appendChild(newel);
	tmpLbox.style.height = tmpLCbox.clientHeight + 180;
	}
	tmpLCbox.style.display='block';
	 

	stop = getScrollTop() + 10;
	tmpLCbox.style.top=stop+"px";
	// scrollToElement("dvHdr");
	// window.scrollTo(0,0);
	// tmpLCbox.style.top="5px";
	if(getViewportWidth() > 500) {}
	iMdl = Math.round((getViewportWidth() - tmpLCbox.clientWidth) / 2);
	tmpLCbox.style.left=iMdl+"px";

	// tmpLCbox.style.position="fixed";
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.popAndFillLbox");
	}
	};



	JSSHOP.ui.tglGridRow = function(theMnDiv, theOldCls, theNewCls) {
	pTglDiv = document.getElementById(theMnDiv);

	if(document.getElementsByClassName(theOldCls)) {
	pTglElmnts = document.getElementsByClassName(theOldCls);
	tNowCls = theNewCls;

	} else {
	pTglElmnts = document.getElementsByClassName(theNewCls);
	tNowCls = theOldCls;
	 
	}


		for (var iDDs = 0; iDDs < pTglElmnts.length; iDDs++) {
		try {
		pTglElmnts[iDDs].className = "";
	 
		pTglElmnts[iDDs].className = "rtable";
		pTglElmnts[iDDs].className = tNowCls;
		} catch(e) {
		console.log("JSSHOP.ui.tglGridRow: " + e + " :: " +  pTglElmnts[iDDs])
		}
		} 

	};

	JSSHOP.ui.popFScreenDiv = function(thePDiv) {

	if (
		document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement
	  ) {
		if (document.exitFullscreen) {
		 thePDiv.className = "donada";
		  document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
		  document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
		  document.msExitFullscreen();
		}

	  } else {
		 thePDiv.className = "overScroll";
		if (thePDiv.requestFullscreen) {
		  thePDiv.requestFullscreen();
		} else if (thePDiv.mozRequestFullScreen) {
		  thePDiv.mozRequestFullScreen();
		} else if (thePDiv.webkitRequestFullscreen) {
		  thePDiv.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		} else if (thePDiv.msRequestFullscreen) {
		  thePDiv.msRequestFullscreen();
		}
	  }

	};


	JSSHOP.ui.popLboxDiv = function(thePDiv) {
	// spinner.stop();
	try {

	currLBoxDiv = document.getElementById(thePDiv);
	if(currLBoxDiv.parentNode) {
	currLBoxPar = currLBoxDiv.parentNode;
	}
	currLBoxDiv = "";
	currLBoxPar = currLBoxDiv.innerHTML;

	tmpLbox = document.getElementById('lightbox');
	tmpLCbox = document.getElementById(thePDiv);
	tmpLbox.style.display="inline";
	 
	tmpLCbox.style.position="absolute";
	tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	if(tmpLCbox.clientHeight >= tmpVheight) {
	// tmpLbox.style.position="absolute";
	cwel = document.createElement('div');
	acfullResp = "<span onclick=\"JSSHOP.ui.closeLbox();\" style=\"float:right\">Close</span>";
	cwel.innerHTML = acfullResp;
	tmpLCbox.appendChild(cwel);
	newel = document.createElement('div');
	newel.className = "bkgdClrWhite";

	newel.innerHTML = "New Inserted";

	tmpLCbox.appendChild(newel);
	tmpLbox.style.height = tmpLCbox.clientHeight + 180;
	}
	tmpLCbox.style.display='block';
	 

	stop = getScrollTop() + 10;
	tmpLCbox.style.top=stop+"px";
	// scrollToElement("dvHdr");
	// window.scrollTo(0,0);
	// tmpLCbox.style.top="5px";
	if(getViewportWidth() > 500) {}
	iMdl = Math.round((getViewportWidth() - tmpLCbox.clientWidth) / 2);
	tmpLCbox.style.left=iMdl+"px";

	// tmpLCbox.style.position="fixed";
	} catch(e) {
	alert("JSSHOP.ui.popLboxDiv.ERROR: " + e);
	}
	};


	JSSHOP.ui.popLboxMap = function() {
	// spinner.stop();
	try {

	

	  
	  
	tmpLbox = document.getElementById('lightbox');
	tmpLCbox = document.getElementById('dvSandMap');
	tmpLbox.style.display="inline";

	tmpLCbox.style.position="absolute";
	tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	if(tmpLCbox.clientHeight >= tmpVheight) {
	// tmpLbox.style.position="absolute";
	newel = document.createElement('div');
	newel.innerHTML = "New Inserted";
	tmpLCbox.appendChild(newel);
	tmpLbox.style.height = tmpLCbox.clientHeight + 180;
	}
	tmpLCbox.style.display='block';
	 

	stop = getScrollTop() + 10;
	tmpLCbox.style.top=stop+"px";
	// scrollToElement("dvHdr");
	// window.scrollTo(0,0);
	// tmpLCbox.style.top="5px";
	if(getViewportWidth() > 500) {}
	iMdl = Math.round((getViewportWidth() - tmpLCbox.clientWidth) / 2);
	tmpLCbox.style.left=iMdl+"px";
		xaCstr = document.getElementById('map').innerHTML;
      if(xaCstr.length > 4){
 
      } else {
	getRoute();
	}
	// tmpLCbox.style.position="fixed";
	} catch(e) {
	alert("popLboxMap: " + e);
	}
	};












	JSSHOP.ui.popLbox = function() {
	try {
	document.getElementById('lightbox').style.display='inline';
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.popLbox");
	}
	};

	JSSHOP.ui.closeLbox = function() {
	try {} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.closeLbox");
	}
	document.getElementById('lightbox').style.display='none';
	document.getElementById('lightbox_content').style.top='-800px';
	document.getElementById('lightbox_content').style.display='none';
	if(document.getElementById("dvSandMap")) {
 	document.getElementById('dvSandMap').style.top='-800px';
	document.getElementById('dvSandMap').style.display='none';
	}

	};
	 

	JSSHOP.ui.setfaction = function(fname, sumbmitbool, alertstring)
	{
	try {
	if(alertstring != null){
	if((confirm(alertstring)) && (sumbmitbool)) {
	document[fname].submit();
	} else {
	alertstring = "";
	}
	}
	if(sumbmitbool) {
	document[fname].submit();
	}
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.setfaction");
	}
	};


	JSSHOP.ui.setTopTip = function(tmpTipStr) {
	try {
	strTip = "<img src=\"images/checked_g.gif\" class=\"clsToolTipImage\">";
	strTip += "&nbsp;<span class=\"txtSmall txtClrDlg\">" + tmpTipStr + "</span>";
	return strTip;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.setfaction");
	return " - ";
	}
	};
	 
	JSSHOP.ui.setLblHighlight = function(theTmpFld,theTmpFldTxt,theTmpLbl,theTmpLblTxt) {

	try {
	/*
	var fvTFI = theTmpFld.id;
	sFieldType = theTmpFld.nodeName.toUpperCase() === "INPUT" ? theTmpFld.getAttribute("type").toUpperCase() : "TEXT";
	if ((sFieldType !== "RADIO" || sFieldType !== "CHECKBOX") || (theB.nodeName.toUpperCase() === "DIV")) {
	JSSHOP.ui.addEvent(theTmpFld, "focus", function() {  theTmpLbl.className = "txtClrHdr";ax = theTmpFld.value;theTmpFld.value = '';theTmpFld.value=ax;  theTmpFld.selectionStart = theTmpFld.selectionEnd = 10000;});
	} else {

	}
	*/
	JSSHOP.ui.addEvent(theTmpFld, "focus", function() {  theTmpLbl.className = "txtClrHdr";});

	JSSHOP.ui.addEvent(theTmpFld, "blur", function() {  theTmpLbl.className = "txtClrDDlg";return false; });
	// JSSHOP.ui.addEvent(theTmpfld, "blur", function() { theTmpLbl.className = 'txtClrDlg' });

	} catch(e) {
	alert("JSSHOP.ui.setLblHighlight: " + e + " :: " + theTmpLblTxt);
	// JSSHOP.logJSerror(e, arguments, "JSSHOP.setLblHighlight");
	}
	};



	JSSHOP.ui.doInpDVFocusEv = function(theElem, theDefText) {
	try {
	if(theElem.value==theDefText) {
	theElem.value = "";
	}
	theElem.style.color="#000000";
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, doInputFocusEv);
	}
	};
	 
	JSSHOP.ui.doInpDVBlurEv = function(theElem, theDefText) {
	try {
	if(theElem.value == ""){
	theElem.value=theDefText;
	}
	theElem.style.color="#999966";
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "doInputBlurEv");
	}
	};



	JSSHOP.ui.doDivDVFocusEv = function(theElem, theDefText) {
	try {
	if(theElem.innerText==theDefText){
	theElem.innerText="";
	}
	theElem.style.color="#000000";
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, doDivFocusEv);
	}
	};
	 
	JSSHOP.ui.doDivDVBlurEv = function(theElem, theDefText) {
	try {
	if(theElem.innerText.length < 3){
	theElem.innerText=theDefText;
	}
	theElem.style.color="#999966";
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "doDivBlurEv");
	}
	};


	JSSHOP.ui.doClassSet = function(theElem, theDefClass) {
	try {
	theElem.className=theDefClass;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "doClassSet");
	}
	};

	JSSHOP.ui.setDefFval = function(theTmpfld, theTmpFVal, theTmpFill) {
	try {

	if(theTmpfld.nodeName.toUpperCase() === "DIV") {
	if(theTmpFill !== "noQvalue") {
	JSSHOP.ui.doDivDVBlurEv(theTmpfld,theTmpFVal);
	}
	JSSHOP.ui.addEvent(theTmpfld, "focus", function() { JSSHOP.ui.doDivDVFocusEv(theTmpfld,theTmpFVal) });
	JSSHOP.ui.addEvent(theTmpfld, "blur", function() { JSSHOP.ui.doDivDVBlurEv(theTmpfld,theTmpFVal) });
	} else {
	if(theTmpFill !== "noQvalue") {
	JSSHOP.ui.doInpDVBlurEv(theTmpfld,theTmpFVal);
	}
	JSSHOP.ui.addEvent(theTmpfld, "focus", function() { JSSHOP.ui.doInpDVFocusEv(theTmpfld,theTmpFVal) });
	JSSHOP.ui.addEvent(theTmpfld, "blur", function() { JSSHOP.ui.doInpDVBlurEv(theTmpfld,theTmpFVal) });
	}
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.setDefFval");
	return " - ";
	}
	};


	/* Event Functions */

	// Add an event to the obj given
	// event_name refers to the event trigger, without the "on", like click or mouseover
	// func_name refers to the function callback when event is triggered
	JSSHOP.ui.addEvent = function(obj,event_name,func_name){
	try {
		if (obj.attachEvent){
			obj.attachEvent("on"+event_name, func_name);
		}else if(obj.addEventListener){
			obj.addEventListener(event_name,func_name,true);
		}else{
			obj["on"+event_name] = func_name;
		}
	} catch(e) {
	alert("JSSHOP.ui.addEvent: " + func_name );
	}
	};

	// Removes an event from the object
	JSSHOP.ui.removeEvent = function(obj,event_name,func_name){
		if (obj.detachEvent){
			obj.detachEvent("on"+event_name,func_name);
		}else if(obj.removeEventListener){
			obj.removeEventListener(event_name,func_name,true);
		}else{
			obj["on"+event_name] = null;
		}
	};

	// Stop an event from bubbling up the event DOM
	JSSHOP.ui.stopEvent = function(evt){
		evt || window.event;
		if (evt.stopPropagation){
			evt.stopPropagation();
			evt.preventDefault();
		}else if(typeof evt.cancelBubble != "undefined"){
			evt.cancelBubble = true;
			evt.returnValue = false;
		}
		return false;
	};















	/*
	* shop funcitions
	*/







	JSSHOP.shop.setCurrItemArr = function(tmpIarr) {
	currItemArr = null;
	currItemArr = tmpIarr;
	};
	JSSHOP.shop.getCurrItemArr = function() {
	return currItemArr;
	};
	JSSHOP.shop.setCurrItemsArr = function(tmpIarr) {
	currItemsArr = null;
	currItemsArr = tmpIarr;
	};
	JSSHOP.shop.getCurrItemsArr = function() {
	return currItemsArr;
	};
	JSSHOP.shop.setCurrMItemsArr = function(tmpIarr) {
	currMItemsArr = null;
	currMItemsArr = tmpIarr;
	};
	JSSHOP.shop.getCurrMItemsArr = function() {
	return currMItemsArr;
	};
	JSSHOP.shop.getCurrIArrIndex = function(tIint) {
	// alert("getCurrIArrIndex " + JSON.stringify(currItemsArr[tIint]));
	return currItemsArr[tIint];
	};
	JSSHOP.shop.getCurrMIArrIndex = function(tIint) {
	// alert("getCurrMIArrIndex " + JSON.stringify(currMItemsArr[tIint]));
	return currMItemsArr[tIint];
	};

	var setPopCartIArr = function(theObj,b,iei) {
	currCartIArr = null;
	currCartIArr = [];
	currCartIArr = JSON.parse(b);
	JSSHOP.shop.doCartAddPop();
	setCartIArr("y", b, "n");
	// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','cls_button cls_button-xxsmall bkgdClrNrml brdrClrDlg txtClrHdr', function(){JSSHOP.shop.doCartAddPop()});

	// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','txtClrHdr bkgdClrWhite', function(){window.scrollTo(0,0);JSSHOP.ui.setCBBClickClr(document.getElementById('ahCartIcon'),'cls_button cls_button-medium brdrClrDlg txtClrHdr','clsDummy', function(){void(0)})});
	};

	var xdoAddFnsh = function(theObj,b,iei) {

		tmpDOs = null;
		tmpDOs = {};
		tmpDOs["ws"] = "where ci_uid=? and ci_coid=? and ci_cartqty >? and ci_rtype=? and ci_cartid=?";
		tmpDOs["wa"] = [quid,cid,0,5,cartID]; 
		oi = getNuDBFnvp("qcartitem",5,null,tmpDOs);
		doQComm(oi["rq"], null, "setPopCartIArr");


	// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','cls_button cls_button-xxsmall bkgdClrNrml brdrClrDlg txtClrHdr', function(){JSSHOP.shop.doCartAddPop()});

	// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','txtClrHdr bkgdClrWhite', function(){window.scrollTo(0,0);JSSHOP.ui.setCBBClickClr(document.getElementById('ahCartIcon'),'cls_button cls_button-medium brdrClrDlg txtClrHdr','clsDummy', function(){void(0)})});
	};

	var xrenderCartPop = function(theObj,b, iei) {
	JSSHOP.ui.popAndFillLbox("loading...");
	tmpDOs = null;
	tmpDOs = {};

	tmpQtInt = 6;
	if(b.indexOf("_id") != -1) {
	// alert(b);
	var arrToFill = null;
	arrToFill = JSON.parse(b);
	ts = arrToFill[0];
	JSSHOP.shared.setFrmFieldVal("qcartitem", "_id", ts._id);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_cartqty", Math.round(ts.ci_cartqty) + 1);
	tmpDOs["ws"] = "where ci_uid=? and ci_coid=? and ci_pid=?";
	tmpDOs["wa"] = [quid,cid,strRecID];
	tmpQtInt = 7;
	} else {
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_cartqty", 1);
	}
	tmpDOs["knvp"] = JSSHOP.shared.getFrmVals(document["qcartitem"], "nada");
	// alert("renderCartPop: " + oi["rq"]);
	oi = getNuDBFnvp("qcartitem",tmpQtInt,theObj,tmpDOs);
	doQComm(oi["rq"], theObj, "xdoAddFnsh");
	};

	JSSHOP.shop.doQIadd = function(thePrdsArna, theObj,theId, iei){
	try {
	tmpVindex = iei;
	tsa = {};
	tsa = currProdsArr[thePrdsArna][iei];
	// alert("JSSHOP.shop.doQIadd"  + thePrdsArna + ":: " + iei + ":: " + JSON.stringify(currProdsArr[thePrdsArna][iei]));
	 
	strRecID = tsa._id;
	strRecType = 51;

	var today = new Date().getTime();
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_uid", quid);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_cartid", cartID);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_coid", cid);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_catid", tsa.i_catid);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_pid", strRecID);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_title", tsa.i_title);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_price_a", tsa.i_price_a);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_price_b", tsa.i_price_b);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_dimen_n", tsa.i_dimen_n);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_dimen_v", tsa.i_dimen_v);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_img", tsa.i_img);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_vala", tsa.i_vala);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_valb", catid);
	JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_dadded", today);


	tmpDOs = null;
	tmpDOs = {};
	tmpDOs["ws"] = "where ci_uid=? and ci_coid=? and ci_pid=?";
	tmpDOs["wa"] = [quid,cid,strRecID];
	oi = getNuDBFnvp("qcartitem",5,null,tmpDOs);
	// alert(oi["rq"]);
	doQComm(oi["rq"], theObj, "xrenderCartPop");
	} catch(e) {
	alert(e);
	}
	};




	JSSHOP.shop.doItemShowPop = function() {
		loadNuJSModal("tplates/aa-mod-show-item.html?tt=" + JSSHOP.getUnixTimeStamp(), "trans");
	};



	 


	JSSHOP.shop.doCartAddPop = function() {

	JSSHOP.ui.popAndFillLbox(JSSHOP.shop.renderNuCartItems("n", "y", 60));
	};

	JSSHOP.shop.doCAshow = function(thePrdsArna, theObj) {
	JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'crsrPointer icndbtn slmtable bkgdClrTtl brdrClrHdr txtClrHdr fltrImgInvClr','crsrPointer icndbtn', function(){void(0)});
		JSSHOP.shared.setFrmVals("qitem",tmpVitemArr[tmpVindex],function() {doCartAddPop()});
	};

	JSSHOP.shop.doIshow = function(thePrdsArna, iei) {
		 // alert("JSSHOP.shop.doIshow "  + thePrdsArna + ":: " + iei + ":: " + JSON.stringify(currProdsArr[thePrdsArna][iei]));
		JSSHOP.shop.setCurrItemArr(currProdsArr[thePrdsArna][iei]);
		JSSHOP.shared.setFrmVals("qitem", currProdsArr[thePrdsArna][iei], function () {
			JSSHOP.shop.doItemShowPop();
		});
	};


	JSSHOP.shop.getIShowstr = function (thePrdsArna, rid, tmprhtml) {
		strTret = "<div onclick=\"JSSHOP.ui.setCBBClickClr(this,'crsrPointer brdrClrHdr','crsrPointer brdrNone', function(){JSSHOP.shop.doIshow('" + thePrdsArna + "'," + rid + ");});\" class=\"crsrPointer brdrNone\">";
		strTret += tmprhtml + "</div>";
		return strTret;
	};



	JSSHOP.shop.getPrdPriceStr = function(thePrdsArna, prcInt, prcID, prcA, prcB){
	 
		retStrPrHtml =  "<br><span class=\"txtBig txtClrDlg\">" + prcB + "</span>";
		// retStrPrHtml +=  "<img src=\"images/cart_r.gif\" class=\"crsrPointer icndbtn\"  id=\"tdCI" + thePrdsArna  + prcID + "\" onclick=\"javascript:JSSHOP.shop.doQIadd('" + thePrdsArna + "',this.id," + prcID + "," + prcInt + ");\">";

	 
			try {
		na = prcA - prcB;
		nd = Math.round((na / prcA) * 100);
		retStrPrHtml = "";
			retStrPrHtml =  prcB ;
		 // retStrPrHtml =  "<br><span class=\"txtBig txtClrDlg\">" + prcB + "</span>";
		// retStrPrHtml +=  "<img src=\"images/cart_r.gif\" class=\"crsrPointer icndbtn\"  id=\"tdCI" + thePrdsArna + prcID + "\" onclick=\"javascript:JSSHOP.shop.doQIadd('" + thePrdsArna + "',this.id," + prcID + "," + prcInt + ");\">";


			return retStrPrHtml;
			} catch(e) {
			return retStrPrHtml;
			}
	};

	JSSHOP.shop.getPrdImgStr = function(tTAnme, tmpVala){

			retIstrI = "images/misc/example_thumb.png";
			try {
			tmpValb = tmpVala;
			if((tmpValb.indexOf("lcl-") != -1) || (tmpValb.indexOf("rem-") != -1)) {
			tmpVala = tmpValb.substring(4, tmpValb.length);
			}
			if(tmpVala.indexOf(".") != -1) {
			if((tTAnme == "prodpg") || (tTAnme == "modItem")) {
			retIstrI = "images/pimgs/" + tmpVala;	
			} else {
			retIstrI = "images/pimgs/s_thumb" + tmpVala;	
			}  
			}
			if(isPhP == "no") {

			if(tmpVala.indexOf(".gif") != -1) {

			if(tTAnme == "prdmedia") {
			tmpEstr = app.doThmbStr(tmpVala);
			document.getElementById("fldChallArray").value = tmpEstr;
			fullIstr = document.getElementById("fldChallArray").value;
			retIstrI = "data:image/jpeg;base64, " + fullIstr;
				} else {
			tmpEstr = app.doGifStr(tmpVala);
			document.getElementById("fldChallArray").value = tmpEstr;
			fullIstr = document.getElementById("fldChallArray").value;
			retIstrI = "data:image/gif;base64, " + fullIstr;
			}

			} else if(tmpVala.indexOf(".mp4") != -1) {

			if(tTAnme == "prdmedia") {
			tmpEstr = app.doThmbStr(tmpVala);
			document.getElementById("fldChallArray").value = tmpEstr;
			fullIstr = document.getElementById("fldChallArray").value;
			retIstrI = "data:image/jpeg;base64, " + fullIstr;

				} else {
	 
			tmpEstr = app.doGifStr(tmpVala);
			document.getElementById("fldChallArray").value = tmpEstr;
			fullIstr = document.getElementById("fldChallArray").value;
			retIstrI = "data:video/mp4;base64, " + fullIstr;
			}

			} else {
			tmpEstr = app.doThmbStr(tmpVala);
			document.getElementById("fldChallArray").value = tmpEstr;
			fullIstr = document.getElementById("fldChallArray").value;
			retIstrI = "data:image/jpeg;base64, " + fullIstr;
			}

			}
			return retIstrI;
			} catch(e) {
			return retIstrI;
			}
	};




	JSSHOP.shop.setPrdImg = function(tsCatArrNm, tCIL) {
	try {
	 
	if(ntImgCtr[tsCatArrNm] >= tCIL){
	clear(tsCatArrNm)();
	// currPgTitle = "c" + JSSHOP.getUnixTimeStamp();
	// document.title = currPgTitle; 
	} else {
	ass = null;
	ass = currProdsArr[tsCatArrNm][ntImgCtr[tsCatArrNm]];

		image = null;
		image = new Image();
		image.src = JSSHOP.shop.getPrdImgStr(tsCatArrNm, ass.i_img);

		image.onload = function() {
			if(document.getElementById(tsCatArrNm + ass._id)) {
		if(document.getElementById(tsCatArrNm + ass._id).src == image.src) {
		// do nothing if its the example img
		} else {
		   document.getElementById(tsCatArrNm + ass._id).src = image.src;
		}
		   } else { 
		   // alert(tsCatArrNm + ass._id);
		   }
		ntImgCtr[tsCatArrNm] = ntImgCtr[tsCatArrNm] + 1;
		// currPgTitle = JSSHOP.getUnixTimeStamp();
		// document.title = currPgTitle; 
		}
		image.onerror = function() {
		   ntImgCtr[tsCatArrNm] = ntImgCtr[tsCatArrNm] + 1;
		}


	// document.getElementById(tsCatArrNm + ass._id).src = JSSHOP.shop.getPrdImgStr(tsCatArrNm, ass.i_img);

	}

	} catch(e) {
	// alert("ntImgCtr[tsCatArrNm]: " + ntImgCtr[tsCatArrNm] + " :: tsCatArrNm: " + tsCatArrNm + " :: " + "tCIL: " + tCIL);
	ntImgCtr[tsCatArrNm] = ntImgCtr[tsCatArrNm] + 1;
	// alert(e);
	// clear(tsCatArrNm)();
	}
	};
	 
	 



	JSSHOP.shop.setCatPrdImgs = function(tCatArrNm) {
	try {
	 
	ntImgCtr[tCatArrNm] = 0;
	restart(tCatArrNm, function() { JSSHOP.shop.setPrdImg(tCatArrNm, currProdsArr[tCatArrNm].length) }, currImgSleep)();
	// JSSHOP.startNuIntrvlEvnt(tCatArrNm,  function() { JSSHOP.shop.setPrdImg(tCatArrNm, currProdsArr[tCatArrNm].length) }, currImgSleep);
	} catch(e) {
	alert("setCatPrdImgs " + e);
	}
	};

	JSSHOP.shop.rndrPrdMedia = function(aa,bb,cc) {
	// alert(bb);
	try {
	if(bb.indexOf("_id") != -1) {
	// tmpRPMArr  = JSON.parse(bb);

	}
	} catch(e) {
	alert("rndrPrdMedia " + e);
	}
	};


	JSSHOP.shop.getPrdMedia = function(tmpCatId,tmpIid,tmpGPMCB) {
	 
	try {
		tmpDOs = null;
		tmpDOs = {};
		tmpDOs["ws"] = "where m_coid=? and  m_catid=? and m_pid=? and m_rtype=?";
		tmpDOs["wa"] = [cid,tmpCatId,tmpIid,"5"];
		oi = getNuDBFnvp("qmedia", 5, null, tmpDOs);
		doQComm(oi["rq"], null,tmpGPMCB); 
	} catch(e) {
	alert("JSSHOP.shop.getPrdMedia: " + e);
	}
	};
	 



	/* 
	* this function takes an items array and returns 
	* the html for displaying those items
	*/

	JSSHOP.shop.getPrdsFullStr = function(thePrdsArna, thePrdsArr, thePrdsClss, thePrdsElem, thePrdsCB){
	 

	currProdsArr[thePrdsArna] = thePrdsArr;
	// alert("getPrdsFullStr: " + JSON.stringify(thePrdsArr));

	  try {
	var upRefs = arrUprefs["prfsSHOPuser"][0].scv;
	} catch(e) {
	var upRefs = "r";
	}

	try {
	var upPrixRef = arrUprefs["prfsSHOPuser"][0].scp;
	} catch(e) {
	var upPrixRef = "u";
	}


	strUCPID = "";
	strUCPTtl = "";
	strCatID = "";
	strCatName = "";
	strHtml = "";
	strMLinks = "";
	strImgDsct = "";

	var len = thePrdsArr.length;
	 
	tstr = "";
	iint = 0;

	// product-grid
	strHtml += "<div><ol class=\"float\" style=\"list-style:none;\">";
	 
	ts = null;

	while(iint < len) {
	// ts = null;
	try {
	ts = thePrdsArr[iint];
	if(ts._id) {
	strImgDsct = "";
		  subTIdesc = ts.i_desc;


		if((thePrdsArna == "prodpg") || (pid == "aa-show-item")){
		subIdesc = subTIdesc;
		  strImgDsct += "<div><img onclick=\"document.location.href = this.src\" id=\"" + thePrdsArna +  ts._id + "\" src=\"images/misc/trans.gif\" class=\"activator prodBigImage crsrPointer\"></div>";
		} else {
		subIdesc = subTIdesc.substring(0, 15);
		  strImgDsct += "<a href=\"index.html?pid=aa-show-item&itemid=" + ts._id + "&cid=" + ts.i_coid + "&catid=" + ts.i_catid + "\">";
		if(upRefs == "r") {
		  strImgDsct += "<img id=\"" + thePrdsArna +  ts._id + "\" src=\"images/misc/example_thumb.png\" class=\"prodRowImage\">";
		} else {	
		  strImgDsct += "<img id=\"" + thePrdsArna +  ts._id + "\" src=\"images/misc/example_thumb.png\" class=\"prodImage\">";
		}
		  strImgDsct += "</a>";
		}
	   

		if((thePrdsArna == "prodpg") && (pid == "aa-show-item")){
		strHtml += "<li  class=\"prodBigBox\">";
		} else {
		if(upRefs == "r") {
		 strHtml += "<li  class=\"prodRowBox\" style=\"width:100%;\">";
	 

		} else {
		strHtml += "<li class=\"prodBox float-item\" style=\"\">";
		}
		}


		  strHtml += "<a class=\"txtDecorNone\"  href=\"index.html?pid=aa-show-item&itemid=" + ts._id + "&cid=" + ts.i_coid + "&catid=" + ts.i_catid + "\">";

		strHtml += "<div class=\"txtBold\" style=\"padding: 3px;\">";
		strHtml += ts.i_title;
		strHtml += "</div></a>";
		strHtml +=  strImgDsct;









		if(thePrdsArna == "prodpg") {


	 



		strHtml += "<div id=\"dvPrdMedia\"></div>";



		}

		strHtml +=  "<div class=\"txtSmall txtClrHdr\" style=\"padding:6px;\">";
		strHtml +=  subIdesc;
		strHtml +=  "</div>";

	 
		



		strPriceHtml =  JSSHOP.shop.getPrdPriceStr(thePrdsArna, iint, ts._id, ts.i_price_a, ts.i_price_b);

		 strHtml += "<span class=\"txtBig txtBold txtClrDGreen\"  style=\"margin: 15px;\">" + strPriceHtml + "</span>";

	 
		strHtml += "<div  id=\"tdCI" + ts._id + "\" onclick=\"javascript:JSSHOP.shop.doQIadd('" + thePrdsArna + "',this.id,'" + ts._id + "','" + iint + "');\" class=\"cls_button cls_button-xxsmall bkgdClrNrml brdrClrDlg txtClrHdr\">";
		strHtml += "<i class=\"material-icons\" alt=\"add cart\" title=\"add\" value=\"shopping_cart\">&#xe8cc;</i>";
		strHtml += "<i class=\"material-icons\" alt=\"add cart\" title=\"add\" value=\"add\">&#xe145;</i>"; 
			 // <img src=\"images/cart_r.gif\" class=\"icnsmlbtn brdrClrWhite crsrPointer\">";
		strHtml += "</div>";
		currFTclr = "material-icons txtClrTtl";
		tmpUFstr = "index.html?pid=aa-show-item&itemid=" + ts._id + "&cid=" + ts.i_coid + "&catid=" + ts.i_catid;
		if(currFavsIdstr.indexOf(ts._id + "::") != -1) {
		currFTclr = "material-icons txtClrRed";
		}
		strHtml += "<div><span class=\"cls_button cls_button-xxsmall bkgdClrWhite brdrClrDlg txtClrDlg\" onclick=\"javascript:doRecentFavorite('" + tmpUFstr + "','" +  ts.i_title + "','" + ts.i_img + "','" + ts._id + "','btnFavs" + ts._id + "');\"><i id=\"btnFavs" + ts._id + "\" class=\"" + currFTclr + "\" alt=\"favorite\" title=\"favorite\" value=\"favorite\">&#xe87d;</i></span>";
		strHtml += "&nbsp;<span class=\"cls_button cls_button-xxsmall bkgdClrWhite brdrClrDlg txtClrDlg\" style=\"margin:2px;\"  onclick=\"JSSHOP.ui.showShareBox('product', ts._id);\"><i class=\"material-icons txtClrTtl\" alt=\"share\" title=\"share\" value=\"share\">&#xe80d;</i></span>";
		strHtml += "&nbsp;<span class=\"cls_button cls_button-xxsmall bkgdClrWhite brdrClrDlg txtClrDlg\" style=\"margin:2px;\"  onclick=\"JSSHOP.ui.showMsgBox('product', ts._id,'doNada');\"><i class=\"material-icons txtClrTtl\" alt=\"chat\" title=\"messages\" value=\"messages\">&#xe0b7;</i></span>";

		strHtml += "</div>";


		strHtml += "<input type=\"hidden\" id=\"prd" + 5 + iint + "\" value=\"\">";

		strHtml += "</li>";
	 
		}
	 
	} catch(e) {
	// strHtml += e + "<br>";
	}
	iint++;
	} 
	strHtml += "</ol><div>";

	return strHtml;
	};



	 


	JSSHOP.shop.getDefaultPageNav = function(currentPage, nrOfPages) {


	try {
	// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
	var delta = 1,range = [];
	pgnString = "<ol class=\"pagination\">";
	startPg = (currentPage - delta) > 0 ? currentPage - delta : 1;
	endPg = (currentPage + delta + 2) > nrOfPages ? nrOfPages : currentPage + delta + 2; 

	for(ika = startPg; ika < endPg; ika++) {
	range.push(ika);
	}  
	range.push(endPg);

			if(startPg - 2 > 0) {
			currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + 1 + ")";
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">1</a></li>";
			}

			if(startPg - 1 > 0) {
			currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + (startPg - 1) + ")";
			if(startPg - 1 == 1) {
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">1</a></li>";
			} else {
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">...</a></li>";
			}
			}	
	 
			for(idd = 0; idd < range.length; idd++) {
	 
			currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + range[idd] + ")";
			if(range[idd] == currentPage + 1) {
			  pgnString += "<li class=\"page\"><b>" + range[idd] + "</b></li>";
			} else {
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">" + range[idd] + "</a></li>";
			}

				} // end of for idd

			if(endPg + 1 <= nrOfPages) {
			currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + (endPg + 1) + ")";
			if(endPg + 1 == nrOfPages) {
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">" + nrOfPages + "</a></li>";
			} else {
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">...</a></li>";
			}
			}		


			if(endPg + 2 <= nrOfPages) {
			currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + nrOfPages + ")";
			  pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">" + nrOfPages + "</a></li>";
			}	
				pgnString += "</ol>";
				return pgnString;

	} catch(e) {
	alert(e);
	}
	};

	 



	JSSHOP.shop.renderNuCartItems = function(tmpJustTotals, tmpUseCloseLnk, tmpNumCItems) {
	 
		tstr = "";
		iint = 0;
		ppint = 1;
		 cartTtl = 0;
		cartIttls = 0;
			ttCAA = currCartIArr[0];
		// ttCAA = JSON.parse(arrAllForms.qcartitem.v[0]);
		len = currCartIArr.length;
		if(len > tmpNumCItems) {
		len = tmpNumCItems;
		}
		var strOnlyTtls = "";
		strHtml = "<div class=\"txtSmall txtBold mintwofh highZ tatCross\">"; 
		if(tmpUseCloseLnk == "y") {
		strHtml += "<div onclick=\"JSSHOP.ui.closeLbox();\" class=\"slmtable txtClrRed txtBold brdrClrRed crsrPointer\" style=\"float:right\">Close</div>";
		}
		strHtml += "<div class=\"txtClrHdr bkdgClrDlg txtBold\" style=\"margin-bottom: 15px;\">";
		strHtml += "<i class=\"material-icons\"  style=\"margin-top: 5px;font-size:14px;\"  alt=\"shopping_cart\" title=\"shopping_cart\">&#xe8cc;</i> Cart Preview</a></div>";

		if (currCartIArr.length) {
		   strHtml += "<div onclick=\"javascript:document.location.href='index.html?pid=aa-show-cart&cid=" + cid + "&ppid=" + ppid + "'\" class=\"rtable txtClrHdr bkdgClrDlg txtBold crsrPointer\" style=\"margin-bottom: 18px;max-width: 65%; margin: 0 auto;text-align: center\">Go To Cart/Checkout -></div>";
	   }
				strHtml += "<div style=\"padding-top: 8px; margin: 8px; border-bottom: 1px dashed #D1D5D1;\">"; 
			  strHtml += "</div>";

		ts = null;
		while (iint < len) {
			ts = currCartIArr[iint];
			strRecID = ts._id;
			strRecType = 50;





			if (ts._id > 0) {
	 

		na = ts.ci_price_a - ts.ci_price_b;
		nd = Math.round((na / ts.ci_price_a) * 100);
		strPriceHtml = "";

		  tmpTttl = ts.ci_price_b * ts.ci_cartqty;
		cartTtl = cartTtl + tmpTttl;

		cartIttls = Math.round(ts.ci_cartqty) + cartIttls;


			if(ts.ci_img) {
			 tmpIstrI = JSSHOP.shop.getPrdImgStr("prdmedia", ts.ci_img);
			}


				strTTHtml = "";
				strTTHtml += "<div style=\"max-width:78%\">";
			strTTHtml += "<a class=\"txtDecorNone\" href=\"index.html?pid=aa-show-item&itemid=" + ts.ci_pid + "&cid=" + ts.ci_coid + "&catid=" + ts.ci_catid + "\">";
			strTTHtml += "<img src=\"" + tmpIstrI + "\" class=\"slmtable brdrClrDlg icndbtn\" style=\"align: center;text-align:center;margin:6px;\" align=\"absmiddle\">" +  ts.ci_title;
				strTTHtml += "<span class=\"txtstriked txtBig txtClrGrey\">" + ts.ci_price_b + "</span></a>";
				strTTHtml += "</div>";

			  strOnlyTtls += strTTHtml;
				strHtml +=  strTTHtml;
	  




				strHtml += "<div style=\"align: right;text-align:right\">";
				strHtml += "<span onclick=\"javascript:JSSHOP.ui.doDefCBBCC('ahCartIcon', null, document.location.href='index.html?pid=aa-show-cart&cid=' + cid + '&ppid=' + ppid);\" class=\"crsrPointer\"><span class=\"txtBig txtClrDlg txtBold\">x" + ts.ci_cartqty + " = " + tmpTttl + "</span></span>";
				 strHtml += "</div>";


		 

				strHtml += "<div style=\"padding-top: 8px; margin: 8px; border-bottom: 1px dashed #D1D5D1;\">"; 
			  strHtml += "</div>";

	 

	 


	 
				strHtml += "<input type=\"hidden\" id=\"prd" + 5 + iint + "\" value=\"\">";

	 
				strHtml += "<input type=\"hidden\" name=\"item_name_" + ppint + "\" value=\"" +  ts.ci_title + "\">";
				strHtml += "<input type=\"hidden\" name=\"item_number_" + ppint + "\" value=\"" +  ts._id + "\">";
				strHtml += "<input type=\"hidden\" name=\"quantity_" + ppint + "\" value=\"" + ts.ci_cartqty + "\">";
				strHtml += "<input type=\"hidden\" name=\"amount_" + ppint + "\" value=\"" + ts.ci_price_b + "\">";

			}
				strTTHtml = "";
		  ppint++;
			iint++;
		}
		if (currCartIArr.length) {
	 
		  strHtml += "<div style=\"text-align: right\">Total:<b>" + cartTtl.toFixed(2) + "</b></div>"; 
		  strHtml += "<div onclick=\"javascript:document.location.href='index.html?pid=aa-show-cart&cid=" + cid + "&ppid=" + ppid + "'\" class=\"rtable txtClrHdr bkdgClrDlg txtBold crsrPointer\" style=\"margin-bottom: 18px;max-width: 65%; margin: 0 auto;text-align: center\">Go To Cart/Checkout -></div>";

	   } else {
		  strHtml += "<div>" + stxt[34] + "</div>";
		strHtml += "<div class=\"collection-item txtSmall txtBold\">Recent:<br>" + currRcntActHstr + "</div>";

		}

		strHtml += "</div>";

		if(tmpJustTotals == "y") {
		strHtml = cartIttls + "::" + cartTtl.toFixed(2);
		}
		if(tmpJustTotals == "m") {
		strHtml = strOnlyTtls;
		}

	return strHtml;
	 



	};



	/**/



	/*
	* java and android funcitions
	*/

	JSSHOP.jndroid.doPagePopUp = function(theUrl, theHTML) {
		try {
		app.doPagePopUp(theUrl, theHTML);
	} catch(e) {
	alert(e);
	JSSHOP.logJSerror(e, arguments, "JSSHOP.jndroid.doPagePopUp");
	}
	};

	JSSHOP.jndroid.appRetImgUload = function(theImg, theUri) {
	try {
	JSSHOP.shared.setFrmFieldVal("qitem","i_vala",theImg);
	JSSHOP.shared.setFrmFieldVal("qitem","i_valb",theImg);
	document.getElementById("mod_i_vala").value = theImg;
	document.getElementById("mod_i_valb").value = theUri;
	tIUID = JSSHOP.shared.getFrmFieldVal("qitem","_id",0);
	tImgstr = "data:image/png;base64, " + theImg;
	doItemEdit();
	} catch(e) {
	alert(e);
	}
	};

	JSSHOP.jndroid.doWebShopUrl = function() {
	try {
	if(c_web.value) {
	tCWebVal = c_web.value;
	if(tCWebVal.indexOf("http") != -1) {
	document.location.href = tCWebVal;
	} else {
	alert("Invalid Web Url in your shop settings. Url: " + tCWebVal);
	}
	} else {
	alert("Invalid Web Url in your shop settings. Url:");
	}
	} catch(e) {
	alert("Cannot Load: " + e);
	}
	};

	JSSHOP.jndroid.doCutOuts = function() {
	try {
	app.getCutOuts();
	} catch(e) {
	alert("Camera functions only work with our android app and: " + e);
	}
	};




// 3rd party functions
// edit colors

  const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}