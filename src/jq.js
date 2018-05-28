import $ from 'jquery';

$(() => {
  $('.mobile-menu-trigger').on('click', () => {
    $('.menu-mobile .menu-and-user').slideToggle(200, 'swing');
    return false;
  });

  let menu_timer;
  $('.menu-activated-on-hover').on('mouseenter', 'ul.main-menu > li.has-sub-menu', function () {
    const $elem = $(this);
    clearTimeout(menu_timer);
    $elem
      .closest('ul')
      .addClass('has-active')
      .find('> li')
      .removeClass('active');
    $elem.addClass('active');
  });

  $('.menu-activated-on-hover').on('mouseleave', 'ul.main-menu > li.has-sub-menu', function () {
    const $elem = $(this);
    menu_timer = setTimeout(() => {
      $elem
        .removeClass('active')
        .closest('ul')
        .removeClass('has-active');
    }, 30);
  });

  // INIT MENU TO ACTIVATE ON CLICK
  $('.menu-activated-on-click').on('click', 'li.has-sub-menu > a', function (event) {
    const $elem = $(this).closest('li');
    if ($elem.hasClass('active')) {
      $elem.removeClass('active');
    } else {
      $elem
        .closest('ul')
        .find('li.active')
        .removeClass('active');
      $elem.addClass('active');
    }
    return false;
  });

  $('.autosuggest-search-activator').on('click', function () {
    let search_offset = $(this).offset();
    // If input field is in the activator - show on top of it
    if ($(this).find('input[type="text"]')) {
      search_offset = $(this)
        .find('input[type="text"]')
        .offset();
    }
    const search_field_position_left = search_offset.left;
    const search_field_position_top = search_offset.top;
    $('.search-with-suggestions-w')
      .css('left', search_field_position_left)
      .css('top', search_field_position_top)
      .addClass('over-search-field')
      .fadeIn(300)
      .find('.search-suggest-input')
      .focus();
    return false;
  });

  $('.search-suggest-input').on('keydown', (e) => {
    // Close if ESC was pressed
    if (e.which == 27) {
      $('.search-with-suggestions-w').fadeOut();
    }

    // Backspace/Delete pressed
    if (e.which == 46 || e.which == 8) {
      // This is a test code, remove when in real life usage
      $('.search-with-suggestions-w .ssg-item:last-child').show();
      $('.search-with-suggestions-w .ssg-items.ssg-items-blocks').show();
      $('.ssg-nothing-found').hide();
    }

    // Imitate item removal on search, test code
    if (e.which != 27 && e.which != 8 && e.which != 46) {
      // This is a test code, remove when in real life usage
      $('.search-with-suggestions-w .ssg-item:last-child').hide();
      $('.search-with-suggestions-w .ssg-items.ssg-items-blocks').hide();
      $('.ssg-nothing-found').show();
    }
  });

  $('.close-search-suggestions').on('click', () => {
    $('.search-with-suggestions-w').fadeOut();
    return false;
  });
});

$('.exp-dropdown-trigger').on('mouseenter', function () {
  $(this).addClass('over');
});
$('.exp-dropdown-trigger').on('mouseleave', function () {
  $(this).removeClass('over');
});
