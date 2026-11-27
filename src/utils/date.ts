const BEIJING_OFFSET = 8 * 60 * 60 * 1000

const pad = (value: number) => String(value).padStart(2, '0')

/** 把任意时刻换算成北京时间后按 UTC 取值，避免构建机器时区不同导致时间漂移 */
const beijingDate = (date: Date) => new Date(date.getTime() + BEIJING_OFFSET)

/** 统一的时间显示格式：YYYY.MM.DD HH:mm */
export const formatDateTime = (date: Date) => {
  const d = beijingDate(date)
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
}

/** 北京时间的日期键：YYYY-MM-DD，用于热力图等按天统计 */
export const dateKey = (date: Date) => {
  const d = beijingDate(date)
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
}

/** 今天的北京时间零点（用 UTC 字段表示北京日历日期） */
export const todayInBeijing = () => {
  const now = beijingDate(new Date())
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}
