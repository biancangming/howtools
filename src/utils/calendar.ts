/**
 * new Date js api 
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
 * 日历其实是 7 * 6 的一个常见的布局, 总计长度 42，横向是从星期日 到 星期一
 * 1. getDate() 获取某月第几天，从 1 开始 1-31 
 * 2. getFullYear() 获取某一年， 四位数年份
 * 3. getDay() 获取一周第几天， 0 - 6
 * 4. getHours() 根据本地时间 ，返回一个指定的 Date 对象的小时
 * 5. getMinutes() 获取分钟 0 - 59
 * 6. getSeconds() 获取秒 0 - 59
*/

export interface GetCalendarByDateOpts {
    startByMonday?: boolean, // 是否从周一开始统计 
    ignoreLastWeek?: boolean, // 是否省略最后一周全部为下一个月的情况
}

/**
 * @param date 时间，如 2023-11-14  、 2023-11 等
 * @param opts GetCalendarByDateOpts
 * @description 根据年月生成日历，农历可通过 https://github.com/jjonline/calendar.js 进行转换
*/
export function getCalendarByDate(date: string, opts?: GetCalendarByDateOpts) {
    const startByMonday = opts?.startByMonday || false
    const ignoreLastWeek = opts?.ignoreLastWeek || false

    const calendar: {
        date: Date,
        isCurrentMonth: boolean,
        year: number,
        month: number,
        day: number,
        weekday: number,
    }[] = []

    const _date = new Date(new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60 * 1000) // 获得一个UTC时间
    const year = _date.getFullYear()
    const month = _date.getMonth() // 第几个月
    // const day = _date.getDay() // 星期几

    const dayjs = new Date(`${year}-${month + 1}-01`)
    const dayjs_day = dayjs.getDay() // 计算一号是星期几

    // 如果日期不是周日，重置dayjs到正常日历第一天。
    if (dayjs_day > 0) {
        dayjs.setDate(dayjs.getDate() - (dayjs_day + (startByMonday ? -1 : 0)))
    }
   
    // 补全正常数据
    let count = 0
    while (calendar.length < 7 * 6) {
        const _dayjs = new Date(dayjs)
        _dayjs.setDate(dayjs.getDate() + count)

        if(ignoreLastWeek && count > 7 * 5 && _dayjs.getMonth() !== month){
            break
        }

        calendar.push({
            date: _dayjs,
            year: _dayjs.getFullYear(),
            month: _dayjs.getMonth() + 1,
            day: _dayjs.getDate(),
            weekday: _dayjs.getDay(),
            isCurrentMonth: _dayjs.getMonth() === month,
        })

        count++
    }

    return calendar
}

