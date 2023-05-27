$(function () {
    initView();
});

$(document).on("click", ".toggle-sidebar-btn", function (e){
    if($(document).find("body").hasClass("toggle-sidebar")){
        $(document).find("body").removeClass("toggle-sidebar");
    } else {
        $(document).find("body").addClass("toggle-sidebar");
    }
});

$(document).on("click", ".sidebar .nav-link", function (e){
    $(document).find(".sidebar .nav-link").each(function (){
        if(!$(this).hasClass("collapsed")){
            $(this).addClass("collapsed");
        }
    });
    $(this).removeClass("collapsed");
});

//Every link clicked setView
$(document).on("click", "a", function (e){
    var view = $(this).attr("href");
    if($(this).attr("target") ) return;
    if(!validView(view)) return;
    e.preventDefault();
    setView(view);
});

function initView() {
    var defPage = "../admin/view/index.html"; //default page
    var url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    var view = params.get("v");
    var page = view||defPage;

    //set the active sidebar
    $(document).find(".sidebar .nav-link").each(function (){
        var href = $(this).attr("href");
        if(!$(this).hasClass("collapsed")){
            $(this).addClass("collapsed");
        }
        if(href===page){
            $(this).removeClass("collapsed");
        }
    });

    //set the view
    setView(page);
}
function setView(page){
    $(document).find("#main").load(page, function (response, status, xhr ){
        var url = new URL(window.location.href);
        var status = xhr.status;
        if(status===404){
            $(document).find("#main").load("../admin/view/error/404.html");
        }
        url.searchParams.set("v", page);
        history.pushState({}, "", url.href);
    });
}
function validView(viewPath){
    return /^[a-z0-9._\-/\\]+\.html$/i.test(viewPath);
}