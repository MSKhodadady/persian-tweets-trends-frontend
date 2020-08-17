import { ChartDataSets } from 'chart.js';

export interface TaskObj {
  id: number,
  task_user: string | null,
  task_type: string,
  task_state: string,
  created_at: string,
  crawl_since: string,
  crawl_until: string,
  progress?: 0
}

export interface DictionaryRow {
  token: string,
  replaceWith: null | string
}

export interface UserRow {
  username: string,
  iscrawl: boolean,
  selected?: boolean
}

export interface FabButton {
  text: string,
  class?: string,
  icon: string,
  small?: boolean,
  isAdd?: boolean,
  onClick: Function
}
export interface TotalChartOption extends ChartDataSets {
  chartOption: ChartOption
}
export interface ChartOption{
  'chart-type': string
, token: string
, since: string
, until: string
, color: string
}

export interface Freq extends ChartOption {
  type: 'frequency'
}

export interface MA extends ChartOption {
  type: 'MA'
, 'k-param': number
}

export interface TrendMomentum extends ChartOption {
  type: 'trend-momentum'
, 'k-s': number
, 'k-l': number
, alpha: number
}

export interface Momentum extends ChartOption {
  type: 'momentum'
, 'k-s': number
, 'k-l': number
, alpha: number
, 'k-param': number
}

export const UserActionTypes = {
  deleteUser: 'delete-user',
  changeCrawl: 'change-crawl',
  addUser: 'add-user'
};
