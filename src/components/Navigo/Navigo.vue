<template>
  <div class="deals">
    <navigation></navigation>
    <div class="main">
      <div class="header"></div>
      <div class="notice">
        <div class="notice-content">
          <h4>独家折扣</h4>
          <p>下载爱shopping APP，享受妒忌折扣信息，提前退税，扫码积分换取好礼，更有优惠，路线信息请下载爱shopping APP。</p>
        </div>
      </div>
      <div class="cart" v-for="route in routes">
        <img :src="route.image" alt="" class="img_wrapper">
        <div class="cart-content">
          <h1>{{route.name}}</h1>
          <p class="header-d">{{route.description}}</p>
          <p class="more_w" @click="toDetail(route.id)">详细信息<br/><span class="more">更多</span>
          </p>
        </div>
      </div>
      <div v-if="morebtn" class="row">
        <div class="col-sm-12">
          <div class="load-more" @click="loadMore">
            加载更多
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
  import API from '@/api'
  import Navigation from '../layout/Navigation'
  import Foot from '../layout/Foot'

  export default {
    data () {
      return {
        routes: [],
        page: 1,
        morebtn: true
      }
    },
    components: {
      Navigation,
      Foot
    },
    created () {
      this.getNavigos(this.page)
    },
    methods: {
      toDetail (id) {
        this.$router.push({name: 'NavigoDetail', query: {id: id}})
      },
      getNavigos (page) {
        API.getNavigos(page)
          .then(res => {
            console.log(res)
            if (res.data.current_page === res.data.last_page) {
              this.morebtn = false
            }
            this.routes.push(...res.data.data)
            this.refreshPage()
          })
      },
      // 加载更多
      loadMore () {
        this.getNavigos(this.page)
      },
      // 更新分页
      refreshPage () {
        this.page += 1
      }
    }
  }
</script>
<style scope lang="less">
  .deals{
    height:100%;
    box-size:border-box;
    width:100%;
    .main{
      width:100%;
      margin:0 auto;
      .header{
        height:108px;
        background: #fff;
        position: relative;
      }
      .notice{
        width:100%;
        background:#F8786B;
        .notice-content{
          width:80%;
          margin:0 auto;
          color:#fff;
          padding-bottom: 1rem;
          h4{
            font-size:1.05rem;
            font-weight: 500;
            padding-top:1.3rem;
            margin-bottom:1.1rem;
          }
          p{
            font-size:.9rem;
          }
        }
      }
      .cart{
        width:100%;
        position:relative;
        color:#fff;
        height: 620px;
        .img_wrapper{
          width:100%;
          height:620px;
          display: block;
        }
        .cart-content{
          width: 80%;
          position: absolute;
          z-index:3;
          top:0;
          text-align: center;
          left:50%;
          transform: translateX(-50%);
          h1{
            margin-top:8rem;
          }
          p.header-d{

            text-align: center;
            font-size: 1.5rem;
          }
          .more_w{
            line-height: 2rem;
            font-size:1.5rem;
            text-align: center;
            text-decoration: none;
            color:#fff;
            margin-top:10rem;
            cursor:pointer;
            span.more{
              display: block;
              font-size:0;
              margin-top:1rem;
              position: relative;
              &:after{
                content:'';
                width:1rem;
                height:2px;
                background: #fff;
                position: absolute;
                top:0;
                left:50%;
                margin-left:-0.5rem;
                transform:rotate(-45deg);
              }
              &:before{
                content:'';
                width:1rem;
                height:2px;
                background: #fff;
                position: absolute;
                top:0;
                left:50%;
                margin-left:-1.1rem;
                transform:rotate(45deg);
              }
            }

          }
        }
      }
    }
  }
  .load-more {
    text-align: center;
    border: 1px solid #999;
    border-radius: 5px;
    margin: 15px 0;
    padding: 15px;
    color: #999;
    cursor: pointer;
  }
</style>
