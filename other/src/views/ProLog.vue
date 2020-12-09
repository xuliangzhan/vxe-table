<template>
  <div class="log-page">
    <div class="download-btns" v-if="$route.path === '/prodl'">
      <a class="link download-lib" @click="downloadEvent(downNewVersion)">最新版 {{ downNewVersion }}</a>
      <a class="link download-lib" @click="downloadEvent(downStableVersion)">稳定版 {{ downStableVersion }}</a>
    </div>
    <div class="log-item" v-for="(item, index) in list" :key="index">
      <div class="log-version">
        <span class="log-name">v{{ item.version }}</span>
        <span class="log-date">{{ item.date }}</span>
      </div>
      <div class="log-desc">
        <ul class="log-list">
          <li class="log-li" v-for="(log, cIndex) in item.logs" :key="`${index}${cIndex}`">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      downNewVersion: '1.0.9',
      downStableVersion: '1.0.8',
      invalidCode: [],
      list: [
        {
          version: '1.0.9',
          date: '2020-12-09',
          logs: [
            '修复粘贴 Excel 数据错误问题',
            '修复单元格格式化值无法复制问题',
            '修复复选框、单选框无法复制粘贴问题'
          ]
        },
        {
          version: '1.0.8',
          date: '2020-12-07',
          logs: [
            '修复筛选弹出后复制与粘贴冲突问题'
          ]
        },
        {
          version: '1.0.7',
          date: '2020-12-06',
          logs: [
            '修复点击列头选取整列后未定位到第一行问题'
          ]
        },
        {
          version: '1.0.6',
          date: '2020-12-01',
          logs: [
            '增加参数 clip-config.copyMethod 对应旧的 clip-config.getMethod',
            '增加参数 clip-config.beforeCopyMethod 对应旧的 clip-config.beforeGetMethod',
            '增加参数 clip-config.pasteMethod 对应旧的 clip-config.setMethod',
            '增加参数 clip-config.beforePasteMethod 对应旧的 clip-config.beforeSetMethod'
          ]
        },
        {
          version: '1.0.5',
          date: '2020-11-29',
          logs: [
            '优化 cell-area-* 相关事件的参数'
          ]
        },
        {
          version: '1.0.4',
          date: '2020-11-25',
          logs: [
            '支持查找与替换可自定义显示',
            '支持查找与替换自定义方法'
          ]
        },
        {
          version: '1.0.3',
          date: '2020-11-23',
          logs: [
            '修复 MacOS 复制粘贴失效问题'
          ]
        },
        {
          version: '1.0.2',
          date: '2020-11-10',
          logs: [
            '增加参数 clip-config',
            '增加事件 cell-area-copy',
            '增加事件 cell-area-cut',
            '增加事件 cell-area-paste',
            '增加事件 cell-area-merge',
            '增加事件 cell-area-selection-start',
            '增加事件 cell-area-selection-end',
            '增加事件 cell-area-extension-start',
            '增加事件 cell-area-extension-end'
          ]
        },
        {
          version: '1.0.1',
          date: '2019-10-01',
          logs: [
            '内部优化',
            '小bug修复'
          ]
        },
        {
          version: '1.0.0',
          date: '2019-06-01',
          logs: [
            '实现对单元格操作的完整支持'
          ]
        }
      ]
    }
  },
  methods: {
    downloadEvent (downVersion) {
      if (this.$route.path === '/prodl') {
        const code = prompt(decodeURIComponent('%E8%AF%B7%E8%BE%93%E5%85%A5%E6%8E%88%E6%9D%83%E7%A0%81'))
        if (code) {
          const authCode = code.trim()
          if (!this.invalidCode.includes(authCode)) {
            const strs = 'wabpcdoefghijklmnzyt'.split('')
            const params = {}
            XEUtils.sample(strs, 10).forEach(key => {
              params[key] = XEUtils.random(10, 999)
            })
            XEAjax.fetchPost(`https://api.xuliangzhan.com:10443/api/pub/pro/download/${downVersion}/${authCode}`, {
              n: Date.now(),
              l: 'pro',
              c: authCode
            }, { params }).then(response => {
              if (response.status === 200) {
                response.blob().then(blob => {
                  const a = document.createElement('a')
                  a.target = '_blank'
                  a.download = `vxe-table-pro${downVersion}.rar`
                  a.href = URL.createObjectURL(blob)
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                })
              } else {
                this.invalidCode.push(authCode)
                response.json().then(data => {
                  if (data) {
                    alert(data.message)
                  }
                })
              }
            })
          } else {
            alert(decodeURIComponent('%E6%97%A0%E6%9D%83%E9%99%90%E6%93%8D%E4%BD%9C'))
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.log-page {
  width: 800px;
  margin: 0 auto;
  padding: 0 10px;
}
.log-name {
  font-size: 22px;
  font-weight: 700;
  color: #0d1a26;
}
.log-date {
  font-size: 12px;
  margin-left: 15px;
  padding: 2px 5px;
  background: #f2f4f5;
  border: 1px solid #eee;
}
.log-list {
  .log-li {
    list-style-type: circle;
  }
}
.download-btns {
  width: 800px;
  margin: 0 auto;
  text-align: right;
}
.download-lib {
  display: inline-block;
  color: #fff;
  border-color: #409eff;
  background-color: #409eff;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 12px;
  cursor: pointer;
}
</style>
