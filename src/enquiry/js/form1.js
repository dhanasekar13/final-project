
const {ipcRenderer,electron} = require('electron')
const $ = require('jquery')
const {session} =require('electron')
const storage = require('electron-json-storage')
var val = require('../js/validateexcel')
var insert = require('../js/insertexcel')
var Excel = require('exceljs');
var workbook = new Excel.Workbook()

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
  el:"#full1",
  data:{
  ptype:0,
  offerNo:'',
  cname:'',
  cperson:'',
  cno:'',
  cemail:'',
  cdetails:'',
  assiengname:'',
  assiengmode:'',
  assiengfreq:'',
  assid:'',
  assengObj:Array
  },
  mounted:function(){
    this.assignerId();
    this.enquiry();
  },
  watch:{
    ptype:function(){
      if(this.ptype==0)
      {
        assengPromise=val.enqt()
        assengPromise.then(function(result){
          console.log(result)
        ap.assengObj=result//  ap.convertToArray(result)
      })
        console.log(ap.assengObj)
        this.offerNo=ap.assengObj[ap.assengObj.length-1][2]
      }
      else{
        assengPromise=val.enqp()
        assengPromise.then(function(result){
          console.log(result)
        ap.assengObj= result
          this.offerNo="two"
        // ap.convertToArray(result)
      })
        console.log(ap.assengObj)
        var length=ap.assengObj.length;
        this.offerNo =ap.assengObj[length-1][2]
      }
    }
  },
  methods:{
    enquiry:function(){
    /*
      assengPromise=val.asseng(ap.assid)
      assengPromise.then(function(result){
        console.log(result)
      ap.assengObj=  ap.convertToArray(result)
    })
*/
    },
    think:function(){
      alert("have to think to do the logic of emailing")
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
    assengPromise=val.asseng(ap.assid)
    assengPromise.then(function(result){
      console.log(result)
    ap.assengObj=  ap.convertToArray(result)

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
