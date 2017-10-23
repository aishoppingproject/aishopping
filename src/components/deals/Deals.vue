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
      <div class="cart" >
        <div class="row cart-content">
          <div class="col-sm-4 " v-for="deal in deals" @click="toDetail(deal.id)">
            <div class="deal">
              <img :src="deal.image" class="img_wrapper">
              <div class="deal-content">
                <h3>我的福利</h3>
                <p>121313weqeeq</p>
              </div>
            </div>
          </div>
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
        deals: [],
        page: 1,
        morebtn: true
      }
    },
    components: {
      Navigation,
      Foot
    },
    created () {
      this.getDeals(this.page)
    },
    methods: {
      toDetail (id) {
        this.$router.push({name: 'DealsDetail', query: {id: id}})
      },
      getDeals (page) {
        API.getDeals(page)
          .then(res => {
            if (res.data.current_page === res.data.last_page) {
              this.morebtn = false
            }
            this.deals.push(...res.data.data)
            this.refreshPage()
          })
      },
      // 加载更多
      loadMore () {
        this.getDeals(this.page)
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
        color:#fff;
        position: relative;
        .cart-content{
          width:80%;
          margin:15px auto;
        }
        .deal{
          padding:0;
          width:100%;
          height:100%;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          .img_wrapper{
            width:100%;
            height:auto;
            display: block;
            transition: all .3s;
          }
          .deal-content{
            width:100%;
            height:100%;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            text-align: center;
            background: rgba(235,129,124,.8);
            display: none;
            h3{
              margin-top:60px;
            }
            p{
              margin-top:45px;
              width:80%;
              margin:0 auto;
            }
          }
          &:hover{
            .deal-content{
              display: block;
            }
            .img_wrapper{
              width:120%;
              height:120%;
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
