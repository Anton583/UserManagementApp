// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"db/user.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserNamesByIds = getUserNamesByIds;
exports.getUsersByIDs = getUsersByIDs;
exports.getUserNameById = getUserNameById;
exports.removeUserByID = removeUserByID;
exports.addUser = exports.findUsersByName = exports.User = exports.getUserId = void 0;

var User =
/** @class */
function () {
  function User(name, yearOfBirth) {
    this.surname = "";
    this.pavelDurovVisits = 0;
    this.name = name;
    this.yearOfBirth = yearOfBirth;
  }

  User.prototype.asString = function () {
    return this.getUserName() + ", " + this.yearOfBirth + ", Pasha visited " + this.pavelDurovVisits + " times.";
  };

  User.prototype.setSurname = function (surname) {
    this.surname = surname;
    return this;
  };

  User.prototype.updateDurovVisits = function (newVisits) {
    this.pavelDurovVisits = newVisits;
    return this;
  };

  User.prototype.getUserName = function () {
    return this.name;
  };

  User.prototype.getUserFullname = function () {
    return this.name + " " + this.surname;
  };

  User.prototype.getUserAgeOfBirth = function () {
    return this.yearOfBirth;
  };

  User.prototype.clone = function (clone) {
    var clonedUser = new User(this.name, this.yearOfBirth).setSurname(this.surname);
    clonedUser.pavelDurovVisits = this.pavelDurovVisits;
    return clonedUser;
  };

  return User;
}(); // dz:
// - findUsersByAge (move to findUsers() form, just like finUsersByName)
// - Assuming today 2019, find all users in particular age range (16, 41)
// - Function to Add multiple users by their names and ages
//   (its  argument is array in form of [["name", 1985], ["name2", 1981]])
//   returns array of their IDs
// - Function which renames user with given id (arguments are: userID, newName)
// - Given an array of user IDs, return an array of users (with fitting IDs)
//   (getUsersByIDs)
// tsc *.ts --outFile output/app.js --strict
// User:
// Name
// Surname
// Year of birth
// Avatar link
// addUser :: (name, yearOfBirth) -> id


exports.User = User;

var getUserId = function getUserId(users) {
  var ids = [];

  for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
    var user = users_1[_i];
    ids.push(users.indexOf(user));
  }

  return ids;
};

exports.getUserId = getUserId;

var addUser = function addUser(newName, newYearOfBirth, users) {
  var newUser = new User(newName, newYearOfBirth);
  var newID = users.push(newUser) - 1;
  return newID;
}; // f = user => Bool


exports.addUser = addUser;

var findUsers = function findUsers(users, f) {
  var userIDsWithMatchingName = [];

  for (var index = 0; index < users.length; index = index + 1) {
    var u = users[index];

    if (f(u)) {
      userIDsWithMatchingName.push(index);
    }
  }

  return userIDsWithMatchingName;
}; // UserID = number
// SearchedName = String
// findUsersByName :: SearchedName -> [UserID]


var findUsersByName = function findUsersByName(searchedName, users) {
  return findUsers(users, function (user) {
    var userFullName = user.getUserFullname().toLowerCase();
    return userFullName.includes(searchedName.toLowerCase());
  });
}; // Age = number
// findUsersByAge :: Age -> [UserID]


exports.findUsersByName = findUsersByName;

var findUsersByAge = function findUsersByAge(minAge, maxAge, users) {
  return findUsers(users, function (user) {
    var userAge = 2019 - user.yearOfBirth;
    return userAge >= minAge && userAge <= maxAge;
  });
}; // - Function to Add multiple users by their names and ages
//   (its  argument is array in form of [["name", 1985], ["name2", 1981]])
//   returns array of their IDs


var addUsers = function addUsers(newUsers, users) {
  var ids = [];

  for (var _i = 0, newUsers_1 = newUsers; _i < newUsers_1.length; _i++) {
    var newUser = newUsers_1[_i];
    var id = addUser(newUser[0], newUser[1], users);
    ids.push(id);
  }

  return ids;
};

