import test from 'ava'
import timeConversion from '../../lib/time-conversion'

const {filetimeToTimestamp, timestampToFiletime} = timeConversion

const filetime = 131193944230000000 // 100s of nanoseconds
const timestamp = 1474920823000 // milliseconds

test('FILETIME to Timestamp', t => {
    t.is(filetimeToTimestamp(filetime), timestamp)
})

test('Timestamp to FILETIME', t => {
    t.is(timestampToFiletime(timestamp), filetime)
})

/**
  * Date.now() returns the number of milliseconds that have passed since
  * 1 January 1970 00:00:00 UTC
  *
  * FILETIME represents the number of 100 nanosecond (0.0001 milliseconds)
  * that have passed since 00:00 January 1 1601 UTC
  *
  * The epoch difference is 11644473600000 milliseconds
  *
  * @see https://msdn.microsoft.com/en-us/library/windows/desktop/ms724284(v=vs.85).aspx
  * @see https://msdn.microsoft.com/en-us/library/windows/desktop/ms724280(v=vs.85).aspx
  * @see: http://www.silisoftware.com/tools/date.php
  * @see: http://antrix.net/posts/2008/filetime-to-unix-time-in-javascript
  */
