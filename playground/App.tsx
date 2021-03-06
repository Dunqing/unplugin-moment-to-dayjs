/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Calendar, ConfigProvider, DatePicker, Select } from 'antd'
import 'antd/dist/antd.variable.css'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import moment from 'moment'

const onChange = (value: any) => {
  console.log('π ~ onChange value: ', value)
}

const App = () => {
  const [locale, setLocale] = useState<string>('en_US')

  useEffect(() => {
    moment.locale(locale)
  }, [locale])

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }}>
    <ConfigProvider locale={locale === 'zh_CN' ? zhCN : enUS}>
      <Select
        value={locale}
        onChange={setLocale}
        options={[
          {
            label: 'π¨π³ δΈ­ζ',
            value: 'zh_CN',
          },
          {
            label: 'πΊπΈ English',
            value: 'en_US',
          },
        ]}>

      </Select>
      <DatePicker onChange={onChange} />
      <DatePicker.MonthPicker onChange={onChange} />
      <DatePicker.QuarterPicker onChange={onChange} />
      <DatePicker.RangePicker onChange={onChange} />
      <DatePicker.WeekPicker onChange={onChange} />
      <DatePicker.YearPicker onChange={onChange} />
      <Calendar onChange={onChange} ></Calendar>
    </ConfigProvider>
  </div>
}

export default App
