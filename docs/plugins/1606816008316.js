(function () {
  function createItem (item) {
    return `
    <li>
      <div class="header">
        <div class="title">
          <i id="proBase" class="help-icon" title="${item.features.replace(/"/g, '\'')}">?</i>
          <a id="${item.name}" class="demo-link">${item.title}</a>
          <span class="price">（￥${item.price}）</span>
          <i class="price-icon">!</i>
        </div>
      </div>
      <img class="preview-img" src="./${item.name}.gif">
    </li>
    `
  }

  function createList (list) {
    var html = ''
    list.forEach(function (item) {
      html += createItem(item)
    })
    return html
  }

  const defPriceHelp = '购买授权后可用于个人或商用项目中，永久授权'
  const proPriceHelp = '购买授权后可用于个人或商用项目中，永久授权，提供技术支持群'

  const proPrice = '￥1000<span class="price-unit">-发布版</span></span>'
  document.getElementById('proTitle').innerHTML = `<span>PRO</span><span class="price">（${proPrice}）</span><i id="proPriceHelp" class="price-icon">!<a href="auth.html">查询授权</a></i>`
  document.getElementById('proPriceHelp').title = proPriceHelp

  const proFeatures = {
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
  document.getElementById('proDesc').innerHTML = '<i id="proMouse" class="help-icon">?</i>鼠标操作、<i id="proKeyboard" class="help-icon">?</i>快捷键操作'
  document.getElementById('proMouse').title = proFeatures.mouse
  document.getElementById('proKeyboard').title = proFeatures.keyboard

  var proList = [
    {
      title: '鼠标区域选取',
      name: 'proArea'
    },
    {
      title: '鼠标多重区域选取、延伸扩大区域',
      name: 'proMultiArea'
    },
    {
      title: '固定列区域选取',
      name: 'proFixedAera'
    },
    {
      title: '复制、剪贴、粘贴',
      name: 'proClip'
    },
    {
      title: '合并、取消合并',
      name: 'proMerge'
    },
    {
      title: '查找和替换',
      name: 'proFNR'
    },
    {
      title: '更多实用的快捷键',
      name: 'proKeyboard'
    },
    {
      title: '更多实用的快捷菜单',
      name: 'proContextmenu'
    },
    {
      title: '集成 echarts 图表渲染',
      name: 'proCharts'
    },
    {
      title: '同时支持区域选取、虚拟滚动',
      name: 'proVirtualScroll'
    },
    {
      title: '同时支持区域选取、虚拟滚动、虚拟合并',
      name: 'proVirtualMergeScroll'
    }
  ]

  document.getElementById('proWrapper').innerHTML = proList.map(item => {
    return `
    <li title="${item.title.replace(/"/g, '\'')}">
      <div class="header">
        <div class="title">${item.title}</div>
      </div>
      <img class="preview-img" src="./${item.name}.gif">
    </li>
    `
  }).join('')

  var filterList = [
    {
      name: 'FilterComplexInput',
      title: '筛选内容',
      features: [
        '筛选内容：',
        '支持固定列',
        '支持回车筛选',
        '支持关键字模糊匹配',
        '支持关键字精准匹配',
        '支持匹配已关键字开头',
        '支持匹配已关键字结尾',
        '支持匹配空值'
      ].join('\n'),
      price: '50<span class="price-unit">-源码</span>'
    },
    {
      name: 'FilterCombination',
      title: '组合筛选',
      features: [
        '组合筛选：',
        '支持排序',
        '支持固定列',
        '支持搜索内容区域虚拟渲染',
        '支持根据单元格的值进行筛选',
        '支持关键字包含匹配',
        '支持关键字不包含匹配',
        '支持关键字等于匹配',
        '支持关键字不等于匹配',
        '支持关键字开头匹配',
        '支持非关键字开头匹配',
        '支持关键字结尾匹配',
        '支持非关键字结尾匹配',
        '支持数值筛选小于指定值',
        '支持数值筛选小于或等于指定值',
        '支持数值筛选大于指定值',
        '支持数值筛选大于或等于指定值',
        '支持匹配空值',
        '通配符：',
        '?（代表任意单个字符）*（代表任意字符）~（用于匹配通配符）',
        '例如：',
        '输入 "a*" 可查找到 "axxx"',
        '输入 "a?" 可查找到 "ax"',
        '输入 "~?" 可查找到 "?"',
        '输入 "~*" 可查找到 "*"',
        '输入 "~~" 可查找到 "~"'
      ].join('\n'),
      price: '300<span class="price-unit">-源码</span>'
    }
  ]
  document.getElementById('filterWrapper').innerHTML = createList(filterList)

  // var editList = [
  //   {
  //     name: 'EditDownTextarea',
  //     title: '下拉文本域',
  //     features: '下拉文本域：\n支持单元格点击弹出下拉文本域\n支持文本域实时统计字符',
  //     price: '100<span class="price-unit">-源码</span>'
  //   },
  //   {
  //     name: 'EditPopupTextarea',
  //     title: '弹窗文本域',
  //     features: '弹窗文本域：\n支持单元格点击弹出文本域编辑窗口\n支持文本域窗口大小缩放\n支持文本域窗口全屏\n支持文本域实时统计字符',
  //     price: '100<span class="price-unit">-源码</span>'
  //   }
  // ]
  // document.getElementById('editWrapper').innerHTML = createList(editList)

  Array.from(document.querySelectorAll('.price-icon')).forEach(function (iconElem) {
    if (!iconElem.title) {
      iconElem.title = defPriceHelp.replace(/"/g, '\'')
    }
  })
})()
