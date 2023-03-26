actbLoaded = true;
var acton;
/*    Caret Functions     */

// Get the end position of the caret in the object. Note that the obj needs to be in focus first
function getCaretEnd(obj){
	if(typeof obj.selectionEnd != "undefined"){
		return obj.selectionEnd;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToEnd",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// Get the start position of the caret in the object
function getCaretStart(obj){
	if(typeof obj.selectionStart != "undefined"){
		return obj.selectionStart;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToStart",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// sets the caret position to l in the object
function setCaret(obj,l){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(l,l);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',l);
		m.collapse();
		m.select();
	}
}
// sets the caret selection from s to e in the object
function setSelection(obj,s,e){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(s,e);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',s);
		m.moveEnd('character',e);
		m.select();
	}
}



/*    Escape function   */
String.prototype.addslashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};















/* Offset position from top of the screen */
function curTop(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return toreturn;
}
function curLeft(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return toreturn;
}


// -----------------------

/* Event Functions */

// Add an event to the obj given
// event_name refers to the event trigger, without the "on", like click or mouseover
// func_name refers to the function callback when event is triggered
function addEvent(obj,event_name,func_name){

	if (obj.attachEvent){
		obj.attachEvent("on"+event_name, func_name);
	}else if(obj.addEventListener){
		obj.addEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = func_name;
	}
}

// Removes an event from the object
function removeEvent(obj,event_name,func_name){
	if (obj.detachEvent){
		obj.detachEvent("on"+event_name,func_name);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = null;
	}
}

// Stop an event from bubbling up the event DOM
function stopEvent(evt){
	evt || window.event;
	if (evt.stopPropagation){
		evt.stopPropagation();
		evt.preventDefault();
	}else if(typeof evt.cancelBubble != "undefined"){
		evt.cancelBubble = true;
		evt.returnValue = false;
	}
	return false;
}






var setCBBClickEnd = function(theElem, theID, theCBclss, theCB) {
    try {
    // theMElem = document.getElementById(theElem);
            theElem.className = theCBclss;
        // theMElem.style.backgroundColor = "#000000";
        stopIntervalEvent(trgr_bclck[theID]);
    } catch (b) {
        alert("setBClickEnd: " + b)
    }
	  theCB();
	  return;
};

var setCBBClickClr = function(theElem, theCclss, theCBclss, theCB) {
    strJobThread = getUnixTimeStamp();
   //  theMElem = document.getElementById(theElem);
    theElem.className = theCclss;


            if (theElem.getAttribute("data-dblclick") == null) {
                theElem.setAttribute("data-dblclick", 1);
                setTimeout(function () {
                    if (theElem.getAttribute("data-dblclick") == 1) {
    startIntervalEvent(trgr_bclck[strJobThread], function() { setCBBClickEnd(theElem, strJobThread, theCBclss, theCB);}, 380);
                    }
                    theElem.removeAttribute("data-dblclick");
                }, 250);
            } else {
                theElem.removeAttribute("data-dblclick");
                // alert("dbl");
            }
};


// setCBBClickClr(dvBtnSTImg, 'rtable bkgdClrHdr', 'rtable bkgdClrNrml crsrPointer', function() { y = 'y'; });


var getSrchDivTbl = function() {
		a = document.createElement('table');
		// a.style.backgroundColor=actbT_self.actbT_bgColor;
		// a.style.width='100%';
a.className="rtable bkgdClrTtl txtSmall txtBold txtClrWhite txtDecorNone highZ";

		r = a.insertRow(-1);
		c = r.insertCell(-1);
		c.innerHTML = "<div class=\"rtable txtSmall txtBold txtClrTtl\"><a href=\"javascript:document.location.href='" + siteWebDir + "/?pid=ep-getUsrFeeds&fsw=" + encodeURIComponent(ijUFeedSearch.value) + "';\">your Feeds</a></div>";
		c.style.cursor = 'pointer';


		r = a.insertRow(-1);
		c = r.insertCell(-1);
 		// c.className="rtable bkgdClrTtl txtSmall txtBold txtClrWhite txtDecorNone highZ"
		c.innerHTML = "<div class=\"txtSmall txtBold txtClrTtl\"><a href=\"javascript:setMainSearch('rss','"  + ijUFeedSearch.value + "')\">on Web (RSS)</a></div>";
		c.style.cursor = 'pointer';
		//c.onclick = setMainSearch('rss', actbT_curr.value);
		// addEvent(c, "click", setMainSearch('rss', actbT_curr.value));
		r = a.insertRow(-1);
		c = r.insertCell(-1);
		c.innerHTML = "<div class=\"txtSmall txtBold txtClrTtl\"><a href=\"javascript:setMainSearch('facebook','"  + ijUFeedSearch.value + "')\">on facebook</a></div>";
		c.style.cursor = 'pointer';
		//c.onclick = setMainSearch('facebook', actbT_curr.value);

 		r = a.insertRow(-1);
		c = r.insertCell(-1);
		// c.innerHTML = "on google+";
		c.style.cursor = 'pointer';
		c.innerHTML = "<div class=\"txtSmall txtBold txtClrTtl\"><a href=\"javascript:setMainSearch('google+','"  + ijUFeedSearch.value + "')\">on google+</a></div>";

 		r = a.insertRow(-1);
		c = r.insertCell(-1);
		c.innerHTML = "on twitter";
		c.style.cursor = 'pointer';
		c.innerHTML = "<div class=\"txtSmall txtBold txtClrTtl\"><a href=\"javascript:setMainSearch('twitter','"  + ijUFeedSearch.value + "')\">on twitter</a></div>";

		r = a.insertRow(-1);
		c = r.insertCell(-1);
		// c.innerHTML = "on job posts";
		c.style.cursor = 'pointer';
		strEncdUrl = siteWebDir + "/job_market/?prefJMcountry=" + window["prefJMcountry"] + "&prefJMlocation=" + window["prefJMlocation"] + "&jobTitle=" + ijUFeedSearch.value;
		c.innerHTML = "<div class=\"txtSmall txtBold txtClrHdr\"><a href=\"" + strEncdUrl + "\">job posts</a></div>";

		// strEncdUrl = encodeURIComponent(siteWebDir + "/feeds/feeds_jm.php?do=run&prefJMcountry=" + window["prefJMcountry"] + "&prefJMlocation=" + window["prefJMlocation"] + "&jobTitle=");
		// c.innerHTML = "<div class=\"txtSmall txtBold txtClrHdr\"><a href=\"javascript:document.location.href='" + siteWebDir + "/?epRSSFeedUrl=" + strEncdUrl + encodeURIComponent(ijUFeedSearch.value) + "'\">job posts</a></div>";

            // a.className = "bkgdClrHdr txtSmall txtBold txtClrWhite txtDecorNone highZ";

            a = "<b></b>";
		return a;
}



var doItemAction = function(theType) {


 
      theSTypeSplit = theType.split(":ep:");
	theStype = theSTypeSplit[0];
	theSKey = theSTypeSplit[1]; 
	theFLDesc  = "listItem";

		 
      	switch(theStype) {
		case "noQvalue":
			getMainSearch(theSKey);	
			break;
 		case "uls":
			getMainSearch(theSKey);	
			break;
		case "ulp": // linked user list

			document.location.href= theSKey;		
			break;
	 
 
		default:
			getMainSearch(theSKey);	
			break;
		}
 
}




function actb(obj,ca,arrTitles,tepCatArrTtl,tepCatArrKwds,tepFdsArrTtl,tepFdsArrKwds){
	/* ---- Public Variables ---- */
	this.actb_timeOut = -1; // Autocomplete Timeout in ms (-1: autocomplete never time out)
	this.actb_lim = -1;    // Number of elements autocomplete can show (-1: no limit)
	this.actb_firstText = false; // should the auto complete be limited to the beginning of keyword?
	this.actb_mouse = true; // Enable Mouse Support
	this.actb_delimiter = new Array(":");  // Delimiter for multiple autocomplete. Set it to empty array for single autocomplete
	this.actb_startcheck = 3; // Show widget only after this number of characters is typed in.
	/* ---- Public Variables ---- */

	/* --- Styles --- */
	this.actb_bgColor = '#F7F7F7';
	// actb_self.actb_bgColor = rgba(236, 236, 255, .6);
	this.actb_textColor = '#000000';
	this.actb_hColor = '#F7F7F7';
	this.actb_fFamily = 'Verdana';
	this.actb_fSize = '12px';
	this.actb_hStyle = 'text-decoration:underline;font-weight="bold"';
	/* --- Styles --- */

	/* ---- Private Variables ---- */
	var actb_delimwords = new Array();
	var actb_cdelimword = 0;
	var actb_delimchar = new Array();
	var actb_display = false;
	var actb_pos = 0;
	var actb_total = 0;
	var actb_curr = null;
	var actb_rangeu = 0;
	var actb_ranged = 0;
	var actb_bool = new Array();
	var actb_pre = 0;
	var actb_toid;
	var actb_tomake = false;
	var actb_getpre = "";
	var actb_mouse_on_list = 1;
	var actb_kwcount = 0;
	var actb_caretmove = false;
	this.actb_keywords = new Array();
	this.actb_keytitles = new Array();

	this.ep_CatArrTtl = new Array();
	this.ep_CatArrKwds = new Array();

	this.ep_FdsArrTtl = new Array();
	this.ep_FdsArrKwds = new Array();

	/* ---- Private Variables---- */
	this.actb_keywords = ca;
	this.actb_keytitles = arrTitles;

	this.ep_CatArrTtl = tepCatArrTtl;
	this.ep_CatArrKwds = tepCatArrKwds;

	this.ep_FdsArrTtl = tepFdsArrTtl;
	this.ep_FdsArrKwds = tepFdsArrKwds;
 


	var actb_self = this;

	actb_curr = obj;
	
	addEvent(actb_curr,"focus",actb_setup);
    



 

	function actb_setup(){
		addEvent(actb_curr,"keydown",actb_checkkey);
		// addEvent(actb_curr,"blur",actb_clear);
		addEvent(actb_curr,"keypress",actb_keypress);
		actb_generate();
	}

	function actb_clear(evt){
		if (!evt) evt = event;
		removeEvent(actb_curr,"keydown",actb_checkkey);
		removeEvent(actb_curr,"blur",actb_clear);
		removeEvent(actb_curr,"keypress",actb_keypress);
		actb_removedisp();
	}
	function actb_parse(n){
		if (actb_self.actb_delimiter.length > 0){
			var t = actb_delimwords[actb_cdelimword].trim().addslashes();
			var plen = actb_delimwords[actb_cdelimword].trim().length;
		}else{
			var t = actb_curr.value.addslashes();
			var plen = actb_curr.value.length;
		}
		var tobuild = '';
		var i;

		if (actb_self.actb_firstText){
			var re = new RegExp("^" + t, "i");
		}else{
			var re = new RegExp(t, "i");
		}
		var p = n.search(re);
				
		for (i=0;i<p;i++){
			tobuild += n.substr(i,1);
		}
		tobuild += "<font style='"+(actb_self.actb_hStyle)+"'>"
		for (i=p;i<plen+p;i++){
			tobuild += n.substr(i,1);
		}
		tobuild += "</font>";
			for (i=plen+p;i<n.length;i++){
			tobuild += n.substr(i,1);
		}
		return tobuild;
	}
		function actb_generate(){
		 if (document.getElementById('tat_div')){ actb_display = false;document.body.removeChild(document.getElementById('tat_div')); } 
		var dDiv = document.createElement('div');
		var dlnkDiv = document.createElement('div');
	      dDiv.id = 'tat_div';
	      dDiv.style.zindex = '99999';	 
		if (actb_self.actb_mouse){
			dDiv.onmouseout = actb_table_unfocus;
			dDiv.onmouseover = actb_table_focus;
		}
	 

		 dDiv.style.position='absolute';
		// dDiv.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";


  tmpIw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  tmpIh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  if(tmpIw < 500) {
  dDiv.style.left = "16px";
  dDiv.style.top = (getScrollTop() + 80) + "px";
  } else {
  dDiv.style.left = curLeft(actb_curr) + "px"; 
  dDiv.style.top = (getScrollTop() + 70) + "px";

  }

  if(tmpIh < 200) {
  // dDiv.style.top  = "4px";
  }

 
		dDiv.className = "bigtable bkgdClrWhite brdrClrHdr txtSmall txtBold mintwofh highZ tatCross";
		// dDiv.className = "rtable bkgdWhite";
		document.body.appendChild(dDiv);

				tmpAdvSearchStr = "";
 				tmpDsbox = document.createElement('div');
tstr = "Searching IN: " + currSearchType;
tstr += "Search IN: ";

tstr += "<a href=\"javascript:currSearchType='products';this.className='txtClrDlg';JSSHOP.user.setCkiePrfKV('prfsSHOPuser','tglSearchType','products');\">Products</a>";
tstr += "<a href=\"javascript:currSearchType='companies';this.className='txtClrDlg';JSSHOP.user.setCkiePrfKV('prfsSHOPuser','tglSearchType','companies');\">Companies</a>";
tstr += "<a href=\"javascript:currSearchType='messages';this.className='txtClrDlg';JSSHOP.user.setCkiePrfKV('prfsSHOPuser','tglSearchType','messages');\">Messages</a>";


 
tmpDsbox.innerHTML = tstr;
dDiv.appendChild(tmpDsbox);

             if(actb_curr.value.length > 0) {
		 dDiv.appendChild(getSrchLnksTbl());
		} 

 				a = document.createElement('div');
				a.style.right = '15px';
				a.style.position = 'absolute';	
 				a.className	= "rtable bkgdClrHdr txtClrWhite txtBold crsrPointer";
			      a.innerHTML = "&nbsp;&nbsp;X&nbsp;&nbsp;";
				a.onclick = function() { if (document.getElementById('tat_div')){ actb_display = false;document.body.removeChild(document.getElementById('tat_div')); } };
				dDiv.appendChild(a);



		// if (document.getElementById('tat_table')){ actb_display = false;document.body.removeChild(document.getElementById('tat_table')); } 
		if(actb_kwcount == 0){
             if(actb_curr.value.length > 0) {
				// dlnkDiv.appendChild(getSrchLnksTbl());
				 dDiv.appendChild(dlnkDiv);
		} else {
	this.ep_CatArrTtl = tepCatArrTtl;
	this.ep_CatArrKwds = tepCatArrKwds;

	this.ep_FdsArrTtl = tepFdsArrTtl;
	this.ep_FdsArrKwds = tepFdsArrKwds;


		tmpArrCKWrds = new Array();
		tmpArrCKTtls = new Array();
		tmpArrFKWrds = new Array();
		tmpArrFKTtls = new Array();

		tmpArrCKWrds = actb_self.ep_CatArrKwds.slice(0,4);
		tmpArrCKTtls = actb_self.ep_CatArrTtl.slice(0,4);

		tmpArrFKWrds = actb_self.ep_FdsArrKwds.slice(0,6);
		tmpArrFKTtls = actb_self.ep_FdsArrTtl.slice(0,6);

		a = document.createElement('table');
		//123 a.style.backgroundColor=actb_self.actb_bgColor;
		for (tmpI=0;tmpI<tmpArrCKWrds.length;tmpI++){
		r = a.insertRow(-1);
		c = r.insertCell(-1);
 
		// c.innerHTML =  tmpArrFKWrds[tmpI] + "<br>" + getItemTtl(tmpArrFKTtls[tmpI]);
		c.innerHTML = getItemTable(tmpArrCKTtls[tmpI],tmpArrCKWrds[tmpI]); 
 		// c.innerHTML = "<a href=\"javascript:doItemAction('" + tmpArrCKTtls[tmpI] + "')\" class=\"txtClrHdr txtDecorNone\">" + tmpArrCKWrds[tmpI] + "<br>" + getItemTtl(tmpArrCKTtls[tmpI]) + "</a>";
		}
		r = a.insertRow(-1);
		c = r.insertCell(-1);
		c.innerHTML = "<div class=\"txtClrGrey\">--------</div>";
            
		for (tmpI=0;tmpI<tmpArrFKWrds.length;tmpI++){
		r = a.insertRow(-1);
		c = r.insertCell(-1);
		// c.innerHTML = tmpArrFKWrds[tmpI] + "<br>" + getItemTtl(tmpArrFKTtls[tmpI]);
 		// c.innerHTML = "<a href=\"javascript:doItemAction('" + tmpArrFKTtls[tmpI] + "')\">" + tmpArrFKWrds[tmpI] + "<br>" + getItemTtl(tmpArrFKTtls[tmpI]) + "</a>";
	      tStrIT = getItemTable(tmpArrFKTtls[tmpI],tmpArrFKWrds[tmpI]);  
		c.innerHTML = tStrIT; 
 
		}
		


		// r = a.insertRow(-1);
		// c = r.insertCell(-1);


		dlnkDiv.appendChild(a);



/*
 
 				tmpDsbox.className = "bkgdClrHdr txtClrWhite txtBold crsrPointer";
				tAllowedStr = "msg_subjectmsg_matter";
				tAllowedStr += "msg_fromsg_emailmsg_fromsg_tel";
				searchMFObj =  JSSHOP.shared.rndrDynFrmVals(document["qmsgs"], "tmp_", tAllowedStr, "noQvalue");
				tmpAdvSearchStr += searchMFObj.rndrStr;
			      retRndrObj["rndrStr"] = tmpVstr;
				retRndrObj["rndrFobj"] = rndrFFObjArr;
				setTimeout("JSSHOP.shared.initFrmComps(retRndrObj.rndrFobj);void(0);", 500);
tstr = JSSHOP.ui.doDefBtn("Products", "currSearchType='products';this.className='txtClrDlg';JSSHOP.user.setCkiePrfKV('prfsSHOPuser','tglSearchType','products')" );
tstr += JSSHOP.ui.doDefBtn("Companies", "currSearchType='companies';this.className='txtClrDlg';JSSHOP.user.setCkiePrfKV('prfsSHOPuser','tglSearchType','companies')" );
tstr += JSSHOP.ui.doDefBtn("Messages",  "currSearchType='messages';this.className='txtClrDlg';JSSHOP.user.setCkiePrfKV('prfsSHOPuser','tglSearchType','messages')" );

*/




		 dDiv.appendChild(dlnkDiv);


		}

            actb_display = true;
		return;

		}



		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';

		//123 a.style.backgroundColor=actb_self.actb_bgColor;
		a.id = 'tat_table';
		dDiv.appendChild(a);
		var i;
		var first = true;
		var j = 1;

		var counter = 0;
	// 		for (i=0;i<5;i++){
	for (i=0;i<actb_self.actb_keywords.length;i++){
			if (actb_bool[i]){
				counter++;

 


				r = a.insertRow(-1);
				if (first && !actb_tomake){
					// r.style.backgroundColor = actb_self.actb_hColor;
					// first = false;
					actb_pos = counter;
				}else if(actb_pre == i){
					// r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else{
					// r.style.backgroundColor = actb_self.actb_bgColor;
				}
				r.id = 'tat_tr'+(j);
				c = r.insertCell(-1);
				// c.style.color = actb_self.actb_textColor;	
 				if (first) {
				first = false;
				// c.style.color = actb_self.actb_bgColor;
				}
			
				//c.style.fontFamily = actb_self.actb_fFamily;
				//c.style.fontSize = actb_self.actb_fSize;
				// c.innerHTML = actb_parse(actb_self.actb_keywords[i]) + "<br>" + actb_self.actb_keytitles[i];
 				// c.innerHTML = actb_parse(actb_self.actb_keywords[i]) + "<br>" + getItemTtl(actb_self.actb_keytitles[i]);
			      c.innerHTML = getItemTable(actb_self.actb_keytitles[i],actb_self.actb_keywords[i]); 				
				c.id = 'tat_td'+(j);
				c.setAttribute('pos',j);
				if (actb_self.actb_mouse){
					// c.style.cursor = 'pointer';
					// c.onclick=actb_mouseclick;
					// c.onmouseover = actb_table_highlight;
				}
				j++;
			}
			if (j - 1 == actb_self.actb_lim && j < actb_total){
				r = a.insertRow(-1);
				//123 r.style.backgroundColor = actb_self.actb_bgColor;
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				c.style.fontFamily = 'arial narrow';
				c.style.fontSize = actb_self.actb_fSize;
				c.align='center';
				// replaceHTML(c,'\\/');
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick = actb_mouse_down;
				}
				break;
			}

		}
		actb_rangeu = 1;
		actb_ranged = j-1;



		dlnkDiv.appendChild(getSrchLnksTbl());
		dDiv.appendChild(dlnkDiv);
 		document.getElementById('tat_span').innerHTML = actb_curr.value;


		actb_display = true;
		if (actb_pos <= 0) actb_pos = 1;


	}
	function actb_remake(){
		 if (document.getElementById('tat_div')){ actb_display = false;document.body.removeChild(document.getElementById('tat_div')); } 
		var dDiv = document.createElement('div');
		var dlnkDiv = document.createElement('div');
	      dDiv.id = 'tat_div';
	      dDiv.style.zindex = '99999';			
		if (actb_self.actb_mouse){
			dDiv.onmouseout = actb_table_unfocus;
			dDiv.onmouseover = actb_table_focus;
		}

		dDiv.style.position='absolute';
		dDiv.className = "rtable bkgdClrNrml brdrClrDlg txtSmall txtBold mintwofh highZ";
		// a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		dDiv.style.top = (getScrollTop() + 60) + "px";
		dDiv.style.left = curLeft(actb_curr) + "px";
		document.body.appendChild(dDiv);


		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';
		a.style.position='absolute';
		a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		a.style.left = curLeft(actb_curr) + "px";
		// a.style.backgroundColor=actb_self.actb_bgColor;
		// a.className = "rtable";
		a.id = 'tat_table';
		dDiv.appendChild(a);
		if (actb_self.actb_mouse){
			a.onmouseout= actb_table_unfocus;
			a.onmouseover=actb_table_focus;
		}
		document.body.appendChild(a);
		var i;
		var first = true;
		var j = 1;
		if (actb_rangeu > 1){
			r = a.insertRow(-1);
			//123 r.style.backgroundColor = actb_self.actb_bgColor;
			c = r.insertCell(-1);
			c.style.color = actb_self.actb_textColor;
			c.style.fontFamily = 'arial narrow';
			c.style.fontSize = actb_self.actb_fSize;
			c.align='center';
			replaceHTML(c,'/\\');
			if (actb_self.actb_mouse){
				c.style.cursor = 'pointer';
				c.onclick = actb_mouse_up;
			}
		}
		for (i=0;i<actb_self.actb_keywords.length;i++){
			if (actb_bool[i]){
				if (j >= actb_rangeu && j <= actb_ranged){
					r = a.insertRow(-1);
					//123 r.style.backgroundColor = actb_self.actb_bgColor;
					r.id = 'tat_tr'+(j);
					c = r.insertCell(-1);
					// c.style.color = actb_self.actb_textColor;
					// c.style.fontFamily = actb_self.actb_fFamily;
					// c.style.fontSize = actb_self.actb_fSize;
			      c.innerHTML = getItemTable(actb_self.actb_keytitles[i],actb_self.actb_keywords[i]); 				
   
// c.innerHTML = actb_parse(actb_self.actb_keywords[i]);
					c.id = 'tat_td'+(j);
					c.setAttribute('pos',j);
					if (actb_self.actb_mouse){
						// c.style.cursor = 'pointer';
						// c.onclick=actb_mouseclick;
						// c.onmouseover = actb_table_highlight;
					}
					j++;
				}else{
					j++;
				}
			}
			if (j > actb_ranged) break;
		}
		if (j-1 < actb_total){
			r = a.insertRow(-1);
			r.style.backgroundColor = actb_self.actb_bgColor;
			c = r.insertCell(-1);
			// c.style.color = actb_self.actb_textColor;
			// c.style.fontFamily = 'arial narrow';
			// c.style.fontSize = actb_self.actb_fSize;
			// c.align='center';
			// replaceHTML(c,'\\/');
			if (actb_self.actb_mouse){
				c.style.cursor = 'pointer';
				c.onclick = actb_mouse_down;
			}
		}

		dlnkDiv.appendChild(getSrchLnksTbl());
		dDiv.appendChild(dlnkDiv);
 		document.getElementById('tat_span').innerHTML = actb_curr.value;
	

	}
	function actb_goup(){
		if (!actb_display) return;
		if (actb_pos == 1) return;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_textColor;
		actb_pos--;
		if (actb_pos < actb_rangeu) actb_moveup();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_bgColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_godown(){
		if (!actb_display) return;
		if (actb_pos == actb_total) return;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_textColor;
		actb_pos++;
		if (actb_pos > actb_ranged) actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_bgColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_movedown(){
		actb_rangeu++;
		actb_ranged++;
		actb_remake();
	}
	function actb_moveup(){
		actb_rangeu--;
		actb_ranged--;
		actb_remake();
	}

	/* Mouse */
	function actb_mouse_down(){
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_textColor;
		actb_pos++;
		actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_bgColor;
		actb_curr.focus();
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_mouse_up(evt){
		if (!evt) evt = event;
		if (evt.stopPropagation){
			evt.stopPropagation();
		}else{
			evt.cancelBubble = true;
		}
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_textColor;
		actb_pos--;
		actb_moveup();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_bgColor;
		actb_curr.focus();
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_mouseclick(evt){
		if (!evt) evt = event;
		if (!actb_display) return;
		actb_mouse_on_list = 0;
		actb_pos = this.getAttribute('pos');
		actb_penter();
	}
	function actb_table_focus(){
		actb_mouse_on_list = 1;
	}
	function actb_table_unfocus(){
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_table_highlight(){
		actb_mouse_on_list = 1;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_textColor;
		actb_pos = this.getAttribute('pos');
		while (actb_pos < actb_rangeu) actb_moveup();
		while (actb_pos > actb_ranged) actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		document.getElementById('tat_td'+actb_pos).style.color = actb_self.actb_bgColor;

		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
	}
	/* ---- */

	function actb_insertword(a){
		if (actb_self.actb_delimiter.length > 0){
			str = '';
			l=0;
			for (i=0;i<actb_delimwords.length;i++){
				if (actb_cdelimword == i){
					prespace = postspace = '';
					gotbreak = false;
					for (j=0;j<actb_delimwords[i].length;++j){
						if (actb_delimwords[i].charAt(j) != ' '){
							gotbreak = true;
							break;
						}
						prespace += ' ';
					}
					for (j=actb_delimwords[i].length-1;j>=0;--j){
						if (actb_delimwords[i].charAt(j) != ' ') break;
						postspace += ' ';
					}
					str += prespace;
					str += a;
					l = str.length;
					if (gotbreak) str += postspace;
				}else{
					str += actb_delimwords[i];
				}
				if (i != actb_delimwords.length - 1){
					str += actb_delimchar[i];
				}
			}
                  
			actb_curr.value = str;
			setCaret(actb_curr,l);
		}else{
			actb_curr.value = a;
		}
		actb_mouse_on_list = 0;
		actb_removedisp();
	}
	function actb_penter(){
		if (!actb_display) return;
		actb_display = false;
		var word = '';
		var c = 0;
		theSytpe = "";
		i = 0;
		for (var i=0;i<=actb_self.actb_keywords.length;i++){
			if (actb_bool[i]) c++;
			if (c == actb_pos){
				word = actb_self.actb_keywords[i];
				break;
			}
		}

		 l = getCaretStart(actb_curr);

	theString = actb_self.actb_keytitles[i];
	doItemAction(theString);
	/*
      theSTypeSplit = theString.split(":ep:");
	theStype = theSTypeSplit[0];
	theSKey = theSTypeSplit[1]; 
      document.mainSearchForm.searchType.value = theStype;

      	switch(theStype) {
		case "uc": // user list
			document.location.href=siteWebDir + '/?pid=ep-getUsrFeeds&lID=' + theSKey;	
			break;
		case "uf": // user feed  - rss
			document.location.href=siteWebDir + '/?pid=ep-getUsrFeeds&fID=' + theSKey;	
			break;
		default:
			getMainSearch(theSKey);		
			break;
	}

	*/
 
		//-pcsw (original function)
		// actb_insertword(word);

	}
	function actb_removedisp(){
		if (actb_mouse_on_list==0){
			actb_display = 0471;
                  if (document.getElementById('tat_div')){ 
			document.body.removeChild(document.getElementById('tat_div')); 
			}
			actb_kwcount = 0;
			// if (document.getElementById('tat_table')){ document.body.removeChild(document.getElementById('tat_table')); }
			if (actb_toid) clearTimeout(actb_toid);
		}
		 
	}
	function actb_keypress(e){

		if (actb_caretmove) stopEvent(e);
		return !actb_caretmove;
	}
	function actb_checkkey(evt){
		caret_pos_start = getCaretStart(actb_curr);

		if (!evt) evt = event;
		a = evt.keyCode;

		actb_caretmove = 0;
		switch (a){
			case 38:
				actb_goup();
				actb_caretmove = 1;
				return false;
				break;
			case 40:
				actb_godown();
				actb_caretmove = 1;
				return false;
				break;
			case 13: case 9:
				if (actb_display){
					actb_caretmove = 1;
					actb_penter();
					return false;
				}else{
					return true;
				}
				break;
			default:

				setTimeout(function(){actb_tocomplete(a)},50);
				break;
		}
	}

	function actb_tocomplete(kc){
		if (kc == 38 || kc == 40 || kc == 13) return;
		var i;
		if (actb_display){ 
			var word = 0;
			var c = 0;
			for (var i=0;i<=actb_self.actb_keywords.length;i++){
				if (actb_bool[i]) c++;
				if (c == actb_pos){
					word = i;
					break;
				}
			}
			actb_pre = word;
		}else{ actb_pre = -1};
		
		if (actb_curr.value == ''){
			actb_mouse_on_list = 0;
			actb_removedisp();
			clearActbArr();
			return;
		}
		if (actb_self.actb_delimiter.length > 0){
			caret_pos_start = getCaretStart(actb_curr);
			caret_pos_end = getCaretEnd(actb_curr);
			
			delim_split = '';
			for (i=0;i<actb_self.actb_delimiter.length;i++){
				delim_split += actb_self.actb_delimiter[i];
			}
			delim_split = delim_split.addslashes();
			delim_split_rx = new RegExp("(["+delim_split+"])");
			c = 0;
			actb_delimwords = new Array();
			actb_delimwords[0] = '';
			for (i=0,j=actb_curr.value.length;i<actb_curr.value.length;i++,j--){
				if (actb_curr.value.substr(i,j).search(delim_split_rx) == 0){
					ma = actb_curr.value.substr(i,j).match(delim_split_rx);
					actb_delimchar[c] = ma[1];
					c++;
					actb_delimwords[c] = '';
				}else{
					actb_delimwords[c] += actb_curr.value.charAt(i);
				}
			}

			var l = 0;
			actb_cdelimword = -1;
			for (i=0;i<actb_delimwords.length;i++){
				if (caret_pos_end >= l && caret_pos_end <= l + actb_delimwords[i].length){
					actb_cdelimword = i;
				}
				l+=actb_delimwords[i].length + 1;
			}
			var ot = actb_delimwords[actb_cdelimword].trim(); 
			var t = actb_delimwords[actb_cdelimword].addslashes().trim();
		}else{
			var ot = actb_curr.value;
			var t = actb_curr.value.addslashes();
		}
		if (ot.length == 0){
			actb_mouse_on_list = 0;
			actb_removedisp();
		}
		if (ot.length < actb_self.actb_startcheck) return this;
		if (actb_self.actb_firstText){
			var re = new RegExp("^" + t, "i");
		}else{
			var re = new RegExp(t, "i");
		}

		actb_total = 0;
		actb_tomake = false;
		actb_kwcount = 0;
	      tmpIarr = new Array();
		// for (i=0;i<actb_self.actb_keywords.length;i++){
		for (i=0;i<actb_self.actb_keywords.length;i++){
			actb_bool[i] = false;
			if (re.test(actb_self.actb_keywords[i])){
				actb_total++;
				actb_bool[i] = true;
				actb_kwcount++;
				if (actb_pre == i) actb_tomake = true;
                        tmpIarr.push(actb_self.actb_keytitles[i]);
			}
		}

		if (actb_toid) {
		clearTimeout(actb_toid);

		}
		if (actb_self.actb_timeOut > 0) {
		actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);

		}
		actb_generate();
 		document.getElementById('tat_span').innerHTML = actb_curr.value;
		if(actb_kwcount > 0) {
            //  alert("c: " + kc + ":" + JSON.stringify(tmpIarr));
		pushActbArr(tmpIarr);
		} else {
		clearActbArr();
		}
	}



 



var pcswParse = function(theString) {
	theRetString = "noQvalue";	
	if(!isNaN(theString.trim())) {
	theRetString = "List";
	} else if(theString.toLowerCase().startsWith("http")) {
	theRetString = theString;
	}
	return theRetString;
};






var getItemTtl = function(theType) { 
      theSTypeSplit = theType.split(":ep:"); 
	theStype = theSTypeSplit[0];
	theSKey = theSTypeSplit[1]; 
	theFLDesc  = "listItem";


      	switch(theStype) {
		case "noQvalue":
			theFLDesc = "web feed";		
			break;
		case "rss":
			theFLDesc = "web feed";	
			break;
		case "google+":
			theFLDesc = "google+ feed";	
			break;
		case "twitter": 
			theFLDesc = "twitter feed";	
			break;
		case "bf": // browse feed titles
			theFLDesc = "browse feed category";	
			break;
		case "uf": // user list
			theFLDesc = "web feed";	
			break;
		case "uc": // user list
			theFLDesc = "web list";	
			break;
		case "lc": // user list
			theFLDesc = "linkedin list";	
			break;
		case "lif": // linkedin feed
			theFLDesc = "linkedin feed";	
			break;
		case "jms": // linkedin feed
			theFLDesc = "jobs";	
			break;
		default:
			theFLDesc = "list item";	
			break;
		}
 
		return theFLDesc;
		
};



var getSrchLnksTbl = function() {
		a = document.createElement('table');
		//123 a.style.backgroundColor=actb_self.actb_bgColor;
		a.style.width='100%';
		r = a.insertRow(-1);
		c = r.insertCell(-1);
		c.innerHTML = "<div class=\"txtBold crsrPointer bkgsClrDlg\" style=\"width: 70%\" nowrap=\"nowrap\"  onclick=\"getACTBSearch();\">Search <span id=\"tat_span\" class=\"txtBold txtClrHdr\"> </span> <br></div>";
 
 
		return a;
};


var getItemIcon = function(theType) { 
      theSTypeSplit = theType.split(":ep:"); 
	theStype = theSTypeSplit[0];
	theSKey = theSTypeSplit[1]; 

      	switch(theStype) {
		case "ulp":
			imgTtlIcon = "magnifier_washed.png";
			imgTtlStr = "Recent Products";	
			break;
		case "uls":
			imgTtlIcon = "magnifier_washed.png";	
			imgTtlStr = "Recent Searches";
			break;
		default:
			imgTtlIcon = "magnifier_washed.png";
			imgTtlStr = "elastic-pad";	
			break;
		}
 
		return "<img src=\"images/misc/" + imgTtlIcon + "\" align=\"absmiddle\" alt=\"" + imgTtlStr +  "\" title=\"" + imgTtlStr +  "\" class=\"icnbtn\">";
		
};

var getItemTable = function(tmpItitle, tmpIkwrds) {
 
strItable = "<div onclick=\"javascript:doItemAction('" + tmpItitle + "');\"  class=\"txtDecorNone txtClrHdr crsrPointer txtBold cls_hoover\" style=\"width:100%;padding:3px;margin:3px;margin-bottom: 12px;\"><span class=\"slmtable bkgdClrWhite txtBig txtBold\" style=\"padding:4px;\">" + getItemIcon(tmpItitle) + " " + tmpIkwrds + "</span></div>";

return strItable;
};
 


	return this;
};







var getACTBSearch = function() {
tSterm = document.getElementById('tat_span').innerHTML;
getMainSearch(tSterm);
};


var loadListACTB = function(theString, theElem) {
try {	

 

ep_fs = theString;
// alert("loadListACTB: " + ep_fs);
ep_as = ep_fs.split("::");


strCA = ep_as[0].substr(0, ep_as[0].length);
strDA = ep_as[1].substr(0, ep_as[1].length);
if(strCA.indexOf(":ea:") != -1) {
epFullArrTtl = strCA.split(":ea:");
epCatArrTtl = epFullArrTtl[0].substr(0, epFullArrTtl[0].length -1); 
epFdsArrTtl = epFullArrTtl[1].substr(0, epFullArrTtl[1].length - 1); 

epFullArrKwds = strDA.split(":ea:");
epCatArrKwds = epFullArrKwds[0].substr(0, epFullArrKwds[0].length - 1); 
epFdsArrKwds = epFullArrKwds[1].substr(0, epFullArrKwds[1].length - 1); 
strCA = epCatArrTtl + "|" + epFdsArrTtl;
strDA = epCatArrKwds + "|" + epFdsArrKwds; 
};





// alert(strCA + " :: " + strDA);

customarray=new Array();
customarray=strCA.split("|");
customarray2=new Array();
customarray2=strDA.split("|");
epArrCarrTtls = new Array();
epArrCarrTtls = epCatArrTtl.split("|");
epArrCarrKwds = new Array();
epArrCarrKwds = epCatArrKwds.split("|")
epArrFarrTtls = new Array();
epArrFarrTtls = epFdsArrTtl.split("|");
epArrFarrKwds = new Array();
epArrFarrKwds = epFdsArrKwds.split("|");





if(theElem == "ijUFeedSearch") {
acton = new actb(document.getElementById(theElem),customarray2,customarray,epArrCarrTtls,epArrCarrKwds,epArrFarrTtls,epArrFarrKwds);
}  

 

return acton;

}catch(e) {
 // alert("loadListACTB: " + e);
}


};
													