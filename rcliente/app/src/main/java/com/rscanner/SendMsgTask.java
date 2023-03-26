package com.rscanner;

import android.os.AsyncTask;

public class SendMsgTask<RSSFeed> extends AsyncTask<String, Void, RSSFeed> {
    private Exception exception;

    protected RSSFeed doInBackground(String... urls) {
        try {

        return null;
        } catch (Exception e) {
            this.exception = e;
            return null;
        }
    }

    protected void onPostExecute(RSSFeed feed) {
    }
}
