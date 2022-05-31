import { baseUrl1 } from './baseConfig.js'
import store from '../store/index.js'

export const request = (method, url, opts) => {
	if (!opts.showLoading) {
		uni.showLoading({
			mask: false
		})
	}
	const { data, success, complete, successMsg, errorMsg, fail} = opts
    let httpDefaultOpts = {
        url: baseUrl1 + url,
        data: data,
        method: method,
        header: method == 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"token": store.getters.userInfo && store.getters.userInfo.token ? store.getters.userInfo.token : ''
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type": "application/json;charset=UTF-8",
			"token": store.getters.userInfo && store.getters.userInfo.token ? store.getters.userInfo.token : ''
        },
        dataType: 'json',
		success: (res) => {
			const { data } = res
			uni.hideLoading()
			if (data.code == 401) {
				uni.showToast({
				    title: '请先登录',
					icon: 'none',
				    duration: 2000
				});
				uni.navigateTo({
					url: '/pages/login/login'
				})
			} else if (data.code == 0) {
				if(successMsg) {
					uni.showToast({
					    title: successMsg,
						icon: 'none',
					    duration: 2000
					});
				}
				uni.hideLoading()
				success(data)
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none',
					duration: 2000
				});
			}
		},
		fail: (e) => {
			if(errorMsg) {
				uni.showToast({
				    title: errorMsg,
				    duration: 2000
				});
			}
			fail(e)
		},
		complete: () => {
			if (complete && typeof(complete) === 'function') {
				complete()
			}
		}
    }
	uni.request(httpDefaultOpts)
};