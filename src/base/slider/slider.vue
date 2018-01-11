<template>
  <div>
    <swiper v-if="recommends.length" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiperA" id="mySwiperA">
      <swiper-slide v-for="item in recommends"  :key="item.id">
        <a :href="item.linkUrl" class="a-block">
          <img class="needsclick" :src="item.picUrl">
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  // swiper options example:
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    // name: 'carrousel',
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        // 异步过程
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.slider)
            this.recommends = res.data.slider
          }
        })
      }
    },
    data() {
      return {
        recommends: [],
        notNextTick: true,
        swiperOption: {
          // autoplay: 3000,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart (swiper) {
            console.log(swiper)
          }
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiperA.swiper
      }
    },
    mounted() {
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    },
    destoryed() {
      clearTimeout(this.timer)
      console.log('组件销毁时，清除资源thi.timer 释放内存')
      // destoryed中的代码没有执行
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #mySwiperA
    .swiper-wrapper
      height: auto !important
      .a-block
        display: block
        img
          width: 100%
</style>
