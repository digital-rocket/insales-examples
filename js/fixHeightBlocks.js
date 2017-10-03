/**
 * Выравнивание блоков по высоте
 * @param  {string} selector      блоки которые нужно выровнять
 * @param  {string} innerSelector внутренний блок
 * @param  {string} _cssValue     css свойство для подстановки значения
 *
  fixHeightBlocks('.card', '.card-title', 'padding-bottom')

   $(window).on('resize', function(event) {
     fixHeightBlocks('.card', '.card-title', 'padding-bottom')
   });
 */
function fixHeightBlocks(selector, innerSelector, _cssValue) {
  var cssValue = _cssValue || 'margin-bottom';
  var $blocks = $(selector);
  var groups = {}

  $blocks.each(function(index, el) {
    var scrolltop = $(el).offset().top;
    if (!groups[scrolltop]) {
      groups[scrolltop] = {
        isMax: 0,
        items: []
      }
    }

    groups[scrolltop].items.push(el);

    if ($(el).outerHeight() > groups[scrolltop].isMax) {
      groups[scrolltop].isMax = $(el).outerHeight();
    }
  });

  $.each(groups, function(index, group) {
    var isMax = group.isMax;
    var $blocks = group.items;
    $.each($blocks, function(index, el) {
      if ($(el).outerHeight() < isMax) {
        var _margin = isMax - $(el).outerHeight();

        $(el).find(innerSelector).css(cssValue, _margin);
      }
    });
  });
}
