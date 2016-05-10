import constants from '../constants';

import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';

// https://nodejs.org/api/events.html#events_class_eventemitter

/**
 * List of materials: storage
 * @extends EventEmitter
 */
class StoreMaterialList extends EventEmitter {

  /**
   * Creates a new store
   * @param {object} dspr A root dispatcher
   */
  constructor(dspr){
    super();

    /**
     * Inner storage
     *   it cannot be directly changed from outside of the module
     *   preserve a distinct input/output interface for the flow of data by making it impossible to update the store without using an action
     */
    this._strg = {
      arr: [],
      loaded: false
    };

    // registration of the store's callback with the dispatcher.
    dspr.register((action) => this.handleAction(action));
  }

  /**
   * Handle an action, update a store (using actions only)
   * @param  {object} action A handled action
   */
  handleAction(action) {
    console.log('handleActionList', action);
    
    switch(action.actionType) {
    case constants.MATERIAL_LIST_RECEIVE:
      // replace with a new array
      // without splice: it from API
      this._strg.arr = action.arr;
      this._strg.isLoaded = true;
      this.emitChange();
      break;
    }
  }
  
  /**
   * Get the entire collection of materials
   * @returns {array}
   */
  getList() {
    return this._strg.arr;
  }
  
  /**
   * @returns {bool} Whether the array is loaded
   */
  checkLoaded() {
    return this._strg.isLoaded;
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

export default StoreMaterialList;
