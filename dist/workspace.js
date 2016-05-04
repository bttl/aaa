'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Workspace = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialItem = require('./material-item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Workspace = exports.Workspace = function (_React$Component) {
  _inherits(Workspace, _React$Component);

  function Workspace(props) {
    _classCallCheck(this, Workspace);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Workspace).call(this, props));

    _this.state = {
      arr: [],
      loaded: false,
      content: 'Выберите текст справа'
    };

    _this.requestUrl = _this.props.apiHost + '/v1/material/get-list' + '?vk_id=' + _this.props.vkId + '&auth_key=' + _this.props.authKey;

    var gHeight = 350;
    //var gWidth = 140;

    _this.styles = _this.props.sts.create({
      textWrap: {
        flex: 3,
        height: gHeight,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        padding: 8
      },
      listWrap: {
        flex: 1,
        height: gHeight
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
      }
    });

    var cmp = _this.props.cmp;

    _this.cmpView = _react2.default.createFactory(cmp.View);
    _this.cmpScroller = _react2.default.createFactory(cmp.Scroller);
    _this.cmpText = _react2.default.createFactory(cmp.Text);
    _this.cmpLister = _react2.default.createFactory(cmp.Lister);
    _this.cmpMaterialItem = _react2.default.createFactory(_materialItem.MaterialItem);
    return _this;
  }

  _createClass(Workspace, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var _this2 = this;

      fetch(this.requestUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.errkey) {
          alert('Непредвиденная ошибка: ' + json.errkey + ': попробуйте позже');
          return;
        }

        _this2.setState({
          arr: json,
          loaded: true
        });
      }).catch(function (ex) {
        console.warn('fetch error', ex);
        alert('Непредвиденная ошибка: fetch error: попробуйте позже');
      });
      //.done();
    }
  }, {
    key: 'handleText',
    value: function handleText(content) {
      //    var arrNew = this.state.arr.slice();

      // arrNew.push({
      //   mname: 'hello',
      //   id: 2345
      // });

      this.setState({
        content: content
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.state.loaded) {
        return this.cmpView({
          style: this.styles.container
        }, this.cmpText(null, 'Loading...'));
      }

      var list = this.cmpLister({
        style: this.styles.list,
        arr: this.state.arr,
        renderRow: function renderRow(row) {
          return _this3.cmpMaterialItem({
            row: row,
            vkId: _this3.props.vkId,
            apiHost: _this3.props.apiHost,
            authKey: _this3.props.authKey,
            cmp: _this3.props.cmp,
            sts: _this3.props.sts,
            setCurrentText: function setCurrentText(content) {
              return _this3.handleText(content);
            }
          });
        }
      });

      var listWrap = this.cmpScroller({
        style: this.styles.listWrap
      }, list);

      var textWrap = this.cmpScroller({
        style: this.styles.textWrap
      }, this.cmpText(null, this.state.content));

      return this.cmpView({
        style: this.styles.container
      }, textWrap, listWrap);
    }
  }]);

  return Workspace;
}(_react2.default.Component);

Workspace.propTypes = {
  vkId: _react2.default.PropTypes.string.isRequired,
  authKey: _react2.default.PropTypes.string.isRequired,
  apiHost: _react2.default.PropTypes.string.isRequired,
  cmp: _react2.default.PropTypes.object.isRequired,
  sts: _react2.default.PropTypes.object.isRequired
};