type TestRes = {
  name : string
  pass : boolean
}

export function testEncoder() : TestRes[] {
  let res : TestRes[] = []

  const encoder = new TextEncoder()
  const int8 = encoder.encode("€");

  const res0 : TestRes = {
    name: 'basic encode',
    pass: int8.toString() == "226,130,172"
  }
  res.push(res0)

  const decoder = new TextDecoder()
  const decode1 = decoder.decode(int8)

  const res1 : TestRes = {
    name: 'basic decode',
    pass: decode1 == "€"
  }

  res.push(res1)

  const STRING1 = "hello 中文 ♥️ 😊 の"
  const str1 = encoder.encode(STRING1);
  const restStr1 = decoder.decode(str1)

  const res2 : TestRes = {
    name: 'encode english',
    pass: restStr1 == STRING1
  }
  res.push(res2)

  // 空字符串
  const empty = encoder.encode("");

  const res3 : TestRes = {
    name: 'encode empty',
    pass: empty.length == 0
  }
  res.push(res3)
  const deEmpty = decoder.decode(empty);

  const res4 : TestRes = {
    name: 'decode empty',
    pass: deEmpty == ""
  }
  res.push(res4)

  return res
}
