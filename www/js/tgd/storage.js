tgd.getEventDelegate = function(target, selector) {
    var delegate;
    while (target && target != this.el) {
        delegate = $(target).filter(selector)[0];
        if (delegate) {
            return delegate;
        }
        target = target.parentNode;
    }
    return undefined;
};

tgd.getStoredValue = function(key) {
    var saved = "";
    if (window.localStorage && window.localStorage.getItem)
        saved = window.localStorage.getItem(key);
    if (_.isEmpty(saved)) {
        return tgd.defaults[key];
    } else {
        return saved;
    }
};

tgd.StoreObj = function(key, compare, writeCallback) {
    var value = ko.observable(compare ? tgd.getStoredValue(key) == compare : tgd.getStoredValue(key));
    this.read = function() {
        return value();
    };
    this.write = function(newValue) {
        window.localStorage.setItem(key, newValue);
        value(newValue);
        if (writeCallback) writeCallback(newValue);
    };
};