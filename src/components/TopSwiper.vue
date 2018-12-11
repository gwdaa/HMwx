<template>
    <div class="swiper">
        <swiper
        :indicator-dots='true'
        indicator-color='272636'
        :autopaly='true'
        :interval='6000'
        :duration='1000'
        :circular='true'
        >
            <div :key='imgindex' v-for="(top,imgindex) in imageUrl">
                <swiper-item>
                    <img 
                    @click="bookDetail(img)"
                    class="slide-image" 
                    mode='aspectFit'
                    :key= "img.id"
                    v-for="img in top"
                    :src="img.image" 
                    >
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>
<script>
export default {
  props: ["tops"],
  computed: {
    imageUrl() {
      //如果通用 请用chunk函数， 比如lodash的chunk方法
      let res = this.tops;
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
    }
  },
  methods:{
      bookDetail(item){
          wx.navigateTo({
              url:'/pages/detail/main?id='+item.id
          })
      }
  },
  mounted() {
 
  }
};
</script>
<style lang='scss'>
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33%;
        height: 250rpx;
    }
}
</style>

