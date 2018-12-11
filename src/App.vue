<script>
// import {get} from './util'

export default {
  async created () {
    // const res = await get('/weapp/demo')
    // console.log(123, res)
    // wx.request({
    //   url:config.host+'/weapp/demo',
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
  }
}
</script>
<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary{
  color: #272636;
}
.page-title{
  padding-left: 20px;
  background: #eee;
  line-height: 40px;
  font-size: 14px;
}
.right{
  float: right;
}
.btn{
  color:white;
  background: #272636;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%
}
.btn:acitive{
  background: #65628d
}
</style>