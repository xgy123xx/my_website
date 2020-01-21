/**
 * Created by Administrator on 2020/1/19.
 */
$(function () {
    console.log("hello world");
    // 处理change-skin
    // 隐藏和显示部分部分
    $('#left-btn').click(function () {
        $('.small-img-show').stop().animate({
            width: 'toggle'
        }, 350);
    });
    //设置点击图片就切换为背景  原生js
    //1.设置li标签的点击事件   chidren谷歌浏览器把回车文本节点当孩子节点
    var oDivSmallImg = document.getElementsByClassName('small-img-show')[0];
    var Olis = oDivSmallImg.getElementsByTagName('li');
    for (let i = 0; i < Olis.length; i++) {
        Olis[i].onclick = function () {
            //2. 获取图片url  this == Olis[i]
            let ImgSrc = this.getElementsByTagName('img')[0].src;
            //3. 设置src为背景
            document.body.style.backgroundImage = `url("${ImgSrc}")`
        }
    }

    //设置导航栏的天气
    moment.defineLocale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'Ah点mm分',
            LTS: 'Ah点m分s秒',
            L: 'YYYY-MM-DD',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日Ah点mm分',
            LLLL: 'YYYY年MMMD日ddddAh点mm分',
            l: 'YYYY-MM-DD',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日Ah点mm分',
            llll: 'YYYY年MMMD日ddddAh点mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'  
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: function () {
                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
            },
            nextDay: function () {
                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
            },
            lastDay: function () {
                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
            },
            nextWeek: function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            lastWeek: function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            sameElse: 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s内',
            past: '%s前',
            s: '几秒',
            m: '1 分钟',
            mm: '%d 分钟',
            h: '1 小时',
            hh: '%d 小时',
            d: '1 天',
            dd: '%d 天',
            M: '1 个月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年'
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效  
            dow: 1, // Monday is the first day of the week.  
            doy: 4 // The week that contains Jan 4th is the first week of the year.  
        }
    });
    //1.鼠标进入导航栏
    $('.weather').mouseenter(function () {
        $(".show-weather").stop().fadeIn(500)
        getForecastWeather(
            "https://free-api.heweather.net/s6/weather/forecast?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467"
        );
    })
    //2.鼠标出导航栏
    $('.weather').mouseleave(function () {
        $(".show-weather").stop().fadeOut(500)
    })
    //设置定时器，每一小时获取一次数据
    setInterval(function () {
        getNowWeather(
            'https://free-api.heweather.net/s6/weather/now?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467'
        )
        getForecastWeather(
            "https://free-api.heweather.net/s6/weather/forecast?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467"
        );

    }, 1000 * 60 * 60)

    function getDay(i) {
        switch (i) {
            case 0:
                return "今天";
                break;
            case 1:
                return "明天";
                break;
            default:
                return "后天";
                break;
        }
    }

    function getForecastWeather(url) {
        $.ajax({
            url: url,
            method: 'get',
            success: function (ret) {
                // console.log(ret);
                var daily_forecast = ret.HeWeather6[0].daily_forecast;
                $('.every_weather .everyday_item').each(function (i) {
                    var conde_code = daily_forecast[i].cond_code_n;
                    var tmp = daily_forecast[i].tmp_min;
                    var cond_txt = daily_forecast[i].cond_txt_d;
                    var wind_dir = daily_forecast[i].wind_dir;
                    var date = daily_forecast[i].date;
                    var week = moment(date).format('dddd');
                    // console.log(date, week);
                    $(this).empty();
                    $(this).append(
                        `
                        <p class="every_title">${getDay(i)}(${week})</p>
                        <img src="/static/blog/img/weather/${conde_code}.png" alt="" class="every_icon">
                        <p class="everytemp">${tmp}℃</p>
                        <p class="everyday_cond_txt">${cond_txt}</p>
                        <p class="every_cond_wind">${wind_dir}</p>
                                `
                    )
                })

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //2.写一个获取实时天气的函数，用ajax
    function getNowWeather(url) {
        $.ajax({
            url: url,
            method: 'get',
            success: function (ret) {
                var now = ret.HeWeather6[0].now;
                var city = ret.HeWeather6[0].basic.location;
                if (ret.HeWeather6[0].status) {
                    var cond_code = now.cond_code;
                    var cond_txt = now.cond_txt;
                    var f1 = now.f1;
                    var tmp = now.tmp;
                    console.log(cond_txt);
                    $('.weather-text .city').text(city + " : ");
                    $('.weather-text .tmp').text(tmp + "℃");
                    $('.weather-text .f1').text(f1);
                    $('.weather-text .weatherImg').attr('src',
                        `/static/blog/img/weather/${cond_code}.png`);

                }

            },
            error: function (msg) {
                console.log(msg);
            },
        })
    }
    //https://free-api.heweather.net/s6/weather/forecast?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467
    getNowWeather(
        'https://free-api.heweather.net/s6/weather/now?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467'
    )

    function getForecastWeather(url) {
        $.ajax({
            url: url,
            method: 'get',
            success: function (ret) {
                // console.log(ret);
                var daily_forecast = ret.HeWeather6[0].daily_forecast;
                $('.every_weather .everyday_item').each(function (i) {
                    var conde_code = daily_forecast[i].cond_code_n;
                    var tmp = daily_forecast[i].tmp_min;
                    var cond_txt = daily_forecast[i].cond_txt_d;
                    var wind_dir = daily_forecast[i].wind_dir;
                    var date = daily_forecast[i].date;
                    var week = moment(date).format('dddd');
                    // console.log(date, week);
                    $(this).empty();
                    $(this).append(
                        `
                        <p class="every_title">${getDay(i)}(${week})</p>
                        <img src="/static/blog/img/weather/${conde_code}.png" alt="" class="every_icon">
                        <p class="everytemp">${tmp}℃</p>
                        <p class="everyday_cond_txt">${cond_txt}</p>
                        <p class="every_cond_wind">${wind_dir}</p>
                                `
                    )
                })

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //2.写一个获取实时天气的函数，用ajax
    function getNowWeather(url) {
        $.ajax({
            url: url,
            method: 'get',
            success: function (ret) {
                var now = ret.HeWeather6[0].now;
                var city = ret.HeWeather6[0].basic.location;
                if (ret.HeWeather6[0].status) {
                    var cond_code = now.cond_code;
                    var cond_txt = now.cond_txt;
                    var f1 = now.f1;
                    var tmp = now.tmp;
                    
                    $('.weather-text .city').text(city + " : ");
                    $('.weather-text .tmp').text(tmp + "℃");
                    $('.weather-text .f1').text(f1);
                    $('.weather-text .cond_txt').text(cond_txt);

                    $('.weather-text .weatherImg').attr('src',
                        `/static/blog/img/weather/${cond_code}.png`);

                }

            },
            error: function (msg) {
                console.log(msg);
            },
        })
    }
    //https://free-api.heweather.net/s6/weather/forecast?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467
    getNowWeather(
        'https://free-api.heweather.net/s6/weather/now?location=shenyang&key=b89c5798c89b4d09af1bd08ea612c467'
    )

    // 获取时间函数
    setInterval(getDayTimeStr,1000);
    function getDayTimeStr() {
        var now_time = document.getElementById('now_time');
        var now = new Date();
        
        // 1.获取年月日
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();

        //2.获取时分秒
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        // 获取星期
        var week = now.getDay();
        var weeks = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];

        //3.拼接字符串
        var tmp = "";
        tmp = hour > 12 ? hour -12:hour;
        if(hour == 0){
            tmp = "12";
        } 
        tmp += minute >= 10 ? ":"+minute:":0"+minute;
        tmp += second >= 10 ? ":"+second:":0"+second;
        tmp += hour > 12 ? " P.M.":" A.M.";
        tmp = `${year}年${month}月${day}日 ${tmp} ${weeks[week]}`

        now_time.innerText = tmp;
    }

});