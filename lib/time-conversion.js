'use strict'

const MAX_FILETIME = 0x8000000000000000 // 100s of nanoseconds
const EPOCH_DIFF = 116444736000000000 // 100s of nanoseconds
const WINDOWS_TICK = 10000 // milliseconds

/**
  * @param {number} timestamp - milliseconds since 1 January 1970 00:00:00 UTC
  * @return {number} - 100s of nanoseconds since 1 January 1601 00:00:00 UTC
  * @example
  * const t2f = require('win-lnk/lib/time-conversion').timestampToFiletime
  * const filetime = t2f(Date.now())
  */
function timestampToFiletime(timestamp) {
    if (!timestamp) {
        throw new TypeError('Invalid timestamp')
    }

    return (timestamp * WINDOWS_TICK) + EPOCH_DIFF
}

/**
  * @param {number} - 100s of nanoseconds since 1 January 1601 00:00:00 UTC
  * @return {number} timestamp - milliseconds since 1 January 1970 00:00:00 UTC
  * @example
  * const f2t = require('win-lnk/lib/time-conversion').filetimeToTimestamp
  * const timestamp = f2t(0x1d2191b4f280580)
  */
function filetimeToTimestamp(filetime) {
    if (!filetime || filetime >= MAX_FILETIME) {
        throw new TypeError('Invalid filetime')
    }

    return parseInt((filetime - EPOCH_DIFF) / WINDOWS_TICK, 10)
}

module.exports = {
    filetimeToTimestamp, timestampFromFiletime: filetimeToTimestamp,
    timestampToFiletime, filetimeFromTimestamp: timestampToFiletime,
}
