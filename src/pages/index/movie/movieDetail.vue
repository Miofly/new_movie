<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<movie-header ref="head"></movie-header>
		<view class="padding" style="background: rgb(30, 40, 40);">
			<view class="fl" style="width: 30%">
				<image :src="img" mode="scaleToFill" style="height: 350rpx;width: 240rpx" alt="1"
					   :class="[false?'cu-avatar':'', false?'round': '']"></image>
			</view>
			<view class="fl margin-left" style="width: 65%">
				<view style="color: #ccc" class="text-xl">{{title}}</view>
				<view class="margin-top-xl" style="color: #ccc">
					<view class="fl margin-right-ten">{{type}}</view>
					<view class="fl margin-right-ten">{{address == null ? '未知' : address}}</view>
					<view class="fl margin-right-ten">{{time == null ? '未知' : time}}</view>
				</view>
				<view style="clear: both"></view>
				<view style="color: rgb(156, 156, 156)" class="text-df margin-top-xl">{{status}}</view>
				<!--<view style="color: rgb(156, 156, 156)" class="text-df margin-top-sm">{{people.length> 22 ?-->
					<!--people.slice(0,22) + '...' : people}}-->
				<!--</view>-->
				<view style="color: rgb(156, 156, 156)" class="text-df margin-top-xl">{{director.length> 22 ?
					director.slice(0,22) + '...' : director}}
				</view>
				<view>
					<button @tap="bfUrl" class="cu-btn margin-top-xxl" :class="[['bg-orange', 'line-blue', 'line-blue lines-blue'][0],
					        ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
						<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
						立即播放
					</button>
				</view>
			</view>
			<view style="clear: both"></view>
			<view>
				<view style="color: #ccc" class="text-lg margin-top-ten">剧情介绍</view>
				<view style="color: rgb(156, 156, 156)" class="margin-top" v-html="descRes.trim()"></view>
			</view>
		</view>

		<movie-footer></movie-footer>
		<view class="cu-bar tabbar foot" style="background: rgb(39, 41, 56)">

			<view @click="NavChange" class="action" data-cur="dy">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/movie' + [PageCur=='dy'?'1':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='dy'?'text-mv-yellow':'text-gray'">电影</view>
			</view>
			<view @click="NavChange" class="action" data-cur="lxj">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/TV' + [PageCur=='lxj'?'1':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='lxj'?'text-mv-yellow':'text-gray'">连续剧</view>
			</view>
			<view @click="NavChange" class="action text-gray add-action" data-cur="mvIndex">
				<button class="cu-btn fa-home fa bg-black shadow"
						:class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'"></button>
				<view :class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'">首页</view>
			</view>
			<view @click="NavChange" class="action" data-cur="zy">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/variety' + [PageCur=='zy'?'1':''] + '.png'"></image>
					<!--<view class="cu-tag badge">99</view>-->
				</view>
				<view :class="PageCur=='zy'?'text-mv-yellow':'text-gray'">综艺</view>
			</view>
			<view @click="NavChange" class="action" data-cur="dm">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/cartoon' + [PageCur=='dm'?'1':''] + '.png'"></image>
					<!--<view class="cu-tag badge">99</view>-->
				</view>
				<view :class="PageCur=='dm'?'text-mv-yellow':'text-gray'">动漫</view>
			</view>
		</view>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                address: '',
                descRes: '',
                director: '',
                img: '',
                playHref: '',
                status: '',
                time: '',
                title: '',
                type: '',
                PageCur: ''
            }
        },
        async onLoad(e) {
            // #ifdef H5
            this.ui.showLoading()
            const data = await publicGet(localStorage.getItem('ssUrl'))
            uni.hideLoading()
            this.address = data.address
            this.descRes = data.descRes
            this.director = data.director
            this.img = data.img
            this.status = data.status
            this.time = data.time
            this.title = data.title
            this.type = data.type
            // #endif
        },
        methods: {
            NavChange(e) {
                this.$store.state.indexPage = e.currentTarget.dataset.cur
                this.router.push({name: 'mvHome'})
                this.PageCur = e.currentTarget.dataset.cur
            },
            bfUrl() {
                this.router.push({name: 'moviePlay'})
            },
        },
        computed: {
            ...mapState(['ssUrl', 'indexPage', 'ssPlay']),
        },
    }
</script>

<style>
	.loadfail-img{
		height: 100%;
		background: url('/static/images/common/loadfail.png') no-repeat center;
		background-size: 50%;
	}
</style>
