package com.njfsoft_utils.js_interfaces;


import android.webkit.JavascriptInterface;

import com.njfsoft_utils.webviewutil.UtilWebDialog;
import com.rscanner.Controller;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 16-07-2013
 * Time: 10:24
 * To change this template use File | Settings | File Templates.
 */
public class JSI_controllerDlg   {
    Controller tepMainDialog;
    public JSI_controllerDlg(Controller theUtilWebDialog) {
        tepMainDialog = theUtilWebDialog;

    }
    @JavascriptInterface
    public void setEpMDcom(int theInt, String strArgs) {

       //  tepMainDialog.setMDcom(theInt, strArgs);
    }




    @JavascriptInterface
    public String getNuDBselectQ(String tmpStrQstr) {
        String strHtml = "noQvalue";
        try {

            JSONObject fulretObject = new JSONObject();
            JSONArray resultSet = new JSONArray();
            JSONObject fretObject = new JSONObject();
            String tmpCB;
            String tmpEl;
            String tmpV;
            String tmpQFstring;



            if(tmpStrQstr.startsWith("batch")) {
                tmpQFstring = tmpStrQstr.substring(5, tmpStrQstr.length());
                JSONArray array = new JSONArray(tmpQFstring);
                System.out.println("batch of" + tmpQFstring);

                for (int i = 0; i < array.length(); i++) {
                    JSONObject row = array.getJSONObject(i);
                    JSONObject retObject = new JSONObject();

                    JSONObject vObject = new JSONObject();

                    tmpCB = row.getString("f");
                    tmpEl = row.getString("e");
                    tmpV = row.getString("v");
                    String retQstr = tepMainDialog.dbMSQLA.setDBselectQ(tmpV);
                    retObject.put("f" , tmpCB);
                    retObject.put("v" , new JSONArray(retQstr));
                    retObject.put("e" , tmpEl);
                    fretObject.put(tmpEl, retObject);
                    resultSet.put(fretObject);
                    System.out.println("batch of: " + tmpCB);
                }
                fulretObject.put("status" , "fromandroid");
                fulretObject.put("data" , fretObject.toString());


            } else {
                fulretObject.put("status" , "fromandroid");
                fulretObject.put("data" , tepMainDialog.dbMSQLA.setDBselectQ(tmpStrQstr));

            }
            strHtml = fulretObject.toString();
            return strHtml;
        } catch(Exception ee) {
            System.out.println("getNuDBselectQ: " + ee);
            return strHtml;
        }

    }
    @JavascriptInterface
    public String getDBselectQ(String tmpStrQstr) {
        String strHtml = "noQvalue";
        if(tmpStrQstr.startsWith("batch")) {
            String tmpCB;
            String tmpEl;
            String tmpV;
            String tmpQFstring = tmpStrQstr.substring(5, tmpStrQstr.length());
            System.out.println("batch of" + tmpQFstring);
            try {
                JSONObject fulretObject = new JSONObject();
                JSONArray resultSet = new JSONArray();
                JSONArray array = new JSONArray(tmpQFstring);
                JSONObject fretObject = new JSONObject();
                for (int i = 0; i < array.length(); i++) {
                    JSONObject row = array.getJSONObject(i);
                    JSONObject retObject = new JSONObject();

                    JSONObject vObject = new JSONObject();

                    tmpCB = row.getString("f");
                    tmpEl = row.getString("e");
                    tmpV = row.getString("v");
                    String retQstr = tepMainDialog.dbMSQLA.setDBselectQ(tmpV);
                    retObject.put("f" , tmpCB);
                    retObject.put("v" , new JSONArray(retQstr));
                    retObject.put("e" , tmpEl);
                    fretObject.put(tmpEl, retObject);
                    resultSet.put(fretObject);
                    System.out.println("batch of: " + tmpCB);
                }
                strHtml = fretObject.toString();
            } catch(Exception ee) {
                System.out.println("batch of error: " + ee);
                return strHtml;
            }

        } else {

            strHtml = tepMainDialog.dbMSQLA.setDBselectQ(tmpStrQstr);
        }
        return strHtml;
    }



    @JavascriptInterface
    public String getSQLdump() {
        // String strHtml = "<table width=\"100%\" style=\"border: 1px solid #EEE:\">";
        String strHtml = "";
//  (boolean isDistinct, String strTable, String[] dcolumns, String qstring, String[] qargs, String strGrpBy, String strHaving, String strOrderBy, String strQlimit)
        strHtml = tepMainDialog.dbMSQLA.dbSelectQ(false, "users", null, "_id>?", new String[]{"0"}, null, null, "_id desc", "1000");

        return strHtml;
    }

    @JavascriptInterface
    public String getRecordDelete(String theRID) {
        String retStr = "noQvalue";
        retStr = tepMainDialog.dbMSQLA.doStrRecDelete(theRID);
        return retStr;
    }


    @JavascriptInterface
    public String getCtrlrPoints() {
        return tepMainDialog.getPointsStr();
    }


}

