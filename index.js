/**
 * @file 简单的 evernote api
 * @author xzh
 * @date 2019-09-23 20:22:32
 */

const Evernote = require('evernote')

module.exports = (config) => {
    config = {
        token: '',
        sandbox: false,
        china: true,
        ...config,
    }

    if (!config.token) {
        new Error('token empty')

        return
    }

    const client = new Evernote.Client(config)
    const noteStore = client.getNoteStore()

    /**
     * 获取笔记本列表
     */
    const getNotebooks = () => noteStore.listNotebooks()

    /**
     * 获取笔记信息
     * @param {String} guid 笔记ID
     * @param {Object} option={} 可选配置
     */
    const getNote = (guid, option = {}) => {
        const {
            withContent = true,
            withResourcesData = false,
            withResourcesRecognition = false,
            withResourcesAlternateData = false,
        } = option

        return noteStore.getNote(guid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData)
    }

    /**
     * 查找笔记
     * @param {Object} option={} 可选配置
     */
    const findNotes = (option) => {
        const {
            filter = {},
            offset = 0,
            count = 12,
            spec = {
                includeTitle: true,
                includeContentLength: true,
            },
        } = option

        return noteStore.findNotesMetadata(filter, offset, count, spec)
    }

    /**
     * 在指定笔记本下查找笔记
     * @param {String} guid 笔记本ID
     * @param {Object} option={} 可选配置
     */
    const findBookNotes = (guid, option = {}) => {
        return findNotes({
            ...option,
            filter: {
                notebookGuid: guid,
                ...option.filter,
            },
        })
    }

    /**
     * 创建笔记本
     * @param {String} name 名称
     * @param {Object} option={} 可选配置
     */
    const createNotebook = (name, option = {}) => {
        return noteStore.createNotebook(new Evernote.Types.Notebook({
            name,
            ...option,
        }))
    }

    /**
     * 创建笔记
     * @param {String} title 标题
     * @param {String} content='' 内容
     * @param {Object} option={} 可选配置
     */
    const createNoteSimple = (title, content = '', option = {}) => {
        return noteStore.createNote(new Evernote.Types.Note({
            title,
            content: [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">',
                '<en-note>',
                content,
                '</en-note>',
            ].join(''),
            ...option,
        }))
    }

    /**
     * 更新笔记
     * @param {String} guid 笔记ID
     * @param {String} title 标题
     * @param {String} content='' 内容
     * @param {Object} option={} 可选配置
     */
    const updateNoteSimple = (guid, title, content = '', option = {}) => {
        return noteStore.updateNote(new Evernote.Types.Note({
            guid,
            title,
            content: [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">',
                '<en-note>',
                content,
                '</en-note>',
            ].join(''),
            ...option,
        }))
    }

    /**
     * 删除笔记内容中的XML信息
     * @param {String} text 笔记内容
     * @returns {String} 过滤后的笔记内容
     */
    const replaceXML = (text) => {
        const xmlReg = /^<\?xml version="1.0" encoding="UTF-8"\?><\!DOCTYPE en-note SYSTEM "http:\/\/xml.evernote.com\/pub\/enml2.dtd"><en-note>(.*)<\/en-note>$/
        const matched = text.match(xmlReg)

        if (matched) {
            return matched[1]
        }

        return text
    }

    return {
        ...noteStore,
        getNotebooks,
        getNote,
        findNotes,
        findBookNotes,
        createNoteSimple,
        updateNoteSimple,
        createNotebook,
        replaceXML,
    }
}
