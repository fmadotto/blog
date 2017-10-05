(function ($) {
  "use strict";
  $(document).ready(function () {

    var $window = $(window),
      $articleHeader = $('.article-header'),
      $topNav = $(".navbar");

    var top = $window.scrollTop();

    $window.on('scroll', {
      previousTop: 0
    }, function () {

      top = $window.scrollTop();
      
      if (top > 0) {
        // articleHeaderImage
        if (top < $articleHeader.height()) {
          $articleHeader
          .css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)')
          .css('opacity', 1 - Math.max(top / 350, 0));
        }  

        // topNav
        // scrolling down
        if (top > this.previousTop && top > $topNav.height()) {
          $topNav
            .removeClass("is-visible")
            .addClass("is-not-at-the-top");
        }
        // scrolling up
        else if (top < this.previousTop && top > $topNav.height()) {
          $topNav
            .addClass("is-visible");
        }
        // in the middle of the navbar
        else if (top <= $topNav.height()) {
          $topNav
            .removeClass("is-not-at-the-top")
            .removeClass("is-visible");
        }
        this.previousTop = top;
      }
            // // topNav
            // if (top < this.previousTop) {
            //   //if scrolling up...
            //   if (top > 0 && $topNav.hasClass('is-not-at-the-top')) {
            //     $topNav.addClass('is-visible');
            //   } else {
            //     $topNav.removeClass('is-visible is-not-at-the-top');
            //   }
            // } else if (top > this.previousTop) {
            //   //if scrolling down...
            //   $topNav.removeClass('is-visible');
            //   if (top > $topNav.height() && !$topNav.hasClass('is-not-at-the-top')) $topNav.addClass('is-not-at-the-top');
            // }
            // this.previousTop = top;
    });
    $window.trigger('scroll');

    var height = $('.page-header').height();
    $('.page-post-content').css('padding-top', height + 'px');

    $window.on('resize', function () {
      height = $('.page-header').height();
      $('.page-post-content').css('padding-top', height + 'px');
    });
    $window.trigger('resize');

    $(function () {
      $('.anchor').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
  });
}(jQuery));