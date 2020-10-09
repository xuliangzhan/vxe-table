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

function getNumberDecimal(num) {
  return (('' + num).split('.')[1] || '').length;
}

function addition(num1, num2) {
  var ratio = Math.pow(10, Math.max(getNumberDecimal(num1), getNumberDecimal(num2)));
  return (num1 * ratio + num2 * ratio) / ratio;
}

function subtraction(num1, num2) {
  var digit1 = getNumberDecimal(num1);
  var digit2 = getNumberDecimal(num2);
  var ratio = Math.pow(10, Math.max(digit1, digit2));
  var precision = digit1 >= digit2 ? digit1 : digit2;
  return parseFloat(((num1 * ratio - num2 * ratio) / ratio).toFixed(precision));
}

function renderDefaultInput(h, _vm) {
  var inpAttrs = _vm.inpAttrs,
      inpEvents = _vm.inpEvents,
      value = _vm.value;
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: value
    },
    attrs: inpAttrs,
    on: inpEvents
  });
}

function renderDateInput(h, _vm) {
  var inpAttrs = _vm.inpAttrs,
      inpEvents = _vm.inpEvents,
      inputValue = _vm.inputValue;
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: inputValue
    },
    attrs: inpAttrs,
    on: inpEvents
  });
}

function renderDateDayTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      dateValue = _vm.dateValue,
      datePanelValue = _vm.datePanelValue,
      weekDatas = _vm.weekDatas,
      dayDatas = _vm.dayDatas;
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('thead', [h('tr', weekDatas.map(function (day) {
    return h('th', _conf.default.i18n("vxe.input.date.weeks.w".concat(day)));
  }))]), h('tbody', dayDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--today': item.isToday,
          'is--next': item.isNext,
          'is--selected': _xeUtils.default.isDateSame(dateValue, item.date, 'yyyy-MM-dd'),
          'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, 'yyyy-MM-dd')
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, item.label);
    }));
  }))])];
}

function renderDateMonthTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      monthDatas = _vm.monthDatas,
      datePanelValue = _vm.datePanelValue;
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('tbody', monthDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, 'MM')
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, _conf.default.i18n("vxe.input.date.months.m".concat(item.month)));
    }));
  }))])];
}

function renderDateYearTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      yearDatas = _vm.yearDatas,
      datePanelValue = _vm.datePanelValue;
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('tbody', yearDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, 'yyyy')
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, item.year);
    }));
  }))])];
}

function renderDateTable(h, _vm) {
  var datePanelType = _vm.datePanelType;

  if (datePanelType === 'month') {
    return renderDateMonthTable(h, _vm);
  } else if (datePanelType === 'year') {
    return renderDateYearTable(h, _vm);
  }

  return renderDateDayTable(h, _vm);
}

function rendeDatePanel(h, _vm) {
  var datePanelType = _vm.datePanelType,
      selectDatePanelLabel = _vm.selectDatePanelLabel;
  return [h('div', {
    class: 'vxe-input--date-picker-header'
  }, [h('div', {
    class: 'vxe-input--date-picker-type-wrapper'
  }, [datePanelType === 'year' ? h('span', {
    class: 'vxe-input--date-picker-label'
  }, selectDatePanelLabel) : h('span', {
    class: 'vxe-input--date-picker-btn',
    on: {
      click: _vm.dateToggleTypeEvent
    }
  }, selectDatePanelLabel)]), h('div', {
    class: 'vxe-input--date-picker-btn-wrapper'
  }, [h('span', {
    class: 'vxe-input--date-picker-btn vxe-input--date-picker-prev-btn',
    attrs: {
      title: _conf.default.i18n('vxe.input.date.prevMonth')
    },
    on: {
      click: _vm.datePrevMonthEvent
    }
  }, [h('i', {
    class: 'vxe-icon--caret-left'
  })]), h('span', {
    class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
    attrs: {
      title: _conf.default.i18n('vxe.input.date.today')
    },
    on: {
      click: _vm.dateTodayMonthEvent
    }
  }, [h('i', {
    class: 'vxe-icon--dot'
  })]), h('span', {
    class: 'vxe-input--date-picker-btn vxe-input--date-picker-next-btn',
    attrs: {
      title: _conf.default.i18n('vxe.input.date.nextMonth')
    },
    on: {
      click: _vm.dateNextMonthEvent
    }
  }, [h('i', {
    class: 'vxe-icon--caret-right'
  })])])]), h('div', {
    class: 'vxe-input--date-picker-body'
  }, renderDateTable(h, _vm))];
}

