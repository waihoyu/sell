<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount > 0}">
                        <i class="icon-shopping_cart">
                        </i>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalCount > 0}">￥{{totalPrice}} 元</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
                <transition name="dropdown" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div v-show="ball.show" :key="index" class="ball">
                        <div class="inner inner-hook">                       
                        </div>
                    </div>
                </transition>
             </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            balls: [
                {
                    show: false
                },                
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },                                                                
            ],
            dropballs: []
        } 
    },
    props: {
        selectFoods:{
            type: Array,
            default () {
                return  [
                    {
                        price: 10,
                        count: 0
                    }
                ] 
            }   
        },
        deliveryPrice: {
            type: Number,
            default: 0,
        },        
        minPrice: {
            type: Number,
            default: 20,
        }
    },
    computed:{
        totalPrice () {
            let total = 0
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            })
            return total 
        },
        totalCount () {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count 
        },
        payDesc () {
            if (this.totalPrice === 0) {
                return `￥ ${this.minPrice} 元起送` 
            }
            else if (this.totalPrice < this.minPrice)
            {
                let diff = this.minPrice - this.totalPrice
                return ` 还差￥${diff} 元起送` 
            }
            else
            {
                return `去结算` 
            }
        },
        payClass () {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough' 
            }else{
                return 'enough' 
            }
        }
    },
    methods: {
        drop (ref) {
           for (let i = 0; i < this.balls.length; i++) {
               let ball = this.balls[i]
               if (! ball.show) {
                   ball.show = true
                   ball.ref = ref
                   this.dropballs.push(ball)
                   return  
               }
               
           }
        },
        beforeEnter(ref) { //这里的el指的是小球的Dom,与drop(el)参数区分开
                let count = this.balls.length;
                while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.ref.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22); //计算出与小球初始位置垂直方向上的距离，y轴向上为负
                    ref.style.display = ''; //清空display
                    ref.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    ref.style.transform = `translate3d(0,${y}px,0)`;
                    //处理内层动画
                    let inner = ref.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
                }
            },
                
            enter(ref, done) {
                let rf = ref.offsetHeight; //触发重绘html
                this.$nextTick(() => { //让动画效果异步执行,提高性能
                    ref.style.webkitTransform = 'translate3d(0,0,0)';
                    ref.style.transform = 'translate3d(0,0,0)';
                    //处理内层动画
                    let inner = ref.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    ref.addEventListener('transitionend', done); //Vue为了知道过渡的完成，否则无法进入到afterEnter中
                });
            },
                
            afterEnter(ref) {
                let ball = this.dropballs.shift(); //完成一次动画就删除一个dropBalls的小球，否则触发N次事件，dropBalls则有N个元素
                if (ball) {
                    ball.show = false;
                    ref.style.display = 'none'; //隐藏小球
                }
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
                    &.highlight
                        color: #fff
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
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    color rgba(255, 255, 255, 0.4)
                    font-weight 700
                    background #2b333b
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #fff
        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 1
                // transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                transition: all 0.4s cubic-bezier(1,.01,0,1.54)
                .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background rgb(0, 160, 220)
                    transition  all 0.4s linear


</style>
