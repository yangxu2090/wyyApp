<script>
	export default {
		 globalData: {
		      innerAudioContex: uni.createInnerAudioContext()   //全局安装播放器
		  },
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	// *{
	// 	box-sizing: border-box;
	// }
	html, body,#app{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

</style>
