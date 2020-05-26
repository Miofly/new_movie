<template>
	<view style="background: rgb(30, 40, 40);">
		<view class="padding-bottom-forty margin-left margin-top" style="background: rgb(30, 40, 40);">
			<view>
				<view style="color: #ccc;font-size: 16px" class="margin-left">友情链接</view>
				<view class="margin-top-sm" v-for="(item, index) in lists" :key="index" style="color: #999999;font-size: 14px">
					<view class="fl margin-left" @tap="tz(item.url)">{{item.name}}</view>
				</view>
			</view>
			<view style="clear: both"></view>
			<view @tap="showImg" style="color: #ccc;font-size: 16px;width: 100%;" class="text-center margin-top">
				留言求片
			</view>
		</view>
		<!--test (e) {if (e.index == 0) {console.log('点击了第一个按钮')}if (e.index == 1) {console.log('点击了第二个按钮')}}-->
		<modal title="标题111" content="这是内容" @click="test" color="#999" :size="32" :maskClosable="false"
				:show="status" @cancel="status = false" shape="['circle', 'square'][1]"
				:button="[{text: '微信', type: ['green', 'default', 'primary', 'red', 'danger', 'warning', 'white', 'gray'][5], plain: true},
				{text: '支付宝', plain: false}]" :custom="true">
			<view class="fa fa-close fa-2x" style="position: absolute; top:20px;right: 10px;color: black" @tap="status = false"></view>
			<image :src="src" mode="scaleToFill" :class="[false?'cu-avatar':'', false?'round': '']"></image>
		</modal>
	</view>
</template>

<script>
    export default {
		data () {
		    return {
		        lists: '',
                status: false,
				src: '',
                timers: null
		    }
		},
		created () {
            this.lists = JSON.parse(localStorage.getItem('friend_link'))
            this.src = localStorage.getItem('qrcode')

            this.timers = setInterval(() => {
                if (this.lists == null || this.src == null) {
                    this.lists = JSON.parse(localStorage.getItem('friend_link'))
                    this.src = localStorage.getItem('qrcode')
                } else {
                    clearInterval(this.timers)
                }
            }, 500)
		},
		methods: {
		    tz (url) {
		        window.location.href = url
		    },
            showImg () {
				this.status = true
            },
		},
	}
</script>

<style>

</style>
