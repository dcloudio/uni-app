package uts.sdk.modules.uniCalendar

import android.content.ContentUris
import android.content.ContentValues
import android.content.Intent
import android.database.Cursor
import android.provider.CalendarContract
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.UTSJSONObject
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale
import java.util.TimeZone

object CalendarNative {

    private fun normalizeAllDayTime(time: Long): Long {
        val localCalendar = Calendar.getInstance().apply {
            timeInMillis = time
        }
        return Calendar.getInstance(TimeZone.getTimeZone("UTC")).apply {
            set(Calendar.YEAR, localCalendar.get(Calendar.YEAR))
            set(Calendar.MONTH, localCalendar.get(Calendar.MONTH))
            set(Calendar.DAY_OF_MONTH, localCalendar.get(Calendar.DAY_OF_MONTH))
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }.timeInMillis
    }

    private fun resolveEventTime(time: Long, allDay: Boolean): Long {
        return if (allDay) normalizeAllDayTime(time) else time
    }

    private fun resolveEventTimezone(allDay: Boolean): String {
        return if (allDay) TimeZone.getTimeZone("UTC").id else TimeZone.getDefault().id
    }

    private fun toReminderMinutes(alarmOffsetSeconds: Number?): Int {
        val seconds = alarmOffsetSeconds?.toLong() ?: return 0
        if (seconds <= 0L) {
            return 0
        }
        return ((seconds + 59L) / 60L).toInt()
    }

    fun createInsertEventIntent(options: UTSJSONObject): Intent {
        val intent = Intent(Intent.ACTION_INSERT).apply {
            data = CalendarContract.Events.CONTENT_URI
            putExtra(CalendarContract.Events.TITLE, options.getString("title") ?: "")
            putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, options.getNumber("startTime")?.toLong() ?: 0L)
            putExtra(CalendarContract.EXTRA_EVENT_END_TIME, options.getNumber("endTime")?.toLong() ?: 0L)
            putExtra(CalendarContract.Events.ALL_DAY, options.getBoolean("allDay") == true)
        }

		options.getString("notes")?.let {
			intent.putExtra(CalendarContract.Events.DESCRIPTION, it)
		}
        options.getString("location")?.let {
            intent.putExtra(CalendarContract.Events.EVENT_LOCATION, it)
        }

        val repeatInterval = options.getString("repeatInterval")
        if (repeatInterval != null) {
            buildRRule(
                repeatInterval,
                options.getNumber("startTime")?.toLong() ?: 0L,
                options.getNumber("repeatEndTime")?.toLong()
            )?.let {
                intent.putExtra(CalendarContract.Events.RRULE, it)
            }
        }

