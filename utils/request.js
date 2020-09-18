
const baseUrl = 'http://8.210.134.217:8201'
// const baseUrl = 'https://wztp.zhumengxuanang.com' // 正式
const quest = (url, parameter,method,header) => {
    wx.showLoading({title: '加载中', mask: true,  success: res => {}});
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}${url}`,
            data: parameter,
            method: method,
            // header:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            header: header == 1 ? {"Content-Type": "application/json; charset=UTF-8"}:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            dataType: 'json',
            success: res => {
                if(res.data.code == 200) {
                    resolve(res.data);
                } else {
                    console.log(res)
                    wx.showToast({
                        title: '服务器错误,请重试',
                        icon: 'none',
                        duration: 2000
                    });
                    reject(res.data);
                }
               
            },
            fail: (err) => {
                wx.showToast({
                    title: '服务器错误,请重试',
                    icon: 'none',
                    duration: 2000
                });
                reject(err);
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    });

};

export  {
    quest,
    baseUrl
}