import Vue from 'vue'
import Vuex from 'vuex'
import util from '../libs/util'

Vue.use(Vuex);

let env = process.env.NODE_ENV,
    platform = process.env.VUE_APP_PLATFORM,
    basePath = 'mz-server',
    APIURL;
if (platform === 'h5') {
    if (env === 'production') {
        if (process.env.VUE_APP_RUN_ENV === 'prepare') {
            APIURL = 'http://localhost:5555';
        } else {
            APIURL = 'http://localhost:5555';
        }
    } else {
        APIURL = 'http://localhost:5555';
    }
} else {
    if (env === 'production') {
        APIURL = 'http://localhost:5555';
    } else {
        APIURL = 'http://localhost:5555';
    }
};
const userInfo = uni.getStorageSync('userInfo'),
    commonUser = uni.getStorageSync('commonUser');
const store = new Vuex.Store({
    state: {
        userInfo: userInfo?userInfo:{},
        pageSize: 10,
        APIURL,
        basePath,
        DOWNLOADURL: `${APIURL}${basePath}/a/sftp/sysAtta/downLoad`,//下载地址
        UPLOADURL: `${APIURL}${basePath}/a/sftp/sysAtta/upload`,//上传地址
        backgroundTempalte: {
            'common': {
                backgroundColor: '#f2f2f2',
            }
        },
        messageData:{},
        commonUser: commonUser?commonUser:[]
    },
    mutations: {
        devIng(){
            uni.showToast({
                title:'功能开发中...',
                icon:'none'
            });
        },
        call(state, val) {
            if(val){
                uni.makePhoneCall({
                    phoneNumber: val
                });
            }
        },
        setUserInfo(state, val) {
            // state.userInfo = val;
            let tmp = {};
            for (const key in val) {
                if (val.hasOwnProperty(key)) {
                    const el = val[key];
                    if (el == null || el == 'null') {
                        tmp[key] = '';
                    } else {
                        tmp[key] = el;
                    }
                }
            };
            state.userInfo = tmp;
        },
        removeUserInfo(state) {
            // state.userInfo = val;
            state.userInfo = {};
        },
        setMessageData(state, val){
            state.messageData = util.extend(true, {}, state.messageData, val);
        },
        pushCommonUser(state, val){
            let i = -1;
            state.commonUser.map((it,idx)=>{
                if(it.id == val.id){
                    i = idx;
                }
            });
            if(i != -1){
                state.commonUser.splice(i,1);
            }
            state.commonUser.unshift(val);
            uni.setStorageSync('commonUser', state.commonUser);
        },
        clearCommonUser(state, val){
            state.commonUser = [];
            uni.removeStorageSync('commonUser');
        }
    },
    actions: {

    }
});

export {
    APIURL
};
export default store;

