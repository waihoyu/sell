
<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content" >
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
        <star :size="36" :score="seller.foodScore"></star>
        <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
        <span class="title">送达时间</span>
        <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
        </div>
        </div>
            <split></split>
            <ratingselect  @select-type="onSelectType" @only-content="onOnlyContent" :desc="desc" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" alt="" width="28" height="28">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :scroe="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟到达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import BScroll from 'better-scroll'
    import star from '../star/star'
    import ratingselect from '@/components/ratingselect/ratingselect'
    import split from '@/components/split/split'
    import {formatDate} from 'common/js/date';
    const ALL = 2
    const ERR_OK = 0
    export default {
        data(){
            return {
                ratings: [],
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        props:{
            seller:{
                type:Object
            }
        },
        created(){
            this.$http.get('/api/ratings').then((response)=>{
                response = response.body
                if (response.errno === ERR_OK){
                    this.ratings = response.data
                }
                this.$nextTick( () => {
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.ratings, {click: true})
                    }
                    else{
                        this.scroll.refresh()
                    }
                })
            })
        },
        methods: {
            onSelectType (type) {
                this.selectType = type
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
            onOnlyContent (onlyContent) {
                this.onlyContent = onlyContent
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        events: {
            'ratingtype.select'(type) {
                this.selectType = type
            },
            'content.toggle'(onlyContent){
                this.onlyContent = onlyContent
            }
        },
        filters:{
          formatDate(time){
              let date = new Date(time)
              return formatDate(date, 'yyyy-MM-dd hh:mm')
          }
        },
        components: {
            star,
            split,
            ratingselect
        }
    }
</script>

<style lang="stylus" res="stylesheet/stylus" type="text/stylus">
    @import "../../common/stylus/mixin.styl"
    .ratings
        position absolute
        top 174px
        bottom 0
        left 0
        width 100%
        overflow hidden
        .overview
            /*background red*/
            display flex
            padding 18px 0
            .overview-left
                /*background #00d6b2*/
                flex 0 0 137px
                width 137px
                border-right 1px solid rgba(7, 17,27,0.9)
                text-align center
                padding 6px 0
                @media only screen and  (max-width 320px)
                    flex 0 0 120px
                    width 120px
                .score
                    /*background yellow*/
                    margin-bottom 6px
                    font-size 24px
                    line-height 28px
                    color rgb(255,153,0)
                .title
                    /*background #0b97c4*/
                    margin-bottom 8px
                    line-height 12px
                    font-size 12px
                    color rgb(7, 17, 27)
                .rank
                    line-height: 10px
                    font-size 10px
                    color rgb(147,153,159)
            .overview-right
                /*background #00b3ee*/
                flex 1
                padding 6px 0 6px 24px
                @media only screen and (max-width 320px)
                    padding-left 6px
                .score-wrapper
                    margin-bottom 8px
                    font-size 0
                    .title
                        vertical-align top
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 18px
                    .star
                        display: inline-block
                        margin 0 12px
                        vertical-align top
                    .score
                        display inline-block
                        vertical-align top
                        font-size 12px
                        line-height 18px
                        color rgb(255,153,0)
                .delivery-wrapper
                    font-size 0
                    .title
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 18px
                    .delivery
                        margin-left: 12px
                        font-size: 12px
                        color: rgb(147, 153, 159)

        .rating-wrapper

            padding 0 18px
            .rating-item
                /*background read*/
                display flex
                padding 18px 0
                border-1px(rgba(7,17,27,0.1))
                .avatar
                    flex 0 0 28px
                    width 28px
                    margin-right 12px
                    img
                        border-radius 50%
                .content
                    position relative
                    flex 1
                    .name
                        margin-bottom 4px
                        line-height 12px
                        font-size 10px
                        color rgb(7,17,27)
                    .star-wrapper
                        margin-bottom 6px
                        font-size 0
                        .star
                            display inline-block
                            vertical-align top
                            margin-right 6px
                        .delivery
                            /*background red*/
                            display inline-block
                            font-size 10px
                            line-height 12px
                            color rgb(147,153,159)
                            vertical-align top
                    .text
                        margin-bottom 8px
                        line-height 18px
                        font-size 12px
                        color rgb(7,17,27)
                    .recommend
                        line-height 16px
                        font-size 0
                        .icon-thumb_up, .item
                            display inline-block
                            font-size 9px
                            margin 0 8px 4px 0
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .item
                            padding 0 6px
                            border 1px solid rgba(7,17,27,0.1)
                            border-radius 1px
                            background #fff
                            color rgb(147,153,159)
                    .time
                        position absolute
                        top 0
                        right 0
                        line-height 12px
                        font-size 10px
                        color rgb(147,153,159)
</style>
