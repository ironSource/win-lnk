const MAX_FILETIME = 0x8000000000000000 // 100s of nanoseconds
const EPOCH_DIFF = 116444736000000000 // 100s of nanoseconds
const WINDOWS_TICK = 10000 // milliseconds

/**
  * @param {number} timestamp - milliseconds since 1 January 1970 00:00:00 UTC
  * @return {number} - 100s of nanoseconds since 1 January 1601 00:00:00 UTC
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
