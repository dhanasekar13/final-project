var Excel = require('exceljs')

var workbook = new Excel.Workbook();
var arr=[]

var validate= new Promise((resolve,reject)=>{
    workbook.xlsx.readFile('D:/electron-vue-1/ccd technologies/trial_3/src/excel/login.xlsx')
  .then(function(){
    var worksheet = workbook.getWorksheet(1)
    worksheet.eachRow(function(row,rowNumber){
      arr.push(row.values)
    })
    resolve(arr)
  })

});
function abc(){
return  validate.then(function(result){
    console.log(result)
  })
}

module.exports={
  abc:abc
}
