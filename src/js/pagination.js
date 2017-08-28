$( document ).ready(function() {


    let pageSize = 3;
    let pagesCount = $(".content").length;
    let currentPage = 1;

    /////////// PREPARE NAV ///////////////
    let nav = '';
    let totalPages = Math.ceil(pagesCount / pageSize);

    for (let s=0; s<totalPages; s++){
        nav += '<li class="numeros"><a href="#">'+(s+1)+'</a></li>';
    }
    $(".pag_prev").after(nav);
    $(".numeros").first().addClass("active");
    //////////////////////////////////////

    let showPage = function() {
        $(".content").hide().each(function(n) {
            if (n >= pageSize * (currentPage - 1) && n < pageSize * currentPage)
                $(this).show();
        });

        $(".hrStyle").hide().each(function(n) {
            if (n >= pageSize * (currentPage - 1) && n < pageSize * currentPage)
                $(this).show();
        });
    };

    showPage();


    $(".pagination li.numeros").click(function() {
        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        currentPage = parseInt($(this).text());
        showPage();
    });

    $(".pagination li.pag_prev").click(function() {
        if($(this).next().is('.active')) return;
        $('.numeros.active').removeClass('active').prev().addClass('active');
        currentPage = currentPage > 1 ? (currentPage-1) : 1;
        showPage();
    });

    $(".pagination li.pag_next").click(function() {
        if($(this).prev().is('.active')) return;
        $('.numeros.active').removeClass('active').next().addClass('active');
        currentPage = currentPage < totalPages ? (currentPage+1) : totalPages;
        showPage();
    });
});