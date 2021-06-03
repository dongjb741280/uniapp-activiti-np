import dayjs from './dayjs';

import {
    APIURL
} from '@/store';
export default {
	dayjs: (value, format = 'YYYY-MM-DD') => {
		return value ? dayjs(value).format(format) : dayjs().format(format);
	},
	fen2yuan: (value) => {
		return (parseInt(value) * 0.01).toFixed(2);
	},
	yuan2fen: (value) => {
		return value * 100;
    },
    imgUrl: (id)=>{
        return `${APIURL}/oa-server/a/sftp/sysAttachement/downLoad?fileId=${id}`
    },
    mapValue: (map,key='value')=>{
        return map && map[key]?map[key]:'';
    }
};
