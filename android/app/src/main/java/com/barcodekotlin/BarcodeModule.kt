package com.barcodekotlin

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class BarcodeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var pendingPromise: Promise? = null
    private val REQUEST_CODE = 10101

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "BarcodeModule"

    @ReactMethod
    fun openScanner(promise: Promise) {
        val activity = currentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NOT_FOUND", "Current activity is null")
            return
        }

        val intent = Intent(reactContext, BarcodeScannerActivity::class.java)
        pendingPromise = promise
        activity.startActivityForResult(intent, REQUEST_CODE)
    }

    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent?) {
        Log.d("BarcodeModule", "onActivityResult: requestCode=$requestCode, resultCode=$resultCode")
        
        if (requestCode == REQUEST_CODE && pendingPromise != null) {
            if (resultCode == Activity.RESULT_OK) {
                val barcode = intent?.getStringExtra("barcode")
                Log.d("BarcodeModule", "Scan result: $barcode")
                pendingPromise?.resolve(barcode)
            } else {
                // Cek apakah ada informasi error spesifik
                val error = intent?.getStringExtra("error")
                val errorMessage = intent?.getStringExtra("errorMessage")
                
                Log.d("BarcodeModule", "Scan error: $error, message: $errorMessage")
                
                when (error) {
                    "USER_CANCELLED" -> {
                        pendingPromise?.reject("SCAN_CANCELLED", "User cancelled scanner")
                    }
                    "SCAN_FAILED" -> {
                        pendingPromise?.reject("SCAN_FAILED", "Scanner failed: $errorMessage")
                    }
                    else -> {
                        pendingPromise?.reject("SCAN_CANCELLED", "User cancelled scanner")
                    }
                }
            }
            pendingPromise = null
        }
    }

    override fun onNewIntent(intent: Intent) {
        // Not needed but must be overridden
    }
}
