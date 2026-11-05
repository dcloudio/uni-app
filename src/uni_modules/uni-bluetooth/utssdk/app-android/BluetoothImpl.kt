package uts.sdk.modules.uniBluetooth

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothGatt
import android.bluetooth.BluetoothGattCharacteristic
import android.bluetooth.BluetoothGattDescriptor
import android.bluetooth.BluetoothGattService
import android.bluetooth.BluetoothManager
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.ParcelUuid
import android.os.SystemClock
import io.dcloud.uts.ArrayBuffer
import io.dcloud.uts.UTSAndroid
import java.nio.ByteBuffer
import java.util.UUID

data class BleDevice(
  val deviceId: String, val name: String?, val rssi: Int, val advertisData: ArrayBuffer,
  val advertisServiceUUIDs: List<String>, val localName: String, val serviceData: List<BleServiceData>,
  val connectable: Boolean?
)
data class BleServiceData(val uuid: String, val value: ArrayBuffer)
data class GattService(val uuid: String, val isPrimary: Boolean)
data class GattCharacteristic(val uuid: String, val properties: Int)
data class BleConnectedDevice(val deviceId: String, val name: String?)

class BluetoothImpl {
  private val main = Handler(Looper.getMainLooper())
  private val context: Context? get() = UTSAndroid.getAppContext()
  private val manager: BluetoothManager? get() = context?.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager
  private val adapter: BluetoothAdapter? get() = manager?.adapter
  private var opened = false
  private var scanning = false
  private val devices = LinkedHashMap<String, BleDevice>()
  private val sessions = LinkedHashMap<String, BluetoothSession>()
  private var adapterListener: ((Boolean, Boolean) -> Unit)? = null
  private var deviceListener: ((BleDevice) -> Unit)? = null
  private var connectionListener: ((String, Boolean) -> Unit)? = null
  private var mtuListener: ((String, Int) -> Unit)? = null
  private var valueListener: ((String, String, String, ArrayBuffer) -> Unit)? = null
  private var scanCallback: ScanCallback? = null
  private var receiver: BroadcastReceiver? = null
  private var reportInterval = 0L
  private var allowDuplicates = false
  private val lastReport = HashMap<String, Long>()

  fun setAdapterListener(listener: ((Boolean, Boolean) -> Unit)?) { adapterListener = listener }
  fun setDeviceListener(listener: ((BleDevice) -> Unit)?) { deviceListener = listener }
  fun setConnectionListener(listener: ((String, Boolean) -> Unit)?) { connectionListener = listener }
  fun setMtuListener(listener: ((String, Int) -> Unit)?) { mtuListener = listener }
  fun setValueListener(listener: ((String, String, String, ArrayBuffer) -> Unit)?) { valueListener = listener }

