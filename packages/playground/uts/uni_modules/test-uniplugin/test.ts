// 接口
interface IUniLogin {
  login(): void
}
// 父类/基类
class BaseUniLogin {
  register() {}
}
// 子类实现
class UniLogin extends BaseUniLogin implements IUniLogin {
  // 实现接口的方法，不能写 override 关键词，因为 override 关键词仅能在实现父类的属性或方法上使用
  login() {}
  // 实现或覆盖父类的方法，可写可不写 override
  override register(): void {}
}

async function testAsync(): Promise<number> {
  return 1
}

async function main() {
  const res = await testAsync()
  return res
}
