<template>
  <div class="banner" @mouseenter="stop()" @mouseleave="play()">
    <!--轮播图组件start-->
    <transition-group tag="ul" class="banner-wrapper" name="image">
      <li v-for='(image,index) in img' v-show="index===mark" :key="index">
        <a>
          <!--<router-link :to="{name: 'Index'}">-->
            <img :src="image" alt="首页图标">
          <!--</router-link>-->
        </a>
      </li>
    </transition-group>
    <ol class="banner-warning">
      <li v-for="(item,index) in img.length-1" :class="{'active':index===mark}" @click="change(index)"  :key="index"></li>
    </ol>
    <img src="./img/arrow.png" alt="向后箭头" class="next" @click="next()">
    <img src="./img/arrow.png" alt="向前按钮" class="next prev" @click="prev()">
    <!--轮播图组件start-->
  </div>
</template>

<script>
  import API from '@/api'

  export default {
    data () {
      return {
        mark: 0,
        img: [
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3223680655,1900832278&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3223680655,1900832278&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3223680655,1900832278&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=748911978,339510730&fm=27&gp=0.jpg'
        ],
        timer: ''
      }
    },
    created () {
      this.play()
      this.getCarousel()
    },
    methods: {
      autoPlay () {
        this.mark++
        if (this.mark === this.img.length - 1) {
          this.mark = 0
          return false
        }
      },
      play () {
        this.timer = setInterval(this.autoPlay, 3000)
      },
      change (index) {
        this.mark = index
      },
      getCarousel () {
        API.getCarousel()
          .then(res => {
            console.log('轮播图', res)
          })
      },
      next () {
        clearInterval(this.timer)
        this.autoPlay()
      },
      prev () {
        clearInterval(this.timer)
        if (this.mark === 0) {
          this.mark = this.img.length - 1
        }
        this.mark--
      },
      stop () {
        clearInterval(this.timer)
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="less">
  .banner {
    width:100%;
    height:600px;
    overflow:hidden;
    position:relative;
    .banner-wrapper{
      width:400%;
      height:600px;
      list-style: none;
      margin:0;
      padding:0;
      position:absolute;
      left:0;
      top:0;
      li{
        height:100%;
        width:25%;
        a{
          display: inline-block;
          width:100%;
          height:600px;
          img{
            width:100%;
            height:600px;
          }
        }
      }
    }
    img.next{
      display: block;
      position:absolute;
      top:50%;
      transform: translateY(-50%);
      right:4rem;
      z-index:4;
    }
    img.prev{
      right:auto;
      left:4rem;
      transform: translateY(-50%) rotate(180deg);
    }
    .banner-warning{
      list-style: none;
      position: absolute;
      left:50%;
      transform: translateX(-50%);
      text-align: center;
      bottom:4rem;
      overflow:hidden;
      li{
        width:.5rem;
        height:.5rem;
        border-radius:50%;
        background:#000000;
        cursor:pointer;
        float:left;
        margin-right:5px;
        &.active{
          background: red;
        }
      }
    }
  }
 .image-enter-active{
   transform: translateX(0);
   transition: all 1s ease;
 }
  .image-leave-active{
    transform: translateX(-100%);
    transition: all 1s ease;
  }
  .image-enter {
    transform: translateX(100%)
  }
  .image-leave {
    transform: translateX(0);
  }
</style>
