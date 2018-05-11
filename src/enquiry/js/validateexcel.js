var Excel = require('exceljs')
var workbook = new Excel.Workbook();
var storage = require('electron-json-storage')


function assengidvalue(data){

    let arr6=[]
    var workbook1 = new Excel.Workbook()
  workbook1.xlsx.readFile('src/excel/assigneng.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet(1)
      worksheet.eachRow(function(row,rowNumber){
        console.log(row+rowNumber)
        if(row.values[1]==data){
          worksheet.spliceRows(rowNumber,1)
    }
      })
        return workbook1.xlsx.writeFile('src/excel/assigneng.xlsx')
})
}
function validate(){
return new Promise((resolve,reject)=>{

  let arr1=[]
workbook.xlsx.readFile('src/excel/login.xlsx')
  .then(function(){
    let worksheet = workbook.getWorksheet(1)
    worksheet.eachRow(function(row,rowNumber){
      arr1.push(row.values)
    })
    //console.log(arr1)
 resolve(arr1)
})
});
}
function customer(){

return  new Promise(function(resolve,reject){
    let arr2=[]
  workbook.xlsx.readFile('src/excel/customer.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet(1)
      worksheet.eachRow(function(row,rowNumber){
        arr2.push(row.values)
      })
        resolve(arr2)
    })
  })
  }


function assigner(data){

  return new Promise(function(resolve,reject){
    let arr3=[]
  workbook.xlsx.readFile('src/excel/assigneng.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet(1)
      worksheet.eachRow(function(row,rowNumber){
        if(row.values[7]==data){
          arr3.push(row.values)
    }
      })
      resolve(arr3)
    })
})
}

function getstorage(val){
return new Promise(function(resolve,reject){
    storage.get(val,function(error,data){
      resolve(data)
    })
  })
}
function setstorage(val,val1){
  return new Promise(function(resolve,reject){
    storage.set(val,val1,function(error){})
  })
}
function user(){

  return new  Promise(function(resolve,reject){
    var arr5=[]
    workbook.xlsx.readFile('src/excel/login.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet(1)
      worksheet.eachRow(function(row,rowNumber){
        arr5.push(row.values)
      })
          resolve(arr5)
    })
  });
}

function assigned(data){
return  new Promise(function(resolve,reject){
    let arr6=[]
  workbook.xlsx.readFile('src/excel/assigneng.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet(1)
      worksheet.eachRow(function(row,rowNumber){
        if(row.values[2]==data){
          arr6.push(row.values)
    }
      })
      resolve(arr6)
    })
  });
}
function enquiryProject(){

  return  new Promise(function(resolve,reject){
    let arr7=[]
  workbook.xlsx.readFile('src/excel/Project Enquiry Register - 18-19 Template.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet('Sheet2')
      worksheet.eachRow(function(row,rowNumber){
        if(row.values[1]=="P"){
          arr7.push(row.values)
    }
      })
      resolve(arr7)
    })
  });
}


function enquiryTrading(){

  return new Promise(function(resolve,reject){
      let arr8=[]
  workbook.xlsx.readFile('src/excel/Project Enquiry Register - 18-19 Template.xlsx')
    .then(function(){
      let worksheet = workbook.getWorksheet('Sheet2')
      worksheet.eachRow(function(row,rowNumber){
        if(row.values[1]=="S"){
          arr8.push(row.values)
    }
      })
      resolve(arr8)
    })
  });
}

module.exports={
  val:validate,
  assi:assigner,
  cust:customer,
  getst:getstorage,
  user:user,
  asseng:assigned,
  enqp:enquiryProject,
  idval:assengidvalue,
  enqt:enquiryTrading}