function renderPanel(h, _vm) {
  var _ref;

  var type = _vm.type,
      vSize = _vm.vSize,
      isDatePicker = _vm.isDatePicker,
      transfer = _vm.transfer,
      animatVisible = _vm.animatVisible,
      visiblePanel = _vm.visiblePanel,
      panelPlacement = _vm.panelPlacement,
      panelStyle = _vm.panelStyle;
  return isDatePicker ? h('div', {
    ref: 'panel',
    class: ['vxe-dropdown--panel vxe-input--panel', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--transfer', transfer), _defineProperty(_ref, 'animat--leave', animatVisible), _defineProperty(_ref, 'animat--enter', visiblePanel), _ref)],
    attrs: {
      'data-placement': panelPlacement
    },
    style: panelStyle
  }, [h('div', {
    class: 'vxe-input--panel-wrapper'
  }, rendeDatePanel(h, _vm))]) : null;
}

function renderNumberIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--number'
  }, [h('span', {
    class: 'vxe-input--number-prev',
    on: {
      click: _vm.numberPrevEvent
    }
  }, [h('i', {
    class: ['vxe-input--number-prev-icon', _conf.default.icon.inputPrevNum]
  })]), h('span', {
    class: 'vxe-input--number-next',
    on: {
      click: _vm.numberNextEvent
    }
  }, [h('i', {
    class: ['vxe-input--number-next-icon', _conf.default.icon.inputNextNum]
  })])]);
}

function renderPasswordIcon(h, _vm) {
  var showPwd = _vm.showPwd;
  return h('span', {
    class: 'vxe-input--password',
    on: {
      click: _vm.passwordToggleEvent
    }
  }, [h('i', {
    class: ['vxe-input--pwd-icon', showPwd ? _conf.default.icon.inputShowPwd : _conf.default.icon.inputPwd]
  })]);
}

function rendePrefixIcon(h, _vm) {
  var prefixIcon = _vm.prefixIcon;
  return prefixIcon ? h('span', {
    class: 'vxe-input--prefix',
    on: {
      click: _vm.clickPrefixEvent
    }
  }, [h('i', {
    class: ['vxe-input--prefix-icon', prefixIcon]
  })]) : null;
}

function renderSuffixIcon(h, _vm) {
  var value = _vm.value,
      isClearable = _vm.isClearable,
      disabled = _vm.disabled,
      suffixIcon = _vm.suffixIcon;
  return isClearable || suffixIcon ? h('span', {
    class: ['vxe-input--suffix', {
      'is--clear': isClearable && !disabled && !(value === '' || _xeUtils.default.eqNull(value))
    }],
    on: {
      click: _vm.clickSuffixEvent
    }
  }, [suffixIcon ? h('i', {
    class: ['vxe-input--suffix-icon', suffixIcon]
  }) : null, isClearable ? h('i', {
    class: ['vxe-input--clear-icon', _conf.default.icon.inputClear]
  }) : null]) : null;
}

function renderExtraPrefixIcon(h, _vm) {
  var isDatePicker = _vm.isDatePicker;
  return isDatePicker ? h('span', {
    class: 'vxe-input--extra-prefix'
  }, [h('span', {
    class: 'vxe-input--date-picker'
  }, [h('i', {
    class: ['vxe-input--date-picker-icon', _conf.default.icon.inputDate]
  })])]) : null;
}

function renderExtraSuffixIcon(h, _vm) {
  var isPassword = _vm.isPassword,
      isNumber = _vm.isNumber,
      isDatePicker = _vm.isDatePicker;
  return isPassword || isNumber || isDatePicker ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [isPassword ? renderPasswordIcon(h, _vm) : null, isNumber ? renderNumberIcon(h, _vm) : null]) : null;
}

