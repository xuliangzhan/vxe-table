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
    </div>
    <div class="page-nav">
      <router-link :to="{name: 'Pro'}">PRO扩展</router-link> |
      <router-link :to="{name: 'ProAuth'}">PRO 授权查询</router-link> |
      <router-link :to="{name: 'Filter'}">筛选扩展</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
*, :after, :before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
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

.page-header {
  display: flex;
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
  .title {
    padding: 0 0.4em;
    font-weight: 700;
    color: #fff;
  }
}
.page-nav {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
