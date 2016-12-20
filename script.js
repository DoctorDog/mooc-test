$(function DOMContentLoaded() {
  setImages();
  updateView();
});

$(window).on('hashchange', updateView);

function updateView() {
  showSlide();
  updateCounter();
}

function setImages() {
  $('.slide').each(function () {
    var imageName = $(this).attr('id').replace(/(\w+)(-\w*)?/, '$1') + '.png';
    $(this).css('background-image', 'url("' + imageName + '")');
  })
}

function showSlide() {
  if (!location.hash) {
    location.hash = '#slide1';
    return;
  }

  $('.slide.show').removeClass('show').hide();
  $(location.hash).addClass('show').show();
}

var counterMax = $('.slide').length;
function updateCounter() {
  var progress = ($(location.hash).index() + 1) / counterMax * 100;
  $('#counter_progress').animate({
    width: progress + '%',
  });
}
