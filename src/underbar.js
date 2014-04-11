/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var last = array.length
    if (n > last-1) {
      return array;
    } else if (n === 0) {
      return [];
    } else if (n === undefined) {
      return array.pop();
    } else {
      return array.slice(last-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for ( var i = 0 ; i < collection.length ; i ++ ) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection == 'object') {
        for ( var key in collection ) {
          iterator(collection[key], key, collection);
        }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
    // where item == element / collection[i] & index = i in _.each
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };
  /*
  // Return all *elements* of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(element) {
      if (test(element)) {
        result.push(element);
      }
    });
    return result;
  };

  // use _.reduce to push all arrays that pass a truth test
  // reduce(collection, func, []);
  */

  _.filter = function(collection, test) {
    return _.reduce(collection, function(memory, element) {
      if (test(element)) {
        memory.push(element);
      }
      return memory;
    }, [])
  };



  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function (element) {
      return !test(element);
    })
  };

  // Produce a duplicate-free version of the array.
  // array.indexOf(element) == -1
  /*
  _.uniq = function(array) {
    var result = [];
    _.each(array, function(element) {
      if (result.indexOf(element) == -1) {
        result.push(element);
      }
    });
    return result;
  };
  */

  _.uniq = function (array) {
    return _.reduce(array, function(memory, element) {
      if(memory.indexOf(element) == -1) {
        memory.push(element);
      }
      return memory;
    }, [])
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    /*
    var result = [];
    _.each(array, function(element) {
      result.push(iterator(element));
    });
    return result;
    */
    return _.reduce(array, function(memory, element) {
      memory.push(iterator(element));
      return memory;
    }, [])
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list. *apply a function (_.map) on each value
  // Note: you will nead to learn a bit about .apply to complete this.
  // http://www.youtube.com/watch?v=ya4UHuXNygM&feature=youtu.be&t=15m52s
  _.invoke = function(collection, functionOrKey, args) { // where args is an optional single array [args] parameter
    return _.map(collection, function(element) {
      if (typeof(functionOrKey) == "string") {
        return element[functionOrKey].apply(element, args);
      } else {
        return functionOrKey.apply(element, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, memory) {
    _.each(collection, function(element) {
      memory = iterator(memory, element);
    });
    return memory;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  // TIP: Try re-using reduce() here.
  // _.identity: Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function(memory, element) {
      if (memory === false) {
        return false;
      } else {
        if (iterator) {
          return Boolean(iterator(element)); //handles callback
        } else {
          return Boolean(element); //works when no callback is provided
        }
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // if any test returns true end code;
  _.some = function(collection, iterator) {
    return Boolean(_.reduce(collection, function(memory, element){
      if (memory === true) {
        return true;
      } else {
        if (iterator) {
          return Boolean(iterator(element));
        } else {
          return Boolean(element);
        }
      }
    }, false));
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function (element) {
      if (element) {
        for (var key in element) {
          obj[key] = element[key];
        }
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function (element) {
      if (element) {
        for (var key in element) {
          if (obj[key] == undefined) {
            obj[key] = element[key];
          }
        }
      }
    });
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memoized = {};
    var result;
    return function (args) {
      if (memoized[arguments[0]] === undefined) {
        result = func.apply(this, arguments);
        memoized[arguments] = result;
        return result;
      } else {
        return memoized[arguments]
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  // Array.prototype.slice.call(arguments)
  // http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
  _.delay = function(func, wait) {
    var params = Array.prototype.slice.call(arguments, 2); // ['a', 'b'];
    return setTimeout(function () {
      return func.apply(this, params);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  // http://www.javascriptkit.com/javatutors/arraysort.shtml
  _.shuffle = function(array) {
    var copy = array.slice();
    return copy.sort(function () {
      return 0.5 - Math.random();
    })
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var params = Array.prototype.slice.call(arguments, 0);
    var largest = 0;
    var loopCount = 0;
    var counter = 0;
    // finding largest array for laterz
    _.each(params, function (element) {
      if (element.length > largest) {
        largest = element.length;
      }
    });
    // template of undefined result
    for (var i = 0 ; i < largest ; i++) {
      var sample = [];
      for (var j = 0 ; j < params.length ; j++) {
        sample.push(undefined);
      }
      result.push(sample);
    }
    // ZIP BABY ZIP!
    _.each(params, function (elements) {
      _.each(elements, function (value) {
        result[loopCount][counter] = value;
        loopCount++;
      });
      counter++;
      loopCount = 0;
    });

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flat = [];
    var inner;
    if (result) {
      _.each(nestedArray, function (element) {
        if (Array.isArray(element)) {
          _.each(element, function (value) {
            flat.push(value);
          });
        } else {
          flat.push(element);
        }
      });
    } else {
      _.each(nestedArray, function (elements) {
        if (!Array.isArray(elements)) {
          flat.push(elements);
        } else if (elements.length === 1) {
          inner = elements;
          while (typeof inner == 'object') {
            inner = elements[0]
          }
          flat.push(inner);
        } else {
          // apply recursion here ->
        }
      });
    }
    return flat;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var init = [];
    var hold = [];
    var result;
    var params = Array.prototype.slice.call(arguments, 1);
    var counter = 0;
    var holder = 0;

    _.each(arguments[0], function (value) {
      init.push(value);
    });
    _.each(params, function (element) {
      _.each(element, function (val) {
        if (init.indexOf(val) !== -1) {
          hold.push(val);
        }
      });
    });
    _.each(hold, function (elements) {
      _.each(hold, function (testEach) {
        if (elements === testEach) {
          holder++;
        };
        if (holder > counter) {
          counter = holder
          holder = 0;
          result = new Array(testEach);
        }
      });
    });
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
