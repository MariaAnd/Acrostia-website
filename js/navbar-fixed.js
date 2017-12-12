/*
* Fixed Navbar Scrolling
* Github: https://github.com/ts-de/bootstrap4-fixed-navbar
*/

// init nav object from dom
var nav = $('nav');


// click-trigger
$('a[href*="#"]:not([href="#"])').click(function (event) {
    scrollToSection(this);
    event.preventDefault();
});

// scroll-trigger
$(document).scroll(function () {
    activateCurrentSection();
});

// get target position and scrolls to it
function scrollToSection(self) {
    // get the target href
    var href = $(self).attr('href');

    // get the target position
    var targetPos = $(href).offset().top;

    // scroll to target
    $('html, body').animate({
        scrollTop: targetPos
    }, 600);
}

/*
* Updates active section on scroll
*/
// scroll-trigger
$(document).scroll(function () {
    activateCurrentSection();
});

/*
* Updates active section on scroll
*/
function activateCurrentSection() {
    var id; // init the id of the element that will be activated

    // get all sections
    var sections = $('section');

    // store current position on the page when scroll is triggered
    var pos = $(document).scrollTop();

    /*
    * Exception: if last section is <100% of the screen height
    * make it active when 50% of it is visible.
    * Otherwise the last section would never activate.
    */
    var lastSection = sections[sections.length - 1];  // get last section
    var lastSectionTooSmall = $(lastSection).height() < $(window).height();

    if (lastSectionTooSmall) {
        var lastSectionTopPos = $(lastSection).offset().top;
        // lastSectionTriggerPos is true if 50% of the last section is visible
        var lastSectionTriggerPos = $(window).height() + $(document).scrollTop() - ($(lastSection).height() / 2);
        var lastSectionInView = lastSectionTriggerPos > lastSectionTopPos;
    }

    if (lastSectionTooSmall && lastSectionInView) {
        id = $(lastSection).attr('id');
    } else {  // else last section is >= 100% of the view check all sections to find the top one
        for (var i = 0; i < sections.length; i++) {
            var previousElementHeight = 0, nextElementHeight = 0;
            if (sections[i - 1] !== undefined) {
                previousElementHeight = $(sections[i - 1]).outerHeight() / 2;
            }
            if (sections[i + 1] !== undefined) {
                nextElementHeight = $(sections[i + 1]).outerHeight() / 2;
            }
            var top = $(sections[i]).offset().top - previousElementHeight; // get the top & bottom position of the section
            var bottom = $(sections[i]).offset().top + $(sections[i]).outerHeight();

            /*
             * if the current position is higher (deeper on the page) than the top of the section
             * and it is smaller (heiger on the page) than the bottom of the section
             * it is the active section.
             */
            if (pos >= top && pos <= bottom) {
                id = $(sections[i]).attr('id');       // store the id of this section
            }
        }
        var z = 1;
    }

    /*
     if an id was set before, activate the section in the nav
     */
    if (id) {
        nav.find('a').removeClass('active');
        nav.find('a[href="#' + id + '"]').addClass('active');
    }
}
