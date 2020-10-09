"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputEventTypes = ['input', 'textarea', '$input', '$textarea'];
var defaultCompProps = {
  transfer: true
};

function parseDate(value, props) {
  return value && props.valueFormat ? _xeUtils.default.toStringDate(value, props.valueFormat) : value;
}

function getFormatDate(value, props, defaultFormat) {
  return _xeUtils.default.toDateString(parseDate(value, props), props.labelFormat || defaultFormat);
}

function getEventUpdateType(renderOpts) {
  return inputEventTypes.indexOf(renderOpts.name) > -1 ? 'input' : 'change';
}

function getDefaultComponentName(_ref) {
  var name = _ref.name;
  return "vxe-".concat(name.replace('$', ''));
}

function getNativeAttrs(_ref2) {
  var name = _ref2.name,
      attrs = _ref2.attrs;

  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }

  return attrs;
}

function getDefaultProps(_ref3, _ref4, defaultProps) {
  var $table = _ref3.$table;
  var props = _ref4.props;
  return _xeUtils.default.assign($table.vSize ? {
    size: $table.vSize
  } : {}, defaultCompProps, defaultProps, props);
}

function isSyncCell(renderOpts, params) {
  return renderOpts.immediate || renderOpts.type === 'visible' || params.$type === 'cell';
}

function getNativeEvents(renderOpts, params) {
  var events = renderOpts.events;
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var model = column.model;
  var type = getEventUpdateType(renderOpts);

  var on = _defineProperty({}, type, function (evnt) {
    var cellValue = evnt.target.value;

    if (isSyncCell(renderOpts, params)) {
      _tools.UtilTools.setCellValue(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }

    $table.updateStatus(params, cellValue);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function getDefaultEvents(renderOpts, params) {
  var events = renderOpts.events;
  var $table = params.$table;
  var type = getEventUpdateType(renderOpts);

  var on = _defineProperty({}, type, function (obj, evnt) {
    $table.updateStatus(params);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}
/**
 * 原生-可编辑渲染器 input、textarea、select
 */


function nativeEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  var cellValue = isSyncCell(renderOpts, params) ? _tools.UtilTools.getCellValue(row, column) : column.model.value;
  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: {
      value: cellValue
    },
    on: getNativeEvents(renderOpts, params)
  })];
}

function defaultEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;

  var cellValue = _tools.UtilTools.getCellValue(row, column);

  var props = getDefaultProps(params, renderOpts);
  return [h(getDefaultComponentName(renderOpts), {
    model: {
      value: cellValue,
      callback: function callback(value) {
        _tools.UtilTools.setCellValue(row, column, value);
      }
    },
    props: props,
    on: getDefaultEvents(renderOpts, params)
  })];
}

function defaultButtonEditRender(h, renderOpts, params) {
  var props = getDefaultProps(params, renderOpts);
  return [h('vxe-button', {
    props: props,
    on: getDefaultEvents(renderOpts, params)
  })];
}

function defaultButtonsEditRender(h, renderOpts, params) {
  return renderOpts.children.map(function (childRenderOpts) {
    return defaultButtonEditRender(h, childRenderOpts, params)[0];
  });
}

function renderNativeOptgroups(h, renderOpts, params, renderOptionsMethods) {
  var optionGroups = renderOpts.optionGroups,
      _renderOpts$optionGro = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro === void 0 ? {} : _renderOpts$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group) {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      }
    }, renderOptionsMethods(h, group[groupOptions], renderOpts, params));
  });
}

function renderDefaultOptgroups(h, renderOpts, params, renderOptionsMethods) {
  var optionGroups = renderOpts.optionGroups,
      _renderOpts$optionGro2 = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group) {
    return h('vxe-optgroup', {
      props: {
        label: group[groupLabel]
      }
    }, renderOptionsMethods(h, group[groupOptions], renderOpts, params));
  });
}

function renderNativeOptions(h, options, renderOpts, params) {
  var _renderOpts$optionPro = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  var cellValue = isSyncCell(renderOpts, params) ? _tools.UtilTools.getCellValue(row, column) : column.model.value;
  return options.map(function (item) {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
      }
    }, item[labelProp]);
  });
}

function renderDefaultOptions(h, options, renderOpts) {
  var _renderOpts$optionPro2 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  return options.map(function (item) {
    return h('vxe-option', {
      props: {
        value: item[valueProp],
        label: item[labelProp],
        disabled: item[disabledProp]
      }
    });
  });
}

function handleConfirmFilter(params, column, checked, item) {
  var $panel = params.$panel;
  $panel[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item);
}

