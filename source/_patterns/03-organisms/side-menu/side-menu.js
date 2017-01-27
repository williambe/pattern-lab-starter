// 'use strict';

(function Application($) {
  var toggleSideMenu = function toggleSideMenu() {
    var $sideToggle = $('.side-toggle');

    $sideToggle.on('click', function () {
      $('body').toggleClass('is-side-menu-open');
    });
  };

  var onSearchChange = function onSearchChange() {
    $('.search').find('input').on('focusin', function () {
      $('.search').addClass('is-type');
    });

    $('.search').find('input').on('focusout', function () {
      $('.search').removeClass('is-type');
    });
  };

  onSearchChange();
  toggleSideMenu();
})(jQuery, Drupal);