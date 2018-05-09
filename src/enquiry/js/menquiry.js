
const {ipcRenderer,electron} = require('electron')
const $ = require('jquery')
const {session} =require('electron')
var val = require('./../js/validateexcel')
var Excel = require('exceljs');
var workbook = new Excel.Workbook()

var ap=new Vue({
  el:"#login",
  data:{
    userdata:[],
    userdatasize:0,
    flag:0,
    name:'',
    pass:'',
    data1:[]
  },
  computed:{

  },
  mounted:function(){
  this.validate()
  },
  methods:{
    validate:function(){
      var arr1=[]
      var validatePromise=new Promise((resolve,reject)=>{
      workbook.xlsx.readFile('D:/electron-vue-1/ccd technologies/ccd_project/src/excel/login.xlsx')
        .then(function(){
          var worksheet = workbook.getWorksheet(1)
          worksheet.eachRow(function(row,rowNumber){
            arr1.push(row.values)
          })
          //console.log(arr1)
          resolve(arr1)


      })
    })
    validatePromise.then(function(result){
      ap.userdata = result;
      ap.userdatasize =ap.userdata.length

    })
    },
    fnt1:function(){
      this.data1=[this.name,this.pass]
      for(let i=1;i<this.userdatasize;i++){
        console.log(this.userdata[i][2]+"----"+this.userdata[i][3])
        console.log(this.name+"  --- "+this.pass)
       if((this.userdata[i][2]==this.name)&&(this.userdata[i][3]==this.pass)){
         console.log("yes")
         this.flag=1;
           }
          else{
            console.log("not")
          }
      }
      if(this.flag==1){
        this.flag=0
          ipcRenderer.send('login',this.data1)

      }else {
        alert('wrong credentials')
      }
    }
  }
})
