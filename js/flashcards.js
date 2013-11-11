
// the namespace
var flashcards = {};

// the flashcards in the deck
flashcards.cards = [{
  "english": "hello",
  "chinese": "你好",
  "pinyin": "nǐ hǎo"
}, {
  "english": "thanks",
  "chinese": "谢谢",
  "pinyin": "xièxiè"
}, {
  "english": "welcome",
  "chinese": "欢迎",
  "pinyin": "huānyíng"
}, {
  "english": "you are welcome",
  "chinese": "不用谢",
  "pinyin": "bùyòng xiè"
}, {
  "english": "wait a moment",
  "chinese": "等一下",
  "pinyin": "děng yīxià"
}, {
  "english": "drive a car",
  "chinese": "开车",
  "pinyin": "kāichē"
}, {
  "english": "good",
  "chinese": "好",
  "pinyin": "hǎo"
}, {
   "english": "bad",
  "chinese": "坏",
  "pinyin": "huài"
}, {
  "english": "expensive",
  "chinese": "贵",
  "pinyin": "guì"
}, {
  "english": "cheap",
  "chinese": "便宜",
  "pinyin": "piányi"
}, {
  "english": "busy",
  "chinese": "忙",
  "pinyin": "máng"
}, {
  "english": "difficult",
  "chinese": "难",
  "pinyin": "nán"
}, {
  "english": "smart",
  "chinese": "聪明",
  "pinyin": "cōngmíng"
}, {
  "english": "pretty",
  "chinese": "漂亮",
  "pinyin": "piàoliang"
}, {
  "english": "cute",
  "chinese": "可爱",
  "pinyin": "kěài"
}];
// var flashcards = [];
// which flashcard we are showing
flashcards.cardIndex = 0;


// shuffles the deck of flashcards
flashcards.shuffle = function() {
  // fisher-yates shuffle algorithm
  var count = flashcards.cards.length;
  if (count > 0) {
    while (--count){
      var newCount = Math.floor(Math.random() * (count + 1)),
        temp = flashcards.cards[count],
        temp1 = flashcards.cards[newCount];
      flashcards.cards[count] = temp1;
      flashcards.cards[newCount] = temp;
    }
  }
};


// display the current flashcard and increment the counter
flashcards.displayNext = function() {
  // reset the flash card border color
  // $("#flashcard").css("border-color","rgb(53,155,198)");
  if (flashcards.cardIndex < flashcards.cards.length){
    var card = flashcards.cards[flashcards.cardIndex];
    $("#english").html(card.english);
    $("#chinese").html(card.chinese);
    $("#pinyin").html(card.pinyin);
    flashcards.cardIndex++;
  } 
  //display the first word
  if (flashcards.cardIndex == flashcards.cards.length){
    flashcards.cardIndex = 0;
  }
};


// start or stop auto show a new flashcard every 2 seconds
flashcards.autoDisplay = (function() {
  //internal variable for save the javascript function
  var auto = null;
  return function() {
    if (auto) {
      window.clearInterval(auto);
      auto = null;
    } else {
      auto = setInterval(flashcards.displayNext, 2000);
    }
  };
})();


flashcards.Draw = function(element) {
  if (typeof element == 'string') {
    element = $('#' + element);
  }
  element.html(
      '<div id="flashcards">' +
        '<h1>Chinese&ndash;English Flash Cards</h1>' +
        '<div id="buttons">' +
          '<button id="next">Next</button>' +
          '<button id="shuffle"> Shuffle</button>' +
          '<input type="checkbox" id="auto" />' +
          '<label for="auto">Auto Display</label>' +
        '</div>' +
        '<div class="container">' +
          '<div id="flashcard" class="flip-container" ontouchstart="this.classList.toggle(\'hover\');">' +
            '<div class="flipper">' +
              '<div class="front">' +
                '<div id="english" ></div>' +
              '</div>' +
              '<div class="back">' +
                '<div id="chinese" lang="zh-CN"></div>' +
                '<div id="pinyin"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div id="show">' +
          '<input type="radio" id="showEnglish" name="show" checked="checked" />' +
          '<label for="showEnglish">English</label>' +
          '<input type="radio" id="showChinese" name="show" />' +
          '<label for="showChinese">Chinese</label>' +
          '<input type="radio" id="showPinyin" name="show" />' +
          '<label for="showPinyin">Pinyin</label>' +
        '</div>' +
      '</div>');

  var id = element.attr("id");
  $("#auto").button().click(flashcards.autoDisplay);
  $("#next").button().click(flashcards.displayNext);
  $("#shuffle").button().click(flashcards.shuffle);
  $("#show").buttonset();
  $("#show input").click(function() {
    var id = $(this).attr("id");
    $(".front > div").appendTo($(".back"));
    var languageId = id.match(/^show(.*)$/)[1].toLowerCase();
    $("#" + languageId).appendTo($(".front"));
  });
  flashcards.displayNext();
};
