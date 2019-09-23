# evernote-node-simple
一个简单的evernote api封装

## 使用示例

```js
const evernote = require('evernote-node-simple')

const Note = evernote({
    token: 'xxxx',
})

// 获取笔记本列表
Note.getNotebooks().then(console.log)
```

## API

```js
/**
* 获取笔记本列表
*/
getNotebooks()

/**
* 获取笔记信息
* @param {String} guid 笔记ID
* @param {Object} option={} 可选配置
*/
getNote(guid, option = {})

/**
 * 查找笔记
 * @param {Object} option={} 可选配置
 */
findNotes(option)

/**
 * 在指定笔记本下查找笔记
 * @param {String} guid 笔记本ID
 * @param {Object} option={} 可选配置
 */
findBookNotes(guid, option = {})

/**
 * 创建笔记本
 * @param {String} name 名称
 * @param {Object} option={} 可选配置
 */
createNotebook(name, option = {})

/**
 * 创建笔记
 * @param {String} title 标题
 * @param {String} content='' 内容
 * @param {Object} option={} 可选配置
 */
createNoteSimple(title, content = '', option = {})

/**
 * 更新笔记
 * @param {String} guid 笔记ID
 * @param {String} title 标题
 * @param {String} content='' 内容
 * @param {Object} option={} 可选配置
 */
updateNoteSimple(guid, title, content = '', option = {})

/**
 * 删除笔记内容中的XML信息
 * @param {String} text 笔记内容
 * @returns {String} 过滤后的笔记内容
 */
replaceXML(text)
```
