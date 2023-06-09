package com.njfsoft_utils.dbutil;


import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

import java.io.OutputStream;
import java.io.InputStream;
import java.io.IOException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.StringTokenizer;
import org.json.JSONArray;
import org.json.JSONObject;

import com.njfsoft_utils.core.StringUtils;

/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 16-03-2014
 * Time: 17:26
 * To change this template use File | Settings | File Templates.
 */
public class UtilSQLAdapter {


    public static final String MYDATABASE_NAME = "rscanner.db";
    public static final String MYDATABASE_TABLE = "qbit";
    public static final int MYDATABASE_VERSION = 3;
    public static final String KEY_REC_ID = "_id";
    public static final String KEY_REC_TYPE = "rec_type";
    public static final String KEY_REC_VAL_A = "rec_val_a";
    public static final String KEY_REC_VAL_B = "rec_val_b";
    public static final String KEY_REC_VAL_C = "rec_val_c";
    public static final String KEY_REC_DATE_ADDED = "rec_date_added";
    public static final String KEY_REC_DATE_MODIFIED = "rec_date_modified";
    public int INT_KEY_REC_ID = 0;
    public int INT_KEY_REC_TYPE = 1;
    public int INT_KEY_REC_VAL_A = 2;
    public int INT_KEY_REC_VAL_B = 3;
    public int INT_KEY_REC_VAL_C = 4;
    public int INT_KEY_DATE_ADDED = 5;
    public int INT_KEY_DATE_MODIFIED = 6;
    public String[] columns = new String[]{KEY_REC_ID, KEY_REC_TYPE, KEY_REC_VAL_A, KEY_REC_VAL_B, KEY_REC_VAL_C, KEY_REC_DATE_ADDED, KEY_REC_DATE_MODIFIED};


    // 5


    /*
    * To narrow down the database search, each row has a record type, KEY_REC_TYPE  (INTEGER)
    * Ex: a contact record
     */
    public int RTYPE_CONTACT = 5;   // used to bind phone contacts with social contacts

    //create table MY_DATABASE (ID integer primary key, Content text not null);
    private static final String SCRIPT_CREATE_DATABASE =
            "create table " + MYDATABASE_TABLE + " ("
                    + KEY_REC_ID + " integer primary key autoincrement, "
                    + KEY_REC_TYPE + " integer, " + KEY_REC_VAL_A + " text not null, "
                    + KEY_REC_VAL_B + " text not null, "
                    + KEY_REC_VAL_C + " text not null, "
                    + KEY_REC_DATE_ADDED + " text not null, "
                    + KEY_REC_DATE_MODIFIED + " text not null);";

    private SQLiteHelper sqLiteHelper;
    public SQLiteDatabase sqLiteDatabase;
    Cursor epDBcursor;
    private Context context;

    public UtilSQLAdapter(Context c) {
        context = c;

        sqLiteHelper = new SQLiteHelper(context, MYDATABASE_NAME, null, MYDATABASE_VERSION);
 
        try {
 
        	sqLiteHelper.createDataBase();
 
 	} catch (Exception e) {
 
		 e.printStackTrace();
            System.out.println("sqLiteHelper.createDataBase: " + e.toString());
 
 	} 

    }

    public String doTest(String tString) {
        return tString;
    }

    public UtilSQLAdapter openToRead() throws SQLException {
        sqLiteHelper = new SQLiteHelper(context, MYDATABASE_NAME, null, MYDATABASE_VERSION);
        sqLiteDatabase = sqLiteHelper.getReadableDatabase();
        return this;
    }

    public UtilSQLAdapter openToWrite() throws SQLException {
        sqLiteHelper = new SQLiteHelper(context, MYDATABASE_NAME, null, MYDATABASE_VERSION);
        sqLiteDatabase = sqLiteHelper.getWritableDatabase();
        return this;
    }

    public void close() {
        sqLiteHelper.close();

    }



