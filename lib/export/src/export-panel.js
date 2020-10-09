"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _modal = _interopRequireDefault(require("../../modal/src/modal"));

var _input = _interopRequireDefault(require("../../input/src/input"));

var _checkbox = _interopRequireDefault(require("../../checkbox/src/checkbox"));

var _select = _interopRequireDefault(require("../../select/src/select"));

var _option = _interopRequireDefault(require("../../select/src/option"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal: _modal.default,
    VxeInput: _input.default,
    VxeCheckbox: _checkbox.default,
    VxeSelect: _select.default,
    VxeOption: _option.default
  },
  data: function data() {
    return {
      isAll: false,
      isIndeterminate: false,
      loading: false
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    showSheet: function showSheet() {
      return ['html', 'xml', 'xlsx'].indexOf(this.defaultOptions.type) > -1;
    }
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        isAll = this.isAll,
        isIndeterminate = this.isIndeterminate,
        showSheet = this.showSheet,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData;
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback: function callback(value) {
          storeData.visible = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.export.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        show: this.showEvent
      }
    }, [h('div', {
      class: 'vxe-export--panel'
    }, [h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [h('tbody', [[h('tr', [h('td', _conf.default.i18n('vxe.export.expName')), h('td', [h('vxe-input', {
      ref: 'filename',
      model: {
        value: defaultOptions.filename,
        callback: function callback(value) {
          defaultOptions.filename = value;
        }
      },
      props: {
        type: 'text',
        clearable: true,
        placeholder: _conf.default.i18n('vxe.export.expNamePlaceholder')
      }
    })])]), h('tr', [h('td', _conf.default.i18n('vxe.export.expType')), h('td', [h('vxe-select', {
      model: {
        value: defaultOptions.type,
        callback: function callback(value) {
          defaultOptions.type = value;
        }
      }
    }, storeData.typeList.map(function (item) {
      return h('vxe-option', {
        props: {
          value: item.value,
          label: _conf.default.i18n(item.label)
        }
      });
    }))])]), showSheet ? h('tr', [h('td', _conf.default.i18n('vxe.export.expSheetName')), h('td', [h('vxe-input', {
      model: {
        value: defaultOptions.sheetName,
        callback: function callback(value) {
          defaultOptions.sheetName = value;
        }
      },
      props: {
        type: 'text',
        clearable: true,
        placeholder: _conf.default.i18n('vxe.export.expSheetNamePlaceholder')
      }
    })])]) : _e(), h('tr', [h('td', _conf.default.i18n('vxe.export.expMode')), h('td', [h('vxe-select', {
      model: {
        value: defaultOptions.mode,
        callback: function callback(value) {
          defaultOptions.mode = value;
        }
      }
    }, storeData.modeList.map(function (item) {
      return h('vxe-option', {
        props: {
          value: item.value,
          label: _conf.default.i18n(item.label)
        }
      });
    }))])]), h('tr', [h('td', [_conf.default.i18n('vxe.export.expColumn')]), h('td', [h('div', {
      class: 'vxe-export--panel-column'
    }, [h('ul', {
      class: 'vxe-export--panel-column-header'
    }, [h('li', {
      class: ['vxe-export--panel-column-option', {
        'is--checked': isAll,
        'is--indeterminate': isIndeterminate
      }],
      attrs: {
        title: _conf.default.i18n('vxe.table.allTitle')
      },
      on: {
        click: this.allColumnEvent
      }
    }, [h('i', {
      class: 'vxe-checkbox--icon'
    }), _conf.default.i18n('vxe.export.expCurrentColumn')])]), h('ul', {
      class: 'vxe-export--panel-column-body'
    }, storeData.columns.map(function (column) {
      var headerTitle = column.getTitle();
      return h('li', {
        class: ['vxe-export--panel-column-option', {
          'is--checked': column.checked,
          'is--disabled': column.disabled
        }],
        attrs: {
          title: headerTitle
        },
        on: {
          click: function click() {
            if (!column.disabled) {
              column.checked = !column.checked;

              _this.checkStatus();
            }
          }
        }
      }, [h('i', {
        class: 'vxe-checkbox--icon'
      }), headerTitle]);
    }))])])]), h('tr', [h('td', _conf.default.i18n('vxe.export.expOpts')), h('td', [h('vxe-checkbox', {
      model: {
        value: defaultOptions.isHeader,
        callback: function callback(value) {
          defaultOptions.isHeader = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.export.expHeaderTitle')
      }
    }, _conf.default.i18n('vxe.export.expOptHeader')), h('vxe-checkbox', {
      model: {
        value: defaultOptions.isFooter,
        callback: function callback(value) {
          defaultOptions.isFooter = value;
        }
      },
      props: {
        disabled: !storeData.hasFooter,
        title: _conf.default.i18n('vxe.export.expFooterTitle')
      }
    }, _conf.default.i18n('vxe.export.expOptFooter')), h('vxe-checkbox', {
      model: {
        value: defaultOptions.original,
        callback: function callback(value) {
          defaultOptions.original = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.export.expOriginalTitle')
      }
    }, _conf.default.i18n('vxe.export.expOptOriginal'))])])]])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      on: {
        click: this.printEvent
      }
    }, _conf.default.i18n('vxe.export.expPrint')), h('vxe-button', {
      props: {
        status: 'primary'
      },
      on: {
        click: this.exportEvent
      }
    }, _conf.default.i18n('vxe.export.expConfirm'))])])]);
  },
  methods: {
    checkStatus: function checkStatus() {
      var columns = this.storeData.columns;
      this.isAll = columns.every(function (column) {
        return column.disabled || column.checked;
      });
      this.isIndeterminate = !this.isAll && columns.some(function (column) {
        return !column.disabled && column.checked;
      });
    },
    allColumnEvent: function allColumnEvent() {
      var isAll = !this.isAll;
      this.storeData.columns.forEach(function (column) {
        if (!column.disabled) {
          column.checked = isAll;
        }
      });
      this.isAll = isAll;
      this.checkStatus();
    },
    showEvent: function showEvent() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.filename.focus();
      });
      this.checkStatus();
    },
    getExportOption: function getExportOption() {
      var storeData = this.storeData,
          defaultOptions = this.defaultOptions;
      return Object.assign({
        columns: storeData.columns.filter(function (column) {
          return column.checked;
        })
      }, defaultOptions);
    },
    printEvent: function printEvent() {
      var $xetable = this.$parent;
      this.storeData.visible = false;
      $xetable.print(Object.assign({}, $xetable.printOpts, this.getExportOption()));
    },
    exportEvent: function exportEvent() {
      var _this3 = this;

      var $xetable = this.$parent;
      this.loading = true;
      $xetable.exportData(Object.assign({}, $xetable.exportOpts, this.getExportOption())).then(function () {
        _this3.loading = false;
        _this3.storeData.visible = false;
      });
    }
  }
};
exports.default = _default;