        if (options.getBoolean("alarm") == true) {
            intent.putExtra(CalendarContract.Reminders.MINUTES, toReminderMinutes(options.getNumber("alarmOffset")))
        }
        return intent
    }

    fun addEvent(options: UTSJSONObject): Int {
        return try {
            val context = UTSAndroid.getAppContext() ?: UTSAndroid.getUniActivity() ?: return 701
            val resolver = context.contentResolver ?: return 701
            val calendarId = queryWritableCalendarId(resolver) ?: return 702
            val allDay = options.getBoolean("allDay") == true
            val startTime = resolveEventTime(options.getNumber("startTime")?.toLong() ?: 0L, allDay)
            val endTime = resolveEventTime(options.getNumber("endTime")?.toLong() ?: 0L, allDay)

            val eventValues = ContentValues()
            eventValues.put(CalendarContract.Events.CALENDAR_ID, calendarId)
            eventValues.put(CalendarContract.Events.TITLE, options.getString("title") ?: "")
            eventValues.put(CalendarContract.Events.DTSTART, startTime)
            eventValues.put(CalendarContract.Events.DTEND, endTime)
            eventValues.put(CalendarContract.Events.EVENT_TIMEZONE, resolveEventTimezone(allDay))
            eventValues.put(CalendarContract.Events.ALL_DAY, if (allDay) 1 else 0)

			options.getString("notes")?.let {
				eventValues.put(CalendarContract.Events.DESCRIPTION, it)
			}
            options.getString("location")?.let {
                eventValues.put(CalendarContract.Events.EVENT_LOCATION, it)
            }

            val repeatInterval = options.getString("repeatInterval")
            if (repeatInterval != null) {
                val rrule = buildRRule(
                    repeatInterval,
                    startTime,
                    options.getNumber("repeatEndTime")?.toLong()?.let { resolveEventTime(it, allDay) }
                ) ?: return 704
                eventValues.put(CalendarContract.Events.RRULE, rrule)
            }

            val uri = resolver.insert(CalendarContract.Events.CONTENT_URI, eventValues) ?: return 703
            val eventId = ContentUris.parseId(uri)
            if (eventId <= 0) {
                return 703
            }

            if (options.getBoolean("alarm") == true) {
                val reminderValues = ContentValues()
                reminderValues.put(CalendarContract.Reminders.EVENT_ID, eventId)
                reminderValues.put(CalendarContract.Reminders.MINUTES, toReminderMinutes(options.getNumber("alarmOffset")))
                reminderValues.put(CalendarContract.Reminders.METHOD, CalendarContract.Reminders.METHOD_ALERT)
                val reminderUri = resolver.insert(CalendarContract.Reminders.CONTENT_URI, reminderValues)
                if (reminderUri == null) {
                    return 703
                }
            }
            0
        } catch (_: SecurityException) {
            703
        } catch (_: Throwable) {
            703
        }
    }

    private fun queryWritableCalendarId(resolver: android.content.ContentResolver): Long? {
        var cursor: Cursor? = null
        return try {
            cursor = resolver.query(
                CalendarContract.Calendars.CONTENT_URI,
                arrayOf(
                    CalendarContract.Calendars._ID,
                    CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL,
                    CalendarContract.Calendars.VISIBLE
                ),
                null,
                null,
                null
            )
            if (cursor == null) {
                return null
            }
            val idIndex = cursor.getColumnIndex(CalendarContract.Calendars._ID)
            val accessIndex = cursor.getColumnIndex(CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL)
            val visibleIndex = cursor.getColumnIndex(CalendarContract.Calendars.VISIBLE)
            while (cursor.moveToNext()) {
                val visible = if (visibleIndex >= 0) cursor.getInt(visibleIndex) else 1
                val access = if (accessIndex >= 0) cursor.getInt(accessIndex) else 0
                if (visible == 1 && access >= CalendarContract.Calendars.CAL_ACCESS_CONTRIBUTOR) {
                    return cursor.getLong(idIndex)
                }
            }
            null
        } finally {
            cursor?.close()
        }
    }

    private fun buildRRule(interval: String, startTime: Long, repeatEndTime: Number?): String? {
        val frequency = when (interval) {
            "day" -> "DAILY"
            "week" -> "WEEKLY"
            "month" -> "MONTHLY"
            "year" -> "YEARLY"
            else -> return null
        }
        val builder = StringBuilder("FREQ=")
        builder.append(frequency)
        repeatEndTime?.let {
            builder.append(";UNTIL=")
            builder.append(formatUtcDateTime(it.toLong()))
        }
        if (startTime > 0L && interval == "month") {
            val day = java.util.Calendar.getInstance().apply { timeInMillis = startTime }.get(java.util.Calendar.DAY_OF_MONTH)
            builder.append(";BYMONTHDAY=")
            builder.append(day)
        }
        return builder.toString()
    }

    private fun formatUtcDateTime(time: Long): String {
        val format = SimpleDateFormat("yyyyMMdd'T'HHmmss'Z'", Locale.US)
        format.timeZone = TimeZone.getTimeZone("UTC")
        return format.format(java.util.Date(time))
    }
}
