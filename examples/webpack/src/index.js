import moment from 'moment'
export { default as hello2 } from './hello'

export default function hello() {
  moment.locale('zh-cn')

  moment('2019-01-01')
}
