package com.barcodekotlin

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScanner
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning

class BarcodeScannerActivity : AppCompatActivity() {

    private lateinit var scanner: GmsBarcodeScanner

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Inisialisasi scanner
        scanner = GmsBarcodeScanning.getClient(this)

        // Langsung buka scanner
        scanner.startScan()
            .addOnSuccessListener { barcode: Barcode ->
                val resultIntent = Intent().apply {
                    putExtra("barcode", barcode.rawValue)
                }
                setResult(RESULT_OK, resultIntent)
                finish()
            }
            .addOnCanceledListener {
                setResult(RESULT_CANCELED)
                finish()
            }
            .addOnFailureListener {
                setResult(RESULT_CANCELED)
                finish()
            }
    }
}
