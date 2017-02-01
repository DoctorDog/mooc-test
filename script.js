'use strict';
/* eslint-env jquery */
/* eslint no-console: 0 */

$(function DOMContentLoaded() {
  setImages();
  updateView();
});

$(window).on('hashchange', updateView);

function updateView() {
  showSlide();
  updateCounter();
  resize();
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

function resize() {
  var workspaceWidth = 1440;
  var workspaceHeight = 900;
  var workspaceRatio = workspaceWidth / workspaceHeight;
  // console.log('workspaceWidth:', workspaceWidth, 'workspaceHeight:', workspaceHeight, 'workspaceRatio:', workspaceRatio)

  // var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  // var minWidth = 1000;
  var minHeight = 600;

  var ratioHeight = Math.max(windowHeight, minHeight);
  var ratioWidth = ratioHeight * workspaceRatio;
  var ratio = ratioHeight / workspaceHeight;
  // console.log('ratioWidth:', ratioWidth, 'ratioHeight:', ratioHeight, 'ratio:', ratio)
  $('.slide.show').height(ratioHeight).width(ratioWidth);

  saveDefaultSizes();

  // console.info('--> resize')
  $('.slide.show [data-resizable]').each(function () {
    ['width', 'height', 'top', 'right', 'bottom', 'left'].forEach(function (value) {
      if ($(this).data(value)) {
        $(this).css(value, $(this).data(value) * ratio);
      }
    }.bind(this));
  });
}

function saveDefaultSizes() {
  // console.info('saveDefaultSizes')
  if ($('.slide.show').data('saved')) {
    // console.log('saveDefaultSizes early return')
    return;
  }
  $('.slide.show').data('saved', true);

  $('.slide.show [style]').each(function () {
    if (!/top|right|bottom|left/.test(this.style.cssText)) {
      // console.log('not interesting element', this)
      return;
    }

    for (var i = this.style.length - 1; i>=0; i--) {
      var name = this.style[i];
      if (/width|height|top|right|bottom|left/.test(name)) {
        $(this).attr('data-resizable', true);
        $(this).data(name, Number.parseFloat(this.style.getPropertyValue(name)));
      }
    }
    // console.log(this, $(this).data(), $(this).data().length)
  });
}
