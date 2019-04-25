'use strict'
const env = 'dev';
const defaultAlertMessage = '好像那里出问题了~';
const defaultShareText = {
  en: '默认分享文案'
}
const defaultBarTitle = {
  en: 'ikcamp学习英语'
}
const defaultImg = {
  articleImg: 'https://n1image.hjfile.cn/mh/2017/06/07/7e8f7b63dba6fa3849b628c0ce2c2a46.png',
  coverImg: 'https://n1image.hjfile.cn/mh/2017/06/07/7472c035ad7fe4b8db5d2b20e84f9374.png'
}
let core = {
  env: env,
  defaultAlertMessage :defaultAlertMessage,
  defaultShareText:defaultShareText['en'],
  defaultBarTitle:defaultBarTitle['en'],
  defaultImg:defaultImg,
  isDiv: env === 'dev',
  isProduction: env === 'production'
}//重组
export   default core;
list(lists)