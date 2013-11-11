$(document).ready(function(){
  // create tage cloud as the background on the home page
  // if(!$('#myCanvas').tagcanvas({
  //     textColour: 'white',
  //     // outlineColour: '#ff00ff',
  //     reverse: true,
  //     depth: 0.8,
  //     maxSpeed: 0.05,
  //     wheelZoom: false
  //   }, 'tags')) {
  //   // something went wrong, so hide the canvas container
  //   $('#myCanvasContainer').hide();
  // }

  // load all the content in one page and hide until user click
  // $('.content').hide();
  $('.content > div').hide();
  $("#homePage").show();

  // animation for the home page navigation menu

  // whether it is the first time that user click on the home page navigation menu
  var first = true;
  // the target that is currently displayed
  var selectedTarget = "homePage";
  var homeMenuPositions = null;
  var HOME_ANIMATION_DURATION = 1000;
  $('.menu > div').click(function() {
    var clicked = this;
    var target = $(clicked).data('target');
    if (selectedTarget == target) {
      return;
    }
    selectedTarget = target;
    // sets the selected styles on the menu button that was clicked on,
    // including its animation and halo effect. Also removes those styles
    // from any buttons that had them before.
    var turnOnClicked = function() {
      $('.menu > div').removeClass('animated pulse');
      $('.menu > div').css('box-shadow','none');

    // when the user click the menu, the animation for the selected menu item
      $(clicked).css('box-shadow','0px 0px 8px 8px #F8D45D');
      $(clicked).addClass('animated pulse');
    // display the content for corresponding item in the menu 
      $('.content > div').hide();//fadeOut();
      $('.content').show();
      $('#' + target).fadeIn();
    };
    //menu move to the top animation for the first time click
    if (first) {
      if (!homeMenuPositions) {
        // Save the attributes of the menu 'div's on the first click.
        homeMenuPositions = [];
        $('.menu > div').each(function() {
          var self = $(this);
          var top;
          homeMenuPositions.push(top = {
            'top': self.css('top'),
            'width': self.css('width'),
            'height': self.css('height'),
            'line-height': self.css('line-height')
          });
          // console.log(top);
        });
      }
      $('.menu > div').animate({
        top: '70px',
        width: '70px',
        height: '70px',
        'line-height': '70px'
      }, HOME_ANIMATION_DURATION, turnOnClicked);
      first = false;
    } else {
      turnOnClicked();
      if (target == "homePage") {
        // Have to undo the starting animations.
        var i = 0;
        $('.menu > div').each(function() {
          $(this).animate(homeMenuPositions[i++], HOME_ANIMATION_DURATION,
                          i == 1 ? turnOnClicked : null);
        });
        first = true;
      }
    }
  });

  // initialize the projects page
  initProjects();
});