    public String setDBselectQ(String strQstr) {

	JSONArray resultSet = new JSONArray(); 
 	String fnlStrRes = "noQvalue";

        
        try {
            openToRead();
            epDBcursor = sqLiteDatabase.rawQuery(strQstr, null);
            if (epDBcursor.moveToFirst()) {
            int totalColumn = epDBcursor.getColumnCount();
            System.out.println("dbSelectQ.epDBcursor.moveToFirst: " + totalColumn);

          do {
            JSONObject rowObject = new JSONObject();
            for(int i=0 ;  i< totalColumn ; i++ )
            {

                if(epDBcursor.getColumnName(i) != null ) 
                { 

                        if(epDBcursor.getString(i) != null )
                        {
            			System.out.println("dbSelectQ.getString: " + epDBcursor.getColumnName(i) + " : " +  epDBcursor.getString(i));
                            rowObject.put(epDBcursor.getColumnName(i) ,  epDBcursor.getString(i) );
                        }
                        else
                        {
                            rowObject.put(epDBcursor.getColumnName(i) ,  "null" ); 
                        }
                    }


                } 
                resultSet.put(rowObject);
                } while (epDBcursor.moveToNext());

            }
            if (epDBcursor != null && !epDBcursor.isClosed()) {
                epDBcursor.close();
            }
        	close();

		fnlStrRes = resultSet.toString();
            System.out.println("dbSelectQ.resultSet.toString: " + fnlStrRes);
            return fnlStrRes;
        } catch (Exception e) {
            close();

            System.out.println("dbSelectQ.error: " + e.toString() + fnlStrRes);
            return fnlStrRes;
        } 

    }






    public String dbSelectQ(boolean isDistinct, String strTable, String[] dcolumns, String qstring, String[] qargs, String strGrpBy, String strHaving, String strOrderBy, String strQlimit) {

	JSONArray resultSet = new JSONArray(); 
 	String fnlStrRes = "noQvalue";

        
        try {
            openToRead();
           //  epDBcursor = queueAll();

            epDBcursor = sqLiteDatabase.query(isDistinct, strTable, null, qstring, qargs, strGrpBy, strHaving, strOrderBy, strQlimit);
            if (epDBcursor.moveToFirst()) {
            int totalColumn = epDBcursor.getColumnCount();
            System.out.println("dbSelectQ.epDBcursor.moveToFirst: " + totalColumn);

          do {
            JSONObject rowObject = new JSONObject();
            for(int i=0 ;  i< totalColumn ; i++ )
            {

                if(epDBcursor.getColumnName(i) != null ) 
                { 

                        if(epDBcursor.getString(i) != null )
                        {
            			System.out.println("dbSelectQ.getString: " + epDBcursor.getColumnName(i) + " : " +  epDBcursor.getString(i));
                            rowObject.put(epDBcursor.getColumnName(i) ,  epDBcursor.getString(i) );
                        }
                        else
                        {
                            rowObject.put(epDBcursor.getColumnName(i) ,  "" ); 
                        }
                    }


                } 
                resultSet.put(rowObject);
                } while (epDBcursor.moveToNext());

            }
            if (epDBcursor != null && !epDBcursor.isClosed()) {
                epDBcursor.close();
            }
        	close();

		fnlStrRes = resultSet.toString();
            System.out.println("dbSelectQ.resultSet.toString: " + fnlStrRes);
            return fnlStrRes;
        } catch (Exception e) {
            close();

            System.out.println("dbSelectQ.error: " + e.toString());
            return fnlStrRes;
        } 

    }


    public long insert(String strTname, ContentValues cValues) {
        return sqLiteDatabase.insert(strTname, null, cValues);
    }