function getNativeFilterEvents(item, renderOpts, params) {
  var column = params.column;
  var events = renderOpts.events;
  var type = getEventUpdateType(renderOpts);

  var on = _defineProperty({}, type, function (evnt) {
    item.data = evnt.target.value;
    handleConfirmFilter(params, column, !!item.data, item);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function getDefaultFilterEvents(item, renderOpts, params) {
  var column = params.column;
  var events = renderOpts.events;
  var type = getEventUpdateType(renderOpts);

  var on = _defineProperty({}, type, function (evnt) {
    item.data = evnt.target.value;
    handleConfirmFilter(params, column, !!item.data, item);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function nativeFilterRender(h, renderOpts, params) {
  var column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  return column.filters.map(function (item) {
    return h(name, {
      class: "vxe-default-".concat(name),
      attrs: attrs,
      domProps: {
        value: item.data
      },
      on: getNativeFilterEvents(item, renderOpts, params)
    });
  });
}

function defaultFilterRender(h, renderOpts, params) {
  var column = params.column;
  var props = getDefaultProps(renderOpts, renderOpts);
  return column.filters.map(function (item) {
    return h(getDefaultComponentName(renderOpts), {
      model: {
        value: item.data,
        callback: function callback(value) {
          item.data = value;
        }
      },
      props: props,
      on: getDefaultFilterEvents(item, renderOpts, params)
    });
  });
}

function handleFilterMethod(_ref5) {
  var option = _ref5.option,
      row = _ref5.row,
      column = _ref5.column;
  var data = option.data;

  var cellValue = _xeUtils.default.get(row, column.property);
  /* eslint-disable eqeqeq */


  return cellValue == data;
}

function nativeSelectEditRender(h, renderOpts, params) {
  return [h('select', {
    class: 'vxe-default-select',
    attrs: getNativeAttrs(renderOpts),
    on: getNativeEvents(renderOpts, params)
  }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))];
}

function defaultSelectEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;

  var cellValue = _tools.UtilTools.getCellValue(row, column);

  var props = getDefaultProps(params, renderOpts);
  return [h(getDefaultComponentName(renderOpts), {
    model: {
      value: cellValue,
      callback: function callback(value) {
        _tools.UtilTools.setCellValue(row, column, value);
      }
    },
    props: props,
    on: getDefaultEvents(renderOpts, params)
  }, renderOpts.optionGroups ? renderDefaultOptgroups(h, renderOpts, params, renderDefaultOptions) : renderDefaultOptions(h, renderOpts.options, renderOpts, params))];
}

function getSelectCellValue(renderOpts, _ref6) {
  var row = _ref6.row,
      column = _ref6.column;
  var options = renderOpts.options,
      optionGroups = renderOpts.optionGroups,
      _renderOpts$optionPro3 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro3 === void 0 ? {} : _renderOpts$optionPro3,
      _renderOpts$optionGro3 = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro3 === void 0 ? {} : _renderOpts$optionGro3;

  var cellValue = _xeUtils.default.get(row, column.property);

  var selectItem;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';

  if (optionGroups) {
    var groupOptions = optionGroupProps.options || 'options';

    for (var index = 0; index < optionGroups.length; index++) {
      /* eslint-disable eqeqeq */
      selectItem = _xeUtils.default.find(optionGroups[index][groupOptions], function (item) {
        return item[valueProp] == cellValue;
      });

      if (selectItem) {
        break;
      }
    }

    return selectItem ? selectItem[labelProp] : cellValue;
  }
  /* eslint-disable eqeqeq */


  selectItem = _xeUtils.default.find(options, function (item) {
    return item[valueProp] == cellValue;
  });
  return selectItem ? selectItem[labelProp] : cellValue;
}

function getNativeFormEvents(renderOpts, params) {
  var $form = params.$form,
      data = params.data,
      property = params.property;
  var events = renderOpts.events;
  var type = getEventUpdateType(renderOpts);

  var on = _defineProperty({}, type, function (evnt) {
    var itemValue = evnt.target.value;

    _xeUtils.default.set(data, property, itemValue);

    $form.updateStatus(params, itemValue);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function getDefaultFormEvents(renderOpts, params) {
  var $form = params.$form;
  var events = renderOpts.events;
  var type = getEventUpdateType(renderOpts);

  var on = _defineProperty({}, type, function (_ref7, evnt) {
    var itemValue = _ref7.value;
    $form.updateStatus(params, itemValue);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function getDefaultFormItemProps(_ref8, _ref9, defaultProps) {
  var $form = _ref8.$form;
  var props = _ref9.props;
  return _xeUtils.default.assign($form.vSize ? {
    size: $form.vSize
  } : {}, defaultCompProps, defaultProps, props);
}
/**
 * 原生-表单渲染器
 */


function nativeItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);

  var itemValue = _xeUtils.default.get(data, property);

  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
      value: itemValue
    },
    on: getNativeFormEvents(renderOpts, params)
  })];
}

function defaultItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;

  var itemValue = _xeUtils.default.get(data, property);

  var props = getDefaultFormItemProps(params, renderOpts);
  return [h(getDefaultComponentName(renderOpts), {
    model: {
      value: itemValue,
      callback: function callback(value) {
        _xeUtils.default.set(data, property, value);
      }
    },
    props: props,
    on: getDefaultFormEvents(renderOpts, params)
  })];
}

function defaultButtonItemRender(h, renderOpts, params) {
  var props = getDefaultFormItemProps(params, renderOpts);
  return [h('vxe-button', {
    props: props,
    on: getDefaultFormEvents(renderOpts, params)
  })];
}

function defaultButtonsItemRender(h, renderOpts, params) {
  return renderOpts.children.map(function (childRenderOpts) {
    return defaultButtonItemRender(h, childRenderOpts, params)[0];
  });
}

function renderNativeFormOptions(h, options, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var _renderOpts$optionPro4 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro4 === void 0 ? {} : _renderOpts$optionPro4;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';

  var cellValue = _xeUtils.default.get(data, property);

  return options.map(function (item, index) {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
      },
      key: index
    }, item[labelProp]);
  });
}

