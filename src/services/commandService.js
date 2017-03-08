
let _instanceCommandService = null;

export class CommandService {

  // Singleton constructor
  constructor() {
    if(!_instanceCommandService) {
      _instanceCommandService = this;
    }

    this.subscriptions = {};
    this.subId = 0;

    return _instanceCommandService;
  }

  trigger(key, attrs=false) {
    if(!this.subscriptions[key]) {
      return;
    }

    const calls = this.subscriptions[key];
    for(let i = 0; i < calls.length; i++) {
        const sub = calls[i];
        if(attrs) {
            sub['callback'](attrs);
        } else {
            sub['callback']();
        }

    }

  }

  on(key, callback) {

    const subscription = {
      id: this.subId++,
      key: key,
      callback: callback
    };
    if(!this.subscriptions[key]) {
      this.subscriptions[key] = [];
    }

    this.subscriptions[key].push(subscription);

    return () => {
        this._removeSubscription(key, subscription.id);
    }
  }

  _removeSubscription(key, id) {

    this.subscriptions[key] = this.subscriptions[key].filter((item) => {
      return item.id != id;
    });

  }


}
