package uts.sdk.modules.uniAddPhoneContact

import android.app.Activity
import android.content.ContentValues
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.provider.ContactsContract
import java.io.ByteArrayOutputStream
import java.io.File

object AddPhoneContactNative {

  private const val MAX_AVATAR_BYTES = 50 * 1024

  private fun getInsertDataList(intent: Intent): ArrayList<ContentValues> {
    val data = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      intent.getParcelableArrayListExtra(
        ContactsContract.Intents.Insert.DATA,
        ContentValues::class.java
      )
    } else {
      @Suppress("DEPRECATION")
      intent.getParcelableArrayListExtra<ContentValues>(ContactsContract.Intents.Insert.DATA)
    }
    return data ?: ArrayList()
  }

  fun applySupplementalInsertData(
    intent: Intent,
    url: String?,
    instantMessage: String?,
    workAddressCountry: String?,
    workAddressState: String?,
    workAddressCity: String?,
    workAddressStreet: String?,
    workAddressPostalCode: String?,
    homeAddressCountry: String?,
    homeAddressState: String?,
    homeAddressCity: String?,
    homeAddressStreet: String?,
    homeAddressPostalCode: String?,
    workFaxNumber: String?,
    homeFaxNumber: String?
  ): Boolean {
    return try {
      val data = getInsertDataList(intent)

      appendWebsiteRow(data, url)
      appendImRow(data, instantMessage)
      appendPostalAddressRow(
        data,
        ContactsContract.CommonDataKinds.StructuredPostal.TYPE_WORK,
        workAddressCountry,
        workAddressState,
        workAddressCity,
        workAddressStreet,
        workAddressPostalCode
      )
      appendPostalAddressRow(
        data,
        ContactsContract.CommonDataKinds.StructuredPostal.TYPE_HOME,
        homeAddressCountry,
        homeAddressState,
        homeAddressCity,
        homeAddressStreet,
        homeAddressPostalCode
      )
      appendFaxRow(data, ContactsContract.CommonDataKinds.Phone.TYPE_FAX_WORK, workFaxNumber)
      appendFaxRow(data, ContactsContract.CommonDataKinds.Phone.TYPE_FAX_HOME, homeFaxNumber)

      if (data.isNotEmpty()) {
        intent.putParcelableArrayListExtra(ContactsContract.Intents.Insert.DATA, data)
      }
      true
    } catch (_: Exception) {
      false
    }
  }

  fun applyAvatarInsertData(intent: Intent, activity: Activity, photoFilePath: String?): Boolean {
    val sourcePath = photoFilePath?.trim()
    if (sourcePath.isNullOrEmpty()) {
      return false
    }
    return try {
      val sourceBytes = readSourceBytes(activity, sourcePath) ?: return false
      val bitmap = BitmapFactory.decodeByteArray(sourceBytes, 0, sourceBytes.size) ?: return false
      val avatarBytes = compressBitmap(bitmap)
      bitmap.recycle()
      if (avatarBytes == null) {
        return false
      }
      val data = getInsertDataList(intent)
      val row = ContentValues()
      row.put(
        ContactsContract.Data.MIMETYPE,
        ContactsContract.CommonDataKinds.Photo.CONTENT_ITEM_TYPE
      )
      row.put(ContactsContract.CommonDataKinds.Photo.PHOTO, avatarBytes)
      data.add(row)
      intent.putParcelableArrayListExtra(ContactsContract.Intents.Insert.DATA, data)
      true
    } catch (_: Exception) {
      false
    }
  }

  @Deprecated("请改用 applyAvatarInsertData，新增联系人头像预填不再使用 URI")
  fun prepareAvatarUri(activity: Activity, photoFilePath: String?): String? {
    val unusedActivity = activity
    val unusedPhotoFilePath = photoFilePath
    return null
  }

  private fun readSourceBytes(activity: Activity, photoFilePath: String): ByteArray? {
    return try {
      when {
        photoFilePath.startsWith("content://") || photoFilePath.startsWith("file://") -> {
          activity.contentResolver.openInputStream(Uri.parse(photoFilePath))?.use { it.readBytes() }
        }
        else -> {
          val file = File(photoFilePath)
          if (file.exists()) file.readBytes() else null
        }
      }
    } catch (_: Exception) {
      null
    }
  }

  private fun appendWebsiteRow(data: ArrayList<ContentValues>, url: String?) {
    val normalizedUrl = url?.trim()
    if (normalizedUrl.isNullOrEmpty()) {
      return
    }
    val row = ContentValues()
    row.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE)
    row.put(ContactsContract.CommonDataKinds.Website.URL, normalizedUrl)
    row.put(ContactsContract.CommonDataKinds.Website.TYPE, ContactsContract.CommonDataKinds.Website.TYPE_HOMEPAGE)
    data.add(row)
  }

  private fun appendPostalAddressRow(
    data: ArrayList<ContentValues>,
    type: Int,
    country: String?,
    state: String?,
    city: String?,
    street: String?,
    postalCode: String?
  ) {
    val formattedAddress = composeAddress(country, state, city, street, postalCode)
    if (formattedAddress.isEmpty()) {
      return
    }
    val row = ContentValues()
    row.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE)
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.TYPE, type)
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS, formattedAddress)
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.COUNTRY, country.orEmpty())
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.REGION, state.orEmpty())
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.CITY, city.orEmpty())
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.STREET, street.orEmpty())
    row.put(ContactsContract.CommonDataKinds.StructuredPostal.POSTCODE, postalCode.orEmpty())
    data.add(row)
  }

  private fun appendImRow(data: ArrayList<ContentValues>, instantMessage: String?) {
    val normalizedIm = instantMessage?.trim()
    if (normalizedIm.isNullOrEmpty()) {
      return
    }
    val row = ContentValues()
    row.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Im.CONTENT_ITEM_TYPE)
    row.put(ContactsContract.CommonDataKinds.Im.DATA, normalizedIm)
    row.put(ContactsContract.CommonDataKinds.Im.PROTOCOL, ContactsContract.CommonDataKinds.Im.PROTOCOL_CUSTOM)
    row.put(ContactsContract.CommonDataKinds.Im.CUSTOM_PROTOCOL, "InstantMessage")
    row.put(ContactsContract.CommonDataKinds.Im.TYPE, ContactsContract.CommonDataKinds.Im.TYPE_OTHER)
    data.add(row)
  }

  private fun appendFaxRow(data: ArrayList<ContentValues>, type: Int, faxNumber: String?) {
    val normalizedFax = faxNumber?.trim()
    if (normalizedFax.isNullOrEmpty()) {
      return
    }
    val row = ContentValues()
    row.put(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
    row.put(ContactsContract.CommonDataKinds.Phone.NUMBER, normalizedFax)
    row.put(ContactsContract.CommonDataKinds.Phone.TYPE, type)
    data.add(row)
  }

  private fun composeAddress(
    country: String?,
    state: String?,
    city: String?,
    street: String?,
    postalCode: String?
  ): String {
    val parts = ArrayList<String>(5)
    if (!country.isNullOrEmpty()) {
      parts.add(country)
    }
    if (!state.isNullOrEmpty()) {
      parts.add(state)
    }
    if (!city.isNullOrEmpty()) {
      parts.add(city)
    }
    if (!street.isNullOrEmpty()) {
      parts.add(street)
    }
    if (!postalCode.isNullOrEmpty()) {
      parts.add(postalCode)
    }
    return parts.joinToString(" ")
  }

  private fun compressBitmap(bitmap: Bitmap): ByteArray? {
    var currentBitmap = bitmap
    var scaledBitmap: Bitmap? = null
    var scaleDivisor = 1
    while (scaleDivisor <= 8) {
      val compressed = compressToTarget(currentBitmap)
      if (compressed != null) {
        if (scaledBitmap != null && scaledBitmap != bitmap && !scaledBitmap.isRecycled) {
          scaledBitmap.recycle()
        }
        return compressed
      }
      scaleDivisor *= 2
      val nextWidth = (bitmap.width / scaleDivisor).coerceAtLeast(1)
      val nextHeight = (bitmap.height / scaleDivisor).coerceAtLeast(1)
      if (nextWidth == currentBitmap.width && nextHeight == currentBitmap.height) {
        break
      }
      if (scaledBitmap != null && scaledBitmap != bitmap && !scaledBitmap.isRecycled) {
        scaledBitmap.recycle()
      }
      scaledBitmap = Bitmap.createScaledBitmap(bitmap, nextWidth, nextHeight, true)
      currentBitmap = scaledBitmap
    }
    if (scaledBitmap != null && scaledBitmap != bitmap && !scaledBitmap.isRecycled) {
      scaledBitmap.recycle()
    }
    return null
  }

  private fun compressToTarget(bitmap: Bitmap): ByteArray? {
    var quality = 90
    while (quality >= 30) {
      val output = ByteArrayOutputStream()
      val compressed = bitmap.compress(Bitmap.CompressFormat.JPEG, quality, output)
      val result = output.toByteArray()
      output.close()
      if (compressed && result.size <= MAX_AVATAR_BYTES) {
        return result
      }
      quality -= 10
    }
    return null
  }
}
