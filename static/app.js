var http = require('http')
var fs = require('fs')    //启用读写文件模块
var url = require('url')
var path = require('path')  //防止不同系统路径不统一的情况

http.createServer(function(req,res){
  var pathObj = url.parse(req.url,true) //得到一个有很多信息的请求的url对象
  console.log(pathObj)
  switch (pathObj.pathname){
    case '/loadMore':
    var curIdx = pathObj.query.idx
    var len = pathObj.query.len
    var data = []
    for(var i=0;i<len;i++){ 
      data.push('内容' + (parseInt(curIdx) + i)) //点击第一次按钮后data = ["内容0","内容1","内容2","内容3","内容4"]
    }
    res.end(JSON.stringify(data))//从一个对象中解析出字符串
    break

    default:
      fs.readFile(path.join(__dirname,pathObj.pathname),function(err,data){
        //若pathObj.pathname != /loadMore ,访问pathObj.pathname对应的绝对路径下的静态文件
        if(err){
          res.writeHead(404,'not found')
          res.end('Not Found')
        }else{
          res.writeHead(200,'ok')
          res.end(data)
        }
      })
  }

}).listen(8080)
