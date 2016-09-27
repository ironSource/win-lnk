/** File attributes flags */
const FLAGS = [
    ['a', 'readonly', 'FILE_ATTRIBUTE_READONLY'],
    ['b', 'hidden', 'FILE_ATTRIBUTE_HIDDEN'],
    ['c', 'system', 'FILE_ATTRIBUTE_SYSTEM'],
    null, // D is reserved
    ['e', 'directory', 'FILE_ATTRIBUTE_DIRECTORY'],
    ['f', 'archive', 'FILE_ATTRIBUTE_ARCHIVE'],
    null, // G is reserved,
    ['h', 'normal', 'FILE_ATTRIBUTE_NORMAL'],
    ['i', 'temporary', 'FILE_ATTRIBUTE_TEMPORARY'],
    ['j', 'sparse', 'FILE_ATTRIBUTE_SPARSE_FILE'],
    ['k', 'reparse', 'FILE_ATTRIBUTE_REPARSE_POINT'],
    ['l', 'compressed', 'FILE_ATTRIBUTE_COMPRESSED'],
    ['m', 'offline', 'FILE_ATTRIBUTE_OFFLINE'],
    ['n', 'noindex', 'FILE_ATTRIBUTE_NOT_CONTENT_INDEXED'],
    ['o', 'encrypted', 'FILE_ATTRIBUTE_ENCRYPTED'],
]

/** Size of the FileAttributesFlags field */
const SIZE = 4

/** @typedef {Object} FileAttributes
  * @property {boolean} readonly
  * @property {boolean} hidden
  * @property {boolean} system
  * @property {boolean} directory
  * @property {boolean} archive
  * @property {boolean} normal
  * @property {boolean} temporary
  * @property {boolean} sparse
  * @property {boolean} reparse
  * @property {boolean} compressed
  * @property {boolean} offline
  * @property {boolean} noindex
  * @property {boolean} encrypted
  */

class FileAttributes {
    /** Create FileAttributes from String, Array or Buffer
      * @param {string|Array.<string>|Buffer} flags
      * @return {FileAttributes}
      */
    static from(flags) {
        switch (true) {
            case typeof flags === 'string':
                return FileAttributes.fromString(flags)

            case Array.isArray(flags):
                return FileAttributes.fromArray(flags)

            case flags instanceof Buffer:
                return FileAttributes.fromBuffer(flags)

            default:
                throw new TypeError(
                    'Invalid flags. Expected String, Array or Buffer'
                )
        }
    }
    /** Create FileAttributes from string of short flags combined
      * @param {string} flags
      * @return {FileAttributes}
      */
    static fromString(flags) {
        if (!flags || typeof flags !== 'string') {
            throw new TypeError('Invalid flags. Expected String')
        }
        return FileAttributes.fromArray(flags.split(''))
    }

    /** Create FileAttributes from array of flags
      * @param {Array.<string>} flags
      * @return {FileAttributes}
      */
    static fromArray(flags) {
        if (!flags || !Array.isArray(flags)) {
            throw new TypeError('Invalid flags. Expected Array')
        }
        const fileAttributes = new FileAttributes()

        FLAGS.filter(f => f).forEach(f => {
            const [short, long] = f
            const hasFlag = flags.find(f => {
                f = f.toLowerCase()
                return (f === short || f === long)
            })
            if (hasFlag) {
                fileAttributes[long] = true
            }
        })

        return fileAttributes
    }

    /** Create FileAttributes from buffer
      * @param {Buffer} flags
      * @return {FileAttributes}
      */
    static fromBuffer(flags) {
        if (!(flags instanceof Buffer)) {
            throw new TypeError('Invalid flags. Expected Buffer')
        }

        flags = flags.readUInt32LE(0)
        const fileAttributes = new FileAttributes()

        for (let i = 0; i < 15; i++) {
            if ((flags >> i) & 1) {
                const [, long] = FLAGS[i]
                fileAttributes[long] = true
            }
        }

        return fileAttributes
    }

    /** Convert FileAttributes to String of short flags
      * @return {string}
      */
    toString() {
        return FLAGS.reduce((s, f) => {
            if (f) {
                const [short, long] = f
                return this[long] ? s + short : s
            }
            return s
        }, '')
    }

    /** Convert FileAttributes to Array of long flags
      * @return {Array.<string}
      */
    toArray() {
        return FLAGS.filter(f => f).map(f => this[f[1]] && f[1]).filter(f => f)
    }

    /** Convert FileAttributes to Buffer
      * @return {Buffer}
      */
    toBuffer() {
        const buffer = Buffer.alloc(SIZE, 0)

        buffer.writeUIntLE(
            FLAGS
                .map((f, i) => f && this[f[1]] && i)
                .filter(i => i >= 0)
                .reduce((f, i) => (f | (1 << i)), 0),
            0,
            SIZE
        )

        return buffer
    }
}

module.exports = FileAttributes
