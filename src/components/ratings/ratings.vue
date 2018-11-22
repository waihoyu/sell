
<template>
    <div class="ratings">
      <div class="ratings-content">
          <div class="overview">
            <div class="overview-left">
              <h1 class="score">
                {{seller.score}}
              </h1>
              <div class="title">综合评分</div>
              <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
              <div class="score-wrapper">
                <span class="title">服务态度</span>
                <star :size="36" :score="seller.serviceScore" ></star>
                <span class="score">{{seller.serviceScore}}</span>
              </div>
              <div class="score-wrapper">
                <span class="title">商品评分</span>
                <!--<star :size="36" :score="seller.foodScore"></star>-->
                <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="delivery-wrapper">
                <span class="title">送达时间</span>
                <!--<star :size="36" :score="seller.deliveryTime"></star>-->
                <span class="score">{{seller.deliveryTime}}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" res="stylesheet/stylus" type="text/stylus">
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      background red
      display flex
      padding 18px 0
    .overview-left
      background #00d6b2
      flex 0 0 137px
      width 137px
      border-right 1px solid rgba(7, 17,27,0.9)
      text-align center
      padding 6px 0
      /*background red*/
      .score
        background yellow
        margin-bottom 6px
        font-size 24px
        line-height 28px
        color rgb(255,153,0)
      .title
        background #0b97c4
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)
      .rank
        /*padding-bottom 6px*/
        line-height: 10px
        font-size 10px
        color rgb(147,153,159)
    .overview-right
      background #00b3ee
      flex 1
      padding-left:24px
      /*background #00d6b2*/

</style>
