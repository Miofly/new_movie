<template>
	<view class="full-width flex justify-between align-center" style="height: 100rpx;background: black">
		<view class="margin-left">
			<view class="text-lg text-white">{{name}}</view>
		</view>
		<view class="margin-right" style="position: relative">
			<input v-model="keyword"
				   @input="realIpt"
				   :adjust-position="false" type="text"
				   :placeholder=placeholder
				   confirm-type="search"
				   @click.stop="test"
				   @search="doSearchTwo()"
				   style="background: white;color: black;height: 60rpx;width: 430rpx;
				   border-radius: 20px;text-indent: 2px;
					   padding-left: 20rpx;font-size: 12px">
			<text @tap="doSearchTwo()" class="fa fa-search fr"
				  style="position: absolute;right: 30rpx;top: 14rpx;color: black;z-index: 888"></text>
		</view>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    import {mapState} from 'vuex'
    import {tu} from '@/common/js/toolUtils'

    export default {
        data() {
            return {
                // #ifdef H5
                name: '',
                // #endif
				// #ifdef MP-WEIXIN
				name: '影视助手',
				// #endif
                placeholder: '请输入影片名称',
                // #ifdef H5
                keyword: localStorage.getItem('sskey'),
                // #endif
                // #ifdef MP-WEIXIN
                keyword: uni.getStorageSync('sskey'),
                // #endif
                timer: null
            }
        },
        created() {
            // #ifdef H5
            this.name = localStorage.getItem('cinemaName')

            this.timer = setInterval(() => {
                if (this.name == null) {
                    this.name = localStorage.getItem('cinemaName')
                } else {
                    clearInterval(this.timer)
                }
            }, 500)
            // #endif
        },
        methods: {
            test () {
                console.log(1)
            },
            realIpt(e) {
                // #ifdef MP-WEIXIN
                this.ui.setStorage('sskey', e.detail.value)
                // #endif
                // #ifdef H5
                localStorage.setItem('sskey', e.detail.value)
                // #endif
            },
            // 执行搜索
            doSearch: tu.throttle(async function () {
                console.log(uni.getStorageSync('sskey'))
                // #ifdef H5
                if (localStorage.getItem('sskey') != '') {
                    // this.$emit('parentFun', this.keyword.trim())
                    this.ui.showLoading()
                    const data = await publicGet(`getDataInfo.php?keyword=${localStorage.getItem('sskey')}&page=${this.$store.state.sspage}`)
                    localStorage.setItem('ssData', JSON.stringify(data))
                    uni.hideLoading()
                    // this.$Router.push({name: 'mvSearch', params: {key: '1'}})
                    this.router.push('/pages/index/movie/mvSearch')
                }
                // #endif
            }, 2000),
            doSearchTwo: tu.throttle(async function () {
                // #ifdef H5
                this.$store.state.sspage = 1
                if (localStorage.getItem('sskey') != '') {
                    // this.$emit('parentFun', this.keyword.trim())
                    this.ui.showLoading()
                    const data = await publicGet(`getDataInfo.php?keyword=${localStorage.getItem('sskey')}&page=${this.$store.state.sspage}`)
                    localStorage.setItem('ssData', JSON.stringify(data))
                    uni.hideLoading()
                    // this.$Router.push({name: 'mvSearch', params: {key: '1'}})
                    this.router.push('/pages/index/movie/mvSearch')
                }
                // #endif
            }, 2000),
        },
        computed: {
            ...mapState(['ssData', 'ssKey', 'sspage', 'cinemaName']),
        },
    }
</script>

<style>

</style>
