import {
    mapState
} from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: mapState([
        'pageSize'
    ]),
    methods: {
        /**
         * 登录
         * @param {*} data
         */
        API_login(data) {
            return this.$post('/oa-server/a/login', data)
        },
        /**
         * 退出登录
         * @param {*} data
         */
        API_logout() {
            return this.$post('/oa-server/a/logout');
        },
        /**
         * 获取列表数据 -- 通用
         * @param {*} data
         */
        API_getListInfo(url,data) {
            return this.$post(url, data);
        },
        /**
         * 保存报表数据 -- 通用
         * @param {*} data
         */
        API_saveInfo(url,data) {
            return this.$post(url, data);
        },
        // 获取会议室信息列表
        API_qryUmMeetingRoomListByCon(data) {
            return this.$post('/um-server/a/um/umMeetingRoom/qryUmMeetingRoomListByCon', data);
        },
        // 保存会议室信息
        API_saveUmMeetingRoomApply(data) {
            return this.$post('/um-server/a/um/umMeetingRoomApply/saveUmMeetingRoomApply', data);
        },
        API_getUserList(data) {
            return this.$post('/oa-server/a/sys/user/qryUserList', data);
        },
        //获取会议室申请信息列表
        API_getUmMeetingRoomApplyListByCon(data) {
            return this.$post('/um-server/a/um/umMeetingRoomApply/qryUmMeetingRoomApplyListByCon', data);
        },
        /**
         * 内容列表
         * @param {*} data
         */
        API_qryOaArticleListByCon(data) {
            return this.$post('/oa-server/a/oa/oaArticle/qryOaArticleRawListByCon', data);
        },
        /**
         * 内容详情
         * @param {*} id
         */
        API_qryOaArticleById(id) {
            return this.$post('/oa-server/a/oa/oaArticle/qryOaArticleById', {
                id
            });
        },
        /**
         * 通讯录列表
         * @param {*} data
         */
        API_qrySysUserExtendListByCon(data) {
            return this.$post('/oa-server/a/sys/sysUserExtend/qrySysUserExtendListByCon', data);
        },
        /**
         * 通讯录详情
         * @param {*} id
         */
        API_qrySysUserExtendById(id) {
            return this.$post('/oa-server//a/sys/sysUserExtend/qrySysUserExtendById', {
                id
            });
        },
        /**
         * 查询待办列表
         * @param {*} data
        */
        API_qryUmAttendanceListByCon(data) {
            return this.$post('/oa-server/a/oa/acrossServices/qryUmAttendanceListByCon', data);
        },
        /**
         * 查询政企信息列表
         * @param {*} data
        */
        API_qryGmPublishInfoListByCon(data) {
            return this.$post('/gm-server/a/gm/publish/gmPublishInfo/qryGmPublishInfoRawListByCon', data);
        },
        /**
         * 查询政企信息详情
         * @param {*} id
         */
        API_qryGmPublishInfoById(id) {
            return this.$post('/gm-server/a/gm/publish/gmPublishInfo/qryGmPublishInfoById', {
                id
            });
        },
        /**
         * 获取文件信息
         * @param {*} id
         */
        API_getFileInfo(id) {
            return this.$post('/oa-server/a/sftp/sysAttachement/getFileInfo', {
                id
            });
        },
        /**
         * 获取我的报销列表
         * @param {*} id
         */
        API_qryMyFmList(data) {
            return this.$post('/fm-server/a/fm/fmExpsClaim/qryMyFmExpsClaimListByCon', data);
        },
        /**
         * 获取报销单
         * @param {*} id
         */
        API_qryMyFmById(id) {
            return this.$post('/fm-server/a/fm/fmExpsClaim/qryFmExpsClaimById', {
                id
            });
        },
        /**
         * 获取督查督办列表
         * @param {*} data
         */
        API_qryOmSuperviseMyTask(data) {
            return this.$post('/om-server/a/om/omSupervise/qryOmSuperviseMyTask', data);
        },
        /**
         * 获取督查督办详情
         * @param {*} id
         */
        API_qryOmSuperviseById(id) {
            return this.$post('/om-server/a/om/omSupervise/qryOmSuperviseById', {
                id
            });
        },
        /**
         * 获取公文列表
         * @param {*} data
         */
        API_qryDmOfficialDocListByCon(data) {
            return this.$post('/dm-server/a/dm/dmOfficialDoc/qryDmOfficialDocListByCon', data);
        },
        /**
         * 获取待办待阅公文列表
         * @param {*} data
         */
        API_qryDmOfficialDocMyTaskList(data) {
            return this.$post('/dm-server/a/dm/dmOfficialDoc/qryDmOfficialDocMyTaskList', data);
        },
        /**
         * 获取公文详情
         * @param {*} id
         */
        API_qryDmOfficialDocById(id) {
            return this.$post('/dm-server/a/dm/dmOfficialDoc/qryDmOfficialDocById', {
                id
            });
        }
    }
}
