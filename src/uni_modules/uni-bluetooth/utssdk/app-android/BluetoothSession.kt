package uts.sdk.modules.uniBluetooth

import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothGatt
import android.bluetooth.BluetoothGattCallback
import android.bluetooth.BluetoothGattCharacteristic
import android.bluetooth.BluetoothGattDescriptor
import android.bluetooth.BluetoothProfile
import android.content.Context
import android.os.Build
import android.os.Handler
import io.dcloud.uts.ArrayBuffer
import java.nio.ByteBuffer

class BluetoothSession(
  val id: String,
  private val device: BluetoothDevice,
  private val context: Context?,
  private val main: Handler,
  private val sessions: MutableMap<String, BluetoothSession>,
  private var connectCallback: ((Int) -> Unit)?,
  private val emitConnection: (String, Boolean) -> Unit,
  private val emitMtu: (String, Int) -> Unit,
  private val emitValue: (String, String, String, ArrayBuffer) -> Unit
) {
  lateinit var gatt: BluetoothGatt
  var ready = false
  var mtu = 23
  var rssi = 0
  private var pendingKind: String? = null
  private var pending: ((Int) -> Unit)? = null
  private var timer: Runnable? = null

  val callbacks = object : BluetoothGattCallback() {
    override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
      main.post {
        if (sessions[id] !== this@BluetoothSession) return@post
        if (status == BluetoothGatt.GATT_SUCCESS && newState == BluetoothProfile.STATE_CONNECTED) {
          val started = try { gatt.discoverServices() } catch (_: Throwable) { false }
          if (!started) { sessions.remove(id); close(1509001) }
        } else if (newState == BluetoothProfile.STATE_DISCONNECTED || status != BluetoothGatt.GATT_SUCCESS) {
          sessions.remove(id)
          close(if (ready) 1509003 else 1509001)
        }
      }
    }

    override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
      main.post {
        if (sessions[id] !== this@BluetoothSession) return@post
        if (status != BluetoothGatt.GATT_SUCCESS) { sessions.remove(id); close(1509001); return@post }
        timer?.let { main.removeCallbacks(it) }
        timer = null
        ready = true
        connectCallback?.invoke(0)
        connectCallback = null
        emitConnection(id, true)
      }
    }

    @Suppress("DEPRECATION")
    override fun onCharacteristicRead(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic, status: Int) {
      onRead(characteristic, characteristic.value ?: byteArrayOf(), status)
    }

    override fun onCharacteristicRead(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic, value: ByteArray, status: Int) {
      onRead(characteristic, value, status)
    }

    private fun onRead(ch: BluetoothGattCharacteristic, value: ByteArray, status: Int) {
      main.post {
        if (sessions[id] !== this@BluetoothSession || pendingKind != "read") return@post
        finish("read", if (status == BluetoothGatt.GATT_SUCCESS) 0 else 1509000)
        if (status == BluetoothGatt.GATT_SUCCESS) emitValue(id, ch.service.uuid.toString().uppercase(), ch.uuid.toString().uppercase(), ArrayBuffer(ByteBuffer.wrap(value)))
      }
    }

    override fun onCharacteristicWrite(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic, status: Int) {
      main.post { if (sessions[id] === this@BluetoothSession) finish("write", if (status == BluetoothGatt.GATT_SUCCESS) 0 else 1509000) }
    }

    override fun onDescriptorWrite(gatt: BluetoothGatt, descriptor: BluetoothGattDescriptor, status: Int) {
      main.post { if (sessions[id] === this@BluetoothSession) finish("notify", if (status == BluetoothGatt.GATT_SUCCESS) 0 else 1509000) }
    }

    override fun onReadRemoteRssi(gatt: BluetoothGatt, value: Int, status: Int) {
      main.post {
        if (sessions[id] !== this@BluetoothSession) return@post
        if (status == BluetoothGatt.GATT_SUCCESS) rssi = value
        finish("rssi", if (status == BluetoothGatt.GATT_SUCCESS) 0 else 1509000)
      }
    }

    override fun onMtuChanged(gatt: BluetoothGatt, value: Int, status: Int) {
      main.post {
        if (sessions[id] !== this@BluetoothSession) return@post
        if (status == BluetoothGatt.GATT_SUCCESS) mtu = value
        finish("mtu", if (status == BluetoothGatt.GATT_SUCCESS) 0 else 1509000)
        if (status == BluetoothGatt.GATT_SUCCESS) emitMtu(id, value)
      }
    }

    @Suppress("DEPRECATION")
    override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
      onChanged(characteristic, characteristic.value ?: byteArrayOf())
    }

    override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic, value: ByteArray) {
      onChanged(characteristic, value)
    }

    private fun onChanged(ch: BluetoothGattCharacteristic, value: ByteArray) {
      main.post { if (sessions[id] === this@BluetoothSession) emitValue(id, ch.service.uuid.toString().uppercase(), ch.uuid.toString().uppercase(), ArrayBuffer(ByteBuffer.wrap(value))) }
    }
  }

  fun start(timeout: Int?) {
    val app = context ?: throw IllegalStateException("App context unavailable")
    gatt = if (Build.VERSION.SDK_INT >= 23) device.connectGatt(app, false, callbacks, BluetoothDevice.TRANSPORT_LE)
      else device.connectGatt(app, false, callbacks)
    if (timeout != null) {
      val task = Runnable { if (!ready && sessions[id] === this) { sessions.remove(id); close(1509005) } }
      timer = task
      main.postDelayed(task, timeout.toLong())
    }
  }

  fun close(code: Int) {
    timer?.let { main.removeCallbacks(it) }
    timer = null
    pending?.invoke(code)
    pending = null
    pendingKind = null
    connectCallback?.invoke(code)
    connectCallback = null
    if (::gatt.isInitialized) {
      try { gatt.disconnect(); gatt.close() } catch (_: Throwable) { }
    }
    if (ready) emitConnection(id, false)
    ready = false
  }

  fun operate(kind: String, action: () -> Boolean, callback: (Int) -> Unit) {
    if (pending != null) {
      callback(1509000)
      return
    }
    pendingKind = kind
    pending = callback
    try {
      if (!action()) {
        finish(kind, 1509000)
        return
      }
      val task = Runnable { finish(kind, 1509005) }
      timer = task
      main.postDelayed(task, 10000L)
    } catch (_: SecurityException) {
      finish(kind, 1509602)
    } catch (_: Throwable) {
      finish(kind, 1509000)
    }
  }

  fun finish(kind: String, code: Int) {
    if (pendingKind != kind) return
    timer?.let { main.removeCallbacks(it) }
    timer = null
    val callback = pending
    pending = null
    pendingKind = null
    callback?.invoke(code)
  }

  companion object {
    /** ATT 协议头长度（opcode + attribute handle），单次写入净荷上限为 MTU 减去该值。 */
    const val ATT_HEADER_SIZE = 3
  }
}
