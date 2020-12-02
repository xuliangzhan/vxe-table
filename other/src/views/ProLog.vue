<template>
  <div class="log-page">
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
export default {
  data () {
    return {
      list: [
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
</style>
