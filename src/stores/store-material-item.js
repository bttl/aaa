import constants from '../constants';

import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change-item';

/**
 * Material item: storage
 * @extends EventEmitter
 */
class StoreMaterialItem extends EventEmitter {

  /**
   * Creates a new store with a dispatcher
   * @param {object} dspr A dispatcher, usually one per app
   */
  constructor(dspr){
    super();

    /**
     * Inner storage
     *   it cannot be directly changed from outside of the module
     *   preserve a distinct input/output interface for the flow of data by making it impossible to update the store without using an action
     */
    this._strg = {
      /** Selected item */
      item: {},
      progress: false
    };

    // registration of the store's callback with the dispatcher.
    dspr.register((action) => this.handleAction(action));
  }

  /**
   * Handle an action, update a store (using actions only)
   * @param  {object} action A handled action
   */
  handleAction(action) {
    console.log('handleActionItem', action);
    
    switch(action.actionType) {
    case constants.MATERIAL_ITEM_RECEIVE:
      // item = material
      this._strg.item = action.item;
      this._strg.progress = false;
      this.emitChange();
      break;
    case constants.MATERIAL_ITEM_PROGRESS:
      this._strg.progress = true;
      this.emitChange();
      break;
    }
  }  

  /**
   * @returns {string} Returns a text of a selected item or null if no selection
   */
  getCurrentText() {
    var mtrl = this._strg.item;
    if (mtrl && mtrl.content){
      return mtrl.mname + '\n\n' + mtrl.content + '\n\n' + mtrl.create_date.substring(0, 10);
    }
    return null;
  }

  checkProgress() {
    return this._strg.progress;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListerner(callback){
    this.removeListerner(CHANGE_EVENT, callback);
  }  
}

export default StoreMaterialItem;
