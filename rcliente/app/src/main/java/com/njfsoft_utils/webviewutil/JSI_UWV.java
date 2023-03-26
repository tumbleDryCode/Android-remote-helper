package com.njfsoft_utils.webviewutil;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;
 
/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 25-11-2012
 * Time: 0:20
 * To change this template use File | Settings | File Templates.
 */


public class JSI_UWV  {

    UtilWebView main;
    public JSI_UWV(UtilWebView amain) {
    main = amain;
    }
	@JavascriptInterface
    public void doTest(String s) {
    System.out.println("jsi doTest: " + s);

    // main.doTest(s);
    }
    @JavascriptInterface
    public void getToggleWViewBtns(String sWB, String sSD) {
	 main.setToggleWViewBtns(Boolean.parseBoolean(sWB), Boolean.parseBoolean(sSD));
    }

}
