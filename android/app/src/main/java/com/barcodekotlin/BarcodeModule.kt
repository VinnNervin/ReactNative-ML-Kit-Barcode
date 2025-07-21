package com.barcodekotlin

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BarcodeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BarcodeModule"
    }

    @ReactMethod
    fun openScanner() {
    val currentActivity = currentActivity
    if (currentActivity != null) {
        val intent = Intent(currentActivity, BarcodeScannerActivity::class.java)
        currentActivity.startActivity(intent)
    }
}
}
