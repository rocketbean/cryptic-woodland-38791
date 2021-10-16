const route = require("../../../package/framework/chasi/Routing/Route")

module.exports = function() {
  route.get('claims', "ClaimController@list");
  route.get("credits", "UserController@credits")
  route.get('items', "ItemController@list");
  route.group({prefix: 'item'}, (function () {
    route.post('', "ItemController@create");
    route.get('', "ItemController@index");
  }));
  route.group({prefix: 'cart'}, (function () {
    route.get('', "CartController@index");
    route.post('add', "CartController@addItem");

    route.group({prefix: ':cart'}, (function () {
      route.patch('', "CartController@update");

      route.group({prefix: 'item/:cartitem'}, (function () {
        route.post('validate', "CartItemController@validateItem");
        route.post('purchase', "CartItemController@purchase");
        route.patch('', "CartController@updateItem");
      }));
      
    }));
  }));

}