function removeUserByID(userID, users) {
  var sliced = users.slice(userID, 1);
  return sliced;
}

function renameUser(userID, newName, users) {
  var previousInfo = users[userID];
  previousInfo.name = newName;
  return users[userID];
} // - Given an array of user IDs, return an array of users (with fitting IDs)
// (getUsersByIDs)


function getUsersByIDs(IDs, users) {
  var finalArrayOfUsers = [];

  for (var _i = 0, IDs_1 = IDs; _i < IDs_1.length; _i++) {
    var iD = IDs_1[_i];
    finalArrayOfUsers.push([iD, users[iD]]);
  }

  return finalArrayOfUsers;
}

function getUserNameById(ID, users) {
  var user = users[ID];
  return user.name;
}

function getUserNamesByIds(IDs, users) {
  var names = [];

  for (var _i = 0, IDs_2 = IDs; _i < IDs_2.length; _i++) {
    var ID = IDs_2[_i];
    names.push(users[ID].name);
  }

  return names;
}
},{}],"utilities.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSubmitButtonVisibility = exports.clearPage = exports.getButtonByType = exports.makeTBodyEl = exports.makeP = exports.getInputField = exports.getResultField = exports.ButtonType = void 0;
// All types of buttons available on the page
var ButtonType;
exports.ButtonType = ButtonType;

(function (ButtonType) {
  ButtonType[ButtonType["Search"] = 0] = "Search";
  ButtonType[ButtonType["Add"] = 1] = "Add";
  ButtonType[ButtonType["Remove"] = 2] = "Remove";
  ButtonType[ButtonType["ShowAll"] = 3] = "ShowAll";
  ButtonType[ButtonType["Submit"] = 4] = "Submit";
})(ButtonType || (exports.ButtonType = ButtonType = {}));

var getResultField = function getResultField() {
  return document.getElementById("queryResult");
};

exports.getResultField = getResultField;

var getInputField = function getInputField() {
  return document.getElementById("inputField");
};

exports.getInputField = getInputField;

var makeP = function makeP(text) {
  return "<p>" + text + "</p>";
};

exports.makeP = makeP;

var makeTBodyEl = function makeTBodyEl(dataN, dataId, dataDOB, dataPDV) {
  "<td>" + dataN + "</td>";
  "<td>" + dataId + "</td>";
  "<td>" + dataDOB + "</td>";
  "<td>" + dataPDV + "</td>";
};

exports.makeTBodyEl = makeTBodyEl;

var getButtonByType = function getButtonByType(type) {
  var buttonID = "";

  switch (type) {
    case ButtonType.Add:
      buttonID = "addBtn";
      break;

    case ButtonType.Remove:
      buttonID = "removeBtn";
      break;

    case ButtonType.Search:
      buttonID = "searchBtn";
      break;

    case ButtonType.ShowAll:
      buttonID = "showAllBtn";
      break;
    // Same as ButtonType.Submit

    default:
      buttonID = "submitBtn";
  }

  return document.getElementById(buttonID);
}; // Clear result, input fields, hide submission button


exports.getButtonByType = getButtonByType;

var clearPage = function clearPage() {
  getResultField().innerHTML = "";
  getInputField().value = "";
  setSubmitButtonVisibility(false);
};

exports.clearPage = clearPage;

var setSubmitButtonVisibility = function setSubmitButtonVisibility(isVisible) {
  return getButtonByType(ButtonType.Submit).style.display = isVisible ? "inline-block" : "none";
};

exports.setSubmitButtonVisibility = setSubmitButtonVisibility;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

var _user = require("./db/user");

var _utilities = require("./utilities");

var users = [new _user.User("Petr", 2002).setSurname("Vlasov").updateDurovVisits(6), new _user.User("Stas", 1951).setSurname("Petrov").updateDurovVisits(2), new _user.User("Slava", 1984).setSurname("Vlavla")];

