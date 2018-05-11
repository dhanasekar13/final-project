
const {ipcRenderer,electron} = require('electron')
const $ = require('jquery')
const {session} =require('electron')
const storage = require('electron-json-storage')
var val = require('../js/validateexcel')
var insert = require('../js/insertexcel')
var Excel = require('exceljs');
var workbook = new Excel.Workbook()

var ap=new Vue({
  el:"#full1",
  data:{
  ptype:0,
  assignengid:'',
  offerNo:'',
  cname:'',
  cperson:'',
  cno:'',
  cemail:'',
  modeofenquiry:'',
  cdetails:'',
  assiengname:'',
  assiengmode:'',
  assiengfreq:'',
  assid:'',
  duedate:Date,
  assengObj:Array
  },
  mounted:function(){
    this.assignerId();

  },
  watch:{
    ptype:function(){
      if(this.ptype=='S')
      {

        assengPromise=val.enqt()
        assengPromise.then(function(result){
          var length = result.length;
          var code = result[length-1][2]
          var number =parseInt(code.slice(5))
          var code1=code.slice(0,5)
          if(number<10){
            code1=code1+'00'
          }
          else if (number<100) {
            code1=code1+'0'
          }
        ap.offerNo=code1+number
          console.log(result)
        //ap.assengObj=  ap.convertToArray(result)
      })
      //  console.log(ap.assengObj)
      //  this.offerNo=ap.assengObj[ap.assengObj.length-1][2]
      }
      else{
        assengPromise=val.enqp()
        assengPromise.then(function(result){
          var length = result.length;
          var code = result[length-1][2]
          var number =parseInt(code.slice(5))
          var code1=code.slice(0,5)
          if(number<10){
            code1=code1+'00'
          }
          else if (number<100) {
            code1=code1+'0'
          }
        ap.offerNo=code1+number
          console.log(result)
        // ap.convertToArray(result)
      })
    //    console.log(ap.assengObj)
    //    var length=ap.assengObj.length;
      }
    }
  },
  methods:{
    submitted:function(){

        if((ap.offerNo=='')||(ap.offerNo==0)||(ap.cdetails=='')){
          alert('fil all field and hit me')
        }
      else{
      console.log("mode"+ap.ptype)
      console.log("ref no" +ap.offerNo)
      console.log('responosibity'+ap.assId)
      console.log("client name"+ap.cname)
      console.log("contact preson" +ap.cperson)
      if(((ap.cno==0)||(ap.cno==''))&&(ap.cemail!='')){
        ap.modeofenquiry='email'
      }
      else if ((ap.cno!=0)||(ap.cno!='')&&(ap.cemail=='')) {
        ap.modeofenquiry='phone'
      }
      else{
      ap.modeofenquiry=''
      }
      console.log('mode of enquriyphone are email'+ap.modeofenquiry)
      console.log('enq..dt'+new Date());
      console.log('due date'+ap.duedate);
      console.log('project detail'+ap.cdetails);
      var full ={
        ptype:ap.ptype,
        offerno:ap.offerNo,
        assid:ap.assid,
        clname:ap.cname,
        cperson:ap.cperson,
        enquiry:ap.modeofenquiry,
        enqdate:new Date(),
        duedate:ap.duedate,
        pdetail:ap.cdetails,
        engid:ap.assignengid,
        phone:ap.cno,
        email:ap.cemail
      }
      console.log(full)
      insert.insertEnqui(full)
      this.offerNo=''
      this.cname=''
      this.cperson=''
      this.ptype=''
      this.cno=''
      this.cemail=''
      this.cdetails=''
      this.assiengname=''
            }
    },

    choose:function(val){
      console.log(val)
      ap.assignengid=val[1]
      ap.cname=val[3]
      ap.assiengname=val[7]
      ap.assiengmode=val[6]
      ap.assiengfreq=val[5]
      ap.duedate=val[4]
    },
    think:function(){
      alert("have to think to do the logic of emailing")
    },
    convertToArray:function(data1){
      var keys = data1.shift(),
   i = 0, k = 0,
   obj = null,
   output = [];

for (i = 0; i < data1.length; i++) {
   obj = {};

   for (k = 0; k < keys.length; k++) {
       obj[keys[k]] = data1[i][k];
   }

   output.push(obj);
}

return output;
    },
assignerId:function(){
  val.getst('login').then(function(data){
    console.log(data)
    ap.assid = data.name
  var   assengPromise=val.asseng(ap.assid)
    assengPromise.then(function(result){
      console.log("this is obj"+result)
    ap.assengObj= result//ap.convertToArray(result)

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
