<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <span class="icon-shopping_cart">

                        </span>
                    </div>
                </div>
                <div class="price">0元</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {} 
    },
    props: {
        deliveryPrice: {
            type: Number,
            default: 0,
        },        
        minPrice: {
            type: Number,
            default: 0,
        }
    }
}
</script>

<style lang="stylus">
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        // background blue
        .content
            display flex
            background #141d27
            font-size: 0
            color: rgba(255, 255, 255, 0.4)            
            .content-left 
                flex 1
                .logo-wrapper
                    background-color  red
                    display inline-block
                    position relative
                    top: -10px
                    margin 0 12px
                    padding 6px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    border-radius: 50%
                    background: #141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        text-align: center
                        background: #2b343c
                        &.highlight
                            background: rgb(0, 160, 220)
                        .icon-shopping_cart
                            line-height: 44px
                            font-size: 24px
                            color: #80858a
                        &.highlight
                            color: #fff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        font-weight: 700
                        color: #fff
                        background: rgb(240, 20, 20)
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    // background blue
                    display inline-block
                    vertical-align top
                    margin-top 12px
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    border-right 1px solid rgba(255,255,255,0.1)
                    // border-right: 1px solid rgba(255, 255, 255, 0.1)
                    color rgba(255, 255, 255, 0.4)
                    font-size: 16px
                    font-weight 700
                .desc
                    display inline-block
                    vertical-align top
                    margin 12px 0 0 12px
                    line-height 24px
                    // color rgba(255, 255, 255, 0.4)
                    font-size 10px
            .content-right 
                flex 0 0  105px
                width 105px
</style>
