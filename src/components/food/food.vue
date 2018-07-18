<template>
    <div class = "mainFood">
        <transition name = "move">
            <div v-show = "showFlag" class="food">  
                111
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                showFlag: false
            }
        },
        props: {
            food:{
                type: Object
            }
        },
        methods: {
            show() {
                this.showFlag = true
            }
        }
    }
</script>

<style lang="stylus">
    .food 
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 30  
        width 100%
        background blue
        animation bounce-in .5s
        transform all 0.3s linear
</style>
