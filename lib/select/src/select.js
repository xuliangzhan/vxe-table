"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _input = _interopRequireDefault(require("../../input/src/input"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function findOffsetOption(groupList, optionValue, isUpArrow) {
  var prevOption;
  var firstOption;
  var isMatchOption = false;

  for (var gIndex = 0; gIndex < groupList.length; gIndex++) {
    var group = groupList[gIndex];

    if (group.children.length) {
      for (var index = 0; index < group.children.length; index++) {
        var comp = group.children[index];

        if (!firstOption) {
          firstOption = comp;
        }

        if (isUpArrow) {
          if (optionValue === comp.value) {
            return {
              offsetOption: prevOption,
              firstOption: firstOption
            };
          }
        } else {
          if (isMatchOption) {
            return {
              offsetOption: comp,
              firstOption: firstOption
            };
          }

          if (optionValue === comp.value) {
            isMatchOption = true;
          }
        }

        prevOption = comp;
      }
    } else {
      var _comp = group.comp;

      if (!firstOption) {
        firstOption = _comp;
      }

      if (isUpArrow) {
        if (optionValue === _comp.value) {
          return {
            offsetOption: prevOption,
            firstOption: firstOption
          };
        }
      } else {
        if (isMatchOption) {
          return {
            offsetOption: _comp,
            firstOption: firstOption
          };
        }

        if (optionValue === _comp.value) {
          isMatchOption = true;
        }
      }

      prevOption = _comp;
    }
  }

  return {
    firstOption: firstOption
  };
}

function findOption(groupList, optionValue) {
  for (var gIndex = 0; gIndex < groupList.length; gIndex++) {
    var group = groupList[gIndex];

    if (group.children.length) {
      for (var index = 0; index < group.children.length; index++) {
        var comp = group.children[index];

        if (optionValue === comp.value) {
          return comp;
        }
      }
    } else {
      if (optionValue === group.comp.value) {
        return group.comp;
      }
    }
  }
}

