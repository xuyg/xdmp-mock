module.export=function(){
Array.prototype._all = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (!func(this[i])) return false;
    }
    return true;
};

Array.prototype._any = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) return true;
    }
    return false;
};

Array.prototype._average = function (func) {
    var total = 0;
    for (var i = 0; i < this.length; i++) {
        total += func ? func(this[i]) : this[i];
    }
    return total / this.length;
};

Array.prototype._count = function (func) {
    if (func === undefined) return this.length;
    var total = 0;
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) total++;
    }
    return total;
};


Array.prototype._distinct = function (func) {
    var distinctValues = {};
    var newCollection = [];
    for (var i = 0; i < this.length; i++) {
        var property = func ? func(this[i]) : this[i];
        if (distinctValues[property] === undefined) {
            distinctValues[property] = 1;
            newCollection.push(this[i]);
        }
    }
    return newCollection;
};

Array.prototype._first = function (func) {
    if (func === undefined) return this[0];
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) return this[i];
    }
};

Array.prototype._single = function (func) {
    var ex = "The sequence is empty or contains more then one element";

    if (func === undefined && this.length === 1) return this[0];
    else if (func === undefined && this.length !== 1) throw new Error(ex);

    var single;
    var occurence = 0;
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            single = this[i];
            occurence++;
        }
    }

    if (occurence === 1) return single;
    else throw new Error(ex);
};

Array.prototype._max = function (func) {
    var maxValue = null;
    var maxItem = null;

    for (var i = 0; i < this.length; i++) {
        var val = func ? func(this[i]) : this[i];
        if (maxValue === null || val > maxValue) {
            maxValue = val;
            maxItem = this[i];
        }
    }

    return maxItem;
};

Array.prototype._min = function (func) {
    var minValue = null;
    var minItem = null;

    for (var i = 0; i < this.length; i++) {
        var val = func ? func(this[i]) : this[i];
        if (minValue === null || val < minValue) {
            minValue = val;
            minItem = this[i];
        }
    }

    return minItem;
};

Array.prototype._sum = function (func) {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += func ? func(this[i]) : this[i];
    }
    return sum;
};

Array.prototype._takeWhile = function (func) {
    var newCollection = [];
    for (var i = 0; i < this.length; i++) {
        if (!func(this[i])) return newCollection;
        newCollection.push(this[i]);
    }
    return newCollection;
};

Array.prototype._where = function (func) {
    var newCollection = [];
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            newCollection.push(this[i]);
        }
    }
    return newCollection;
};


Array.prototype._join = function (coll, keyA, keyB, joinFunc) {
    var newCollection = [];
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < coll.length; j++) {
            if (this[i][keyA] === coll[j][keyB] && this[i][keyA] !== undefined) {
                newCollection.push(joinFunc(this[i], coll[j]));
                break;
            }
        }
    }
    return newCollection;
};

Array.prototype._intersect = function (coll) {
    var newCollection = [];

    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < coll.length; j++) {
            if (this[i] === coll[j]) {
                newCollection.push(this[i]);
                break;
            }
        }
    }

    return newCollection._distinct();
};

Array.prototype._except = function (coll) {
    var newCollection = [];

    for (var i = 0; i < this.length; i++) {
        var match = false;
        for (var j = 0; j < coll.length; j++) {
            if (this[i] === coll[j]) {
                match = true;
                break;
            }
        }
        if (!match) newCollection.push(this[i]);
    }

    return newCollection._distinct();
}

Array.prototype._select = function (func) {
    var newCollection = [];
    for (var i = 0; i < this.length; i++) {
        newCollection.push(func(this[i]));
    }
    return newCollection;
};

Array.prototype._selectMany = function (func) {
    var newCollection = [];
    for (var i = 0; i < this.length; i++) {
        newCollection = newCollection.concat(func(this[i]));
    }
    return newCollection;
};
}()
