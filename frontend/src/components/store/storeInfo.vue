<template>
    <div id="storeApp">
    </div>
</template>

<script>
import eventBus from "@/js/eventBus";
export default {
    name: 'storeInfo',
    components: {},
    created: function() {
        eventBus.$on('triggerPlaceData', simpleStoreData => {
            this.mapObject = simpleStoreData.map;
            this.placeInfo = simpleStoreData.placeInfo;
            this.placePosition = simpleStoreData.placePosition;
            this.showSimpleStoreInfo();
            document.getElementById('clickMe').addEventListener('click', this.closeOverlay);
        })
    },
    methods: {
        showSimpleStoreInfo() {
            let showInfo = {
                placeInfo: this.placeInfo,
                map: this.mapObject,
                placePosition: this.placePosition
            }
            var content = '<div class="wrap">' +
                '    <div class="info">' +
                '        <div class="title">' +
                '            ' + this.placeInfo.placeName +
                '            <div class="close" title="닫기" id="clickMe"></div>' +
                '        </div>' +
                '        <div class="body">' +
                '            <div class="img">' +
                '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
                '           </div>' +
                '            <div class="desc">' +
                '                <div class="ellipsis">' + this.placeInfo.addressName + '</div>' +
                '                <div class="jibun ellipsis">' + this.placeInfo.phone + '</div>' +
                '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>'

            var customOverlay = new kakao.maps.CustomOverlay({
                position: this.placePosition,
                content: content,
                xAnchor: 0.3,
                yAnchor: 0.91
            });

            if(!this.isEmptyObject(this.overlay)){
              this.closeOverlay();
            }
            customOverlay.setMap(this.mapObject);
            this.overlay = customOverlay;
        },
        closeOverlay() {
            this.overlay.setMap(null);
        },
        isEmptyObject(param) {
            return Object.keys(param).length === 0 && param.constructor === Object;
        }
    },
    data() {
        return {
            mapObject: {},
            placeInfo: {},
            placePosition: {},
            overlay: {}
        }
    }
}

</script>

<style lang="css">
#storeApp {
    position: fixed;
    z-index: 101;
}

.wrap * {
    padding: 0;
    margin: 0;
}

.wrap .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
}

.wrap .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.info .title {
    padding: 5px 0 0 10px;
    height: 30px;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}

.info .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #888;
    width: 17px;
    height: 17px;
    background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}

.info .close:hover {
    cursor: pointer;
}

.info .body {
    position: relative;
    overflow: hidden;
}

.info .desc {
    position: relative;
    margin: 13px 0 0 90px;
    height: 75px;
}

.desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.desc .jibun {
    font-size: 11px;
    color: #888;
    margin-top: -2px;
}

.info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 73px;
    height: 71px;
    border: 1px solid #ddd;
    color: #888;
    overflow: hidden;
}

.info:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
}

.info .link {
    color: #5085BB;
}
</style>
