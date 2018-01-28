<template>
  <scroll @scroll="scroll"
          :data="data"
          class="list-view"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          ref="listView">
    <div class="singer-list-wrapper">
      <div v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul class="singer-info">
          <li class="singer-info-item" v-for="item in group.items">
            <img class="avatar" :src="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="list-shortcut-wrapper">
      <ul class="letter-group">
        <li class="letter-group-item"
            v-for="(item, index) in shortcutList"
            :data-index="index"
            @touchstart="onShortcutTouchStart"
            @touchmove="onShortcutTouchMove"
            :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>

    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>

    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>

</template>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue'
  import {getData} from 'common/js/dom'
  import loading from '../loading/loading.vue'
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        console.log('this.scrollY:', this.scrollY)
        if (this.scrollY > 0) {
          return ''
        }
        // coz data is asyn
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created() {
      // the object of touch just used for transmit value,so create in the created hook instead of using
      // data and props to obsever the change of value
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    methods: {
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        // touches[0] means the first touch(when use a finger)
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex

        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // the function of | 0 is equal to math.floor,means to do decimals to round down numbers
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        // this function is used to controll the highlight of right shortcut when left singer list scrolls
        // pos.y means the height of current dom,which is a negative value
        console.log('pos.:' + pos.y)
        this.scrollY = pos.y
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          // clientHeight can be calculated as CSS height + CSS padding - height of horizontal scrollbar（if present）
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        console.log('index', index)

        // the below code is not necessary
        if (!index && index !== 0) { // !index&&index!==0 can be replaced with index === null
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 1) {
          index = this.listHeight.length - 1
        }

        // this expression can make right shortcut list to be highlight when click shortcut itself
        this.scrollY = -this.listHeight[index]
        // the second parameter refer to time which is used to control the speed of scroll,
        // but why it doesn't take effect when set it to be 5000 or other values?
        this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      data() {
        // dom will be rendered after data be requested,there are time gap between dom render and data render,
        // usually we will handdle in the nextTick function
        // and 20 seconds makes sure dom will be rendered on all devices successfully
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // if scroll to top,newY>0
        // the value of newY is equal to pos.y
        console.log('newY:' + newY)
        if (newY > 0) {
          this.currentIndex = 0
          console.log('top')
          return
        }
        // if scroll among the middle area
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            console.log('middle')
            return
          }
        }
        // if scroll to bottom and the value of -newY exceed the limit of the element length
        this.currentIndex = listHeight.length - 1
        console.log('bottom')
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        console.log('newVal - TITLE_HEIGHT:', newVal - TITLE_HEIGHT)
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './listview.styl'
</style>
