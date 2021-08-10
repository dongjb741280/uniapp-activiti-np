<template>
    <view class="thing-item">
        <u-popup v-model="popmodal" mode="center" border-radius="10">
            <view class="modal-wrap">
                <view>请输入审核建议：</view>
                <textarea class="textarea" v-model="checkContent"></textarea>
                <view class="btn-group u-flex">
                    <u-button
                        type="primary"
                        size="small"
                        plain
                        @click="applyFun('1')"
                        >确定</u-button
                    >
                    <u-button
                        type="warning"
                        size="small"
                        plain
                        @click="applyFun('0')"
                        >取消</u-button
                    >
                </view>
            </view>
        </u-popup>
        <u-avatar :src="item.src" mode="circle"></u-avatar>
        <view class="content">
            <view
                class="head"
                :style="{ borderBottomWidth: type == '2' ? 0 : 1 }"
            >
                <view v-if="curtype == '0'" class="welcome">主人，您有一条待办事项</view>
                <view v-else class="welcome">主人，您有一条已办事项</view>
                <view class="title">{{ item.applyTitle }}</view>
            </view>
            <view class="body" v-if="!item.taskList">
                <view class="line">
                    <view class="label">提交人：</view>
                    <view class="val">{{ item.applyUserName }}</view>
                </view>
                <view class="line">
                    <view class="label">提交时间：</view>
                    <view class="val">{{ item.applyDate }}</view>
                </view>
            </view>
            <view
                class="body"
                style="background: #f4f4f4;"
                v-if="item.taskList"
            >
                <!-- <Steps
                    :list="item.taskList"
                    name="dealUserName"
                    time="dealTime"
                    :current="curStep"
                    mode="number"
                ></Steps> -->
                <view class="line">
                    <view class="label">当前节点：</view>
                    <view class="val">{{curNode}}</view>
                </view>
                <view class="line">
                    <view class="label">提交时间：</view>
                    <view class="val">{{arriveTime}}</view>
                </view>
            </view>
            <view class="foot">
                <!-- <block v-if="item.applyTitle == '财务管理系统-报销申请' && foolwing && curtype == 0"> -->
                <block v-if="1 == 1 && foolwing && curtype == 0">
                    <view class="btn-group u-flex">
                        <u-button
                            type="primary"
                            size="small"
                            plain
                            @click="showModal('1')"
                            >通过</u-button
                        >
                        <u-button
                            type="warning"
                            size="small"
                            plain
                            @click="showModal('0')"
                            >拒绝</u-button
                        >
                    </view>
                    <!-- <view class="desc" @click="toDetail">
                        <text>详情</text>
                        <u-icon name="arrow-right" size="24"></u-icon>
                    </view> -->
                </block>
                <block v-else>
                    <view>请到OA系统中查看详情</view>
                </block>
            </view>
        </view>
    </view>