var _default2 = {
  name: 'VxeSelect',
  props: {
    value: [String, Number],
    clearable: Boolean,
    placeholder: String,
    disabled: Boolean,
    prefixIcon: String,
    placement: String,
    size: String,
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.select.transfer;
      }
    }
  },
  components: {
    VxeInput: _input.default
  },
  provide: function provide() {
    return {
      $xeselect: this
    };
  },
  data: function data() {
    return {
      // 使用技巧去更新视图
      updateFlag: 0,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    selectLabel: function selectLabel() {
      if (this.updateFlag) {
        var selectOption = findOption(this.getOptions(), this.value);

        if (selectOption) {
          return selectOption.label;
        }
      }

      return '';
    }
  },
  created: function created() {
    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  mounted: function mounted() {
    if (this.transfer) {
      document.body.appendChild(this.$refs.panel);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref, _ref2;

    var vSize = this.vSize,
        transfer = this.transfer,
        isActivated = this.isActivated,
        disabled = this.disabled,
        clearable = this.clearable,
        placeholder = this.placeholder,
        selectLabel = this.selectLabel,
        animatVisible = this.animatVisible,
        visiblePanel = this.visiblePanel,
        panelStyle = this.panelStyle,
        prefixIcon = this.prefixIcon,
        panelPlacement = this.panelPlacement;
    return h('div', {
      class: ['vxe-select', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--visivle', visiblePanel), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--active', isActivated), _ref)]
    }, [h('vxe-input', {
      ref: 'input',
      props: {
        clearable: clearable,
        placeholder: placeholder,
        readonly: true,
        disabled: disabled,
        type: 'text',
        prefixIcon: prefixIcon,
        suffixIcon: visiblePanel ? _conf.default.icon.selectOpen : _conf.default.icon.selectClose,
        value: selectLabel
      },
      on: {
        clear: this.clearEvent,
        click: this.togglePanelEvent,
        focus: this.focusEvent,
        'suffix-click': this.togglePanelEvent
      }
    }), h('div', {
      ref: 'panel',
      class: ['vxe-dropdown--panel vxe-select--panel', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--transfer', transfer), _defineProperty(_ref2, 'animat--leave', animatVisible), _defineProperty(_ref2, 'animat--enter', visiblePanel), _ref2)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: panelStyle
    }, [h('div', {
      class: 'vxe-select-option--wrapper'
    }, this.$slots.default)])]);
  },
  methods: {
    getOptions: function getOptions() {
      var options = [];

      if (!this.disabled) {
        this.$children.forEach(function (option) {
          if (!option.isDisabled && option.$xeselect) {
            var children = option.$children;

            if (children.length) {
              children = children.filter(function (option) {
                return !option.isDisabled && option.$xeselect && option.$xeoptgroup;
              });

              if (children.length) {
                options.push({
                  comp: option,
                  children: children
                });
              }
            } else {
              options.push({
                comp: option,
                children: children
              });
            }
          }
        });
      }

      return options;
    },
    updateStatus: function updateStatus() {
      this.updateFlag++;
    },
    setCurrentOption: function setCurrentOption(option) {
      var _this = this;

      if (option) {
        this.currentValue = option.value;
        this.$nextTick(function () {
          _tools.DomTools.toView(_this.$refs.panel.querySelector("[data-option-id='".concat(option.id, "']")));
        });
      }
    },
    clearEvent: function clearEvent(params, evnt) {
      this.clearValueEvent(evnt, null);
      this.hideOptionPanel();
    },
    clearValueEvent: function clearValueEvent(evnt, selectValue) {
      this.changeEvent(evnt, selectValue);
      this.$emit('clear', {
        value: selectValue
      }, evnt);
    },
    changeEvent: function changeEvent(evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue);
        this.$emit('change', {
          value: selectValue
        }, evnt);
      }
    },
    changeOptionEvent: function changeOptionEvent(evnt, selectValue) {
      this.changeEvent(evnt, selectValue);
      this.hideOptionPanel();
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        this.isActivated = _tools.DomTools.getEventTargetNode(evnt, $el).flag || _tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (visiblePanel && !this.isActivated) {
          this.hideOptionPanel();
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var visiblePanel = this.visiblePanel,
          currentValue = this.currentValue,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isEnter = keyCode === 13;
        var isUpArrow = keyCode === 38;
        var isDwArrow = keyCode === 40;
        var isDel = keyCode === 46;

        if (isTab) {
          this.isActivated = false;
        }

        if (visiblePanel) {
          if (isTab) {
            this.hideOptionPanel();
          } else if (isEnter) {
            this.changeOptionEvent(evnt, currentValue);
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();
            var groupList = this.getOptions();

            var _findOffsetOption = findOffsetOption(groupList, currentValue, isUpArrow),
                offsetOption = _findOffsetOption.offsetOption,
                firstOption = _findOffsetOption.firstOption;

            if (!offsetOption && !findOption(groupList, currentValue)) {
              offsetOption = firstOption;
            }

            this.setCurrentOption(offsetOption);
          }
        } else if (isEnter && this.isActivated) {
          this.showOptionPanel();
        }

        if (isDel && clearable && this.isActivated) {
          this.clearValueEvent(evnt, null);
        }
      }
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      if (!_tools.DomTools.getEventTargetNode(evnt, this.$el).flag && !_tools.DomTools.getEventTargetNode(evnt, this.$refs.panel).flag) {
        this.hideOptionPanel();
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      this.hideOptionPanel();
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    focusEvent: function focusEvent() {
      if (!this.disabled) {
        this.isActivated = true;
      }
    },
    togglePanelEvent: function togglePanelEvent(params, evnt) {
      evnt.preventDefault();

      if (this.visiblePanel) {
        this.hideOptionPanel();
      } else {
        this.showOptionPanel();
      }
    },
    showOptionPanel: function showOptionPanel() {
      var _this2 = this;

      if (!this.disabled) {
        clearTimeout(this.hidePanelTimeout);
        this.isActivated = true;
        this.animatVisible = true;
        setTimeout(function () {
          _this2.visiblePanel = true;

          _this2.setCurrentOption(findOption(_this2.getOptions(), _this2.value));
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hideOptionPanel: function hideOptionPanel() {
      var _this3 = this;

      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this3.animatVisible = false;
      }, 200);
    },
    updatePlacement: function updatePlacement() {
      var _this4 = this;

      this.$nextTick(function () {
        var $refs = _this4.$refs,
            transfer = _this4.transfer,
            placement = _this4.placement,
            panelIndex = _this4.panelIndex;
        var inputElem = $refs.input.$el;
        var panelElem = $refs.panel;
        var inputHeight = inputElem.offsetHeight;
        var inputWidth = inputElem.offsetWidth;
        var panelHeight = panelElem.offsetHeight;
        var panelStyle = {
          zIndex: panelIndex
        };

        var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(inputElem),
            boundingTop = _DomTools$getAbsolute.boundingTop,
            boundingLeft = _DomTools$getAbsolute.boundingLeft,
            visibleHeight = _DomTools$getAbsolute.visibleHeight;

        var panelPlacement = 'bottom';

        if (transfer) {
          var left = boundingLeft;
          var top = boundingTop + inputHeight;

          if (placement === 'top') {
            panelPlacement = 'top';
            top = boundingTop - panelHeight;
          } else {
            // 如果下面不够放，则向上
            if (top + panelHeight > visibleHeight) {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } // 如果上面不够放，则向下（优先）


            if (top < 0) {
              panelPlacement = 'bottom';
              top = boundingTop + inputHeight;
            }
          }

          Object.assign(panelStyle, {
            left: "".concat(left, "px"),
            top: "".concat(top, "px"),
            minWidth: "".concat(inputWidth, "px")
          });
        } else {
          if (placement === 'top') {
            panelPlacement = 'top';
            panelStyle.bottom = "".concat(inputHeight, "px");
          } else {
            // 如果下面不够放，则向上
            if (boundingTop + inputHeight + panelHeight > visibleHeight) {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(inputHeight, "px");
            }
          }
        }

        _this4.panelStyle = panelStyle;
        _this4.panelPlacement = panelPlacement;
      });
    },
    focus: function focus() {
      this.showOptionPanel();
      return this.$nextTick();
    },
    blur: function blur() {
      this.hideOptionPanel();
      return this.$nextTick();
    }
  }
};
exports.default = _default2;