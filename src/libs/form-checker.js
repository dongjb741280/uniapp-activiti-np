export default {
    error: '',
    errors: {},
    check: function (data, rule) {
        for (const item of rule) {
            if (!item.checkType) {
                return true;
            };
            if (!item.name) {
                return true;
            };
            if (!item.errorMsg) {
                return true;
            };
            if (!data[item.name]) {
                this.error = item.errorMsg;
                this.errors = item;
                return false;
            };
            let em = data[item.name];
            switch (item.checkType) {
                case 'string':
                    var reg = new RegExp('^.{' + item.checkRule + '}$');
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'int':
                    var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + item.checkRule + '}$');
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'between':
                    if (!this.isNumber(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    var minMax = item.checkRule.split(',');
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (data[item.name] > minMax[1] || data[item.name] < minMax[0]) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'betweenD':
                    var reg = /^-?[1-9][0-9]?$/;
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    var minMax = item.checkRule.split(',');
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (data[item.name] > minMax[1] || data[item.name] < minMax[0]) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'betweenF':
                    var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    var minMax = item.checkRule.split(',');
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (data[item.name] > minMax[1] || data[item.name] < minMax[0]) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'same':
                    if (data[item.name] != item.checkRule) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'notsame':
                    if (data[item.name] == item.checkRule) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'email':
                    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'phoneno':
                    var reg = /^1[0-9]{10,10}$/;
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'idcard':
                    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'zipcode':
                    var reg = /^[0-9]{6}$/;
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'reg':
                    var reg = new RegExp(item.checkRule);
                    if (!reg.test(data[item.name])) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'in':
                    if (item.checkRule.indexOf(data[item.name]) == -1) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'notnull':
                    if (data[item.name] == undefined || data[item.name] == null || data[item.name].length < 1) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'ArrayNotnull':
                    if (em == undefined || em == null || em.length == 0) {
                        this.error = item.errorMsg;
                        this.errors = item;
                        return false;
                    }
                    break;
                case 'objArrNotnull':
                    let res = true;
                    if (em == undefined || em == null || em == '' || em.length == 0) {
                        return false;
                    } else {
                        if (this.isArray(em)) {
                            for (const it of em) {
                                for (const key of em.checkRule.split(',')) {
                                    if (it[key] == undefined || it[key] == null || it[key] == '' || it[key].length == 0) {
                                        res = false;
                                    }
                                };
                            };
                            return res;
                        } else {
                            return false;
                        }
                    }
            }
        }
        // for (var i = 0; i < rule.length; i++) {

        //     console.log();


        // }
        return true;
    },
    isNumber: function (checkVal) {
        checkVal = Number(checkVal);
        if (checkVal == NaN) {
            return false;
        }
        return true;
    },
    isArray(arr) {
        return arr && Object.prototype.toString.call(arr) === '[object Array]';
    },
}
