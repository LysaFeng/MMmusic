<template>
  <scroll :data="data">
    <div class="singer-list-wrapper">
      <div v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul class="singer-info">
          <li class="singer-info-item" v-for="item in group.items">
            <img class="avatar" src="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="list-shortcut-wrapper">
      <ul class="letter-group">
        <li class="letter-group-item">{{item}}</li>
      </ul>
    </div>
  </scroll>

</template>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      Scroll
    }
  }
</script>
