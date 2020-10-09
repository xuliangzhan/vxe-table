"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxePager',
  props: {
    size: String,
    // 自定义布局
    layouts: {
      type: Array,
      default: function _default() {
        return _conf.default.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'];
      }
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: {
      type: Number,
      default: function _default() {
        return _conf.default.pager.pageSize || 10;
      }
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number,
      default: function _default() {
        return _conf.default.pager.pagerCount || 7;
      }
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array,
      default: function _default() {
        return _conf.default.pager.pageSizes || [10, 15, 20, 50, 100];
      }
    },
    // 列对其方式
    align: {
      type: String,
      default: function _default() {
        return _conf.default.pager.align;
      }
    },
    // 带边框
    border: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.border;
      }
    },
    // 带背景颜色
    background: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.background;
      }
    },
    // 默认的样式
    perfect: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.perfect;
      }
    },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isSizes: function isSizes() {
      return this.layouts.some(function (name) {
        return name === 'Sizes';
      });
    },
    pageCount: function pageCount() {
      return this.getPageCount(this.total, this.pageSize);
    },
    numList: function numList() {
      var len = this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount;
      var rest = [];

      for (var index = 0; index < len; index++) {
        rest.push(index);
      }

      return rest;
    },
    offsetNumber: function offsetNumber() {
      return Math.floor((this.pagerCount - 2) / 2);
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var vSize = this.vSize,
        align = this.align;
    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "align--".concat(align), align), _defineProperty(_ref, 'p--border', this.border), _defineProperty(_ref, 'p--background', this.background), _defineProperty(_ref, 'p--perfect', this.perfect), _defineProperty(_ref, 'is--loading', this.loading), _ref)]
    }, [h('div', {
      class: 'vxe-pager--wrapper'
    }, this.layouts.map(function (name) {
      return _this["render".concat(name)](h);
    }))]);
  },
  methods: {
    // 上一页
    renderPrevPage: function renderPrevPage(h) {
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.prevPage')
        },
        on: {
          click: this.prevPage
        }
      }, [h('i', {
        class: ['vxe-pager--btn-icon', this.iconPrevPage || _conf.default.icon.prevPage]
      })]);
    },
    // 向上翻页
    renderPrevJump: function renderPrevJump(h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.prevJump')
        },
        on: {
          click: this.prevJump
        }
      }, [tagName ? h('i', {
        class: ['vxe-pager--jump-more', this.iconJumpMore || _conf.default.icon.jumpMore]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpPrev || _conf.default.icon.jumpPrev]
      })]);
    },
    // number
    renderNumber: function renderNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h));
    },
    // jumpNumber
    renderJumpNumber: function renderJumpNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true));
    },
    // 向下翻页
    renderNextJump: function renderNextJump(h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.nextJump')
        },
        on: {
          click: this.nextJump
        }
      }, [tagName ? h('i', {
        class: ['vxe-pager--jump-more', this.iconJumpMore || _conf.default.icon.jumpMore]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpNext || _conf.default.icon.jumpNext]
      })]);
    },
    // 下一页
    renderNextPage: function renderNextPage(h) {
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.nextPage')
        },
        on: {
          click: this.nextPage
        }
      }, [h('i', {
        class: ['vxe-pager--btn-icon', this.iconNextPage || _conf.default.icon.nextPage]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var _this2 = this;

      return h('vxe-select', {
        class: 'vxe-pager--sizes',
        props: {
          placement: 'top'
        },
        model: {
          value: this.pageSize,
          callback: function callback(num) {
            return _this2.pageSizeEvent(num);
          }
        }
      }, this.pageSizes.map(function (num) {
        return h('vxe-option', {
          props: {
            value: num,
            label: "".concat(_xeUtils.default.template(_conf.default.i18n('vxe.pager.pagesize'), [num]))
          }
        });
      }));
    },
    // FullJump
    renderFullJump: function renderFullJump(h) {
      return this.renderJump(h, true);
    },
    // Jump
    renderJump: function renderJump(h, isFull) {
      return h('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? h('span', {
        class: 'vxe-pager--goto-text'
      }, _conf.default.i18n('vxe.pager.goto')) : null, h('input', {
        class: 'vxe-pager--goto',
        domProps: {
          value: this.currentPage
        },
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          keydown: this.jumpKeydownEvent,
          blur: this.triggerJumpEvent
        }
      }), isFull ? h('span', {
        class: 'vxe-pager--classifier-text'
      }, _conf.default.i18n('vxe.pager.pageClassifier')) : null]);
    },
    // PageCount
    renderPageCount: function renderPageCount(h) {
      return h('span', {
        class: 'vxe-pager--count'
      }, [h('span', {
        class: 'vxe-pager--separator'
      }), h('span', this.pageCount)]);
    },
    // total
    renderTotal: function renderTotal(h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, _xeUtils.default.template(_conf.default.i18n('vxe.pager.total'), [this.total]));
    },
    // number
    renderPageBtn: function renderPageBtn(h, showJump) {
      var _this3 = this;

      var numList = this.numList,
          currentPage = this.currentPage,
          pageCount = this.pageCount,
          pagerCount = this.pagerCount,
          offsetNumber = this.offsetNumber;
      var nums = [];
      var isOv = pageCount > pagerCount;
      var isLt = isOv && currentPage > offsetNumber + 1;
      var isGt = isOv && currentPage < pageCount - offsetNumber;
      var startNumber = 1;

      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }

      if (showJump && isLt) {
        nums.push(h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: function click() {
              return _this3.jumpPage(1);
            }
          }
        }, 1), this.renderPrevJump(h, 'li'));
      }

      numList.forEach(function (item, index) {
        var number = startNumber + index;

        if (number <= pageCount) {
          nums.push(h('li', {
            class: ['vxe-pager--num-btn', {
              'is--active': currentPage === number
            }],
            on: {
              click: function click() {
                return _this3.jumpPage(number);
              }
            },
            key: number
          }, number));
        }
      });

      if (showJump && isGt) {
        nums.push(this.renderNextJump(h, 'li'), h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: function click() {
              return _this3.jumpPage(pageCount);
            }
          }
        }, pageCount));
      }

      return nums;
    },
    getPageCount: function getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1);
    },
    prevPage: function prevPage() {
      var currentPage = this.currentPage;

      if (currentPage > 1) {
        this.jumpPage(Math.max(currentPage - 1, 1));
      }
    },
    nextPage: function nextPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPage(Math.min(currentPage + 1, pageCount));
      }
    },
    prevJump: function prevJump() {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1));
    },
    nextJump: function nextJump() {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount));
    },
    jumpPage: function jumpPage(currentPage) {
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);

        if (this.$listeners['current-change']) {
          _tools.UtilTools.warn('vxe.error.delEvent', ['current-change', 'page-change']);

          this.$emit('current-change', currentPage);
        }

        this.$emit('page-change', {
          type: 'current-change',
          pageSize: this.pageSize,
          currentPage: currentPage
        });
      }
    },
    pageSizeEvent: function pageSizeEvent(pageSize) {
      this.changePageSize(pageSize);
    },
    changePageSize: function changePageSize(pageSize) {
      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);

        if (this.$listeners['size-change']) {
          _tools.UtilTools.warn('vxe.error.delEvent', ['size-change', 'page-change']);

          this.$emit('size-change', pageSize);
        }

        this.$emit('page-change', {
          type: 'size-change',
          pageSize: pageSize,
          currentPage: Math.min(this.currentPage, this.getPageCount(this.total, pageSize))
        });
      }
    },
    jumpKeydownEvent: function jumpKeydownEvent(evnt) {
      if (evnt.keyCode === 13) {
        this.triggerJumpEvent(evnt);
      } else if (evnt.keyCode === 38) {
        evnt.preventDefault();
        this.nextPage();
      } else if (evnt.keyCode === 40) {
        evnt.preventDefault();
        this.prevPage();
      }
    },
    triggerJumpEvent: function triggerJumpEvent(evnt) {
      var value = _xeUtils.default.toNumber(evnt.target.value);

      var current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value;
      evnt.target.value = current;
      this.jumpPage(current);
    }
  }
};
exports.default = _default2;