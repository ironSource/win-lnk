import test from 'ava'
import fileAttributeFlags from '../../lib/file-attribute-flags'

test('fileAttributeFlags from flag string', t => {
    t.deepEqual(
        fileAttributeFlags('ABCDEFGHIJKLMNO'),
        Buffer.from([0xB7, 0x7F, 0, 0])
    )
})

test('fileAttributeFlags from flag array', t => {
    t.deepEqual(
        fileAttributeFlags([
            'readonly', 'hidden', 'system',
            'directory', 'archive', 'normal',
            'temporary', 'sparse', 'reparse',
            'compressed', 'offline', 'noindex',
            'encrypted',
        ]),
        Buffer.from([0xB7, 0x7F, 0, 0])
    )
})

test('fileAttributeFlags from mixed array', t => {
    t.deepEqual(
        fileAttributeFlags([
            'a', 'b', 'c',
            'hidden', 'system',
            'directory', 'archive', 'normal',
            'sparse', 'offline', 'noindex',
            'o', 'k', 'l', 'i'
        ]),
        Buffer.from([0xB7, 0x7F, 0, 0])
    )
})
