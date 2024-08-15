<script setup lang="ts">
  import { seacrchHotApi, seacrchSearchApi } from '../../api/index'
	import { ref, watch } from 'vue'
	import  type { HotItem } from '../../api/type'
	
	const hosts = ref<HotItem[]>([])
	const showCancel = ref<boolean>(false)
	
	const song = ref<string>('')
	//搜索热门推荐
	const getLists = async() => {
		const res = await seacrchHotApi()
		hosts.value = res.data.result.hots
	}
	getLists()
	
	// 思路  --- 增加一个开关， 重新写接口数据   搜索到返回 新的结果
	const getSearchList = async(keyword:string) => {
		const res = await seacrchSearchApi(keyword)
		// hosts.value = res.
	}
	
	const cancel = () => {
		showCancel.value = false
	}
	
	
	//监视
	watch(song, () => {
		if(song.value === ""){
			getLists()
		}else{
			getSearchList(song.value)
		}
	})
	
	
</script>

<template>
	<view class="search-box">
		<!-- 搜索 -->
		<view class="uni-form-item uni-column">
			<view class="uni-inputs">
				<input class="uni-input" v-model.trim="song" focus placeholder="请输入要搜索的歌曲" @focus="showCancel = true"/>
				<view class="del" @click="song = ''" v-show="song && showCancel">
					x
				</view>
			</view>
			<view class="cancellation" v-if="showCancel" @click="cancel">
				取消
			</view>
		</view>
		
		<!-- 热门搜索 -->
		<scroll-view class="scroll-box">
			<uni-section  title="热门搜索" type="line">
						<uni-list>
							<uni-list-item
						    v-for="(item, index) in hosts"
						    :key="item.first"
						    :title="item.first"
						  >
						    <template v-slot:header>
						      <view class="no">{{index + 1}}</view>
						    </template>
						  </uni-list-item>
						</uni-list>
			</uni-section>
			
			
			
		
			
		</scroll-view>
		
	</view>
</template>



<style lang="scss" scoped>
.search-box{
	width: 100%;
	height: 100%;
	padding: 20rpx;
}	
.uni-column{
	width: 100%;
	height: 80rpx;
	display: flex;
	border-radius: 10rpx;
	overflow: hidden;
}
.uni-inputs{
	flex: 1;
	position: relative;
}
.cancellation{
	width: 80rpx;
	text-align: center;
	align-self: center;
}
.del{
	position: absolute;
	right: 20rpx;
	top:50%;
	transform: translate(-50%, -50%);
	width: 30rpx;
	height: 30rpx;
	background-color:#c0c4cc;
	border-radius: 50%;
	text-align: center;
	line-height: 25rpx;
}
	.uni-input{
		flex:1;
		height: 80rpx;
		text-align: center;
		background-color: #f8f8f8;
	}
:deep .uni-list-item__container[data-v-c7524739]{
	padding: 8px 15px;
}
</style>
