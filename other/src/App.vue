<template>
  <div id="app">
    <div class="page-header">
      <div class="left">
        <a href="/vxe-table/">
          <img src="/vxe-table/logo.png" width="18">
          <span class="title">vxe-table</span>
        </a>
        <a href='https://gitee.com/xuliangzhan_admin/vxe-table/stargazers'>
          <img src='https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=dark' alt='star'>
        </a>
        <a href="https://github.com/x-extends/vxe-table/stargazers">
          <img src="https://img.shields.io/github/stars/xuliangzhan/vxe-table.svg">
        </a>
        <a href="http://npm-stat.com/charts.html?package=vxe-table">
          <img src="https://img.shields.io/npm/dm/vxe-table.svg">
        </a>
      </div>
      <div class="right">
        <span class="get-contact">定制化插件或购买授权，如有需要，联系邮件：<a class="link" href="mailto:xu_liangzhan@163.com">xu_liangzhan@163.com</a></span>
      </div>
    </div>
    <div class="page-nav">
      <router-link :to="{name: 'Support'}">技术支持群</router-link> |
      <router-link :to="{name: 'Pro'}">PRO扩展</router-link> |
      <router-link :to="{name: 'ProAuth'}">PRO 授权查询</router-link> |
      <router-link :to="{name: 'Filter'}">筛选扩展</router-link> |
      <router-link :to="{name: 'Edit'}">编辑扩展</router-link>
    </div>
    <div class="page-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'

XEAjax.interceptors.request.use((request, next) => {
  request.headers.set('path', location.href)
  request.headers.set('name', 'vxe-table-pro')
  request.headers.set('now', Date.now())
  next()
})

export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
*, :after, :before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
html, body {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  color: #606266;
  background-color: #F7F8FA;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-variant: tabular-nums;
}

img {
  vertical-align: middle;
  border-style: none;
}
.link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.page-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 44px;
  color: #fff;
  padding: 0 20px;
  background-color: #24292e;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.12);
  & > .left {
    font-size: 22px;
    flex-shrink: 0;
  }
  & > .right {
    flex-grow: 1;
    text-align: right;
  }
  .get-contact {
    color: #f6ca9d;
  }
  .title {
    padding: 0 0.4em;
    font-weight: 700;
    color: #fff;
  }
  .link {
    color: #fff;
  }
}
.page-nav {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  flex-shrink: 0;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.page-body {
  height: 100%;
  overflow: auto;
  flex-grow: 1;
}
</style>
