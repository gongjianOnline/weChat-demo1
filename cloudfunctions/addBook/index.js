// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let title= event.title;
  let description = event.description;
  //连接云开发数据库
  return db.collection('books').add({
    data: [
      {
        title,
        description
      },
    ]
  })
}