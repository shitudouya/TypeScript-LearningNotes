const readfile = function (fs,url) {
  return new Promise((resolve,reject)=>{
    fs.readFile(url,"utf-8",(err,data)=>{
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

module.exports = readfile;