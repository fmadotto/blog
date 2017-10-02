(function ($) {
  "use strict";
  $(document).ready(function(){

    var $window = $(window),
    $image = $('.page-cover-image');
    
      $window.on('scroll', function() {
        var top = $window.scrollTop();

        if (top < 0 || top > 1500) { return; }
        $image
          .css('transform', 'translate3d(0px, '+top/3+'px, 0px)')
          .css('opacity', 1-Math.max(top/700, 0));
      });
      $window.trigger('scroll');

      var height = $('.page-header').height();
      $('.page-post-content').css('padding-top', height + 'px');

      $window.on('resize', function() {
        height = $('.page-header').height();
        $('.page-post-content').css('padding-top', height + 'px');
      });
      $window.trigger('resize');

      $(function() {
        $('.anchor').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
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