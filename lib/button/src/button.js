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

var _default = {
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    name: [String, Number],
    content: String,
    status: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },
  data: function data() {
    return {
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isText: function isText() {
      return this.type === 'text';
    },
    isFormBtn: function isFormBtn() {
      return ['submit', 'reset', 'button'].indexOf(this.type) > -1;
    },
    btnType: function btnType() {
      return this.isText ? this.type : 'button';
    },
    btnStatus: function btnStatus() {
      return this.status || (this.type === 'primary' ? this.type : null);
    }
  },
  created: function created() {
    if (this.type === 'primary') {
      _tools.UtilTools.warn('vxe.error.delProp', ['type=primary', 'status=primary']);
    }
  },
  render: function render(h) {
    var _ref,
        _ref2,
        _this = this,
        _ref3;

    var $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners,
        type = this.type,
        isText = this.isText,
        isFormBtn = this.isFormBtn,
        btnStatus = this.btnStatus,
        btnType = this.btnType,
        vSize = this.vSize,
        name = this.name,
        disabled = this.disabled,
        loading = this.loading,
        showPanel = this.showPanel,
        animatVisible = this.animatVisible;
    return $scopedSlots.dropdowns ? h('div', {
      class: ['vxe-button--dropdown', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--active', showPanel), _ref)]
    }, [h('button', {
      class: ['vxe-button', "type--".concat(btnType), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, "theme--".concat(btnStatus), btnStatus && !isText), _defineProperty(_ref2, 'is--disabled', disabled || loading), _defineProperty(_ref2, 'is--loading', loading), _ref2)],
      attrs: {
        name: name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: Object.assign({
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }, _xeUtils.default.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, {}, evnt);
        };
      }))
    }, this.renderContent(h).concat([h('i', {
      class: "vxe-button--dropdown-arrow ".concat(_conf.default.icon.dropdownBtn)
    })])), h('div', {
      ref: 'panel',
      class: ['vxe-button--dropdown-panel', {
        'animat--leave': animatVisible,
        'animat--enter': showPanel
      }],
      style: this.panelStyle
    }, [h('div', {
      class: 'vxe-button--dropdown-wrapper',
      on: {
        click: this.clickDropdownEvent,
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }
    }, $scopedSlots.dropdowns.call(this))])]) : h('button', {
      class: ['vxe-button', "type--".concat(btnType), (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, "theme--".concat(btnStatus), btnStatus && !isText), _defineProperty(_ref3, 'is--disabled', disabled || loading), _defineProperty(_ref3, 'is--loading', loading), _ref3)],
      attrs: {
        name: name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: _xeUtils.default.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, {}, evnt);
        };
      })
    }, this.renderContent(h));
  },
  methods: {
    renderContent: function renderContent(h) {
      var $scopedSlots = this.$scopedSlots,
          content = this.content,
          icon = this.icon,
          loading = this.loading;
      var contents = [];

      if (loading) {
        contents.push(h('i', {
          class: ['vxe-button--loading-icon', _conf.default.icon.btnLoading]
        }));
      } else if (icon) {
        contents.push(h('i', {
          class: ['vxe-button--icon', icon]
        }));
      }

      if ($scopedSlots.default) {
        contents.push(h('span', {
          class: 'vxe-button--content'
        }, $scopedSlots.default.call(this)));
      } else if (content) {
        contents.push(h('span', {
          class: 'vxe-button--content'
        }, [_tools.UtilTools.getFuncText(content)]));
      }

      return contents;
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    clickDropdownEvent: function clickDropdownEvent(evnt) {
      var _this2 = this;

      var dropdownElem = evnt.currentTarget;
      var wrapperElem = this.$refs.panel;

      var _DomTools$getEventTar = _tools.DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button'),
          flag = _DomTools$getEventTar.flag,
          targetElem = _DomTools$getEventTar.targetElem;

      if (flag) {
        wrapperElem.dataset.active = 'N';
        this.showPanel = false;
        setTimeout(function () {
          if (wrapperElem.dataset.active !== 'Y') {
            _this2.animatVisible = false;
          }
        }, 200);

        _tools.UtilTools.emitEvent(this, 'dropdown-click', [{
          name: targetElem.getAttribute('name')
        }, evnt]);
      }
    },
    mouseenterEvent: function mouseenterEvent() {
      var _this3 = this;

      var wrapperElem = this.$refs.panel;
      this.updateZindex();
      this.panelStyle = {
        zIndex: this.panelIndex
      };
      wrapperElem.dataset.active = 'Y';
      this.animatVisible = true;
      setTimeout(function () {
        if (wrapperElem.dataset.active === 'Y') {
          _this3.showPanel = true;
        }
      }, 10);
    },
    mouseleaveEvent: function mouseleaveEvent() {
      var _this4 = this;

      var wrapperElem = this.$refs.panel;
      wrapperElem.dataset.active = 'N';
      setTimeout(function () {
        if (wrapperElem.dataset.active !== 'Y') {
          _this4.showPanel = false;
          setTimeout(function () {
            if (wrapperElem.dataset.active !== 'Y') {
              _this4.animatVisible = false;
            }
          }, 200);
        }
      }, 200);
    }
  }
};
exports.default = _default;