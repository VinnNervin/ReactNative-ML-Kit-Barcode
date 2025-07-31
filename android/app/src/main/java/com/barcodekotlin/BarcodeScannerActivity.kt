package com.barcodekotlin

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScanner
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning

class BarcodeScannerActivity : AppCompatActivity() {

    private lateinit var scanner: GmsBarcodeScanner

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        Log.d("BarcodeScannerActivity", "Starting barcode scanner")

        // Cek ketersediaan Google Play Services
        val googleApiAvailability = GoogleApiAvailability.getInstance()
        val resultCode = googleApiAvailability.isGooglePlayServicesAvailable(this)
        
        if (resultCode != ConnectionResult.SUCCESS) {
            Log.e("BarcodeScannerActivity", "Google Play Services not available: $resultCode")
            val resultIntent = Intent().apply {
                putExtra("error", "SCAN_FAILED")
                putExtra("errorMessage", "Google Play Services not available")
            }
            setResult(RESULT_CANCELED, resultIntent)
            finish()
            return
        }

        // Inisialisasi dengan opsi
        val options = GmsBarcodeScannerOptions.Builder()
            .enableAutoZoom() // aktifkan auto zoom
            .build() // semua format akan dipindai (default)

        scanner = GmsBarcodeScanning.getClient(this, options)

        // Mulai scan langsung
        scanner.startScan()
            .addOnSuccessListener { barcode: Barcode ->
                Log.d("BarcodeScannerActivity", "Scan success: ${barcode.rawValue}")
                val resultIntent = Intent().apply {
                    putExtra("barcode", barcode.rawValue)
                }
                setResult(RESULT_OK, resultIntent)
                finish()
            }
            .addOnCanceledListener {
                Log.d("BarcodeScannerActivity", "Scan cancelled by user")
                val resultIntent = Intent().apply {
                    putExtra("error", "USER_CANCELLED")
                }
                setResult(RESULT_CANCELED, resultIntent)
                finish()
            }
            .addOnFailureListener { exception ->
                Log.e("BarcodeScannerActivity", "Scan failed", exception)
                val resultIntent = Intent().apply {
                    putExtra("error", "SCAN_FAILED")
                    putExtra("errorMessage", exception.message ?: "Unknown error")
                }
                setResult(RESULT_CANCELED, resultIntent)
                finish()
            }
    }
}
