import constants from '../constants';

/**
 * Middleware with actions
 */
class ActionMaterial {

  /**
   * Creates a new mdw
   * @param {object} dspr A root dispatcher
   */
  constructor(dspr){
    this.dspr = dspr;
  }

  /**
   * Load a list of materials for current user. 
   * Send a result to a root dispatcher.
   * @param {string} apiHost
   * @param {string} vkId
   * @param {string} authKey
   */
  receiveListByUser(apiHost, vkId, authKey){

    var requestUrl =  apiHost + '/v1/material/get-list' +
          '?vk_id=' + vkId +
          '&auth_key=' + authKey;

    fetch(requestUrl)
      .then((response) => response.json())
      .then((json) => {
        if (json.errkey) {
          alert('Непредвиденная ошибка: ' + json.errkey + ': попробуйте позже');
          return;
        }
        
        this.dspr.server(constants.MATERIAL_LIST_RECEIVE, {
          arr: json
        });
      })
      .catch((ex) => {
        console.warn('fetch error', ex);
        alert('Непредвиденная ошибка: fetch error: попробуйте позже');
      });
      //.done();
  }

  /**
   * Load a material content (id + mcontent) and attach it to the material
   *   It is like a retrieve a full record.
   * @param {object} mtrl Material
   */
  receiveMaterialItem(apiHost, vkId, authKey, mtrl){
    this.dspr.client(constants.MATERIAL_ITEM_PROGRESS, {});
    var requestUrl = apiHost + '/v1/material/get-text' +
      '?id=' + mtrl.id +
      '&vk_id=' + vkId +
      '&auth_key=' + authKey;
    
    fetch(requestUrl)
      .then((response) => {
        return response.json();
      }).then((json) => {
        mtrl.content = json.mcontent;
        this.dspr.server(constants.MATERIAL_ITEM_RECEIVE, {
          item: mtrl
        });
        
        // var mtrl = this.props.row;
        // mtrl.content = json.mcontent;
        // this.props.selectItem(mtrl);
      });
  }
};

export default ActionMaterial;
