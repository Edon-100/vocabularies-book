const DBNAME = 'to_be_kill'

window.exports = {
	"add_vocabulary": { // 注意：键对应的是 plugin.json 中的 features.code
		 mode: "list",  // 用于无需 UI 显示，执行一些简单的代码
		 args: {
				// 进入插件时调用
				enter: (action, searchWord, callbackSetList) => {
					const { clipboard } = require('electron')
					const text = clipboard.readText()
					const db = utools.db.get(DBNAME) || {data:{}}
					let new_db_data = Object.assign(db.data, {[text]:text})
					window.utools.db.put({
						_id: DBNAME,
						data: new_db_data,
						_rev: db._rev
					})
				},
         // 用户选择列表中某个条目时被调用
         select: (action, itemData, callbackSetList) => {
					alert(itemData)
			 },
		 } 
	},
	"kill": {
		mode: "none",
		args: {
			enter: () => {
				utools.createBrowserWindow('index.html', {title: '测试窗口'})
			}
		}
	}
}