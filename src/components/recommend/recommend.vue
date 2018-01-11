<template>
  <div class="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div class="">
        <div class="slider-wrapper">
          <Slider></Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </Scroll>
  </div>
</template>
<script>
  import Slider from '../../base/slider/slider'
  import {getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'

  export default {
    data() {
      return {
        discList: []
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    created() {
      setTimeout(() => {
        this._getDiscList()
      }, 1000)
    },
    methods: {
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './recommend.styl'
</style>
