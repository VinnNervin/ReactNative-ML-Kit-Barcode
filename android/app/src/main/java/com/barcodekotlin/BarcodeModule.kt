import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
package com.barcodekotlin

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.util.Log

class BarcodeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    private val TAG = "BarcodeModule"

    private var pendingPromise: Promise? = null
    private val REQUEST_CODE = 10101

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "BarcodeModule"

    @ReactMethod
    fun openScanner(promise: Promise) {
        Log.d(TAG, "openScanner dipanggil")
        val activity = currentActivity
        if (activity == null) {
            Log.e(TAG, "openScanner: Current activity is null")
            promise.reject("ACTIVITY_NOT_FOUND", "Current activity is null")
            return
        }

        // Cek Google Play Services
        val gmsStatus = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(activity)
        if (gmsStatus != ConnectionResult.SUCCESS) {
            val errorMsg = "Google Play Services tidak tersedia/ada masalah: status=$gmsStatus"
            Log.e(TAG, "openScanner: $errorMsg")
            promise.reject("GMS_ERROR", errorMsg)
            return
        } else {
            Log.d(TAG, "openScanner: Google Play Services aman (status=$gmsStatus)")
        }

        try {
            val intent = Intent(reactContext, BarcodeScannerActivity::class.java)
            Log.d(TAG, "openScanner: intent = $intent, context = $reactContext, activity = $activity")
            pendingPromise = promise
            Log.d(TAG, "openScanner: Mulai BarcodeScannerActivity")
            activity.startActivityForResult(intent, REQUEST_CODE)
        } catch (e: Exception) {
            Log.e(TAG, "openScanner: Exception saat startActivityForResult", e)
            promise.reject("START_ACTIVITY_ERROR", e.message, e)
        }
    }

    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent?) {
        Log.d(TAG, "onActivityResult: requestCode=$requestCode, resultCode=$resultCode")
        if (requestCode == REQUEST_CODE && pendingPromise != null) {
            if (resultCode == Activity.RESULT_OK) {
                val barcode = intent?.getStringExtra("barcode")
                Log.d(TAG, "onActivityResult: Barcode result: $barcode")
                pendingPromise?.resolve(barcode)
            } else {
                Log.w(TAG, "onActivityResult: Scan cancelled atau gagal")
                pendingPromise?.reject("SCAN_CANCELLED", "User cancelled scanner")
            }
            pendingPromise = null
        }
    }

    override fun onNewIntent(intent: Intent) {
        // Not needed but must be overridden
    }
}
