<template>
  <div class="pro-page">
    <div class="pro-desc">
      <div class="pro-price">
        <span style="font-size: 20px;font-weight: 700;">PRO</span><span style="font-size: 12px"> -发布版</span><span class="price-unit">￥1000</span><span style="font-size: 12px">/永久</span>
      </div>
      <div class="pro-features">
        <span><i class="help-icon" :title="proFeatures.mouse">?</i>鼠标操作</span>
        <span><i class="help-icon" :title="proFeatures.keyboard">?</i>按键操作</span>
      </div>
    </div>
    <div class="pro-preview">
      <div class="preview-item" v-for="item in proList" :key="item.code">
        <div class="preview-contnet">
          <h3 class="preview-title">{{ item.title }}</h3>
          <img class="preview-img" :src="item.previewUrl">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      proList: [
        {
          title: '鼠标区域选取',
          code: 'proArea',
          previewUrl: require('../assets/image/plugin/proArea.gif')
        },
        {
          title: '鼠标多重区域选取、延伸扩大区域',
          code: 'proMultiArea',
          previewUrl: require('../assets/image/plugin/proMultiArea.gif')
        },
        {
          title: '固定列区域选取',
          code: 'proFixedAera',
          previewUrl: require('../assets/image/plugin/proFixedAera.gif')
        },
        {
          title: '复制、剪贴、粘贴',
          code: 'proClip',
          previewUrl: require('../assets/image/plugin/proClip.gif')
        },
        {
          title: '合并、取消合并',
          code: 'proMerge',
          previewUrl: require('../assets/image/plugin/proMerge.gif')
        },
        {
          title: '查找和替换',
          code: 'proFNR',
          previewUrl: require('../assets/image/plugin/proFNR.gif')
        },
        {
          title: '常用的快捷键',
          code: 'proKeyboard',
          previewUrl: require('../assets/image/plugin/proKeyboard.gif')
        },
        {
          title: '右键快捷菜单',
          code: 'proContextmenu',
          previewUrl: require('../assets/image/plugin/proContextmenu.gif')
        },
        {
          title: '集成 echarts 图表渲染',
          code: 'proCharts',
          previewUrl: require('../assets/image/plugin/proCharts.gif')
        },
        {
          title: '同时支持区域选取、虚拟滚动',
          code: 'proVirtualScroll',
          previewUrl: require('../assets/image/plugin/proVirtualScroll.gif')
        },
        {
          title: '同时支持区域选取、虚拟滚动、虚拟合并',
          code: 'proVirtualMergeScroll',
          previewUrl: require('../assets/image/plugin/proVirtualMergeScroll.gif')
        }
      ],
      proFeatures: {
        mouse: [
          '支持 MouseLeft 选取选取指定区域的单元格',
          '支持 Ctrl + MouseLeft 选取多重区域的单元格',
          '支持 MouseLeft 按住右下角延伸按钮，将区域横向或纵向扩大'
        ].join('\n'),
        keyboard: [
          '支持 Ctrl + MouseLeft 选取多重区域的单元格',
          '支持 Ctrl + A 选择全部单元格',
          '支持 Ctrl + X 将单元格标记为剪贴状态并将内容复制到剪贴板，支持 Excel 和 WPS',
          '支持 Ctrl + C 将单元格标记为复制状态并将内容复制到剪贴板，支持 Excel 和 WPS',
          '支持 Ctrl + V 将剪贴板的内容粘贴到指定区域中，支持 Excel 和 WPS',
          '支持 Ctrl + M 将选取的单元格合并或取消合并',
          '支持 Ctrl + F 查找数据，全表或指定区域查找数据',
          '支持 Ctrl + H 替换数据，全表或指定区域替换数据',
          '支持 ArrowUp 如果存在，则移动到上面的单元格',
          '支持 Shift + ArrowUp 如果存在，则往上面延伸单元格区域',
          '支持 ArrowDown 如果存在，则移动到下面的单元格',
          '支持 Shift + ArrowDown 如果存在，则往下面延伸单元格区域',
          '支持 ArrowLeft 如果存在，则移动到左边的单元格',
          '支持 Shift + ArrowLeft 如果存在，则往左边延伸单元格区域',
          '支持 ArrowRight 则移动到右边的单元格',
          '支持 Shift + ArrowRight 如果存在，则往右边延伸单元格区域',
          '支持 Tab 如果存在，则移动到右边单元格；如果存在区域，则在指定区域内移动；如果移动到最后一列，则从下一行开始移到，以此循环',
          '支持 Shift + Tab  如果存在，则移动到左边单元格，则在指定区域内移动；如果移动到第一列，则从上一行开始移到，以此循环',
          '支持 Enter 如果存在，取消单元格编辑并移动到下面的单元格，则在指定区域内移动；如果移动到最后一行，则从下一列开始移到，以此循环',
          '支持 Shift + Enter 如果存在，取消单元格编辑并移动到上面的单元格，则在指定区域内移动；如果移动到第一行，则从上一列开始移到，以此循环',
          '支持 Delete 清空指定区域内单元格内容，如果存在多重区域，则清空多重区域内的单元格内容',
          '支持 Backspace 清空当前活动单元格的内容并激活为编辑状态',
          '支持 F2 键激活当前活动单元格',
          '支持 Esc 键取消激活当前活动的单元格'
        ].join('\n')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.price-unit {
  font-size: 18px;
  color: #ff6700;
  padding: 0 5px;
  font-weight: 700;
}
.pro-desc {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}
.pro-price {
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  box-shadow: 1px 2px 10px #eee;
  background-color: #fff;
}
.pro-features {
  position: absolute;
  top: 20px;
  right: 25px;
}
.help-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 12px;
  border-radius: 50%;
  margin: 0 5px;
  color: #fff;
  background-color: #000;
  text-align: center;
  cursor: help;
}
.pro-preview {
  width: 1200px;
  margin: 0 auto;
  &:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .preview-item {
    width: 600px;
    height: 420px;
    float: left;
    width: 50%;
    padding: 10px;
  }
  .preview-contnet {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    box-shadow: 1px 2px 10px #eee;
    background-color: #fff;
  }
  .preview-title {
    margin: 0;
    padding-top: 15px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .preview-img {
    width: 100%;
  }
}
</style>
