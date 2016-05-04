import React from 'react';

import { MaterialItem } from './material-item';

export class Workspace extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      arr: [],
      loaded: false,
      content: 'Выберите текст справа'
    };

    this.requestUrl =  this.props.apiHost + '/v1/material/get-list' +
      '?vk_id=' + this.props.vkId +
      '&auth_key=' + this.props.authKey;

    var gHeight = 350;
    //var gWidth = 140;
    
    this.styles = this.props.sts.create({
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

    var cmp = this.props.cmp;
    
    this.cmpView = React.createFactory(cmp.View);
    this.cmpScroller = React.createFactory(cmp.Scroller);
    this.cmpText = React.createFactory(cmp.Text);
    this.cmpLister = React.createFactory(cmp.Lister);
    this.cmpMaterialItem = React.createFactory(MaterialItem);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(this.requestUrl)
      .then((response) => response.json())
      .then((json) => {
        if (json.errkey) {      
          alert('Непредвиденная ошибка: ' + json.errkey + ': попробуйте позже');
          return;
        }
        
        this.setState({
          arr: json,
          loaded: true
        });
      })
      .catch((ex) => {
        console.warn('fetch error', ex);
        alert('Непредвиденная ошибка: fetch error: попробуйте позже');
      });
      //.done();
  }

  handleText(content) {
    //    var arrNew = this.state.arr.slice();
    
    // arrNew.push({
    //   mname: 'hello',
    //   id: 2345
    // });
    
    this.setState({
      content: content      
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.cmpView({
        style: this.styles.container
      }, this.cmpText(null, 'Loading...'));
    }

    var list = this.cmpLister({
      style: this.styles.list,
      arr: this.state.arr,
      renderRow: (row) => {        
        return this.cmpMaterialItem({
          row: row,
          vkId: this.props.vkId,
          apiHost: this.props.apiHost,
          authKey: this.props.authKey,
          cmp: this.props.cmp,
          sts: this.props.sts,
          setCurrentText: (content) => this.handleText(content)
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
}

Workspace.propTypes = {
  vkId: React.PropTypes.string.isRequired,
  authKey: React.PropTypes.string.isRequired,
  apiHost: React.PropTypes.string.isRequired,
  cmp: React.PropTypes.object.isRequired,
  sts: React.PropTypes.object.isRequired
};