function createExportMethod(valueMethod, isEdit) {
  var renderProperty = isEdit ? 'editRender' : 'cellRender';
  return function (params) {
    return valueMethod(params.column[renderProperty], params);
  };
}

function defaultFormItemRadioAndCheckboxRender(h, renderOpts, params) {
  var options = renderOpts.options,
      _renderOpts$optionPro5 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro5 === void 0 ? {} : _renderOpts$optionPro5;
  var data = params.data,
      property = params.property;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';

  var itemValue = _xeUtils.default.get(data, property);

  var props = getDefaultFormItemProps(params, renderOpts);
  var name = getDefaultComponentName(renderOpts);
  return [h("".concat(name, "-group"), {
    props: props,
    model: {
      value: itemValue,
      callback: function callback(value) {
        _xeUtils.default.set(data, property, value);
      }
    },
    on: getDefaultFormEvents(renderOpts, params)
  }, options.map(function (option) {
    return h(name, {
      props: {
        label: option[valueProp],
        content: option[labelProp],
        disabled: option[disabledProp]
      }
    });
  }))];
}

var renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: nativeItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      return column.filters.map(function (item) {
        return h('select', {
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeFilterEvents(item, renderOpts, params)
        }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params));
      });
    },
    filterMethod: handleFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      return [h('select', {
        class: 'vxe-default-select',
        attrs: getNativeAttrs(renderOpts),
        on: getNativeFormEvents(renderOpts, params)
      }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(h, renderOpts.options, renderOpts, params))];
    },
    editCellExportMethod: createExportMethod(getSelectCellValue, true),
    cellExportMethod: createExportMethod(getSelectCellValue)
  },
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      var _renderOpts$props = renderOpts.props,
          props = _renderOpts$props === void 0 ? {} : _renderOpts$props;
      var row = params.row,
          column = params.column;

      var cellValue = _xeUtils.default.get(row, column.property);

      switch (props.type) {
        case 'date':
          cellValue = getFormatDate(cellValue, props, 'yyyy-MM-dd');
          break;

        case 'month':
          cellValue = getFormatDate(cellValue, props, 'yyyy-MM');
          break;

        case 'year':
          cellValue = getFormatDate(cellValue, props, 'yyyy');
          break;
      }

      return cellValue;
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: defaultItemRender
  },
  $button: {
    renderEdit: defaultButtonEditRender,
    renderDefault: defaultButtonEditRender,
    renderItem: defaultButtonItemRender
  },
  $buttons: {
    renderEdit: defaultButtonsEditRender,
    renderDefault: defaultButtonsEditRender,
    renderItem: defaultButtonsItemRender
  },
  $select: {
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      var props = getDefaultProps(params, renderOpts);
      return column.filters.map(function (item) {
        return h(getDefaultComponentName(renderOpts), {
          model: {
            value: item.data,
            callback: function callback(value) {
              item.data = value;
            }
          },
          props: props,
          on: getDefaultFilterEvents(item, renderOpts, params)
        }, renderOpts.optionGroups ? renderDefaultOptgroups(h, renderOpts, params, renderDefaultOptions) : renderDefaultOptions(h, renderOpts.options, renderOpts, params));
      });
    },
    filterMethod: handleFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      var data = params.data,
          property = params.property;

      var itemValue = _xeUtils.default.get(data, property);

      var props = getDefaultFormItemProps(params, renderOpts);
      return [h(getDefaultComponentName(renderOpts), {
        model: {
          value: itemValue,
          callback: function callback(value) {
            _xeUtils.default.set(data, property, value);
          }
        },
        props: props,
        on: getDefaultFormEvents(renderOpts, params)
      }, renderOpts.optionGroups ? renderDefaultOptgroups(h, renderOpts, params, renderDefaultOptions) : renderDefaultOptions(h, renderOpts.options, renderOpts, params))];
    },
    editCellExportMethod: createExportMethod(getSelectCellValue, true),
    cellExportMethod: createExportMethod(getSelectCellValue)
  },
  $radio: {
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    renderItem: defaultFormItemRadioAndCheckboxRender
  }
};
/**
 * 全局渲染器
 */

var renderer = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (options, name) {
      return renderer.add(name, options);
    });

    return renderer;
  },
  get: function get(name) {
    return renderMap[name] || null;
  },
  add: function add(name, options) {
    if (name && options) {
      var renders = renderMap[name];

      if (renders) {
        Object.assign(renders, options);
      } else {
        renderMap[name] = options;
      }
    }

    return renderer;
  },
  delete: function _delete(name) {
    delete renderMap[name];
    return renderer;
  }
};
var _default = renderer;
exports.default = _default;