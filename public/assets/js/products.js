var SI_SYMBOL = ["", "Rb", "Jt", "Ml", "Tr", "P", "E"];

function price(number) {

  // what tier? (determines SI symbol)
  var tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}

function showProduct(items) {
  var $productWrapper = $(document).find("#items");
  if (Object.keys(items).length === 0) {
    $productWrapper.append('<div class="alert alert-danger">No item in this category!</div>')
    return;
  }

  for (var id in items){
    var item = items[id];
    loadImage(item.photo);
    var itemStatus = item.status === "Available" ? "bg-success" : "bg-danger";

    loadImage(item.photo);
    $productWrapper.append("<div class=\"col-12 col-md-6 col-lg-4\">" +
      "                    <div class=\"card mb-4 product-wap rounded-0\">" +
      "                        <div class=\"card rounded-0\">" +
      "                            <img class=\"card-img rounded-0 img-fluid " + item.photo + "\" src=\"assets/img/placeholder.gif\" alt=\"thumb\">" +
      "                        </div>" +
      "                        <div class=\"card-body\">" +
      "                            <h3>" + item.name + "</h3>" +
      "                            <div class='list-item-description'>" + item.description + "</div>" +
      "                            <ul class=\"list-unstyled d-flex justify-content-center mb-1\">" +
      "                                <li>" +
      "                                    <i class=\"text-warning fa fa-star\"></i>" +
      "                                    <i class=\"text-warning fa fa-star\"></i>" +
      "                                    <i class=\"text-warning fa fa-star\"></i>" +
      "                                    <i class=\"text-warning fa fa-star\"></i>" +
      "                                    <i class=\"text-warning fa fa-star\"></i>" +
      "                                </li>" +
      "                            </ul>" +
      "                            <p class=\"text-center mb-0\">Rp " + price(item.price) + "</p>" +
      "                            <a class=\"btn btn-primary btn-lg\" href=\"product-detail.html?id=" + item.id + "\">Buy Now</a>" +
      "                        </div>" +
      "                    </div>" +
      "                </div>");
  }
}

function loadProduct(cat) {

  fetch(firebaseConfig.databaseURL + "/" + TABLE_ITEMS + ".json")
    .then(resp => resp.json())
    .then(items => {
      var filtered = [];
      for (var i in items) {
        var item = items[i];
        if (typeof cat !== "undefined" && item.category !== cat) continue;
        filtered[i] = item;
      }
      showProduct(filtered);
    });

}