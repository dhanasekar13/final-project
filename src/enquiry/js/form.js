
const {ipcRenderer,electron} = require('electron')
const $ = require('jquery')
const {session} =require('electron')
const storage = require('electron-json-storage')
var val = require('../js/validateexcel')
var insert = require('../js/insertexcel')
var Excel = require('exceljs');
var workbook = new Excel.Workbook()
Vue.component('headerpart',{
  template:'#head1'
})

var ap3=new Vue({
  el:"#a2",
  data:{

  },
  methods:{
    logout:function(){
      console.log('logout 1')
      ipcRenderer.send('logout',1)
    },
  }
})
var ap=new Vue({
  el:"#form",
  data:{
    assid:"",
    uname:'',
    date1:Date,
    follow:'',
    cname:'',
    assidhead:['AssignId','Assigned Engineer','Client Name','Due Date','Follow Up','Mode of Enquiry','Assigned by'],
    assidObj:[],
    customerObj:[],
    userObj:[],
    mode:'',
    cust:0,

  },
  mounted:function(){
    this.assignerId();
    this.customer();
    this.user1();
  },
  methods:{

        think1:function(){
        window.open("src/excel/assigneng.xlsx");
        },
    think:function(){
      alert("have to think to do the logic of emailing")
    },
    assign:function(){
    var full={
      assiEng:this.uname,
      clientName:this.cname,
      dueDate:this.date1,
      followup:this.follow,
      mode:this.mode,
      assd:this.assid

    }
    if((full.clientName=='')&&(full.followup=='')){

    }
    else {

insert.insertAssigner(full)
this.uname='';
this.cname=''
this.date1=''
this.follow=''
this.mode=''
  }

    },
    convertToArray:function(data){
      var keys = data.shift(),
   i = 0, k = 0,
   obj = null,
   output = [];

for (i = 0; i < data.length; i++) {
   obj = {};

   for (k = 0; k < keys.length; k++) {
       obj[keys[k]] = data[i][k];
   }

   output.push(obj);
}

return output;
    },
assignerId:function(){
  val.getst('login').then(function(data){
    ap.assid = data.name
    assignerPromise=val.assi(ap.assid)
    assignerPromise.then(function(result){

    ap.assidObj=  ap.convertToArray(result)

    })
  })
},
customer:function(){
  val.cust().then(function(data){
    ap.customerObj =ap.convertToArray(data)
  })
},
user1:function(){
    val.user().then(function(data){
      ap.userObj=ap.convertToArray(data)
    })
}
  }
})
