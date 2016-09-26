const FILE_ATTRIBUTE_READONLY = [0, ['A', 'READONLY']]
const FILE_ATTRIBUTE_HIDDEN = [1, ['B', 'HIDDEN']]
const FILE_ATTRIBUTE_SYSTEM = [2, ['C', 'SYSTEM']]
const FILE_ATTRIBUTE_DIRECTORY = [4, ['E', 'DIRECTORY']]
const FILE_ATTRIBUTE_ARCHIVE = [5, ['F', 'ARCHIVE']]
const FILE_ATTRIBUTE_NORMAL = [7, ['H', 'NORMAL']]
const FILE_ATTRIBUTE_TEMPORARY = [8, ['I', 'TEMPORARY']]
const FILE_ATTRIBUTE_SPARSE_FILE = [9, ['J', 'SPARSE']]
const FILE_ATTRIBUTE_REPARSE_POINT = [10, ['K', 'REPARSE']]
const FILE_ATTRIBUTE_COMPRESSED = [11, ['L', 'COMPRESSED']]
const FILE_ATTRIBUTE_OFFLINE = [12, ['M', 'OFFLINE']]
const FILE_ATTRIBUTE_NOT_CONTENT_INDEXED = [13, ['N', 'NOINDEX']]
const FILE_ATTRIBUTE_ENCRYPTED = [14, ['O', 'ENCRYPTED']]

const FLAGS = [
    FILE_ATTRIBUTE_READONLY,
    FILE_ATTRIBUTE_HIDDEN,
    FILE_ATTRIBUTE_SYSTEM,
    FILE_ATTRIBUTE_DIRECTORY,
    FILE_ATTRIBUTE_ARCHIVE,
    FILE_ATTRIBUTE_NORMAL,
    FILE_ATTRIBUTE_TEMPORARY,
    FILE_ATTRIBUTE_SPARSE_FILE,
    FILE_ATTRIBUTE_REPARSE_POINT,
    FILE_ATTRIBUTE_COMPRESSED,
    FILE_ATTRIBUTE_OFFLINE,
    FILE_ATTRIBUTE_NOT_CONTENT_INDEXED,
    FILE_ATTRIBUTE_ENCRYPTED,
]

const SIZE = 4

/**
  * @param {string|Array.<string>} flags
  * @return {Buffer} Little Endian result
  */
function fileAttributeFlags(flags) {
    const buffer = Buffer.alloc(SIZE, 0)

    if (!flags) {
        throw new TypeError('Invalid flags')
    }

    if (typeof flags === 'string') {
        flags = flags.split('')
    }

    if (!Array.isArray(flags)) {
        throw new TypeError('Invalid flags')
    }

    buffer.writeUIntLE(
        flags.map(f => {
            f = f.toUpperCase()
            const flag = FLAGS.find(a => a[1][0] === f || a[1][1] === f)
            return flag && flag[0]
        })
        .filter(f => f >= 0)
        .reduce((a, f) => (a | (1 << f)), 0),
        0,
        4
    )

    return buffer
}

module.exports = fileAttributeFlags
