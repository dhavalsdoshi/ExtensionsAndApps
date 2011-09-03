$(document).ready(function() {
    var flipCard = function(){
        $("#card").flip({
            direction:'tb',
            content: getNextContent(),
            color: '#6D1D7C'
        });
    };

    $('#card').click(flipCard);
    $(document).keydown(function (evt) {
        if (evt.keyCode == 38||evt.keyCode == 39) {
            flipCard();
        }
		if (evt.keyCode == 37||evt.keyCode == 40) {
            $('#card').revertFlip();
        }
      });

    var firstNumber;
    var secondNumber;

    var getNextContent= function(){
        if($('#card .question').length > 0){
            return '<div class="answer">'+firstNumber+' X '+secondNumber+" = "+(firstNumber*secondNumber) + '</div>';
        }
        else{
            firstNumber = getRandomNumberUpto(20);
            secondNumber = getRandomNumberUpto(12);
            return '<div class="question">'+firstNumber+' X '+secondNumber+" = ?"+'</div>';
        }

    };

    var getRandomNumberUpto = function(max){
        return Math.floor(Math.random()*(max-2)) +2 ;
    };




});