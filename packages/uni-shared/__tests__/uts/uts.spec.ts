import { UTSJSONObject } from '../../src/uts/global/UTSJSONObject'
import { UTS } from '../../src/uts/inject/index'

describe('UTS', () => {
  it('parse complex object', () => {
    const json = JSON.stringify({
      key1: 'value1',
      key2: {
        key3: 'value3',
        key4: [1, 2, 3],
      },
      key5: [
        {
          key6: 'value6',
        },
        {
          key7: 'value7',
        },
      ],
      key8: [
        [
          [
            {
              key9: 'value9',
            },
          ],
        ],
      ],
    })
    const parsed = UTS.JSON.parse(json)
    expect(parsed).toBeInstanceOf(UTSJSONObject)
    expect(parsed.key1).toBe('value1')
    expect(parsed.key2).toBeInstanceOf(UTSJSONObject)
    expect(parsed.key2.key3).toBe('value3')
    expect(parsed.key2.key4).toEqual([1, 2, 3])
    expect(parsed.key5).toBeInstanceOf(Array)
    expect(parsed.key5[0]).toBeInstanceOf(UTSJSONObject)
    expect(parsed.key5[0].key6).toBe('value6')
    expect(parsed.key5[1]).toBeInstanceOf(UTSJSONObject)
    expect(parsed.key5[1].key7).toBe('value7')
    expect(parsed.key8).toBeInstanceOf(Array)
    expect(parsed.key8[0]).toBeInstanceOf(Array)
    expect(parsed.key8[0][0]).toBeInstanceOf(Array)
    expect(parsed.key8[0][0][0]).toBeInstanceOf(UTSJSONObject)
    expect(parsed.key8[0][0][0].key9).toBe('value9')
  })
})
