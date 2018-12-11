import Vue from 'vue'
import App from './App'

Vue.config.prodctionTip = false

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/me/main'],
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#272636',
      'navigationBarTitleText': '蛤蟆图书',
      'navigationBarTextStyle': 'while'
    },
    'tabBar': {
      'selectedColor': '#272636',
      'list': [
        {
          'pagePath': 'pages/books/main',
          'text': '图书',
          'iconPath': 'static/img/bitbug_favicon (7).png',
          'selectedIconPath': 'static/img/bitbug_favicon (8).png'
        },
        {
          'pagePath': 'pages/comments/main',
          'text': '评论',
          'iconPath': 'static/img/bitbug_favicon (3).png',
          'selectedIconPath': 'static/img/bitbug_favicon (4).png'
        },
        {
          'pagePath': 'pages/me/main',
          'text': '我',
          'iconPath': 'static/img/bitbug_favicon (2).png',
          'selectedIconPath': 'static/img/bitbug_favicon (1).png'
        }
      ]
    }
  }
}
