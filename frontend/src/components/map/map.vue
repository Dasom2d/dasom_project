
<template>
	<div class="mapApp">
		<vue-daum-map :appKey="appKey" :center.sync="center" :level.sync="level" :mapTypeId="mapTypeId" :libraries="libraries" @load="onLoad" style="width:1500px;height:1400px;"></vue-daum-map>
	</div>
</template>


<script>
import VueDaumMap from "vue-daum-map";
import config from "@/js/config";
import eventBus from "@/js/eventBus";

export default {
	name: "Map",
	components: {
		VueDaumMap
	},
	data: () => ({
		appKey: config.appKey, // 테스트용 appkey
		center: { lat: 37.30687216965825, lng: 127.12444245080496 }, // 지도의 중심 좌표
		level: 5, // 지도의 레벨(확대, 축소 정도),
		mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
		libraries: [], // 추가로 불러올 라이브러리
	}),
	methods: {
		onLoad(map) {
			eventBus.$emit('triggerMapData', map);
		}

	}
};
</script>
