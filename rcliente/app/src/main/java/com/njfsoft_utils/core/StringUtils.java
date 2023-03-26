package com.njfsoft_utils.core;

import java.util.StringTokenizer;
import java.lang.StringBuilder;
import java.io.InputStreamReader;
import java.io.InputStream;
import java.io.BufferedReader;
import android.content.Context;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 13-04-2014
 * Time: 19:38
 * To change this template use File | Settings | File Templates.
 */
public class StringUtils {



public String loadAssetTextAsString(Context context, String name) {
        BufferedReader in = null;
        try {
            StringBuilder buf = new StringBuilder();
            InputStream is = context.getAssets().open(name);
            in = new BufferedReader(new InputStreamReader(is));

            String str;
            boolean isFirst = true;
            while ( (str = in.readLine()) != null ) {
                if (isFirst)
                    isFirst = false;
                else
               buf.append('\n');
                buf.append(str);
            }
            return buf.toString();
        } catch (Exception e) {
            System.out.println("Error opening asset " + name);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (Exception e) {
                System.out.println("Error closing asset " + name);
                }
            }
        }

        return null;
    }



    public static String[] readmessTokens(String s, String s1)
    {
        String s2 = s;
        String s3 = s1;
        StringTokenizer stringtokenizer = new StringTokenizer(s2, s3);
        int i = stringtokenizer.countTokens();
        String as[] = new String[i];
        for(int j = 0; j < i; j++)
            as[j] = stringtokenizer.nextToken();

        return as;
    }


    public String replaceString(String s, String s1, String s2)
    {
        String s3 = s;
        if(s3 != null && s3.length() > 0)
        {
            int i = 0;
            do
            {
                int j = s3.indexOf(s1, i);
                if(j == -1)
                    break;
                s3 = s3.substring(0, j) + s2 + s3.substring(j + s1.length());
                i = j + s2.length();
            } while(true);
        }
        return s3;
    }








  public static Object toJSON(Object object) throws JSONException {
        if (object instanceof Map) {
            JSONObject json = new JSONObject();
            Map map = (Map) object;
            for (Object key : map.keySet()) {
                json.put(key.toString(), toJSON(map.get(key)));
            }
            return json;
        } else if (object instanceof Iterable) {
            JSONArray json = new JSONArray();
            for (Object value : ((Iterable)object)) {
                json.put(value);
            }
            return json;
        } else {
            return object;
        }
    }

    public static boolean isEmptyObject(JSONObject object) {
        return object.names() == null;
    }

    public static Map<String, Object> getMap(JSONObject object, String key) throws JSONException {
        return toMap(object.getJSONObject(key));
    }

    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap();
        Iterator keys = object.keys();
        while (keys.hasNext()) {
            String key = (String) keys.next();
            map.put(key, fromJson(object.get(key)));
        }
        return map;
    }

    public static List toList(JSONArray array) throws JSONException {
        List list = new ArrayList();
        for (int i = 0; i < array.length(); i++) {
            list.add(fromJson(array.get(i)));
        }
        return list;
    }

    private static Object fromJson(Object json) throws JSONException {
        if (json == JSONObject.NULL) {
            return null;
        } else if (json instanceof JSONObject) {
            return toMap((JSONObject) json);
        } else if (json instanceof JSONArray) {
            return toList((JSONArray) json);
        } else {
            return json;
        }
    }




}