var searchCard = function searchCard(queryText) {
  var searchResult = (0, _user.getUsersByIDs)((0, _user.findUsersByName)(queryText, users), users);

  for (var _i = 0, searchResult_1 = searchResult; _i < searchResult_1.length; _i++) {
    var _a = searchResult_1[_i],
        userID = _a[0],
        user = _a[1];
    (0, _utilities.getResultField)().innerHTML += (0, _utilities.makeP)("ID: " + userID + " | " + user.asString());
  }
};

var removeCard = function removeCard(queryText) {
  var input = queryText.split(" ")[0];
  var userId = parseFloat(input);
  if (typeof userId !== "number" || userId >= users.length) (0, _utilities.getResultField)().innerHTML = "Please, write the existing Id of user!";else {
    users.splice(userId, 1);
    var removeUser = (0, _user.getUsersByIDs)((0, _user.getUserId)(users), users);

    for (var _i = 0, removeUser_1 = removeUser; _i < removeUser_1.length; _i++) {
      var _a = removeUser_1[_i],
          otherIds = _a[0],
          user = _a[1];
      (0, _utilities.getResultField)().innerHTML += (0, _utilities.makeP)("ID: " + otherIds + " | " + user.asString());
    }
  }
};

var addCard = function addCard(queryText) {
  var newName = queryText.split(" ")[0];
  var newYearOfBirth = parseFloat(queryText.split(" ")[1]);
  var input = newName + " " + newYearOfBirth;

  if (queryText !== input) {
    (0, _utilities.getResultField)().innerHTML = "Please, write name, space bar, year of birth!";
    return;
  }

  var newUser = (0, _user.addUser)(newName, newYearOfBirth, users);
  var resOutput = (0, _user.getUsersByIDs)([newUser], users);

  for (var _i = 0, resOutput_1 = resOutput; _i < resOutput_1.length; _i++) {
    var _a = resOutput_1[_i],
        userID = _a[0],
        user = _a[1];
    if (queryText === input || typeof parseFloat(newName) === "number") (0, _utilities.getResultField)().innerHTML += (0, _utilities.makeP)("ID: " + userID + " | " + user.asString());
  }
};

