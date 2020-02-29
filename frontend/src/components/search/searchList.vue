<template lang="html">
    <div class="searchListApp map_wrap position">
        <div id="menu_wrap" class="bg_white" v-if="isShow">
            <ul id="placesList" class="">
                <li class="item" v-for="place in searchPlaceList" @click="openStoreDetailInfo(place)">
                    <span class="markerbg marker_1"></span>
                    <div class="info">
                        <h5>{{place.place_name}}</h5>
                        <span>{{place.address_name}}</span>
                        <span class="jibun gray">{{place.road_address_name}}</span>
                        <span class="tel">{{place.phone}}</span>
                    </div>
                </li>
            </ul>
            <storeDetailInfo :store="selectedStore" :isDetailShow="isDetailShow" v-on:close-detail="closeDetail"></storeDetailInfo>
        </div>
    </div>
</template>

<script>
import eventBus from "@/js/eventBus";
import storeDetailInfo from '@/components/store/storeDetailInfo';

export default {
    components: {
        storeDetailInfo
    },
    data() {
        return {
            isShow: false,
            searchPlaceList: [],
            mapObject: {},
            psObject: new kakao.maps.services.Places(),
            infowindow: new kakao.maps.InfoWindow({ zIndex: 1 }),
            markers: [],
            markerImage: require('../../assets/icon/marker.png'),
            selectedStore: {},
            isDetailShow: false
        }
    },
    created: function() {
        eventBus.$on('triggerMapData', mapData => {
            this.mapObject = mapData;
        })
    },
    methods: {
        openStoreDetailInfo(store) {
            this.isDetailShow = true;
            this.selectedStore = store;
        },
        closeDetail() {
            this.isDetailShow = false;
        },
        getSearchWord(isShow, word) {
            this.isShow = isShow;
            this.psObject.keywordSearch(word, this.placesSearchCB);
        },
        placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                this.displayPlaces(data);
                this.searchPlaceList = data;

                // 페이지 번호를 표출합니다
                // this.displayPagination(pagination);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 존재하지 않습니다.");
                return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
                return;
            }
        },
        displayPlaces(places) {
            var listEl = document.getElementById("placesList"),
                menuEl = document.getElementById("menu_wrap"),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = "";

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            // this.removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            this.removeMarker();

            for (var i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                var placeInfo = {
                    placeName: places[i].place_name,
                    addressName: places[i].address_name,
                    phone: places[i].phone
                };
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = this.addMarker(placePosition, i, placeInfo),
                    itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                let infowindow = new kakao.maps.InfoWindow({
                    content: places[i].place_name
                });

                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    makeOverListener(this.mapObject, marker, infowindow)
                );
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    makeOutListener(infowindow)
                );
                kakao.maps.event.addListener(
                    marker,
                    "click",
                    makeClickListener(this.mapObject, marker.placeInfo, placePosition)
                );
            }

            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            // listEl.appendChild(fragment);
            // menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            this.mapObject.setBounds(bounds);
        },
        getListItem(index, places) {
            var el = document.createElement("li"),
                itemStr =
                '<span class="markerbg marker_' +
                (index + 1) +
                '"></span>' +
                '<div class="info">' +
                "   <h5>" +
                places.place_name +
                "</h5>";

            if (places.road_address_name) {
                itemStr +=
                    "    <span>" +
                    places.road_address_name +
                    "</span>" +
                    '   <span class="jibun gray">' +
                    places.address_name +
                    "</span>";
            } else {
                itemStr += "    <span>" + places.address_name + "</span>";
            }

            itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

            el.innerHTML = itemStr;
            el.className = "item";

            return el;
        },
        addMarker(position, idx, placeInfo) {

            var imageSrc = this.markerImage; // 마커이미지의 주소입니다    
            var imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
            var imageOptions = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOptions),
                markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다    

            var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOptions
            );
            var marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });
            marker.placeInfo = placeInfo;

            marker.setMap(this.mapObject); // 지도 위에 마커를 표출합니다
            this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

            return marker;
        },
        removeMarker() {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = [];
        },
        displayPagination(pagination) {
            var paginationEl = document.getElementById("pagination"),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            // while (paginationEl.hasChildNodes()) {
            // 	paginationEl.removeChild(paginationEl.lastChild);
            // }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement("a");
                el.href = "#";
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = "on";
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        };
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        },
        displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;" >' + title + "</div>";

            this.infowindow.setContent(content);
            this.infowindow.open(map, marker);
        },
        removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }
    }
}

function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}

function makeClickListener(map, placeInfo, placePosition) {
    return function() {
        let simpleStoreData = {
            map: map,
            placeInfo: placeInfo,
            placePosition: placePosition
        }
        eventBus.$emit('triggerPlaceData', simpleStoreData);
    };
}
</script>




<style lang="css">
.position {
    position: fixed;
    z-index: 101;
}

.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
    color: #000;
    text-decoration: none;
}

.map_wrap {
    position: relative;
    width: 100%;
    height: 500px;
}

#menu_wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    margin: 10px 0 30px 10px;
    padding: 5px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1;
    font-size: 12px;
    border-radius: 10px;
}

.bg_white {
    background: #fff;
}

#menu_wrap hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #5F5F5F;
    margin: 3px 0;
}

#menu_wrap .option {
    text-align: center;
}

#menu_wrap .option p {
    margin: 10px 0;
}

#menu_wrap .option button {
    margin-left: 5px;
}

#placesList li {
    list-style: none;
}

#placesList .item {
    position: relative;
    border-bottom: 1px solid #888;
    overflow: hidden;
    cursor: pointer;
    min-height: 65px;
    left: -20px;
}

#placesList .item span {
    display: block;
    margin-top: 4px;
}

#placesList .item h5,
#placesList .item .info {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

#placesList .item .info {
    padding: 10px 0 10px 55px;
}

#placesList .info .gray {
    color: #8a8a8a;
}

#placesList .info .jibun {
    padding-left: 26px;
    background: url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
}

#placesList .info .tel {
    color: #009900;
}

#placesList .item .markerbg {
    float: left;
    position: absolute;
    width: 36px;
    height: 37px;
    margin: 10px 0 0 10px;
    background: url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
}

#placesList .item .marker_1 {
    background-position: 0 -10px;
}

#placesList .item .marker_2 {
    background-position: 0 -56px;
}

#placesList .item .marker_3 {
    background-position: 0 -102px
}

#placesList .item .marker_4 {
    background-position: 0 -148px;
}

#placesList .item .marker_5 {
    background-position: 0 -194px;
}

#placesList .item .marker_6 {
    background-position: 0 -240px;
}

#placesList .item .marker_7 {
    background-position: 0 -286px;
}

#placesList .item .marker_8 {
    background-position: 0 -332px;
}

#placesList .item .marker_9 {
    background-position: 0 -378px;
}

#placesList .item .marker_10 {
    background-position: 0 -423px;
}

#placesList .item .marker_11 {
    background-position: 0 -470px;
}

#placesList .item .marker_12 {
    background-position: 0 -516px;
}

#placesList .item .marker_13 {
    background-position: 0 -562px;
}

#placesList .item .marker_14 {
    background-position: 0 -608px;
}

#placesList .item .marker_15 {
    background-position: 0 -654px;
}

#pagination {
    margin: 10px auto;
    text-align: center;
}

#pagination a {
    display: inline-block;
    margin-right: 10px;
}

#pagination .on {
    font-weight: bold;
    cursor: default;
    color: #777;
}
</style>