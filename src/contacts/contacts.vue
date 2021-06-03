<template>
    <view class="contacts-wrapper">
        <u-navbar title="我的部门"></u-navbar>
        <u-empty mode="list" margin-top="200" v-if="!indexList || indexList.length == 0"></u-empty>
        <u-index-list class="contacts-list" :offset-top="88" :scrollTop="scrollTop" :index-list="letterList">
            <view v-for="(group, index) in indexList" :key="index">
                <u-index-anchor :index="group.letter" />
                <!-- <view class="list-cell u-border-bottom" v-for="(item, i) in group.data" :key="i">
                    {{item.name}}
                </view> -->
                <view class="contacts-item u-border-bottom" v-for="(item) in group.data" :key="item.id" @tap="goDetail(item)">
                    <view class="avatar-wrapper">
                        <u-avatar mode="circle" size="80"></u-avatar>
                        <view class="name">{{item.name}}</view>
                        <view class="no">{{item.no}}</view>
                    </view>
                    <view class="item-content">
                        <view class="line">
                            {{item.mobile}}
                        </view>
                        <view class="line">
                            {{item.email}}
                        </view>
                        <view class="line">
                            {{item.office.name}}
                        </view>
                        <view class="line">
                            上级:<text class="u-m-l-10">{{item.leaderName}}</text>
                        </view>
                    </view>
                    <view class="handle-wrapper">
                        <u-icon v-if="item.mobile" class="u-m-r-20 u-warning-color" name="phone" size="36" @tap="call(item.mobile)"></u-icon>
                        <!-- <u-icon v-if="item.email" name="email u-warning-color" size="36"></u-icon> -->
                    </view>
                </view>
            </view>
        </u-index-list>
    </view>
</template>

<script>
// import Mock from '@/libs/mock';
import pinyin from '@/libs/pinyin/index';
import {
    mapState,
    mapMutations
} from 'vuex';
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: [],
                letterList: [],
                hanReg: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
                yingReg: /^[a-zA-Z]+$/,
                currPage:1,
                name:'',
			}
		},
        computed: {
            ...mapState(['userInfo']),
            userId() {
                return this.userInfo.userId;
            },
        },
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
        },
        onLoad(){
            this.qrySysUserExtendListByCon();
        },
        methods: {
            ...mapMutations(['call']),
            qrySysUserExtendListByCon(){
                let {
                    currPage,
                    userId,
                    name
                } = this;
                console.log(userId);
                uni.showLoading();
                this.API_qrySysUserExtendListByCon({
                    currPage,
                    pageSize: 1000,
                    name,
                    id: userId,
                }).then(d=>{
                    console.log(d);
                    if(d && d.page.list.length>0){
                        let member = [];
                        for (const it of d.page.list) {
                            let {
                                name,
                                mobile,
                                photo,
                                no,
                                email,
                                office,
                                leaderName,
                                id
                            } = it,
                            firstName = name.slice(0, 1),
                            py = this.hanReg.test(firstName)
                                ? pinyin(firstName, {
                                    style: pinyin.STYLE_FIRST_LETTER
                                })
                                : '#',
                            firstLetter = Array.isArray(py)?py[0][0]:'#';
                            member.push({
                                name,
                                mobile,
                                photo,
                                no,
                                firstLetter,
                                office,
                                leaderName,
                                email,
                                id
                            });
                        };
                        this.formatData(member);
                    }else{
                        this.indexList = [];
                        this.letterList = [];
                        uni.hideLoading();
                    }
                }).catch(e=>{
                    uni.hideLoading();
                });
            },
            search(e){
                this.currPage = 1;
                this.qrySysUserExtendListByCon();
            },
            // mockData() {
            //     let name = Mock.mock('@cname'),
            //         firstName = name.slice(0, 1),
            //         py = this.hanReg.test(firstName)
            //             ? pinyin(firstName, {
            //                 style: pinyin.STYLE_FIRST_LETTER
            //             })
            //             : '#',
            //         firstLetter = Array.isArray(py)?py[0][0]:'#';
            //     return {
            //         mobile: Mock.mock(/^1[23456789]\d{9}$/),
            //         uid: Mock.mock('@id'),
            //         name,
            //         email: Mock.mock('@email'),
            //         firstLetter
            //     };
            // },
            formatData(data) {
                if(this.currPage == 1){
                    this.indexList = [];
                }
                let member = [],
                    mockList = [];
                // for (let i = 0; i < 80; i++) {
                //     mockList.push(this.mockData());
                // }
                // console.log(mockList);
                let tmp = data.map(it=>{
                    return it;
                });
                // let tmp = mockList.map(it=>{
                //     return it;
                // });
                tmp.sort((a,b)=>{
                    return a.firstLetter.localeCompare(b.firstLetter);
                });
                // console.log(tmp);
                for (const it of tmp) {
                    let index = this.arrIndexOf(this.indexList,'letter',it.firstLetter);
                    if( index == -1){
                        this.indexList.push({
                            letter:it.firstLetter,
                            data:[]
                        });
                    }
                    this.indexList[this.arrIndexOf(this.indexList,'letter',it.firstLetter)].data.push(it);
                }
                this.letterList = this.indexList.map(it=>{
                    return it.letter;
                });
                uni.hideLoading();
                this.currPage++;
            },
            arrIndexOf(arr,key,val){
                let index = -1;
                arr.map((it,i)=>{
                    if(it[key]==val){
                        index = i;
                    }
                });
                return index;
            },
            goDetail({id}){
                uni.navigateTo({
                    url:`/contacts/detail?id=${id}`
                });
            }
        },
	}
</script>

<style lang="scss" scoped>
.contacts-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    .search-bar{
        padding: 0 20rpx;width: 100%;
    }
    .contacts-list{
        width: 100%;
    }
}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
