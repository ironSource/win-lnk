import test from 'ava'
import FileAttributes from '../../lib/file-attributes'

test('FileAttributes constructor', t => {
    t.truthy((new FileAttributes()) instanceof FileAttributes)
})

test('FileAttributes.fromString', t => {
    const fileAttributes = FileAttributes.fromString('abcdefghijklmno')
    t.truthy(fileAttributes instanceof FileAttributes)
    t.true(fileAttributes.readonly)
    t.true(fileAttributes.hidden)
    t.true(fileAttributes.system)
    t.true(fileAttributes.directory)
    t.true(fileAttributes.archive)
    t.true(fileAttributes.normal)
    t.true(fileAttributes.temporary)
    t.true(fileAttributes.sparse)
    t.true(fileAttributes.reparse)
    t.true(fileAttributes.compressed)
    t.true(fileAttributes.offline)
    t.true(fileAttributes.noindex)
    t.true(fileAttributes.encrypted)
})

test('FileAttributes.fromArray', t => {
    const fileAttributes = FileAttributes.fromArray([
        'readonly',
        'b',
        'system',
        'directory',
        'archive',
        'normal',
        'temporary',
        'sparse',
        'k',
        'compressed',
        'offline',
        'noindex',
        'o',
    ])

    t.truthy(fileAttributes instanceof FileAttributes)
    t.true(fileAttributes.readonly)
    t.true(fileAttributes.hidden)
    t.true(fileAttributes.system)
    t.true(fileAttributes.directory)
    t.true(fileAttributes.archive)
    t.true(fileAttributes.normal)
    t.true(fileAttributes.temporary)
    t.true(fileAttributes.sparse)
    t.true(fileAttributes.reparse)
    t.true(fileAttributes.compressed)
    t.true(fileAttributes.offline)
    t.true(fileAttributes.noindex)
    t.true(fileAttributes.encrypted)
})

test('FileAttributes.fromBuffer', t => {
    const fileAttributes = FileAttributes.fromBuffer(Buffer.from([0xB7, 0x7F, 0, 0]))

    t.truthy(fileAttributes instanceof FileAttributes)
    t.true(fileAttributes.readonly)
    t.true(fileAttributes.hidden)
    t.true(fileAttributes.system)
    t.true(fileAttributes.directory)
    t.true(fileAttributes.archive)
    t.true(fileAttributes.normal)
    t.true(fileAttributes.temporary)
    t.true(fileAttributes.sparse)
    t.true(fileAttributes.reparse)
    t.true(fileAttributes.compressed)
    t.true(fileAttributes.offline)
    t.true(fileAttributes.noindex)
    t.true(fileAttributes.encrypted)
})

test('fileAttributes.toSring', t => {
    const fileAttributes = FileAttributes.fromBuffer(Buffer.from([0xB7, 0x7F, 0, 0]))
    t.is(fileAttributes.toString(), 'abcefhijklmno')
})

test('fileAttributes.toArray', t => {
    const fileAttributes = FileAttributes.fromBuffer(Buffer.from([0xB7, 0x7F, 0, 0]))
    t.deepEqual(fileAttributes.toArray(), [
        'readonly',
        'hidden',
        'system',
        'directory',
        'archive',
        'normal',
        'temporary',
        'sparse',
        'reparse',
        'compressed',
        'offline',
        'noindex',
        'encrypted',
    ])
})

test('fileAttributes.toBuffer', t => {
    const fileAttributes = FileAttributes.fromString('abcdefghijklmno')
    t.deepEqual(fileAttributes.toBuffer(), Buffer.from([0xB7, 0x7F, 0, 0]))
})

test('fileAttributes.from', t => {
    t.true(FileAttributes.from('abc') instanceof FileAttributes)
    t.true(FileAttributes.from(['a', 'b', 'c']) instanceof FileAttributes)
    t.true(FileAttributes.from(Buffer.from([0, 0, 0, 0])) instanceof FileAttributes)
})
