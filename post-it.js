var BoardManager = function(selector) {
  this.$elem = $(selector);
  this.$boardList = this.$elem.find('#board_list');
  this.boards = [];
  
  var self = this;
  function initialize() {
    self.$elem.find('#new_board').on('click', function(e) { self.createBoard(e) });
    self.$elem.find('#load_samples').on('click', function(e) { self.loadSamples(e) });
    self.$boardList.on('click', 'li', function(e) {
      var boardId = $(this).text();      
      self.activateBoard(boardId);
    });
    self.createBoard();
  }

  initialize();
}

BoardManager.prototype = {
  createBoard: function(e) {
    // create an <li> with the boardId in #board_list
    // create the board DOM element and append it to #boards
    // create a new Board object and add it to our array
    // activate the board
    var boardId = "board-" + (this.boards.length + 1);
    var $listItem = $('#list-item-template').clone().attr('id', boardId+"-button").text(boardId);
    this.$boardList.append($listItem);
    this.boards.push(new Board(boardId));

    this.activateBoard(boardId);
  },

  activateBoard: function(boardId) {
    for (var i in this.boards) {
      this.boards[i].$elem.hide();
    }
    $('#'+boardId).show();
    $(".board-button").removeClass('active');
    $('#'+boardId+'-button').addClass('active');
  },

  loadSamples: function(e) {

  }
}


var Board = function(boardId) {
  this.$elem = $('#board-template').clone().attr('id', boardId);
  $('#boards').append(this.$elem);
  this.$elem.show();

  var self = this;
  function initialize() {
    self.$elem.on('click', function(e) { self.placePostIt(e) });
  };

  initialize();
};

Board.prototype = {
  placePostIt: function(e) {
    var postIt = new PostIt(e.clientX, e.clientY);
    this.$elem.append(postIt.$elem);
  }
}

var PostIt = function(x, y) {
  
  this.$elem = $('#post-it-template').clone();
  this.$elem.css({left: x, top: y});
  this.$elem.show();

  var self = this;
  function initialize() {
    self.$elem.draggable({handle: '.header'});
    self.$elem.find('.header a').on('click', function(e) { self.removeElement(e) });
    self.$elem.find('.content').on('click', function(e) { self.swallowClick(e) });
  }

  initialize();
};

PostIt.prototype = {
  swallowClick: function(e) { e.stopPropagation(); },
  removeElement: function(e) {
    this.$elem.remove();
    e.stopPropagation();
  }
}

$(function() {
  // This code will run when the DOM has finished loading
  var boardSelector = new BoardManager('#board_selector');
});
