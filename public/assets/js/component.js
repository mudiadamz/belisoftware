$(function () {
  $(document).find("[data-component]").each(function (i, dom) {
    var $dom = $(dom);
    var comp = $dom.attr("data-component");
    fetch("component/" + comp + ".html")
      .then(resp => resp.text())
      .then(content => {
        $dom.append(content);
      }).catch(reportError => console.error(reportError));
  });
});