    public long insert(int intRecType, String strRecValA, String strRecValB, String strRecValC) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(KEY_REC_TYPE, intRecType);
        contentValues.put(KEY_REC_VAL_A, strRecValA);
        contentValues.put(KEY_REC_VAL_B, strRecValB);
        contentValues.put(KEY_REC_VAL_C, strRecValC);
        contentValues.put(KEY_REC_DATE_ADDED, String.valueOf(System.currentTimeMillis() / 1000));
        contentValues.put(KEY_REC_DATE_MODIFIED, String.valueOf(System.currentTimeMillis() / 1000));
        return sqLiteDatabase.insert(MYDATABASE_TABLE, null, contentValues);
    }


    public long insert(int intRecType, String strRecValA, String strRecValB, String strRecValC, String strDMod) {

        ContentValues contentValues = new ContentValues();
        contentValues.put(KEY_REC_TYPE, intRecType);
        contentValues.put(KEY_REC_VAL_A, strRecValA);
        contentValues.put(KEY_REC_VAL_B, strRecValB);
        contentValues.put(KEY_REC_VAL_C, strRecValC);
        contentValues.put(KEY_REC_DATE_ADDED, String.valueOf(System.currentTimeMillis() / 1000));
        contentValues.put(KEY_REC_DATE_MODIFIED, strDMod);
        return sqLiteDatabase.insert(MYDATABASE_TABLE, null, contentValues);
    }

    public long insert(int intRecType, String strRecValA, String strRecValB, String strRecValC, String strDAdded, String strDMod) {

        ContentValues contentValues = new ContentValues();
        contentValues.put(KEY_REC_TYPE, intRecType);
        contentValues.put(KEY_REC_VAL_A, strRecValA);
        contentValues.put(KEY_REC_VAL_B, strRecValB);
        contentValues.put(KEY_REC_VAL_C, strRecValC);
        contentValues.put(KEY_REC_DATE_ADDED, strDAdded);
        contentValues.put(KEY_REC_DATE_MODIFIED, strDMod);
        return sqLiteDatabase.insert(MYDATABASE_TABLE, null, contentValues);
    }


    public int delete(String table, String qstring, String[] qargs) {
        return sqLiteDatabase.delete(table, qstring, qargs);
    }

    public int update(String theTable, ContentValues args, String qstring, String[] qargs) {
        int retInt = 33;
        try {
            openToRead();
            retInt = sqLiteDatabase.update(theTable, args, qstring, qargs);
            close();
        } catch (Exception e) {
            // System.out.println("ChallSQLiteAdapter.update: " + e);
            close();
        }
        // String strFilter = "_id=" + Id;
        // ContentValues args = new ContentValues();
        // args.put(KEY_TITLE, title);

        return retInt;

    }


    public int deleteAll() {
        // sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + MYDATABASE_TABLE);

        return sqLiteDatabase.delete(MYDATABASE_TABLE, null, null);

    }

    public Cursor queueAll() {

        epDBcursor = sqLiteDatabase.query(MYDATABASE_TABLE, null, null, null, null, null, null);

        return epDBcursor;
    }


    public int getLastID() {
        int lastId = 1;
        try {

            openToRead();
            String query = "SELECT " + KEY_REC_ID + " from " + MYDATABASE_TABLE + " order by " + KEY_REC_ID + " DESC limit 1";

            Cursor c = sqLiteDatabase.rawQuery(query, null);

            if (c != null && c.moveToFirst()) {
                lastId = c.getInt(0); //The 0 is the column index, we only have 1 column, so the index is 0
                System.out.println("dev:getLastID:lastId: " + lastId);
            }
            sqLiteDatabase.close();
            close();
            c.close();
        } catch (Exception e) {
            sqLiteDatabase.close();
            close();

            System.out.println("E:getLastID" + e.toString());
        }
        return lastId;

    }


    public ArrayList<UtilDbRecord> getUtilDbRecords(boolean isDistinct, String strTable, String qstring, String[] qargs, String strGrpBy, String strHaving, String strOrderBy, String strQlimit) throws SQLException {
        // get all records, no limit set
        openToRead();
        if (strQlimit.equalsIgnoreCase("noQvalue")) {
            strQlimit = null;
        }
        ArrayList<UtilDbRecord> epDBrecList = new ArrayList<UtilDbRecord>();
        try {

            epDBcursor = sqLiteDatabase.query(isDistinct, MYDATABASE_TABLE, columns, qstring, qargs, strGrpBy, strHaving, strOrderBy, strQlimit);
            if (epDBcursor.moveToFirst()) {
                do {
                    UtilDbRecord UtilDbRecord = new UtilDbRecord();
                    UtilDbRecord.setKeyRecID(Integer.parseInt(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_ID))));
                    UtilDbRecord.setKeyRecType(Integer.parseInt(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_TYPE))));
                    UtilDbRecord.setKeyRecValA(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_A)));
                    UtilDbRecord.setKeyRecValB(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_B)));
                    UtilDbRecord.setKeyRecValC(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_C)));
                    UtilDbRecord.setKeyRecDateAdded(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_DATE_ADDED)));
                    UtilDbRecord.setKeyRecDateModified(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_DATE_MODIFIED)));
                    epDBrecList.add(UtilDbRecord);
                } while (epDBcursor.moveToNext());
                // return epDBrecList;
            }
            if (epDBcursor != null && !epDBcursor.isClosed()) {
                epDBcursor.close();
            }

        } catch (Exception e) {
            close();
            System.out.println("getUtilDbRecords.error: " + e.toString());
        }

        close();
        return epDBrecList;
    }


    public ArrayList<UtilDbRecord> getUtilDbRecords(boolean isDistinct, String strTable, String[] columns, String qstring, String[] qargs, String strGrpBy, String strHaving, String strOrderBy, String strQlimit) {
        // get all records, no limit set
        openToRead();
        if(strQlimit.equalsIgnoreCase("noQvalue")) {
            strQlimit = null;
        }
 
        ArrayList<UtilDbRecord> epDBrecList = new ArrayList<UtilDbRecord>();
        try {

            epDBcursor = sqLiteDatabase.query(isDistinct, MYDATABASE_TABLE,  columns, qstring, qargs, strGrpBy, strHaving, strOrderBy, strQlimit);
            if (epDBcursor.moveToFirst()) {
                do {
                    UtilDbRecord UtilDbRecord = new UtilDbRecord();
                    UtilDbRecord.setKeyRecID(Integer.parseInt(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_ID))));
                    UtilDbRecord.setKeyRecType(Integer.parseInt(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_TYPE))));
                    UtilDbRecord.setKeyRecValA(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_A)));
                    UtilDbRecord.setKeyRecValB(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_B)));
                    UtilDbRecord.setKeyRecValC(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_C)));
                    UtilDbRecord.setKeyRecDateAdded(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_DATE_ADDED)));
                    UtilDbRecord.setKeyRecDateModified(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_DATE_MODIFIED)));
                    epDBrecList.add(UtilDbRecord);
                } while (epDBcursor.moveToNext());
                // return epDBrecList;
            }
            if (epDBcursor != null && !epDBcursor.isClosed()) {
                epDBcursor.close();
            }

        } catch (Exception e) {
            close();
            System.out.println("getUtilDbRecords.error: " + e.toString());
        }

        close();
        return epDBrecList;
    }






    public String setJSDBrecords(boolean isDistinct, String strTable, String[] columns, String qstring, String[] qargs, String strGrpBy, String strHaving, String strOrderBy, String strQlimit) {
        String recType = "5";
        String strChallRecords = "";

        ArrayList<UtilDbRecord> lpDbRecord = getUtilDbRecords(isDistinct, MYDATABASE_TABLE,  columns, qstring, qargs, strGrpBy, strHaving, strOrderBy, strQlimit);

        if(lpDbRecord.size() <= 0) {
            System.out.println("db rec count: IS NULL");
            return "noQvalue";

        }  else {
            for (UtilDbRecord list : lpDbRecord) {

                String strRecID = String.valueOf(list.getKeyRecID());
                String strRecType = String.valueOf(list.getKeyRecType());
                String strRecValA =  list.getKeyRecValA();
                String strRecValB = list.getKeyRecValB();
                String strRecValC = list.getKeyRecValC();
                String strRecDateAdded = list.getKeyRecDateAdded();
                String strRecDateModified = list.getKeyRecDateModified();
                strChallRecords += strRecID + "||"  + strRecType + "||" + strRecValA + "||" + strRecValB +  "||" + strRecValC +  "||" + strRecDateAdded +  "||" + strRecDateModified + "::";
            }
            System.out.println("db rec count: " + String.valueOf(lpDbRecord.size()));

        }
        if(strChallRecords.length() > 4){
            return strChallRecords.substring(0, strChallRecords.length() - 2);

        }    else {
            return "noQvalue";
        }

        // return strChallRecords;
    }



    public ArrayList<UtilDbRecord> getUtilDbRecords(String qstring, String[] qargs, String strQlimit) throws SQLException {
        // get all records, no limit set
        openToRead();
        if (strQlimit.equalsIgnoreCase("noQvalue")) {
            strQlimit = null;
        }
        ArrayList<UtilDbRecord> epDBrecList = new ArrayList<UtilDbRecord>();
        try {

            epDBcursor = sqLiteDatabase.query(MYDATABASE_TABLE, columns, qstring, qargs, null, null, KEY_REC_ID + " desc", strQlimit);
            if (epDBcursor.moveToFirst()) {
                do {
                    UtilDbRecord UtilDbRecord = new UtilDbRecord();
                    UtilDbRecord.setKeyRecID(Integer.parseInt(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_ID))));
                    UtilDbRecord.setKeyRecType(Integer.parseInt(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_TYPE))));
                    UtilDbRecord.setKeyRecValA(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_A)));
                    UtilDbRecord.setKeyRecValB(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_B)));
                    UtilDbRecord.setKeyRecValC(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_VAL_C)));
                    UtilDbRecord.setKeyRecDateAdded(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_DATE_ADDED)));
                    UtilDbRecord.setKeyRecDateModified(epDBcursor.getString(epDBcursor.getColumnIndexOrThrow(KEY_REC_DATE_MODIFIED)));
                    epDBrecList.add(UtilDbRecord);
                } while (epDBcursor.moveToNext());
                // return epDBrecList;
            }
            if (epDBcursor != null && !epDBcursor.isClosed()) {
                epDBcursor.close();
            }
 
      epDBcursor.close();
        close();
        } catch (Exception e) {
      epDBcursor.close();
            close();
            System.out.println("getUtilDbRecords.error: " + e.toString());
        }
      epDBcursor.close();
        close();
        return epDBrecList;
    }










 


    public String doStrRecDelete(String strChallID) {
        String retString = "ok";
        try {
            openToWrite();
            sqLiteDatabase.delete(MYDATABASE_TABLE, "_id=?", new String[]{strChallID});
            // sqLiteDatabase.delete(MYDATABASE_TABLE, "rec_type=? and rec_val_a=?", new String[]{"10", strChallID});
            sqLiteDatabase.close();


        } catch (Exception e) {
            retString = "noQvalue";
            System.out.println("doChallDelete: " + e.toString());

        }
        return retString;
    }


    public void doRecordDelete(String strChallID) {
        try {
            openToWrite();
            sqLiteDatabase.delete(MYDATABASE_TABLE, "_id=?", new String[]{strChallID});
            sqLiteDatabase.delete(MYDATABASE_TABLE, "rec_type=? and rec_val_a=?", new String[]{"10", strChallID});
            sqLiteDatabase.close();


        } catch (Exception e) {
            System.out.println("doChallDelete: " + e.toString());

        }
    }


 

    public void doRecUpdateOrAdd(int recType, String recValA, String recValB, String recValC) {
        ArrayList<UtilDbRecord> lpDbRecord = getUtilDbRecords(KEY_REC_TYPE + "=?" + " and " + KEY_REC_VAL_C + "=?", new String[]{"7", "4567775"}, "noQvalue");
        if (doGetDBRecords(KEY_REC_TYPE + "=?" + " and " + KEY_REC_VAL_A + "=?", new String[]{String.valueOf(recType), recValA}, "noQvalue") == "noQvalue") {
            doRecordAdd(recType, recValA, recValB, recValC);
            close();

        } else {
            ContentValues args = new ContentValues();
            args.put(KEY_REC_TYPE, recType);
            args.put(KEY_REC_VAL_A, recValA);
            args.put(KEY_REC_VAL_B, recValB);
            args.put(KEY_REC_VAL_C, recValC);
            args.put(KEY_REC_DATE_MODIFIED, String.valueOf(System.currentTimeMillis() / 1000));
            openToRead();
            openToWrite();
            update(MYDATABASE_TABLE, args, KEY_REC_TYPE + "=?" + " and " + KEY_REC_VAL_A + "=?", new String[]{String.valueOf(recType), recValA});
            close();

        }
    }

    public void doRecordAdd(int recType, String recValA, String recValB, String recValC) {

        long lastId = 1;
        try {
            openToRead();
            openToWrite();
            insert(recType, recValA, recValB, recValC, String.valueOf(System.currentTimeMillis() / 1000));
            close();
        } catch (Exception e) {
            System.out.println("doRecordAdd" + e.toString());
        }

    }

    public int doIntRecordAdd(int recType, String recValA, String recValB, String recValC, String strDmodfd) {

        int lastId = 1;
        try {
            openToRead();
            openToWrite();
            insert(recType, recValA, recValB, recValC, strDmodfd);
            close();
            openToRead();
            String query = "SELECT " + KEY_REC_ID + " from " + MYDATABASE_TABLE + " order by " + KEY_REC_ID + " DESC limit 1";

            Cursor c = sqLiteDatabase.rawQuery(query, null);

            if (c != null && c.moveToFirst()) {
                lastId = c.getInt(0); //The 0 is the column index, we only have 1 column, so the index is 0
                System.out.println("dev:doIntRecordAdd:lastId: " + lastId);
            }
            sqLiteDatabase.close();
            close();
            c.close();
        } catch (Exception e) {
            sqLiteDatabase.close();
            close();

            System.out.println("E:doIntRecordAdd" + e.toString());
        }
        return lastId;

    }



    public String doUpdateRecords(String strQselection, String strQargs, String strConentValues) {

       String resString = "noQvalue";
	String[] strQselArgs;

                        if (strQargs.contains(":")) {
                           strQselArgs = strQargs.split(":");
				} else {
			         strQselArgs = new String[]{strQargs};
				}

        ContentValues args = new ContentValues();
        // args.put(KEY_TITLE, title);
        StringTokenizer st = new StringTokenizer(strConentValues, "=;");
        while (st.hasMoreTokens()) {
            String key = st.nextToken();
            String val = st.nextToken();
            args.put(key, val);
            System.out.println(key + "\t" + val);
        }


        try {
            openToRead();
            openToWrite();
            resString = String.valueOf(sqLiteDatabase.update(MYDATABASE_TABLE, args, strQselection, strQselArgs));
            sqLiteDatabase.close();
            close();
       return resString;
        } catch (Exception e) {
            System.out.println("updateChallRecord: " + e.toString());
            sqLiteDatabase.close();
            close();
        return resString;

        }

 
    }


    public String doUpdateRecord(int iTheID, String strConentValues) {

       String resString = "noQvalue";
       String strQselection = "_id=?";
	String[] strQselArgs;
	strQselArgs = new String[]{String.valueOf(iTheID)};
        ContentValues args = new ContentValues();
        // args.put(KEY_TITLE, title);
        StringTokenizer st = new StringTokenizer(strConentValues, "=;");
        while (st.hasMoreTokens()) {
            String key = st.nextToken();
            String val = st.nextToken();
            args.put(key, val);
            System.out.println(key + "\t" + val);
        }


        try {
            openToRead();
            openToWrite();
            resString = String.valueOf(sqLiteDatabase.update(MYDATABASE_TABLE, args, strQselection, strQselArgs));
            sqLiteDatabase.close();
            close();
		sqLiteDatabase.close();
       return resString;
        } catch (Exception e) {
            System.out.println("updateChallRecord: " + e.toString());
            sqLiteDatabase.close();
            close();
        return resString;

        }

 
    }



    public String doJSUpdateRecord(String theTable, ContentValues strConentValues, String strQselection, String[] strQArgs) {
        String resString = "noQvalue";
        try {
            openToRead();
            openToWrite();
            resString = String.valueOf(sqLiteDatabase.update(MYDATABASE_TABLE, strConentValues, strQselection, strQArgs));
            close();
        } catch (Exception e) {
            sqLiteDatabase.close();
            close();
        return resString;
        }
        return resString;
    }


    public ArrayList<UtilDbRecord> doGetDBRecordsArr(String strQselection, String[] strQselArgs, String strQlimit) {
        String recType = "5";
        String strChallRecords = "";


        ArrayList<UtilDbRecord> lpDbRecord = getUtilDbRecords(strQselection, strQselArgs, strQlimit);
        return lpDbRecord;
    }


    public String doGetDBRecords(String strQselection, String[] strQselArgs, String strQlimit) {
        String recType = "5";
        String strChallRecords = "";


        ArrayList<UtilDbRecord> lpDbRecord = getUtilDbRecords(strQselection, strQselArgs, strQlimit);

        if (lpDbRecord.size() <= 0) {
            System.out.println("db rec count: IS NULL");
            return "noQvalue";

        } else {
            for (UtilDbRecord list : lpDbRecord) {

                String strRecID = String.valueOf(list.getKeyRecID());
                String strRecType = String.valueOf(list.getKeyRecType());
                String strRecValA = list.getKeyRecValA();
                String strRecValB = list.getKeyRecValB();
                String strRecValC = list.getKeyRecValC();
                String strRecDateAdded = list.getKeyRecDateAdded();
                String strRecDateModified = list.getKeyRecDateModified();
                strChallRecords += strRecID + "|" + strRecType + "|" + strRecValA + "|" + strRecValB + "|" + strRecValC + "|" + strRecDateAdded + "|" + strRecDateModified + "::";
            }
            System.out.println("db rec count: " + String.valueOf(lpDbRecord.size()));

        }
        if (strChallRecords.length() > 4) {
            return strChallRecords.substring(0, strChallRecords.length() - 2);

        } else {
            return "noQvalue";
        }

        // return strChallRecords;
    }

    public void doAllRecordsDelete() {

        openToWrite();
        deleteAll();
        sqLiteDatabase.close();
    }


    public void doSQLtest() {

        // openToWrite();
        // deleteAll();
        // close();
        /*
        openToWrite();
        long l = System.currentTimeMillis()/1000;
        String s = Long.toString(l);
        int tStart = Integer.parseInt(s);
        int dateMod = tStart + Integer.parseInt("123456");
        insert(5, "123456777", "89776655555", "noQvalue", String.valueOf(dateMod));
        insert(7, "1234567778", "89774445555", "noQvalue", String.valueOf(dateMod));
        insert(7, "2123456777", "8973345555", "4567775", String.valueOf(dateMod));
        insert(6, "45533434", "9885454534", "noQvalue", String.valueOf(dateMod));
        insert(8, "45533434", "9885454534", "noQvalue", String.valueOf(dateMod));
        close();
           */
        ArrayList<UtilDbRecord> lpDbRecord = getUtilDbRecords(KEY_REC_ID + ">?", new String[]{"0"}, "noQvalue");
        // ArrayList<UtilDbRecord> lpDbRecord = getUtilDbRecords(KEY_REC_TYPE + "=?", new String[]{"5"}, "noQvalue");
        if (lpDbRecord.size() <= 0) {
            System.out.println("db rec count: IS NULL");
        } else {
            for (UtilDbRecord list : lpDbRecord) {
                String strRecID = String.valueOf(list.getKeyRecID());
                String strRecType = String.valueOf(list.getKeyRecType());
                String strRecValA = list.getKeyRecValA();
                String strRecValB = list.getKeyRecValB();
                String strRecValC = list.getKeyRecValC();
                String strRecDateAdded = list.getKeyRecDateAdded();
                String strRecDateModified = list.getKeyRecDateModified();
                System.out.println("flow:doSQLtest:record: " + strRecID + " :: " + strRecType + " :: " + strRecValA + " :: " + strRecValB + " :: " + strRecValC + " :: " + strRecDateAdded + " :: " + strRecDateModified);
            }
            System.out.println("flow:doSQLtest:total: " + String.valueOf(lpDbRecord.size()));
        }


    }


    public static String[] getStrArr(String s, String s1) {
        String s2 = s;
        String s3 = s1;
        StringTokenizer stringtokenizer = new StringTokenizer(s2, s3);
        int i = stringtokenizer.countTokens();
        String as[] = new String[i];
        for (int j = 0; j < i; j++)
            as[j] = stringtokenizer.nextToken();

        return as;
    }





















    public class SQLiteHelper extends SQLiteOpenHelper {



    String DB_PATH = "/data/data/com.rscanner/databases/";
 
    String DB_NAME = "rscanner.db";
 
    private SQLiteDatabase myDataBase = null; 
 
    public Context myContext;

    StringUtils stringUtils;

        public SQLiteHelper(Context context, String name, CursorFactory factory, int version) {
            super(context, name, factory, version);
		myContext = context;
 	  stringUtils = new StringUtils();
 
        }





  /**
     * Creates a empty database on the system and rewrites it with your own database.
     * */
    public void createDataBase() throws IOException{
 
    	boolean dbExist = checkDataBase();
 
    	if(dbExist){
     
 
 	try {
   	    if(sqLiteDatabase != null) {

        System.out.println("UtilSQLAdapter.getString.sqLiteDatabase.getVersion() " + sqLiteDatabase.getVersion() + " : " +  MYDATABASE_VERSION);
			} else {
    		String myPath = DB_PATH + DB_NAME;
    		sqLiteDatabase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.NO_LOCALIZED_COLLATORS);
 
		}
		if(sqLiteDatabase.getVersion() == MYDATABASE_VERSION) {
		close();
		} else {
	       onUpgrade(sqLiteDatabase, sqLiteDatabase.getVersion(), MYDATABASE_VERSION);
		}

 	}catch(Exception e){
 
 
		 e.printStackTrace();
            System.out.println("sqLiteHelper.createDataBase: " + e.toString());
 
 	}


 
    	}else{
 
    		//By calling this method and empty database will be created into the default system path
               //of your application so we are gonna be able to overwrite that database with our database.
        	myDataBase = this.getReadableDatabase();
 

        	try {
 
    			copyDataBase();
 
    		} catch (Exception e) {
 
		 e.printStackTrace();
            System.out.println("createDataBase" + e.toString());
 
        	}
    	}
 
    }
 
    /**
     * Check if the database already exist to avoid re-copying the file each time you open the application.
     * @return true if it exists, false if it doesn't
     */
    private boolean checkDataBase(){
 
    	SQLiteDatabase checkDB = null;
 
    	try{
    		String myPath = DB_PATH + DB_NAME;
    		checkDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.NO_LOCALIZED_COLLATORS);
 
    	}catch(Exception e){
 
		 e.printStackTrace();
            System.out.println("checkDataBase" + e.toString());
 
    	}
 
    	if(checkDB != null){
 
    		checkDB.close();
 
    	}
 
    	return checkDB != null ? true : false;
    }
 
    /**
     * Copies your database from your local assets-folder to the just created empty database in the
     * system folder, from where it can be accessed and handled.
     * This is done by transfering bytestream.
     * */
    private void copyADataBase() throws IOException{
 
    	//Open your local db as the input stream
    	InputStream myInput = myContext.getAssets().open(DB_NAME);
 
    	// Path to the just created empty db
    	String outFileName = DB_PATH + DB_NAME;
 
    	//Open the empty db as the output stream
    	OutputStream myOutput = new FileOutputStream(outFileName);
 
    	//transfer bytes from the inputfile to the outputfile
    	byte[] buffer = new byte[1024];
    	int length;
    	while ((length = myInput.read(buffer))>0){
    		myOutput.write(buffer, 0, length);
    	}
 
    	//Close the streams
    	myOutput.flush();
    	myOutput.close();
    	myInput.close();
 
    }
    public void copyDataBase() 
   {
 	String strfnl = "nada";
    	try {
	String strDbra = stringUtils.loadAssetTextAsString(myContext, "db_schema.txt");
	String strDbrb = stringUtils.replaceString(strDbra, "  ", " ");
	String strDbrca = stringUtils.replaceString(strDbrb, "auto_increment", "autoincrement");
	String strDbrcb = stringUtils.replaceString(strDbrca, "int(", "integer(");
	String strDbrc = stringUtils.replaceString(strDbrcb, "\n", " ");

	String strDbrd = stringUtils.replaceString(strDbrc, "  ", " ");

	String[] pNums = StringUtils.readmessTokens(strDbrd, ";");
      System.out.println("copyDataBase.strDbrd: " + strDbrd);
	if(myDataBase != null) {
	} else {
	myDataBase = this.getReadableDatabase();
	}
 

	for (int j = 0; j < pNums.length; j++) {

 
	strfnl += setDBselectQ(pNums[j]);
      System.out.println("copyDataBase.pNums[j]: " + j + " : " + pNums[j]);


	}
 	} catch(Exception e) {
		close();
		 e.printStackTrace();
            System.out.println("copyDataBase: " + e.toString());

	} finally {
	close();
            System.out.println("copyDataBase:final " + strfnl);
	}

    } 
    public void openDataBase() throws SQLException{
         	// this.getReadableDatabase();
    	//Open the database
    	try {
        String myPath = DB_PATH + DB_NAME;
    	myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.NO_LOCALIZED_COLLATORS);
	} catch(Exception e) {
		close();
		 e.printStackTrace();
            System.out.println("openDataBase: " + e.toString());

	}
    }
 
    	@Override
	public synchronized void close() {
     	try {
    	    if(myDataBase != null) {
    		    myDataBase.close();
 		}
    	    if(sqLiteDatabase != null) {
    		    sqLiteDatabase.close();
 		}
    	    super.close();
 	} catch(Exception e) {
            System.out.println("close: " + e.toString());
	} 
	}
 
	@Override
	public void onCreate(SQLiteDatabase db) {
 
	}
 
	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            System.out.println("SQLiteHelper.onUpgrade: " +  oldVersion + " : " + newVersion);


        try {
	copyDataBase();
        } catch (Exception e) {
            System.out.println("onUpgrade: " + e.toString());

        }


	}
 
        // Add your public helper methods to access and get content from the database.
       // You could return cursors by doing "return myDataBase.query(....)" so it'd be easy
       // to you to create adapters for your views.


/*
        @Override
        public void onCreate(SQLiteDatabase db) {
            // TODO Auto-generated method stub
            db.execSQL(SCRIPT_CREATE_DATABASE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            // TODO Auto-generated method stub
		context.deleteDatabase(DB_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + MYDATABASE_TABLE);
            onCreate(db);
        }


*/

	}




}
