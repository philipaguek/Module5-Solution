(function (global) {
    var dc = {};
    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
    var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  
    function insertHtml(selector, html) {
      document.querySelector(selector).innerHTML = html;
    }
  
    function insertProperty(string, propName, propValue) {
      return string.replace(new RegExp("{{" + propName + "}}", "g"), propValue);
    }
  
    function chooseRandomCategory(categories) {
      var randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {
        var randomCategory = chooseRandomCategory(categories);
        $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {
          var finalHtml = insertProperty(homeHtml, "randomCategoryShortName", randomCategory.short_name);
          insertHtml("#main-content", finalHtml);
        }, false);
      }, true);
    });
  
    dc.loadMenuItems = function (categoryShortName) {
      var url = menuItemsUrl + categoryShortName + ".json";
      $ajaxUtils.sendGetRequest(url, function (data) {
        var html = `<h2 class="text-center">${data.category.name} Menu</h2><div class="row">`;
        data.menu_items.forEach(function (item) {
          html += `
            <div class="col-md-6 menu-item-tile">
              <div class="tile">
                <h4>${item.name}</h4>
                <p>${item.description || "No description available."}</p>
              </div>
            </div>`;
        });
        html += "</div>";
        insertHtml("#main-content", html);
      });
    };
  
    global.$dc = dc;
  })(window);
  