
function assigned(data){

  var Excel = require('exceljs')
  var workbook = new Excel.Workbook();

return  new Promise(function(resolve,reject){
    var arr6=[]
  workbook.xlsx.readFile('D:/electron-vue-1/ccd_project/src/excel/assigneng.xlsx')
    .then(function(){
      var worksheet = workbook.getWorksheet(1)
      worksheet.eachRow(function(row,rowNumber){
        if(row.values[2]==data){
          arr6.push(row.values)
    }
      })
      resolve(arr6)
    })
  });
}
function as(data){
  var values=assigned(data).then(function(data){console.log(data)})
}
console.log(as('ds'))
