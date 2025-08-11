document.addEventListener("DOMContentLoaded", function () {
  // Get all tab items and content areas
  const tabItems = document.querySelectorAll(".sidebar-item");
  const tabContents = document.querySelectorAll(".tab-content");

  // Add click event listeners to each tab item
  tabItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all tab items and contents
      tabItems.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab item
      this.classList.add("active");

      // Show corresponding content area
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});


// Product details images
var thumbs = $('.img-selection').find('img');

thumbs.click(function(){
  var src = $(this).attr('src');
  var dp = $('.display-img');
  var img = $('.zoom');
  dp.attr('src', src);
  img.attr('src', src);
});

$(".img-thumbnail").click(function(){
  $('.img-thumbnail').removeClass('selected');
  $(this).addClass('selected');
});

var zoom = $('.big-img').find('img').attr('src');
$('.big-img').append('<img class="zoom" src="'+zoom+'">');
$('.big-img').mouseenter(function(){
  $(this).mousemove(function(event){
    var offset = $(this).offset();
    var left = event.pageX - offset.left;
    var top = event.pageY - offset.top;
    
    $(this).find('.zoom').css({
      width: '200%',
      opacity: 1,
      left: -left,
      top: -top,
    });
  });
});

$('.big-img').mouseleave(function(){
  $(this).find('.zoom').css({
    width: '100%',
    opacity: 0,
    left: 0,
    top: 0,
  });
});