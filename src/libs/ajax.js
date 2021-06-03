import {
    mapState,
    mapMutations
} from 'vuex'

export default {
    data() {
        return {

        }
    },
    computed: mapState([
        'APIURL', 'basePath', 'userInfo', 'UPLOADURL'
    ]),
    methods: {
        $request(config) {
            return new Promise((resolve, reject) => {
                uni.request(config).then(d => {
                    let [e, res] = d;
                    if (e) {
                        reject(e);
                    } else {
                        if (res.statusCode == 200 && res.data.rspCode == 0) {//请求成功
                            resolve(res.data.rspData);
                        } else {
                            if (res.data.rspCode == -999) {//未登录
                                uni.hideLoading();
                                uni.removeStorageSync('userInfo');
                                uni.removeStorageSync('sid');
                                uni.reLaunch({
                                    url: '/pages/login'
                                });
                            } else {//其他请求错误>弹框提示错误信息
                                uni.showModal({
                                    title: res.data.rspDesc ? res.data.rspDesc : '请求失败',
                                    content: res.data.rspDesc ? res.data.rspDesc : '请求失败',
                                    showCancel: false
                                });
                                reject(res);
                            }
                        };
                    }

                });
            });
        },
        $post(path, data, opts) {
            let requestFormat = {
                reqHead: {
                    userName: this.userInfo.username
                },
                reqBody: Object.assign({}, data)
            };
            let requestData = path.indexOf('login') > -1 ? data : requestFormat,
                sid = uni.getStorageSync('sid'),
                defaults = {
                    data: requestData,
                    header: path.indexOf('login') > -1 ? {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    } : {
                            'Content-Type': 'application/json; charset=UTF-8',
                            '__sid': sid
                        },
                    method: 'POST',
                    url: this.APIURL + path,
                },
                options = Object.assign(defaults, opts ? opts : {});
            return this.$request(options);
        },
        $passPost(path, data, opts) {
            let postData = {
                reqHead: {
                    userName: this.$store.state.userCode
                },
                reqBody: data
            };
            let defaults = {
                data: postData,
                header: {},
                method: 'POST',
                url: this.APIURL + path,
            };
            let options = Object.assign(defaults, opts ? opts : {});
            return this.$request(options);
        },
        $get(path, params, opts) {
            console.log(path);
            console.log(params);
            let defaults = {
                data: Object.assign({}, params ? params : {}),
                header: {},
                method: 'GET',
                url: path.indexOf('http') == -1 ? this.APIURL + path : path,
            };
            let options = Object.assign(defaults, opts ? opts : {});
            return this.$request(options);
        },
        $upload(filePath, formData) {
            return new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: this.UPLOADURL, //仅为示例，非真实的接口地址
                    filePath,
                    name: 'file',
                    formData
                }).then(d => {
                    let [e, res] = d;
                    if (e) {
                        reject(e);
                    } else {
                        let data = JSON.parse(res.data);
                        if (res.statusCode == 200 && data.rspCode == 0) {//请求成功
                            resolve(data.rspData);
                        } else {
                            if (data.rspCode == -999) {//未登录
                                uni.hideLoading();
                                uni.reLaunch({
                                    url: '/pages/login'
                                });
                                this.setTabActive('Home');
                            } else {//其他请求错误>弹框提示错误信息
                                uni.showModal({
                                    title: data.rspDesc ? data.rspDesc : '请求失败',
                                    content: data.rspDesc ? data.rspDesc : '请求失败',
                                    showCancel: false
                                });
                                reject(res);
                            }
                        };
                    }
                });
            });

        },
    }

}
