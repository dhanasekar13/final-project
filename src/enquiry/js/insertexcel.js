var Excel = require('exceljs')
var workbook = new Excel.Workbook()
var val = require('./validateexcel')

function insertAssigner(data){
  workbook.xlsx.readFile('src/excel/assigneng.xlsx')
      .then(function(){
          var worksheet = workbook.getWorksheet(1)
        var lastRow   = worksheet.lastRow;
        var currentRow = lastRow._number ;
          var row1 = "assigneng"+currentRow
          var row2=data.assiEng;
          var row3=data.clientName;
          var row4=data.dueDate;
          var row5=data.followup;
          var row6 = data.mode;
          var row7 =data.assd;
          var row=[
            [row1,row2,row3,row4,row5,row6,row7]
          ]
          console.log(row)
          worksheet.addRows(row)

          return workbook.xlsx.writeFile('src/excel/assigneng.xlsx')

      })
}

function record(){
  var full ={
    ptype:'S',
    offerno:'1819s004',
    assid:'dhanasekar',
    clname:'tata motors',
    cperson:'ds',
    enquiry:'phone or mobile',
    enqdate:new Date(),
    duedate:new Date(2017-02-12),
    pdetail:'for whelling machinesim'
  }
  insertEnquiry(full)
}

function deletefield(data){
  console.log("iunsert tela "+data)
  var value= val.idval(data)
    value.then(function(da)
    {
      console.log("The row are is"+da)
      deletework(da)
      windowreload()
    })
}

function deletework(data){
 workbook.xlsx.readFile('src/excel/Project Enquiry Register - 18-19 Template.xlsx')
        .then(function(){
            var worksheet = workbook.getWorksheet('Sheet2')
            worksheet.spliceRows(data,data);

        return    workbook.xlsx.writeFile('src/excel/Project Enquiry Register - 18-19 Template.xlsx')

        })

}
function windowreload(){

}
function insertEnquiry(data){

  workbook.xlsx.readFile('src/excel/Project Enquiry Register - 18-19 Template.xlsx')
      .then(function(){
          var worksheet = workbook.getWorksheet('Sheet2')
        var lastRow   = worksheet.lastRow;
        var currentRow = lastRow._number ;
          var row1 =data.ptype
          var row2=data.offerno;
          var row3=''
          var row4=data.assid;
          var row5=data.clname;
          var row6 = data.cperson;
          var row7 =data.enquiry;
          var row8 = data.enqdate;
          var row9=data.duedate;
          var row10=''
          var row11=data.enquiry;
          var row12=''
          var row13 =''
          var row14 =''
          var row15 = ''
          var row16=''
          var row17=''
          var row18=''
          var row19=''
          var row20 = ''
          var row21 =''
          var row22 = ''
          var row23=''
          var row24=''
          var row25=''
          var row26=''
          var row27 =''
          var row=[
            [row1,row2,row3,row4,row5,row6,row7,row8,row9,row10,row11,row12,row13,row14,row15,row16,row17,row18,row19,row20,row21,row22,row23,row24,row25,row26,row27]
          ]
          console.log(row)
          worksheet.addRows(row)

          return workbook.xlsx.writeFile('src/excel/Project Enquiry Register - 18-19 Template.xlsx')

      })

}



module.exports={
  insertAssigner:insertAssigner,
  insertEnqui:insertEnquiry,
  delete:deletefield
}
