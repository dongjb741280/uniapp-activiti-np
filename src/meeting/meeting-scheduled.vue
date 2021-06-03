<template>
    <view class="sign-wrapper">
        <u-navbar
            title="会议室预定"
            :background="$store.state.backgroundTempalte.common"
        ></u-navbar>
        <u-form :model="form" ref="uForm" :error-type="errorType">
            <u-form-item label="会议室" prop="meetingRoomId" label-width="140">
                <u-input
                    v-model="form.meetingRoomId"
                    :type="type"
                    :border="border"
                    @click="show = true"
                    placeholder="请选择会议室"
                />
                <u-select
                    v-model="show"
                    mode="single-column"
                    :list="list"
                    @confirm="confirm"
                ></u-select>
            </u-form-item>
            <u-form-item label="会议主题" label-width="140" prop="topic"
                ><u-input v-model="form.topic" placeholder="请输入会议主题"
            /></u-form-item>
            <!-- <u-form-item label="申请人" label-width="140" prop="applyUserId">
        <u-input
          v-model="form.applyUserId"
          :type="type"
          :border="border"
          @click="showPeop = true"
          placeholder="请选择申请人"
        />
        <u-select
          v-model="showPeop"
          mode="single-column"
          :list="userList"
          @confirm="confirmUser"
        ></u-select>
      </u-form-item> -->
            <u-form-item label="开始时间" label-width="140" prop="beginTime">
                <u-input
                    v-model="form.beginTime"
                    placeholder="请选择开始时间"
                    @click="showBegin = true"/>
                <u-picker
                    v-model="showBegin"
                    :mode="mode"
                    :params="params"
                    @confirm="confirmBegin"
                ></u-picker
            ></u-form-item>
            <u-form-item label="结束时间" label-width="140" prop="endTime">
                <u-input
                    v-model="form.endTime"
                    placeholder="请选择结束时间"
                    @click="showEnd = true"/>
                <u-picker
                    v-model="showEnd"
                    :mode="mode"
                    :params="params"
                    @confirm="confirmEnd"
                ></u-picker
            ></u-form-item>
            <u-form-item label="申请事由" label-width="140" prop="reason"
                ><u-input v-model="form.reason" placeholder="请输入申请事由"
            /></u-form-item>
        </u-form>
        <u-top-tips ref="uTips"></u-top-tips>
        <view class="loading">
            <u-loading mode="circle" :show="loading" color="red"></u-loading>
        </view>
        <view class="submint">
            <u-button type="primary" @click="submit">提交申请</u-button>
        </view>
    </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            value: '',
            type: 'select',
            show: false,
            showBegin: false,
            showEnd: false,
            showPeop: false,
            border: false,
            errorType: ['toast'],
            content: '',
            loading: false,
            mode: 'time',
            userList: [],
            meetingRoom: '',
            params: {
                year: true,
                month: true,
                day: true,
                hour: true,
                minute: true,
                second: true
            },
            form: {
                office: '1',
                beginTime: '',
                endTime: '',
                meetingRoomId: '',
                applyUserId: '',
                topic: '',
                reason: ''
            },
            list: [],
            rules: {
                beginTime: [
                    {
                        required: true,
                        message: '请选择开始时间',
                        trigger: 'blur'
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: '请选择结束时间',
                        trigger: ['blur']
                    }
                ],
                meetingRoomId: [
                    {
                        required: true,
                        message: '请选择会议室',
                        trigger: 'blur'
                    }
                ],
                applyUserId: [
                    {
                        required: true,
                        message: '请选择申请人',
                        trigger: ['blur']
                    }
                ],
                topic: [
                    {
                        required: true,
                        message: '请输入会议主题',
                        trigger: 'blur'
                    }
                ]
            },
            radio: '',
            switchVal: false
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        this.getDataList();
        this.getApplicantId();
    },
    methods: {
        confirmBegin(e) {
            this.form.beginTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
        },
        confirmEnd(e) {
            this.form.endTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
        },
        // 点击actionSheet回调
        confirm(e) {
            console.log('222', e);
            this.meetingRoom = e[0].value;
            this.form.meetingRoomId = e[0].label;
        },
        confirmUser(e) {
            this.form.applyUserId = e[0].label;
        },
        // 获取申请人信息Id
        getApplicantId() {
            this.API_getUserList().then(d => {
                for (const item of d.page.list) {
                    this.userList.push({
                        value: item.id,
                        label: item.name
                    });
                }
            });
        },
        getDataList() {
            let queryParam = Object.assign({
                currPage: 1,
                pageSize: 10
            });
            this.API_qryUmMeetingRoomListByCon(queryParam).then(d => {
                for (const item of d.page.list) {
                    this.list.push({
                        value: item.id,
                        label: item.roomName
                    });
                }
            });
        },
        submit() {
            this.$refs.uForm.validate(valid => {
                console.log('valid', valid);
                if (valid) {
                    this.loading = true;
                    this.form.meetingRoomId = this.meetingRoom;
                    this.form.applyUserId = this.userInfo.userId;
                    this.API_saveUmMeetingRoomApply(this.form).then(res => {
                        uni.showToast({
                            title: '预定成功',
                            icon: 'success'
                        });
                        setTimeout(() => {
                            this.loading = false;
                            this.form = {};
                            uni.$emit('mettingListUpdate');
                            uni.navigateBack();
                        }, 500);
                    });
                } else {
                    callback();
                }
            });
        }
    },

    onReady() {
        this.$refs.uForm.setRules(this.rules);
    }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/meeting-scheduled';
</style>