</template>
<script>
import USteps from '../../uview-ui/components/u-steps/u-steps.vue';
import Steps from './steps';
export default {
    components: {
        Steps
    },
    props: {
        foolwing: {
            type: Boolean,
            default: true
        },
        curtype: {
            type: Number,
            default: 1
        },
        type: {
            require: true,
            type: String
        },
        item: {
            require: true,
            type: Object
        }
    },
    computed: {
        curStep() {
            if (this.item.taskList) {
                return this.item.taskList.findIndex(ele => ele.status == 1);
            }
        },
        curNode() {
            if (this.item.taskList) {
              let indx = this.item.taskList.findIndex(ele => !ele.dealTime && !!ele.arriveTime);
              let node;
              if(indx > -1){
                node = this.item.taskList[indx];
              }else{
                node = this.item.taskList[this.item.taskList.length-1];
              }
              let nodename = node.taskDefName;
              return nodename;
            }
        },
        arriveTime() {
            if (this.item.taskList) {
              let indx = this.item.taskList.findIndex(ele => !ele.dealTime && !!ele.arriveTime);
              let node;
              if(indx > -1){
                node = this.item.taskList[indx];
              }else{
                node = this.item.taskList[this.item.taskList.length-1];
              }
              let time = node.arriveTime;
              return time;
            }
        },
    },
    data() {
        return {
            popmodal: false,
            checkState: '1',
            checkContent: ''
        };
    },
    methods: {
        toDetail(item) {
            uni.navigateTo({
                url: '/payment/mine-cl?id=' + this.item.bizId
            });
        },
        showModal(type) {
            this.checkState = type;
            this.popmodal = true;
        },
        applyFun(type) {
            let { checkState, checkContent } = this;
            if (type == '1') {
                if (this.item.applyTitle === '收文管理' || this.item.applyTitle === '发文管理') {
                    uni.showLoading();
                    this.API_saveInfo(
                        '/dm-server/a/dm/dmOfficialDoc/submitDmOfficialDocUndo',
                        {
                            docFlag: 'WF_SWGL',
                            id: this.item.bizId,
                            operType: '1',
                            remarks: checkContent,
                            agree: checkState
                        }
                    )
                        .then(d => {
                            this.popmodal = false;
                            // 发出一个更新事件
                            uni.$emit('updateList', {
                                type: '收文'
                            });
                            setTimeout(() => {
                                uni.hideLoading();
                            }, 500);
                        })
                        .catch(e => {
                            uni.hideLoading();
                        });
                } else if (this.item.applyTitle === '差旅报销') {
                    uni.showLoading();
                    this.API_saveInfo(
                        '/fm-server/a/fm/fmExpsClaim/checkFmExpsClaim',
                        {
                            id: this.item.bizId,
                            checkState,
                            checkContent
                        }
                    )
                        .then(d => {
                            this.popmodal = false;
                            // 发出一个更新事件
                            uni.$emit('updateList', {
                                type: '报销'
                            });
                            setTimeout(() => {
                                uni.hideLoading();
                            }, 500);
                        })
                        .catch(e => {
                            uni.hideLoading();
                        });
                } else if (this.item.applyTitle === '请假流程-所长' || this.item.applyTitle === '请假流程-人力所长' || this.item.applyTitle === '请假流程-职工') {
                    uni.showLoading();
                    this.API_saveInfo(
                        '/um-server/a/um/umAttendance/auditAttendance',
                        {
                            id: this.item.bizId,
                            checkState,
                            checkContent
                        }
                    )
                        .then(d => {
                            this.popmodal = false;
                            // 发出一个更新事件
                            uni.$emit('updateList', {
                                type: '请假'
                            });
                            setTimeout(() => {
                                uni.hideLoading();
                            }, 500);
                        })
                        .catch(e => {
                            uni.hideLoading();
                        });
                } else if (this.item.applyTitle === '用车审批-外地' || this.item.applyTitle === '用车审批-本地') {
                    uni.showLoading();
                    this.API_saveInfo(
                        '/um-server/a/um/umVehicleApply/auditVehicle',
                        {
                            id: this.item.bizId,
                            checkState,
                            checkContent
                        }
                    )
                        .then(d => {
                            this.popmodal = false;
                            // 发出一个更新事件
                            uni.$emit('updateList', {
                                type: '用车'
                            });
                            setTimeout(() => {
                                uni.hideLoading();
                            }, 500);
                        })
                        .catch(e => {
                            uni.hideLoading();
                        });
                } else if (this.item.applyTitle === '设备操作流程' || this.item.applyTitle === '设备检修流程' || this.item.applyTitle === '设备报废流程' || this.item.applyTitle === '设备审批流程') {
                    uni.showLoading();
                    this.API_saveInfo(
                        '/am-server/a/am/equipment/amEquipmentApply/auditAmEquipmentApply',
                        {
                            id: this.item.bizId,
                            approvalStatu: checkState,
                            approvalComments: checkContent
                        }
                    )
                        .then(d => {
                            this.popmodal = false;
                            // 发出一个更新事件
                            uni.$emit('updateList', {
                                type: '设备'
                            });
                            setTimeout(() => {
                                uni.hideLoading();
                            }, 500);
                        })
                        .catch(e => {
                            uni.hideLoading();
                        });
                }
            } else {
                this.popmodal = false;
            }
        }
    }
};
</script>
<style lang="scss">
.thing-item {
    margin-top: 20rpx;
    display: flex;
    .content {
        flex: 1;
        position: relative;
        border-radius: 5px;
        padding: 20rpx;
        margin-left: 30rpx;
        min-height: 150rpx;
        background: #ffffff;
        border: 1px solid #dddddd;
        box-shadow: 4px 4px 10px -10px black;
        overflow: hidden;
        .head {
            padding-bottom: 20rpx;
            border-bottom: 1px solid #dddddd;
            .welcome {
                color: $u-tips-color;
            }
            .title {
                font-size: 30rpx;
            }
        }
        .body {
            padding: 5rpx 0;
            .line {
                display: flex;
                align-items: center;
                .label {
                    color: $u-tips-color;
                }
                .val {
                    color: $u-main-color;
                }
            }
        }
        .foot {
            margin-top: 40rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &::before {
            content: ' ';
            left: 0;
            position: absolute;
            top: 20rpx;
            width: 20rpx;
            height: 20rpx;
            border-top: 1px solid #dddddd;
            border-left: 1px solid #dddddd;
            background: inherit;
            transform: rotate(-45deg);
            margin-left: -12rpx;
        }
    }
}
.btn-group {
    .u-btn {
        line-height: 50rpx;
        margin-right: 10rpx;
    }
}
.modal-wrap {
    border-radius: 5px;
    padding: 15rpx;
    .textarea {
        border: 1px solid #dddddd;
        padding: 10rpx;
        height: 120rpx;
        line-height: 1.3;
        margin: 12rpx 0;
    }
}
</style>
