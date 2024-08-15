<script setup lang="ts">
	import { dayrecommendationsApi } from '../../api/index'
	import type { DayrecommendationsItem } from '../../api/type'
	import { ref } from 'vue'
	
	const commendList = ref<DayrecommendationsItem[]>([])
	const titleLength = ref<string>('')
	dayrecommendationsApi().then( res => {
		console.log(res)
		 if (res && res.data && res.data.data) { // 确保每个层级都存在
		    commendList.value = res.data.data.dailySongs; 
				titleLength.value = `播放全部（${commendList.value.length}）`
		  }
	})
	
	
</script>

<template>
	<scroll-view class="scroll-box">
		<uni-section  :title="titleLength" type="line">
					<uni-list>
						<uni-list-item
					    v-for="(item, index) in commendList"
					    :key="item.id"
					    :title="item.name"
					    :note="item.ar.map(v => v.name).join('/')"
					     link
					    clickable 
					  >
					    <template v-slot:header>
					      <view class="no">{{index + 1}}</view>
					    </template>
					  </uni-list-item>
					</uni-list>
		</uni-section>
		
		
		

		
	</scroll-view>
</template>



<style lang="scss" scoped>

</style>
