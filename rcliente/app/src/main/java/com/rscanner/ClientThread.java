package com.rscanner;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;

//ClientThread Class implementation
public class ClientThread implements Runnable {
	Handler mainHandler;
	private InetAddress serverAddr;
	private int serverPort;
	private DatagramSocket socket;
	byte[] buf = new byte[65000];
	String currMsg;
	public boolean connected = false;

	public ClientThread(String ip, int port) {
		try {
			serverAddr = InetAddress.getByName(ip);
		} catch (Exception e) {
			System.out.println("ClientActivity.error: " + e);
			Log.e("ClientActivity", "C: Error", e);
		}
		serverPort = port;
		currMsg = "noQvalue";
		HandlerThread handlerThread = new HandlerThread("URLConnection");
		handlerThread.start();
		mainHandler = new Handler(handlerThread.getLooper());
	}


	//Opens the socket and output buffer to the remote server
	public void run() {
		try {


			socket = new DatagramSocket();
			socket.setSoTimeout(1000);

			// socket keeps closing after 1 message
			// need to find a way to keep it open(?)
			socket.setReuseAddress(true);
			connected = true;

			connected = testConnection();
			if (connected)
				surveyConnection();
		} catch (Exception e) {
			System.out.println("ClientActivity.error: " + e);

			Log.e("ClientActivity", "Client Connection Error", e);
		}
	}
	// make this sendMessage function runnable
	// so that it can be called from the main thread


	public void sendMessage(String message) {
		try {
			currMsg = message;
			System.out.println("ClientActivity.thread.sendMessage: " + message);
			mainHandler.post(myRunnable);

		} catch (Exception e) {
			// ptint stack trace here
			e.printStackTrace();

			System.out.println("ClientActivity.thread.sendMessage: " + e);
			// closeSocketNoMessge();
		}
	}

	public void closeSocketNoMessge() {
		System.out.println("ClientActivity.closeSocketNoMessge: ");
		if (socket != null) {
			socket.close();
		}
		connected = false;
	}

	public void closeSocket() {
		sendMessage(new String("Close"));

		if (socket != null) {
			socket.close();
		}

		connected = false;
	}

	/*
	 * Used to test connection with the server.
	 */

	private boolean testConnection() {
		try {
			if (!connected) buf = new String("Connectivity").getBytes();
			else buf = new String("Connected").getBytes();

			DatagramPacket out = new DatagramPacket(buf, buf.length, serverAddr, serverPort);
			socket.send(out);
		} catch (Exception e) {
			System.out.println("ClientActivity.testConnection.error: " + e);
			return false;
		}

		try {
			DatagramPacket in = new DatagramPacket(buf, buf.length);
			socket.receive(in);
			return true;
		} catch (Exception e) {
			System.out.println("ClientActivity.testConnection.error: " + e);
			return false;
		}
	}

	private void surveyConnection() {
		int count = 0;
		while (connected) {
			try {
				Thread.sleep(1000);
			} catch (Exception e) {
				System.out.println("ClientActivity.surveyConnection.error: " + e);
				// closeSocket();
				return;
			}

			if (!testConnection())
				count++;
			else
				count = 0;

			if (count == 3) {
				// closeSocket();
				return;
			}
		}
	}



	Runnable myRunnable = new Runnable() {
		@Override
		public void run() {
			try {
				buf = currMsg.getBytes();
				DatagramPacket out = new DatagramPacket(buf, buf.length, serverAddr, serverPort);
				socket.send(out);
			}catch( Exception err){
				err.printStackTrace();
			}
		}
	};


}