var init = function init() {
  (0, _utilities.clearPage)();

  (0, _utilities.getButtonByType)(_utilities.ButtonType.ShowAll).onclick = function (ev) {
    var btn = (0, _utilities.getButtonByType)(_utilities.ButtonType.ShowAll);
    btn.innerHTML = "Show All";
    (0, _utilities.getInputField)().style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("hiddenDiv").style.display = "block";
    var table = document.getElementById("tInfoB");
    document.getElementById("showAllBtn").removeAttribute("style");
    document.getElementById("addBtn").style.opacity = "0.5";
    document.getElementById("searchBtn").style.opacity = "0.5";
    document.getElementById("removeBtn").style.opacity = "0.5";
    table.innerHTML = "";

    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
      var user = users_1[_i];
      var userName = user.name;
      var dateOfBAsStr = user.yearOfBirth.toString();
      var pavelDVisitsAsStr = user.pavelDurovVisits.toString();
      var idAsStr = users.indexOf(user);
      table.innerHTML += table.appendChild(document.createElement("tr")).innerHTML = '<td class="col s3">' + userName + "</td>" + '<td class="col s3">' + idAsStr + "</td>" + '<td class="col s3">' + dateOfBAsStr + "</td>" + '<td class="col s3">' + pavelDVisitsAsStr + "</td>";
    }

    (0, _utilities.clearPage)();
  };

  (0, _utilities.getButtonByType)(_utilities.ButtonType.Add).onclick = function (ev) {
    var btn = (0, _utilities.getButtonByType)(_utilities.ButtonType.Submit);
    var inputField = (0, _utilities.getInputField)();
    document.getElementById("addBtn").removeAttribute("style");
    document.getElementById("showAllBtn").style.opacity = "0.5";
    document.getElementById("searchBtn").style.opacity = "0.5";
    document.getElementById("removeBtn").style.opacity = "0.5";
    btn.innerHTML = "Add";

    if ((0, _utilities.getInputField)().style.display || document.getElementById("submitBtn").style.display === "none") {
      (0, _utilities.getInputField)().style.display = "block";
      document.getElementById("submitBtn").style.display = "block";
    }

    if (document.getElementById("hiddenDiv").style.display === "block") document.getElementById("hiddenDiv").style.display = "none";
    (0, _utilities.clearPage)();
  };

  (0, _utilities.getButtonByType)(_utilities.ButtonType.Remove).onclick = function (ev) {
    var btn = (0, _utilities.getButtonByType)(_utilities.ButtonType.Submit);
    btn.innerHTML = "Remove";
    document.getElementById("removeBtn").removeAttribute("style");
    document.getElementById("addBtn").style.opacity = "0.5";
    document.getElementById("searchBtn").style.opacity = "0.5";
    document.getElementById("showAllBtn").style.opacity = "0.5";

    if ((0, _utilities.getInputField)().style.display || document.getElementById("submitBtn").style.display === "none") {
      (0, _utilities.getInputField)().style.display = "block";
      document.getElementById("submitBtn").style.display = "block";
      if (document.getElementById("hiddenDiv").style.display === "block") document.getElementById("hiddenDiv").style.display = "none";
    }

    (0, _utilities.clearPage)();
  };

  (0, _utilities.getButtonByType)(_utilities.ButtonType.Search).onclick = function (ev) {
    var btn = (0, _utilities.getButtonByType)(_utilities.ButtonType.Submit);
    btn.innerHTML = "Search";
    document.getElementById("searchBtn").removeAttribute("style");
    document.getElementById("addBtn").style.opacity = "0.5";
    document.getElementById("removeBtn").style.opacity = "0.5";
    document.getElementById("showAllBtn").style.opacity = "0.5";

    if ((0, _utilities.getInputField)().style.display || document.getElementById("submitBtn").style.display === "none") {
      (0, _utilities.getInputField)().style.display = "block";
      document.getElementById("submitBtn").style.display = "block";
    }

    if (document.getElementById("hiddenDiv").style.display === "block") document.getElementById("hiddenDiv").style.display = "none";
    (0, _utilities.clearPage)();
  };

  window.onload = function () {
    document.getElementById("searchBtn").removeAttribute("style");
  };

  (0, _utilities.getButtonByType)(_utilities.ButtonType.Submit).onclick = function (ev) {
    var inputField = (0, _utilities.getInputField)();
    var queryText = inputField.value;
    var elem = (0, _utilities.getButtonByType)(_utilities.ButtonType.Submit);
    var submitText = elem["outerText"].toUpperCase();
    (0, _utilities.clearPage)();

    switch (submitText) {
      case "SEARCH":
        searchCard(queryText);
        break;

      case "ADD":
        addCard(queryText);
        break;

      case "REMOVE":
        removeCard(queryText);
        break;

      default:
        console.error("What the hell did u just do? UNIMPLEMENTED!");
        break;
    }
  };

  (0, _utilities.getInputField)().oninput = function (ev) {
    var newInputValue = ev.target.value;
    if (newInputValue.length < 1) (0, _utilities.setSubmitButtonVisibility)(false);else (0, _utilities.setSubmitButtonVisibility)(true);
  };
};

init(); // DZ:
// Try to center out the input and result fields DONE
// Extra: input & result fields should be centered out both when SUBMIT button is visible and not DONE
// Selected activity (Search/Add/Remove/Show All) button should be highlighted in some other color DONE
// (HINT: add/remove color class https://materializecss.com/color.html) DONE
// Add "Remove button" functionality DONE
//  In the input field, user can write the ID of the user to delete DONE
//  This deletes the user by ID from DB (if user is found, otherwise display error message) DONE
//  and prints all remaining users in the result field DONE
// Create a 4th button: "Show All" users. DONE
//  If you click it, the input field is gone, and only resultField is visible, where you can see all the users DONE
// Move user output formatting to table (https://materializecss.com/table.html) DONE
},{"./db/user":"db/user.ts","./utilities":"utilities.ts"}],"C:/Users/viach/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50164" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/viach/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=app.c61986b1.js.map