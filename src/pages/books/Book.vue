<template>
    <div>
        <TopSwiper :tops='tops'></TopSwiper>
        <Card :key='book.id' v-for='book in books' :book=book></Card>
        <p class="text-footer" v-if="!more">
            没有更多数据
        </p>
    </div>
</template>
<script>
// 35条数据
// 每次加载10条
// 1页  0-10
// 2   10-20
// 3   20-30
// 4   30-40（5）
// page 当前第几页

// 没有更多数据
// 1. page=0 不能现实这条提醒
// 2 page>0  没有更多
import {get} from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
    components:{
        Card,
        TopSwiper
    },
    data(){
        return {
            books:[],
            page:0,
            more: true,
            tops:[]
        }
    },
    methods:{
        async getList(init){
            if(init){
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist',{page:this.page})
            this.books = books.list
            if(books.list.length<10 && this.page>0){
                this.more = false
            }
            if(init){
                this.books = books.list
                wx.stopPullDownRefresh()
            }else{
                //下拉刷新，不能直接覆盖
                this.books = this.books.concat(books.list)
            }
            
            wx.hideNavigationBarLoading()
        },
        async getTop(){
            const tops = await get('/weapp/top')
            this.tops = tops.list
        }
    },
    onPullDownRefresh(){
        this.getList(true)
        this.getTop()
    },
    onReachBottom(){
        if(!this.more){
            //没有更多了
            return false
        }
        this.page = this.page + 1
        this.getList()
    },
    mounted(){
        this.getList(true)
        this.getTop()
    }
}
</script>
<style>
</style>
