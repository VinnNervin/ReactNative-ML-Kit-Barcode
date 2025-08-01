package com.barcodekotlin

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScanner
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning
import android.util.Log


class BarcodeScannerActivity : AppCompatActivity() {
    private val TAG = "BarcodeScannerActivity"

    private lateinit var scanner: GmsBarcodeScanner

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate: BarcodeScannerActivity MASUK (sebelum super.onCreate)")
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate: BarcodeScannerActivity started (setelah super.onCreate)")

        // Cek intent
        val intentAction = intent?.action
        Log.d(TAG, "onCreate: intent action = $intentAction, intent = $intent")

        // Inisialisasi dengan opsi
        val options = GmsBarcodeScannerOptions.Builder()
            .enableAutoZoom() // aktifkan auto zoom
            .build() // semua format akan dipindai (default)

        scanner = GmsBarcodeScanning.getClient(this, options)

        // Mulai scan langsung
        Log.d(TAG, "startScan: Mulai scan barcode")
        scanner.startScan()
            .addOnSuccessListener { barcode: Barcode ->
                Log.d(TAG, "onSuccess: Barcode scanned: ${barcode.rawValue}")
                val resultIntent = Intent().apply {
                    putExtra("barcode", barcode.rawValue)
                }
                setResult(RESULT_OK, resultIntent)
                finish()
            }
            .addOnCanceledListener {
                Log.w(TAG, "onCanceled: User cancelled scan")
                setResult(RESULT_CANCELED)
                finish()
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "onFailure: Scan failed: ${e.message}", e)
                setResult(RESULT_CANCELED)
                finish()
            }
    }
}
