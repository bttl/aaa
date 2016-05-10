'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHANGE_EVENT = 'change';

// https://nodejs.org/api/events.html#events_class_eventemitter

var StoreMaterial = function (_EventEmitter) {
  _inherits(StoreMaterial, _EventEmitter);

  function StoreMaterial(dspr) {
    _classCallCheck(this, StoreMaterial);

    /**
     * Inner storage
     *   it cannot be directly changed from outside of the module
     *   preserve a distinct input/output interface for the flow of data by making it impossible to update the store without using an action
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StoreMaterial).call(this));

    _this._strg = {
      arr: [],
      loaded: false,
      content: 'Выберите текст справа'
    };

    // registration of the store's callback with the dispatcher.
    dspr.register(function (action) {
      return _this.handleAction(action);
    });
    return _this;
  }

  /**
   * Handle an action, update a store (using actions only)
   * @param  {object} action A handled action
   */


  _createClass(StoreMaterial, [{
    key: 'handleAction',
    value: function handleAction(action) {
      console.log('handleAction', action);
      var text = '';

      switch (action.actionType) {
        case _constants2.default.COMMENT_CREATE:
          text = action.text.trim();
          if (text !== '') {
            this.create(text);
            this.emitChange();
          }
          break;
        case 'TEXT_LIST_RECEIVE':
          // replace with a new array
          // without splice: it from API
          this._strg.arr = action.json;
          this._strg.isLoaded = true;
          this.emitChange();
      }
    }

    /**
     * Create a Comment item.
     * @param  {string} text The content of an item
     */

  }, {
    key: 'create',
    value: function create(text) {
      // Hand waving here -- not showing how this interacts with XHR or persistent
      // server-side storage.
      // Using the current timestamp + random number in place of a real id.
      var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._strg.arr[id] = {
        id: id,
        complete: false,
        text: text
      };
    }

    /**
     * Get the entire collection of comments
     * @return {object}
     */

  }, {
    key: 'getList',
    value: function getList() {
      return this._strg.arr;
    }
  }, {
    key: 'checkLoaded',
    value: function checkLoaded() {
      return this._strg.isLoaded;
    }
  }, {
    key: 'getCurrentText',
    value: function getCurrentText() {
      return this._strg.content;
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListerner',
    value: function removeChangeListerner(callback) {
      this.removeListerner(CHANGE_EVENT, callback);
    }
  }]);

  return StoreMaterial;
}(_events.EventEmitter);

exports.default = StoreMaterial;