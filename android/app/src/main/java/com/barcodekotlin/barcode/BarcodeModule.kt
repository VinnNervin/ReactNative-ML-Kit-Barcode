
package com.barcodekotlin.barcode

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.android.gms.common.moduleinstall.ModuleInstall
import com.google.android.gms.common.moduleinstall.ModuleInstallRequest

class BarcodeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var isScanning = false

    override fun getName(): String {
        return "BarcodeModule"
    }

    @ReactMethod
    fun openScanner(promise: Promise) {
        if (isScanning) {
            promise.reject("SCAN_IN_PROGRESS", "Scanning sedang berlangsung")
            return
        }

        val currentActivity = currentActivity
        if (currentActivity != null) {
            isScanning = true
            val moduleInstallClient = ModuleInstall.getClient(currentActivity)

            val options = GmsBarcodeScannerOptions.Builder()
                .enableAutoZoom()
                .build()

            val scanner = GmsBarcodeScanning.getClient(currentActivity, options)

            // Check Module Availability
            moduleInstallClient
                .areModulesAvailable(scanner)
                .addOnSuccessListener { response ->
                    if (response.areModulesAvailable()) {
                        startScanning(scanner, promise)
                    } else {
                        val moduleInstallRequest = ModuleInstallRequest.newBuilder()
                            .addApi(scanner)
                            .build()

                        moduleInstallClient
                            .installModules(moduleInstallRequest)
                            .addOnSuccessListener {
                                startScanning(scanner, promise)
                            }
                            .addOnFailureListener { e ->
                                isScanning = false
                                promise.reject("MODULE_INSTALL_ERROR", "Gagal install module: ${e.message}")
                            }
                    }
                }
                .addOnFailureListener { e ->
                    isScanning = false
                    promise.reject("MODULE_CHECK_ERROR", "Gagal cek module: ${e.message}")
                }
        } else {
            promise.reject("NO_ACTIVITY", "Activity tidak tersedia")
        }
    }

    private fun startScanning(scanner: com.google.mlkit.vision.codescanner.GmsBarcodeScanner, promise: Promise) {
        scanner.startScan()
            .addOnSuccessListener { barcode: Barcode ->
                isScanning = false
                promise.resolve(barcode.rawValue ?: "")
            }
            .addOnCanceledListener {
                isScanning = false
                promise.reject("SCAN_CANCELLED", "Scan dibatalkan")
            }
            .addOnFailureListener { e ->
                isScanning = false
                promise.reject("SCAN_ERROR", "Error: ${e.message}")
            }
    }
}
