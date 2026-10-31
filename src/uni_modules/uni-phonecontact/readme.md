# uni-phoneContact
联系人插件，包含 `uni.addPhoneContact` 和 `uni.chooseContact` 两个 API。  
[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/add-phone-contact.html)  

## 使用注意

- 当前插件目录名为 `uni_modules/uni-phoneContact`。
- 插件包含两个 API：`uni.addPhoneContact`、`uni.chooseContact`。
- 该文档当前主要说明 `uni.addPhoneContact` 的交互与实现。

### 当前交互流程

- 调用 `uni.addPhoneContact` 后，插件会先在公共层 `utssdk/common.uts` 自动弹出 `uni.showActionSheet`。
- 菜单包含两个操作：`创建新联系人`、`添加到现有联系人`。
- 用户选择后，插件再进入对应平台的系统联系人编辑界面，由用户确认是否保存。
- 最终是否保存成功、以及部分字段在系统联系人应用中的展示样式，以系统实现为准。

### 国际化

- 操作菜单文本会自动根据 `uni.getAppBaseInfo().language` 适配以下语言：简体中文、繁体中文、英文、法文、拉丁文。
- 其他未单独适配的语言，默认回退为英文。

### 平台实现说明

- Android：
  - 通过系统联系人编辑界面处理“创建新联系人 / 添加到现有联系人”。
  - 文本字段通过 `Intent` 进行预填。
  - 头像通过原生层压缩到约 `50KB` 内，并写入 `ContactsContract.Intents.Insert.DATA` 的 `Photo` 数据行传递给系统联系人界面。
  - 个别 ROM 或系统联系人应用仍可能忽略头像预填，属于系统兼容性差异。
- iOS：
  - `创建新联系人`：使用系统 `CNContactViewController(forNewContact:)`。
  - `添加到现有联系人`：先弹系统联系人选择器，再进入系统联系人编辑页。
  - 插件会尽量把姓名、电话、邮箱、地址、头像、公司、职位、备注等字段预填到系统界面。
- HarmonyOS：
  - `创建新联系人`：使用 `contact.addContactViaUI(...)`。
  - `添加到现有联系人`：使用 `contact.saveToExistingContactViaUI(...)`。
  - 联系人数据通过 ContactsKit 组装后交给系统 UI 处理。

### 权限与运行要求

- Android 当前实现不再主动申请通讯录读写权限，而是依赖系统联系人界面完成最终保存。
- iOS 需要 `NSContactsUsageDescription`，插件已在 `utssdk/app-ios/info.plist` 中补充说明。
- HarmonyOS 通过系统联系人 UI 处理联系人保存，但仍需系统能力正常可用。
- Android 与 iOS 涉及原生配置，真机调试或运行时如需完整生效，请使用自定义基座。

### 参数建议

- 建议至少传入 `firstName`，当前插件也会按此字段做基础校验。
- 若要兼容三端展示，推荐优先使用这些字段：`firstName`、`lastName`、`mobilePhoneNumber`、`email`、`organization`、`title`、`remark`。
- `weChatNumber`、`url`、部分地址/传真字段在不同系统联系人应用中的展示名称可能略有差异，属于系统侧表现差异。

### 已支持的交互模式

- 创建新联系人
- 添加到现有联系人

### 回调说明

- `success`：联系人保存成功后触发。
- `fail`：权限被拒绝、用户取消、系统联系人界面返回失败、系统能力异常等情况会触发，并返回统一错误码。
- `complete`：无论成功或失败都会触发。

### 示例页面

- 项目内已提供示例页：
  - `pages/phoneContact/addPhoneContact.uvue`
  - `pages/phoneContact/chooseContact.uvue`
- 首页入口位于：`pages/index/index.uvue`

### 实现结构

- 公共逻辑位于 `uni_modules/uni-phoneContact/utssdk/common.uts`，负责：
  - 参数基础校验
  - 国际化文案选择
  - `uni.showActionSheet` 菜单弹出与模式分发
- `utssdk` 根目录不再提供 `index.uts`，避免编译到微信小程序时与平台内置 `addPhoneContact` API 冲突。
- 平台逻辑位于各平台目录：
  - `uni_modules/uni-phoneContact/utssdk/app-android/index.uts`
  - `uni_modules/uni-phoneContact/utssdk/app-ios/index.uts`
  - `uni_modules/uni-phoneContact/utssdk/app-harmony/index.uts`