var _default2 = {
  name: 'VxeInput',
  props: {
    value: [String, Number, Date],
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: function _default() {
        return _conf.default.input.clearable;
      }
    },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    autocomplete: {
      type: String,
      default: 'off'
    },
    form: String,
    labelFormat: {
      type: String,
      default: function _default() {
        return _conf.default.input.labelFormat;
      }
    },
    parseFormat: {
      type: String,
      default: function _default() {
        return _conf.default.input.parseFormat;
      }
    },
    valueFormat: {
      type: String,
      default: function _default() {
        return _conf.default.input.valueFormat;
      }
    },
    startWeek: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.input.startWeek;
      }
    },
    size: String,
    step: [String, Number],
    prefixIcon: String,
    suffixIcon: String,
    placement: String,
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.input.transfer;
      }
    }
  },
  data: function data() {
    return {
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      animatVisible: false,
      panelStyle: null,
      panelPlacement: null,
      isActivated: false,
      inputValue: '',
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isNumber: function isNumber() {
      return ['number', 'integer'].indexOf(this.type) > -1;
    },
    isDatePicker: function isDatePicker() {
      return ['date', 'month', 'year'].indexOf(this.type) > -1;
    },
    isPassword: function isPassword() {
      return this.type === 'password';
    },
    stepValue: function stepValue() {
      return (this.type === 'integer' ? _xeUtils.default.toInteger(this.step) : _xeUtils.default.toNumber(this.step)) || 1;
    },
    isClearable: function isClearable() {
      return this.clearable && (this.isPassword || this.isNumber || this.type === 'text' || this.type === 'search');
    },
    dateValue: function dateValue() {
      var value = this.value;
      return value ? _xeUtils.default.toStringDate(value, this.dateLabelFormat) : null;
    },
    dateLabelFormat: function dateLabelFormat() {
      var labelFormat = this.labelFormat;

      if (labelFormat) {
        return labelFormat;
      }

      return 'yyyy-MM-dd';
    },
    selectDatePanelLabel: function selectDatePanelLabel() {
      var datePanelType = this.datePanelType,
          selectMonth = this.selectMonth,
          yearList = this.yearList;
      var year = '';
      var month;

      if (selectMonth) {
        year = selectMonth.getFullYear();
        month = selectMonth.getMonth() + 1;
      }

      if (datePanelType === 'month') {
        return _xeUtils.default.template(_conf.default.i18n('vxe.input.date.monthLabel'), [year]);
      } else if (datePanelType === 'year') {
        return yearList.length ? "".concat(yearList[0].year, " - ").concat(yearList[yearList.length - 1].year) : '';
      }

      return _xeUtils.default.template(_conf.default.i18n('vxe.input.date.dayLabel'), [year, month ? _conf.default.i18n("vxe.input.date.m".concat(month)) : '-']);
    },
    weekDatas: function weekDatas() {
      var startWeek = _xeUtils.default.toNumber(this.startWeek);

      var weeks = [startWeek];

      for (var index = 0; index < 6; index++) {
        if (startWeek >= 6) {
          startWeek = 0;
        } else {
          startWeek++;
        }

        weeks.push(startWeek);
      }

      return weeks;
    },
    yearList: function yearList() {
      var selectMonth = this.selectMonth;
      var months = [];

      if (selectMonth) {
        for (var index = 0; index < 16; index++) {
          var date = _xeUtils.default.getWhatYear(selectMonth, index, 'first');

          months.push({
            date: date,
            year: date.getFullYear()
          });
        }
      }

      return months;
    },
    yearDatas: function yearDatas() {
      return _xeUtils.default.chunk(this.yearList, 4);
    },
    monthList: function monthList() {
      var selectMonth = this.selectMonth;
      var months = [];

      if (selectMonth) {
        for (var index = 0; index < 12; index++) {
          var date = _xeUtils.default.getWhatYear(selectMonth, 0, index);

          months.push({
            date: date,
            month: index
          });
        }
      }

      return months;
    },
    monthDatas: function monthDatas() {
      return _xeUtils.default.chunk(this.monthList, 4);
    },
    dayList: function dayList() {
      var weekDatas = this.weekDatas,
          selectMonth = this.selectMonth,
          currentDate = this.currentDate;
      var days = [];

      if (selectMonth && currentDate) {
        var currentMonth = selectMonth.getMonth();
        var selectDay = selectMonth.getDay();
        var prevOffsetDay = -weekDatas.indexOf(selectDay);
        var prevDaySize = Math.abs(prevOffsetDay);

        var startDay = _xeUtils.default.getWhatDay(selectMonth, prevOffsetDay);

        for (var index = 0; index < 42; index++) {
          var date = _xeUtils.default.getWhatDay(startDay, index);

          var isPrev = index < prevDaySize;
          days.push({
            date: date,
            isPrev: isPrev,
            isCurrent: date.getFullYear() === selectMonth.getFullYear() && date.getMonth() === selectMonth.getMonth(),
            isToday: date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate(),
            isNext: !isPrev && currentMonth !== date.getMonth(),
            label: date.getDate()
          });
        }
      }

      return days;
    },
    dayDatas: function dayDatas() {
      return _xeUtils.default.chunk(this.dayList, 7);
    },
    inpAttrs: function inpAttrs() {
      var isDatePicker = this.isDatePicker,
          isPassword = this.isPassword,
          type = this.type,
          name = this.name,
          placeholder = this.placeholder,
          readonly = this.readonly,
          disabled = this.disabled,
          maxlength = this.maxlength,
          form = this.form,
          autocomplete = this.autocomplete,
          showPwd = this.showPwd;
      var attrs = {
        name: name,
        form: form,
        type: type,
        placeholder: placeholder,
        maxlength: maxlength,
        readonly: readonly,
        disabled: disabled,
        autocomplete: autocomplete
      };

      if (isDatePicker || isPassword && showPwd) {
        attrs.type = 'text';
      }

      if (placeholder) {
        attrs.placeholder = _tools.UtilTools.getFuncText(placeholder);
      }

      return attrs;
    },
    inpEvents: function inpEvents() {
      var _this = this;

      var evnts = {};

      _xeUtils.default.each(this.$listeners, function (cb, name) {
        if (['clear', 'prefix-click', 'suffix-click'].indexOf(name) === -1) {
          evnts[name] = _this.triggerEvent;
        }
      });

      if (this.isNumber) {
        evnts.keydown = this.keydownEvent;
      } else if (this.isDatePicker) {
        evnts.click = this.clickEvent;
      }

      evnts.input = this.inputEvent;
      evnts.focus = this.focusEvent;
      return evnts;
    }
  },
  watch: {
    value: function value() {
      this.changeValue();
    }
  },
  created: function created() {
    this.changeValue();

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  mounted: function mounted() {
    if (this.isDatePicker) {
      if (this.transfer) {
        document.body.appendChild(this.$refs.panel);
      }
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
    var _ref2;

    var isClearable = this.isClearable,
        isDatePicker = this.isDatePicker,
        visiblePanel = this.visiblePanel,
        isActivated = this.isActivated,
        vSize = this.vSize,
        type = this.type,
        readonly = this.readonly,
        disabled = this.disabled,
        prefixIcon = this.prefixIcon,
        suffixIcon = this.suffixIcon;
    return h('div', {
      class: ['vxe-input', "type--".concat(type), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--prefix', prefixIcon), _defineProperty(_ref2, 'is--suffix', isClearable || suffixIcon), _defineProperty(_ref2, 'is--readonly', readonly), _defineProperty(_ref2, 'is--visivle', visiblePanel), _defineProperty(_ref2, 'is--disabled', disabled), _defineProperty(_ref2, 'is--active', isActivated), _ref2)]
    }, [renderExtraPrefixIcon(h, this), rendePrefixIcon(h, this), isDatePicker ? renderDateInput(h, this) : renderDefaultInput(h, this), renderSuffixIcon(h, this), renderExtraSuffixIcon(h, this), renderPanel(h, this)]);
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$refs.input.blur();
      return this.$nextTick();
    },
    triggerEvent: function triggerEvent(evnt) {
      var $refs = this.$refs,
          value = this.value;
      this.$emit(evnt.type, {
        $panel: $refs.panel,
        value: value
      }, evnt);
    },
    emitUpdate: function emitUpdate(value) {
      this.$emit('input', value);
    },
    inputEvent: function inputEvent(evnt) {
      var isDatePicker = this.isDatePicker;
      var value = evnt.target.value;
      this.inputValue = value;

      if (!isDatePicker) {
        this.emitUpdate(value);
      }
    },
    focusEvent: function focusEvent(evnt) {
      this.isActivated = true;
      this.triggerEvent(evnt);
    },
    keydownEvent: function keydownEvent(evnt) {
      var keyCode = evnt.keyCode;
      var isUpArrow = keyCode === 38;
      var isDwArrow = keyCode === 40;

      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();

        if (isUpArrow) {
          this.numberPrevEvent(evnt);
        } else {
          this.numberNextEvent(evnt);
        }
      }

      this.triggerEvent(evnt);
    },
    clickEvent: function clickEvent(evnt) {
      var isDatePicker = this.isDatePicker;

      if (isDatePicker) {
        evnt.preventDefault();
        this.showPanel();
      }

      this.triggerEvent(evnt);
    },
    clickPrefixEvent: function clickPrefixEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        this.$emit('prefix-click', {
          $panel: $refs.panel,
          value: value
        }, evnt);
      }
    },
    clickSuffixEvent: function clickSuffixEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        if (_tools.DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitUpdate('');
          this.clearValueEvent(evnt, '');
        } else {
          this.$emit('suffix-click', {
            $panel: $refs.panel,
            value: value
          }, evnt);
        }
      }
    },
    clearValueEvent: function clearValueEvent(evnt, value) {
      var $refs = this.$refs;
      this.$emit('clear', {
        $panel: $refs.panel,
        value: value
      }, evnt);
    },
    changeValue: function changeValue() {
      if (this.isDatePicker) {
        this.dateParseValue(this.value);
        this.inputValue = this.datePanelLabel;
      }
    },
    afterCheckValue: function afterCheckValue() {
      var type = this.type,
          value = this.value,
          isDatePicker = this.isDatePicker,
          isNumber = this.isNumber,
          dateLabelFormat = this.dateLabelFormat;
      var inpVal = this.inputValue;

      if (isNumber) {
        if (inpVal) {
          if (type === 'integer') {
            inpVal = _xeUtils.default.toInteger(inpVal);
          } else {
            inpVal = _xeUtils.default.toNumber(inpVal);
          }

          if (!_xeUtils.default.isEqual(value, inpVal)) {
            this.emitUpdate(inpVal);
          }
        }
      } else if (isDatePicker) {
        if (inpVal) {
          inpVal = _xeUtils.default.toStringDate(inpVal, dateLabelFormat);

          if (_xeUtils.default.isDate(inpVal)) {
            if (!_xeUtils.default.isEqual(value, inpVal)) {
              this.dateChangeValue(inpVal);
            }
          } else {
            this.dateRevertValue();
          }
        }
      }
    },
    // 密码
    passwordToggleEvent: function passwordToggleEvent() {
      var disabled = this.disabled,
          readonly = this.readonly,
          showPwd = this.showPwd;

      if (!disabled && !readonly) {
        this.showPwd = !showPwd;
      }
    },
    // 密码
    // 数值
    numberPrevEvent: function numberPrevEvent() {
      var disabled = this.disabled,
          readonly = this.readonly;

      if (!disabled && !readonly) {
        this.numberChange(true);
      }
    },
    numberNextEvent: function numberNextEvent() {
      var disabled = this.disabled,
          readonly = this.readonly;

      if (!disabled && !readonly) {
        this.numberChange(false);
      }
    },
    numberChange: function numberChange(isPlus) {
      var value = this.value,
          stepValue = this.stepValue;
      var num = this.type === 'integer' ? _xeUtils.default.toInteger(value) : _xeUtils.default.toNumber(value);
      this.emitUpdate(isPlus ? addition(num, stepValue) : subtraction(num, stepValue));
    },
    // 数值
    // 日期
    dateMonthHandle: function dateMonthHandle(date, offsetMonth) {
      this.selectMonth = _xeUtils.default.getWhatMonth(date, offsetMonth, 'first');
    },
    dateNowHandle: function dateNowHandle() {
      var currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');

      this.currentDate = currentDate;
      this.dateMonthHandle(currentDate, 0);
    },
    dateToggleTypeEvent: function dateToggleTypeEvent() {
      var datePanelType = this.datePanelType;

      if (datePanelType === 'month') {
        datePanelType = 'year';
      } else {
        datePanelType = 'month';
      }

      this.datePanelType = datePanelType;
    },
    datePrevMonthEvent: function datePrevMonthEvent() {
      var type = this.type;

      if (type === 'year') {
        this.selectMonth = _xeUtils.default.getWhatYear(this.selectMonth, -16, 'first');
      } else if (type === 'month') {
        this.selectMonth = _xeUtils.default.getWhatYear(this.selectMonth, -1, 'first');
      } else {
        this.selectMonth = _xeUtils.default.getWhatMonth(this.selectMonth, -1, 'first');
      }
    },
    dateTodayMonthEvent: function dateTodayMonthEvent() {
      this.dateNowHandle();
      this.dateChangeValue(this.currentDate);
      this.hidePanel();
    },
    dateNextMonthEvent: function dateNextMonthEvent() {
      var type = this.type;

      if (type === 'year') {
        this.selectMonth = _xeUtils.default.getWhatYear(this.selectMonth, 16, 'first');
      } else if (type === 'month') {
        this.selectMonth = _xeUtils.default.getWhatYear(this.selectMonth, 1, 'first');
      } else {
        this.selectMonth = _xeUtils.default.getWhatMonth(this.selectMonth, 1, 'first');
      }
    },
    dateSelectEvent: function dateSelectEvent(item) {
      this.dateSelectItem(item.date);
    },
    dateSelectItem: function dateSelectItem(date) {
      var type = this.type,
          datePanelType = this.datePanelType;

      if (type === 'month') {
        if (datePanelType === 'year') {
          this.datePanelType = 'month';
        } else {
          this.dateChangeValue(date);
          this.hidePanel();
        }
      } else if (type === 'year') {
        this.dateChangeValue(date);
        this.hidePanel();
      } else {
        if (datePanelType === 'month') {
          this.datePanelType = 'day';
        } else if (datePanelType === 'year') {
          this.datePanelType = 'month';
        } else {
          this.dateChangeValue(date);
          this.hidePanel();
        }
      }
    },
    dateMouseenterEvent: function dateMouseenterEvent(item) {
      var datePanelType = this.datePanelType;

      if (datePanelType === 'month') {
        this.dateMoveMonth(item.date);
      } else if (datePanelType === 'year') {
        this.dateMoveYear(item.date);
      } else {
        this.dateMoveDay(item.date);
      }
    },
    dateMoveDay: function dateMoveDay(offsetDay) {
      if (!this.dayList.some(function (item) {
        return _xeUtils.default.isDateSame(item.date, offsetDay, 'yyyy-MM-dd');
      })) {
        this.dateCheckMonth(offsetDay);
      }

      this.dateParseValue(offsetDay);
    },
    dateMoveMonth: function dateMoveMonth(offsetMonth) {
      this.dateCheckMonth(offsetMonth);
      this.dateParseValue(offsetMonth);
    },
    dateMoveYear: function dateMoveYear(offsetYear) {
      if (!this.yearList.some(function (item) {
        return _xeUtils.default.isDateSame(item.date, offsetYear, 'yyyy');
      })) {
        this.dateCheckMonth(offsetYear);
      }

      this.dateParseValue(offsetYear);
    },
    dateParseValue: function dateParseValue(date) {
      var dateLabelFormat = this.dateLabelFormat,
          parseFormat = this.parseFormat;
      var dValue = date ? _xeUtils.default.toStringDate(date, parseFormat) : null;
      var dLabel = '';

      if (_xeUtils.default.isDate(dValue)) {
        dLabel = _xeUtils.default.toDateString(dValue, dateLabelFormat);
      } else {
        dValue = null;
      }

      this.datePanelValue = dValue;
      this.datePanelLabel = dLabel;
    },
    dateOffsetEvent: function dateOffsetEvent(evnt) {
      var isActivated = this.isActivated,
          datePanelValue = this.datePanelValue,
          datePanelType = this.datePanelType;
      var keyCode = evnt.keyCode;
      var isLeftArrow = keyCode === 37;
      var isUpArrow = keyCode === 38;
      var isRightArrow = keyCode === 39;
      var isDwArrow = keyCode === 40;

      if (isActivated) {
        evnt.preventDefault();

        if (datePanelType === 'month') {
          var offsetMonth = _xeUtils.default.getWhatMonth(datePanelValue || Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, -1);
          } else if (isUpArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, -4);
          } else if (isRightArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, 1);
          } else if (isDwArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, 4);
          }

          this.dateMoveMonth(offsetMonth);
        } else if (datePanelType === 'year') {
          var offsetYear = _xeUtils.default.getWhatYear(datePanelValue || Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, -1);
          } else if (isUpArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, -4);
          } else if (isRightArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, 1);
          } else if (isDwArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, 4);
          }

          this.dateMoveYear(offsetYear);
        } else {
          var offsetDay = datePanelValue || _xeUtils.default.getWhatDay(Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetDay = _xeUtils.default.getWhatDay(offsetDay, -1);
          } else if (isUpArrow) {
            offsetDay = _xeUtils.default.getWhatWeek(offsetDay, -1);
          } else if (isRightArrow) {
            offsetDay = _xeUtils.default.getWhatDay(offsetDay, 1);
          } else if (isDwArrow) {
            offsetDay = _xeUtils.default.getWhatWeek(offsetDay, 1);
          }

          this.dateMoveDay(offsetDay);
        }
      }
    },
    dateChangeValue: function dateChangeValue(date) {
      var value = this.value,
          valueFormat = this.valueFormat;
      var inpVal = valueFormat ? _xeUtils.default.toDateString(date, valueFormat) : date;
      this.dateCheckMonth(date);

      if (!_xeUtils.default.isEqual(value, inpVal)) {
        this.emitUpdate(inpVal);
      }
    },
    dateCheckMonth: function dateCheckMonth(date) {
      var month = _xeUtils.default.getWhatMonth(date, 0, 'first');

      if (!_xeUtils.default.isEqual(month, this.selectMonth)) {
        this.selectMonth = month;
      }
    },
    dateOpenPanel: function dateOpenPanel() {
      var dateValue = this.dateValue;
      this.currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');

      if (dateValue) {
        this.dateMonthHandle(dateValue, 0);
      } else {
        this.dateNowHandle();
      }
    },
    dateRevertValue: function dateRevertValue() {
      this.inputValue = this.datePanelLabel;
    },
    // 日期
    // 弹出面板
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    showPanel: function showPanel() {
      var _this2 = this;

      var type = this.type,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel,
          isDatePicker = this.isDatePicker;

      if (!disabled && !visiblePanel) {
        clearTimeout(this.hidePanelTimeout);
        this.isActivated = true;
        this.animatVisible = true;

        if (isDatePicker) {
          if (['year', 'month'].indexOf(type) > -1) {
            this.datePanelType = type;
          } else {
            this.datePanelType = 'day';
          }

          this.dateOpenPanel();
        }

        setTimeout(function () {
          _this2.visiblePanel = true;
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hidePanel: function hidePanel() {
      var _this3 = this;

      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this3.animatVisible = false;
      }, 250);
    },
    updatePlacement: function updatePlacement() {
      var _this4 = this;

      this.$nextTick(function () {
        var $refs = _this4.$refs,
            transfer = _this4.transfer,
            placement = _this4.placement,
            panelIndex = _this4.panelIndex;
        var inputElem = $refs.input;
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
    // 弹出面板
    // 全局事件
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel,
          isActivated = this.isActivated;

      if (!disabled && isActivated) {
        this.isActivated = _tools.DomTools.getEventTargetNode(evnt, $el).flag || _tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (!this.isActivated) {
          if (visiblePanel) {
            this.hidePanel();
          }

          this.afterCheckValue();
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var isDatePicker = this.isDatePicker,
          visiblePanel = this.visiblePanel,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isDel = keyCode === 46;
        var isEsc = keyCode === 27;
        var isEnter = keyCode === 13;
        var isLeftArrow = keyCode === 37;
        var isUpArrow = keyCode === 38;
        var isRightArrow = keyCode === 39;
        var isDwArrow = keyCode === 40;
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var isActivated = this.isActivated;

        if (isTab) {
          isActivated = false;

          if (this.isActivated) {
            this.afterCheckValue();
          }

          this.isActivated = isActivated;
        } else if (operArrow) {
          if (isDatePicker) {
            this.dateOffsetEvent(evnt);
          }
        }

        if (isEnter) {
          if (isDatePicker) {
            if (visiblePanel) {
              this.dateSelectItem(this.datePanelValue);
            } else if (isActivated) {
              this.showPanel();
            }
          }
        } else if (isTab || isEsc) {
          if (visiblePanel) {
            this.hidePanel();
          }
        }

        if (isDel && clearable) {
          if (isActivated) {
            this.clearValueEvent(evnt, null);
          }
        }
      }
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          visiblePanel = this.visiblePanel;

      if (!_tools.DomTools.getEventTargetNode(evnt, $el).flag && !_tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
        if (visiblePanel) {
          this.hidePanel();
        }

        this.afterCheckValue();
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      var visiblePanel = this.visiblePanel;

      if (visiblePanel) {
        this.hidePanel();
      }

      this.afterCheckValue();
    } // 全局事件

  }
};
exports.default = _default2;