  private fun permission(name: String): Boolean = context?.checkSelfPermission(name) == PackageManager.PERMISSION_GRANTED
  private fun connectPermission(): Boolean = Build.VERSION.SDK_INT < Build.VERSION_CODES.S || permission(Manifest.permission.BLUETOOTH_CONNECT)
  private fun scanPermission(): Int {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !permission(Manifest.permission.BLUETOOTH_SCAN)) return 1509602
    return if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || permission(Manifest.permission.ACCESS_FINE_LOCATION)) 0 else 1509008
  }

  fun check(): Int {
    if (!opened) return 1500101
    val app = context ?: return 1500104
    if (!app.packageManager.hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) return 1500105
    if (adapter == null) return 1500102
    if (!connectPermission()) return 1509602
    return if (adapter?.isEnabled == true) 0 else 1509603
  }

  fun open(): Int {
    val app = context ?: return 1500104
    if (!app.packageManager.hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) return 1500105
    val bluetoothAdapter = adapter ?: return 1500102
    if (!connectPermission()) return 1509602
    if (!bluetoothAdapter.isEnabled) return 1509603
    if (!opened) {
      val listener = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
          if (intent.action == BluetoothAdapter.ACTION_STATE_CHANGED) {
            val available = adapter?.isEnabled == true
            if (!available) stopScanInternal()
            adapterListener?.invoke(available, scanning)
          }
        }
      }
      app.registerReceiver(listener, IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED))
      receiver = listener
      opened = true
    }
    return 0
  }

  fun close(): Int {
    if (!opened) return 1500101
    stopScanInternal()
    sessions.values.toList().forEach { it.close(1500101) }
    sessions.clear()
    devices.clear()
    lastReport.clear()
    receiver?.let { context?.unregisterReceiver(it) }
    receiver = null
    opened = false
    return 0
  }

  fun isDiscovering(): Boolean = scanning
  fun isAvailable(): Boolean = adapter?.isEnabled == true
  fun discoveredDevices(): List<BleDevice> = devices.values.toList()

  fun startScan(services: List<String>?, duplicates: Boolean, interval: Int, powerLevel: String?): Int {
    val status = check()
    if (status != 0) return status
    val scanStatus = scanPermission()
    if (scanStatus != 0) return scanStatus
    if (interval < 0) return 1509601
    val filters = ArrayList<ScanFilter>()
    try {
      services?.forEach { serviceId ->
        val serviceUuid = ParcelUuid(uuid(serviceId))
        val filter = ScanFilter.Builder().setServiceUuid(serviceUuid).build()
        filters.add(filter)
      }
    } catch (_: IllegalArgumentException) { return 1509601 }
    stopScanInternal()
    val scanner = adapter?.bluetoothLeScanner ?: return 1500102
    reportInterval = interval.toLong()
    allowDuplicates = duplicates
    lastReport.clear()
    val scanMode = when (powerLevel) {
      "low" -> ScanSettings.SCAN_MODE_LOW_POWER
      "high" -> ScanSettings.SCAN_MODE_LOW_LATENCY
      else -> ScanSettings.SCAN_MODE_BALANCED
    }
    val callback = object : ScanCallback() {
      override fun onScanResult(callbackType: Int, result: ScanResult) {
        main.post { if (scanCallback === this) record(result) }
      }
      override fun onBatchScanResults(results: MutableList<ScanResult>) {
        main.post { if (scanCallback === this) results.forEach { record(it) } }
      }
      override fun onScanFailed(errorCode: Int) {
        main.post {
          if (scanCallback !== this) return@post
          scanning = false
          scanCallback = null
          adapterListener?.invoke(isAvailable(), false)
        }
      }
    }
    return try {
      val settings = ScanSettings.Builder().setScanMode(scanMode).build()
      scanner.startScan(filters, settings, callback)
      scanCallback = callback
      scanning = true
      adapterListener?.invoke(true, true)
      0
    } catch (_: SecurityException) { 1509602 } catch (_: Throwable) { 1509000 }
  }

  fun stopScan(): Int {
    if (!opened) return 0
    val status = check()
    if (status != 0) return status
    stopScanInternal()
    return 0
  }

  private fun stopScanInternal() {
    val callback = scanCallback
    scanCallback = null
    if (callback != null) try { adapter?.bluetoothLeScanner?.stopScan(callback) } catch (_: Throwable) { }
    if (scanning) {
      scanning = false
      adapterListener?.invoke(isAvailable(), false)
    }
  }

  private fun record(result: ScanResult) {
    if (!opened || !scanning) return
    val scanRecord = result.scanRecord
    val manufacturerData = scanRecord?.manufacturerSpecificData
    var advertisData = byteArrayOf()
    if (manufacturerData != null && manufacturerData.size() > 0) {
      val companyId = manufacturerData.keyAt(0)
      if (companyId >= 0) {
        val companyBytes = byteArrayOf(companyId.toByte(), (companyId shr 8).toByte())
        advertisData = companyBytes + (manufacturerData.get(companyId) ?: byteArrayOf())
      }
    }
    val serviceData = ArrayList<BleServiceData>()
    scanRecord?.serviceData?.forEach { (serviceUuid, value) ->
      serviceData.add(BleServiceData(serviceUuid.uuid.toString().uppercase(), ArrayBuffer(ByteBuffer.wrap(value))))
    }
    val deviceId = result.device.address
    val device = BleDevice(
      deviceId = deviceId,
      name = if (connectPermission()) result.device.name else null,
      rssi = result.rssi,
      advertisData = ArrayBuffer(ByteBuffer.wrap(advertisData)),
      advertisServiceUUIDs = scanRecord?.serviceUuids?.map { it.uuid.toString().uppercase() } ?: emptyList(),
      localName = scanRecord?.deviceName ?: "",
      serviceData = serviceData,
      connectable = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) result.isConnectable else null
    )
    devices[deviceId] = device
    val now = SystemClock.elapsedRealtime()
    val lastReportTime = lastReport[deviceId]
    // 去重仅针对本轮扫描，累计设备缓存仍持续更新
    if (lastReportTime != null && !allowDuplicates) return
    if (lastReportTime != null && now - lastReportTime < reportInterval) return
    lastReport[deviceId] = now
    deviceListener?.invoke(device)
  }

  fun connectedDevices(services: List<String>): Pair<Int, List<BleConnectedDevice>> {
    val status = check()
    if (status != 0) return Pair(status, emptyList())
    val serviceUuids = try {
      services.map { uuid(it) }.toSet()
    } catch (_: IllegalArgumentException) {
      return Pair(1509601, emptyList())
    }
    if (serviceUuids.isEmpty()) return Pair(1509601, emptyList())
    val devices = sessions.values.filter { session ->
      session.ready && session.gatt.services.any { service -> service.uuid in serviceUuids }
    }.map { session -> BleConnectedDevice(session.id, session.gatt.device.name) }
    return Pair(0, devices)
  }

  fun connect(id: String, timeout: Int?, callback: (Int) -> Unit) {
    val status = check()
    if (status != 0) {
      callback(status)
      return
    }
    if (timeout != null && timeout <= 0) {
      callback(1509601)
      return
    }
    if (sessions.containsKey(id)) {
      callback(if (sessions[id]?.ready == true) 1509007 else 1509001)
      return
    }
    val device = try {
      adapter?.getRemoteDevice(id)
    } catch (_: IllegalArgumentException) {
      callback(1509601)
      return
    } catch (_: Throwable) { null }
    if (device == null) {
      callback(1509006)
      return
    }
    val discoveredDevice = devices[id]
    if (discoveredDevice == null) {
      callback(1509006)
      return
    }
    if (discoveredDevice.connectable == false) {
      callback(1509604)
      return
    }
    try {
      val session = BluetoothSession(
        id = id,
        device = device,
        context = context,
        main = main,
        sessions = sessions,
        connectCallback = callback,
        emitConnection = { deviceId, connected -> connectionListener?.invoke(deviceId, connected) },
        emitMtu = { deviceId, mtu -> mtuListener?.invoke(deviceId, mtu) },
        emitValue = { deviceId, serviceId, characteristicId, value -> valueListener?.invoke(deviceId, serviceId, characteristicId, value) }
      )
      sessions[id] = session
      session.start(timeout)
    } catch (_: SecurityException) {
      sessions.remove(id)
      callback(1509602)
    } catch (_: Throwable) {
      sessions.remove(id)
      callback(1509001)
    }
  }

  fun disconnect(id: String): Int {
    val status = check()
    if (status != 0) return status
    if (!deviceIdIsValid(id)) return 1509601
    val session = sessions.remove(id) ?: return 1509003
    session.close(1509003)
    return 0
  }

  private fun deviceIdIsValid(id: String): Boolean {
    return try {
      adapter?.getRemoteDevice(id) != null
    } catch (_: IllegalArgumentException) {
      false
    } catch (_: Throwable) {
      false
    }
  }

  private fun session(id: String): BluetoothSession? = sessions[id]?.takeIf { it.ready }
  fun sessionStatus(id: String): Int {
    val status = check()
    if (status != 0) return status
    if (!deviceIdIsValid(id)) return 1509601
    if (session(id) == null) return 1509003
    return 0
  }

  fun mtu(id: String): Pair<Int, Int> {
    val session = session(id) ?: return Pair(sessionStatus(id), 0)
    return Pair(0, session.mtu)
  }

  fun services(id: String): Pair<Int, List<GattService>> {
    val session = session(id) ?: return Pair(sessionStatus(id), emptyList())
    val items = session.gatt.services.map { service ->
      GattService(service.uuid.toString().uppercase(), service.type == BluetoothGattService.SERVICE_TYPE_PRIMARY)
    }
    return Pair(0, items)
  }

  fun characteristics(id: String, serviceId: String): Pair<Int, List<GattCharacteristic>> {
    val session = session(id) ?: return Pair(sessionStatus(id), emptyList())
    val service = try {
      session.gatt.getService(uuid(serviceId))
    } catch (_: IllegalArgumentException) {
      return Pair(1509601, emptyList())
    }
    if (service == null) return Pair(1500103, emptyList())
    val items = service.characteristics.map { characteristic ->
      GattCharacteristic(characteristic.uuid.toString().uppercase(), characteristic.properties)
    }
    return Pair(0, items)
  }

  fun requestMtu(id: String, mtu: Int, callback: (Int, Int) -> Unit) {
    if (mtu !in 23..511) {
      callback(1509601, 0)
      return
    }
    val session = session(id)
    if (session == null) {
      callback(sessionStatus(id), 0)
      return
    }
    session.operate("mtu", { session.gatt.requestMtu(mtu) }) { code -> callback(code, session.mtu) }
  }

  fun readRssi(id: String, callback: (Int, Int) -> Unit) {
    val session = session(id)
    if (session == null) {
      callback(sessionStatus(id), 0)
      return
    }
    session.operate("rssi", { session.gatt.readRemoteRssi() }) { code -> callback(code, session.rssi) }
  }

  private fun characteristic(id: String, serviceId: String, characteristicId: String): Pair<Int, BluetoothGattCharacteristic?> {
    val session = session(id) ?: return Pair(sessionStatus(id), null)
    val service = try {
      session.gatt.getService(uuid(serviceId))
    } catch (_: IllegalArgumentException) {
      return Pair(1509601, null)
    }
    if (service == null) return Pair(1500103, null)
    val characteristic = try {
      service.getCharacteristic(uuid(characteristicId))
    } catch (_: IllegalArgumentException) {
      return Pair(1509601, null)
    }
    if (characteristic == null) return Pair(1509002, null)
    return Pair(0, characteristic)
  }

  fun read(id: String, serviceId: String, characteristicId: String, callback: (Int) -> Unit) {
    val (code, foundCharacteristic) = characteristic(id, serviceId, characteristicId)
    if (code != 0) {
      callback(code)
      return
    }
    val characteristic = foundCharacteristic!!
    if ((characteristic.properties and BluetoothGattCharacteristic.PROPERTY_READ) == 0) {
      callback(1509004)
      return
    }
    val session = session(id)!!
    session.operate("read", { session.gatt.readCharacteristic(characteristic) }, callback)
  }

  fun write(id: String, serviceId: String, characteristicId: String, value: ArrayBuffer, writeType: String?, callback: (Int) -> Unit) {
    val (code, foundCharacteristic) = characteristic(id, serviceId, characteristicId)
    if (code != 0) {
      callback(code)
      return
    }
    val characteristic = foundCharacteristic!!
    val properties = characteristic.properties
    val supportsNoResponse = (properties and BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE) != 0
    val noResponse = writeType == "writeNoResponse" || (writeType == null && supportsNoResponse)
    val requiredProperty = if (noResponse) BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE else BluetoothGattCharacteristic.PROPERTY_WRITE
    if ((properties and requiredProperty) == 0) {
      callback(1509004)
      return
    }
    val nativeWriteType = if (noResponse) BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE else BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT
    val source = value.byteBuffer.duplicate()
    source.clear()
    val bytes = ByteArray(source.remaining())
    source.get(bytes)
    val session = session(id)!!
    // 有响应写与无响应写的 ATT 净荷上限相同；超长由调用方分包，与 iOS 的 invalidParameter 语义一致。
    val payloadLimit = session.mtu - BluetoothSession.ATT_HEADER_SIZE
    if (payloadLimit <= 0 || bytes.size > payloadLimit) {
      callback(1509601)
      return
    }
    session.operate("write", {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        session.gatt.writeCharacteristic(characteristic, bytes, nativeWriteType) == BluetoothGatt.GATT_SUCCESS
      } else {
        @Suppress("DEPRECATION")
        characteristic.value = bytes
        characteristic.writeType = nativeWriteType
        session.gatt.writeCharacteristic(characteristic)
      }
    }, callback)
  }

  fun notify(id: String, serviceId: String, characteristicId: String, enabled: Boolean, type: String?, callback: (Int) -> Unit) {
    val (code, foundCharacteristic) = characteristic(id, serviceId, characteristicId)
    if (code != 0) {
      callback(code)
      return
    }
    val characteristic = foundCharacteristic!!
    val indication = type != "notification"
    val requiredProperty = if (indication) BluetoothGattCharacteristic.PROPERTY_INDICATE else BluetoothGattCharacteristic.PROPERTY_NOTIFY
    if (enabled && (characteristic.properties and requiredProperty) == 0) {
      callback(1509004)
      return
    }
    val descriptorUuid = UUID.fromString("00002902-0000-1000-8000-00805F9B34FB")
    val descriptor = characteristic.getDescriptor(descriptorUuid)
    if (descriptor == null) {
      callback(1509002)
      return
    }
    val descriptorValue = when {
      !enabled -> BluetoothGattDescriptor.DISABLE_NOTIFICATION_VALUE
      indication -> BluetoothGattDescriptor.ENABLE_INDICATION_VALUE
      else -> BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE
    }
    val session = session(id)!!
    session.operate("notify", {
      if (!session.gatt.setCharacteristicNotification(characteristic, enabled)) {
        false
      } else {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
          session.gatt.writeDescriptor(descriptor, descriptorValue) == BluetoothGatt.GATT_SUCCESS
        } else {
          @Suppress("DEPRECATION")
          descriptor.value = descriptorValue
          session.gatt.writeDescriptor(descriptor)
        }
      }
    }, callback)
  }

  private fun uuid(text: String): UUID {
    val value = text.removePrefix("0x").uppercase()
    val fullUuid = when (value.length) {
      4 -> "0000$value-0000-1000-8000-00805F9B34FB"
      8 -> "$value-0000-1000-8000-00805F9B34FB"
      else -> value
    }
    return UUID.fromString(fullUuid)
  }

}
