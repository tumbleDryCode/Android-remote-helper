package com.njfsoft_utils.webviewutil;

import com.njfsoft_utils.webviewutil.UtilWebDialog;
import android.webkit.JavascriptInterface;
/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 09-04-2014
 * Time: 21:46
 * To change this template use File | Settings | File Templates.
 */
public class JSI_MainDialog  {
    UtilWebDialog tepMainDialog;
    public JSI_MainDialog(UtilWebDialog theUtilWebDialog) {
        tepMainDialog = theUtilWebDialog;
        
    }
	@JavascriptInterface
    public void getEpMDcom(int theInt, String strArgs) {
        tepMainDialog.setEpMDcom(theInt, strArgs);
     }   
	@JavascriptInterface
    public String doCurrSwapStr() {
       return tepMainDialog.getCurrSwapStr();
     }   
}
