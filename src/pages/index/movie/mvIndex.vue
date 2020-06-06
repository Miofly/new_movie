<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<scroll-view style="background: rgb(30, 40, 40);" @scroll="myscroll">
			<!--#ifdef H5-->
			<!--最新电影-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">最新电影</view>
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view v-for="(item, index) in appyys" :key="index" @click="mvDetail(item.v_id)"
						  class="padding-left-right-sm" ss>
						<view style="position: relative;height: 100%">
							<!--<image v-if="loadImg&&!isLoadError"-->
							<!--v-show="showImg" :src="item.img" mode="scaleToFill" style="height: 330rpx;"-->
							<!--:class="[false?'cu-avatar':'', false?'round': '']" @load="handleImgLoad"-->
							<!--@error="handleImgError"></image>-->

							<imgLoad style="height: 180px" :scroll-top="scrollTop" :image-src="item.img"
									 loading-mode="spin-circle"></imgLoad>

							<text style="position: absolute;bottom:60rpx;right: 10rpx;font-size: 12px;">
								{{item.tname}} {{item.v_lang}} {{item.update_info}}
							</text>
							<view style="color: #ccc;font-size: 14px;" class="padding-top-bottom-lg">{{item.title.length
								> 7
								?
								item.title.slice(0, 7) + '...' : item.title}}
							</view>
						</view>

					</view>
				</view>
			</view>
			<!--#endif-->
			<movie-footer></movie-footer>
		</scroll-view>
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
                gridBorder: false,
                appyys: [],
                appyysOne: [],
                appyysTwo: [],
                appyysThree: [],
                appyysFour: [],
                url: '',
                timer: null,
                scrollTop: 0
            }
        },
        onPageScroll({scrollTop}) {
            console.log(scrollTop)
            // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
            this.scrollTop = scrollTop
        },
        methods: {
            myscroll({scrollTop}) {
                console.log(1)
                console.log(scrollTop)
                // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
                this.scrollTop = scrollTop
            },
            handleImgLoad(e) {
                // console.log('success');
                this.showImg = true
                // this.$nextTick(function(){
            },
            getStorage() {
                var that = this
                uni.getStorage({
                    key: 'mvUrl',
                    success: function (res) {
                        console.log('获取成功', res.data)
                        that.url = res.data
                    },
                    fail: function (err) {
                        console.log(err)
                        setTimeout(() => {
                            that.getStorage()
                        }, 500)
                    }
                })
            },
            mvDetail(url) {
                localStorage.setItem('ssUrl', `getPlayInfo.php?v_id=${url}`)
                this.router.push({name: 'movieDetail'})
            },
            handleImgError(e) {
                // console.log('fail');
                this.isLoadError = true
            },
        },
        async mounted() {
            // #ifdef H5
            localStorage.removeItem('nowNum')
            localStorage.removeItem('sskey')

            this.ui.showLoading()
            const data = await publicGet('getHomeInfo.php?page=1&type=1')
            this.appyys = data.list
            uni.hideLoading()
            // #endif
        },
        computed: {
            ...mapState(['ssUrl']),
        },
    }
</script>

<style>
	.cu-list.grid {
		background: rgb(30, 40, 40) !important;
	}

	.cu-list.grid.no-border {
		padding: 0 !important;
	}

	.loadfail-img {
		height: 30px;
		background: url('@/static/images/common/loadfail.png') no-repeat center;
		background-size: 50%;
	}
</style>
