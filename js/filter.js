$('.filter-menu li a').click(function () {
    $('.filter-menu li').removeClass('selected');
    $(this).parent('li').addClass('selected');

    var thisItem = $(this).attr('rel');
    var width = 260;

    if (thisItem != "all") {
        $('div .image-container[rel=' + thisItem + ']').show(300);

        $('div .image-container[rel!=' + thisItem + ']').hide(300)

    } else {
        $('div .image-container').show(300)
    }

});