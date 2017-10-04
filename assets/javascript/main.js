(function ($) {
  "use strict";
  $(document).ready(function () {

    var $window = $(window),
      $articleHeader = $('.article-header'),
      $articleTopNav = $("#articleTopNav");

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

        // articleTopNav
        // scrolling down
        if (top > this.previousTop && top > $articleTopNav.height()) {
          $articleTopNav
            .removeClass("is-visible")
            .addClass("is-not-at-the-top");
        }
        // scrolling up
        else if (top < this.previousTop && top > $articleTopNav.height()) {
          $articleTopNav
            .addClass("is-visible");
        }
        // in the middle of the navbar
        else if (top <= $articleTopNav.height()) {
          $articleTopNav
            .removeClass("is-not-at-the-top")
            .removeClass("is-visible");
        }
        this.previousTop = top;
      }
            // // articleTopNav
            // if (top < this.previousTop) {
            //   //if scrolling up...
            //   if (top > 0 && $articleTopNav.hasClass('is-not-at-the-top')) {
            //     $articleTopNav.addClass('is-visible');
            //   } else {
            //     $articleTopNav.removeClass('is-visible is-not-at-the-top');
            //   }
            // } else if (top > this.previousTop) {
            //   //if scrolling down...
            //   $articleTopNav.removeClass('is-visible');
            //   if (top > $articleTopNav.height() && !$articleTopNav.hasClass('is-not-at-the-top')) $articleTopNav.addClass('is-not-at-the-top');
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