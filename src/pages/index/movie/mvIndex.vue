<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<scroll-view style="background: rgb(30, 40, 40);">
			<!--#ifdef H5-->
			<!--最新电影-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">最新电影</view>
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view v-for="(item, index) in appyys" :key="index" @click="mvDetail(item.v_id)"
						  class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 10rpx;font-size: 12px;">
								{{item.tname}} {{item.v_lang}} {{item.update_info}}
							</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.title.length > 7 ?
							item.title.slice(0, 7) + '...' : item.title}}
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

    const cheerio = require('cheerio')

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
                timer: null
            }
        },
        methods: {
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
                localStorage.setItem('ssUrl', `http://9urhn.cn/Upload/api/getPlayInfo.php?v_id=${url}`)
				this.router.push({name: 'movieDetail'})
            },
        },
        async mounted() {
            // #ifdef H5
            localStorage.removeItem('nowNum')
            localStorage.removeItem('sskey')

            this.ui.showLoading()
            const data = await publicGet('http://9urhn.cn/Upload/api/getHomeInfo.php?page=1&type=1')
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
</style>
