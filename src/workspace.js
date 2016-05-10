import React from 'react';

import MaterialItem from './material-item';
import ActionMaterial from './actions/action-material';
import StoreMaterialList from './stores/store-material-list';
import StoreMaterialItem from './stores/store-material-item';

/** 
* Workspace for a project
*    contains a list of materials and selected material
*/
class Workspace extends React.Component {
  constructor(props) {
    super(props);

    // from root (one per application)
    this.dspr = props.dspr;

    // view -> action -> dspr
    this.actionMaterial = new ActionMaterial(this.dspr);

    // dspr -> store -> view
    this.storeMaterialList = new StoreMaterialList(this.dspr);
    this.storeMaterialItem = new StoreMaterialItem(this.dspr);
    
    // get this state from appStore
    this.state = this._getStoreState();

    // moved to actionMaterial
    // this.requestUrl =  this.props.apiHost + '/v1/material/get-list' +
    //   '?vk_id=' + this.props.vkId +
    //   '&auth_key=' + this.props.authKey;

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
    // listen changes inside appStore
    // update a state after some changes occurs
    this.storeMaterialList.addChangeListener(() => this._onChange());
    this.storeMaterialItem.addChangeListener(() => this._onChange());

    this.actionMaterial.receiveListByUser(this.props.apiHost,
                                          this.props.vkId,
                                          this.props.authKey);
  }

  componentWillUnmount() {
    this.storeMaterialList.removeChangeListener(() => this._onChange());
    this.storeMaterialItem.removeChangeListener(() => this._onChange());
  }
  
  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange() {    
    var storeState =  this._getStoreState();
    console.log('_onChange', storeState);
    this.setState(storeState);
  }

  /**
   * State contains only required props of objects
   *     no full objects - just props,
   *     like content of a selected material
   */
  _getStoreState() {
    return {
      arr: this.storeMaterialList.getList(),
      loaded: this.storeMaterialList.checkLoaded(),
      content: this.storeMaterialItem.getCurrentText(),
      itemProgress: this.storeMaterialItem.checkProgress()
    };
  }

  render() {
    if (!this.state.loaded) {
      return this.cmpView({
        style: this.styles.container
      }, this.cmpText(null, 'загрузка...'));
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
          selectItem: (item) => this.actionMaterial.receiveMaterialItem(
            this.props.apiHost,
            this.props.vkId,
            this.props.authKey,
            item)
        });
      }
    });

    var listWrap = this.cmpScroller({
      style: this.styles.listWrap
    }, list);

    var text = this.cmpText(null, this.state.itemProgress ? '...' : this.state.content);

    var textWrap = this.cmpScroller({
      style: this.styles.textWrap
    }, text);
    
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
  sts: React.PropTypes.object.isRequired,
  dspr: React.PropTypes.object.isRequired
};

export default Workspace;
