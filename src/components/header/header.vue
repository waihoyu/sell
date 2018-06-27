<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class=" bulletin-wrapper "></div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" res="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.header
    color red
    .content-wrapper
        color red
        padding 24px 12px 18px 24px
        font-size 0
        .avatar
            display inline-block
            vertical-align top
            img
                border-radius 2px
        .content
            display inline-block
            font-size 14px
            margin-left 16px
            .title
                margin 2px 0 8px 0
                .brand
                    vertical-align top
                    width 30px
                    height 18px
                    display inline-block
                    bg-image('brand')
                    background-size 30px 18px
                    background-repeat no-repeat
                .name
                    margin-left 6px
                    font-size 16px
                    line-height 18px
            .description
                margin-bottom 10px
                line-height 12px
                font-size 12px
            .support
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 4px
                    background-size 12px 12px
                    background-repeat no-repeat
</style>
