$(document).ready(function() {

    $(document).keydown(function (evt) {
        if (evt.keyCode == 38||evt.keyCode == 39) {
            flipCard();
        }
		if (evt.keyCode == 37||evt.keyCode == 40) {
            revertCard()
        }
    });

    var revertCard = function(){
        $("#card").flip({
            direction:'tb',
            content: getPreviousContent(),
            color: '#6D1D7C'
        });
    };



    var flipCard = function(event){
        $("#card").flip({
            direction:'tb',
            content: getNextContent(event.data.randomness),
            color: '#6D1D7C'
        });
    };

    $('#card').bind("click",{randomness:true},flipCard);
    $('#nextInSequence').bind("click",{randomness:false},flipCard);

    var lines;
    $.get("data/data.csv", function(data) { lines = jQuery.csv()(data);});

    var wordCol = 0;
    var meaningCol = 1;
    var sentenceCol = 2;
//    var antonymCol = 3;
    var currentLine = 1;
    var currentLinePosition=-1;
    var alreadyShownLines = new Array();

    var getNextContent= function(randomness){
        if(lines[currentLine][wordCol]==$('#card').text()){
            var line = lines[currentLine];
            return '<div class="word">'+lines[currentLine][wordCol]+"</div><div>Meaning: "+line[meaningCol]+"</div><div>Sentence: "+line[sentenceCol]+"</div>";//+ "<div>Antonyms: "+line[antonymCol];
        }
        else{
            if(currentLinePosition!=alreadyShownLines.length-1){
                currentLine= alreadyShownLines[currentLinePosition+1];
                currentLinePosition=  currentLinePosition+1;
            }
            else{
                if(randomness){
                    currentLine = getNextRandomLine();
                }
                else{
                    currentLine = getNextLine();
                }
                alreadyShownLines.push(currentLine);
                currentLinePosition=alreadyShownLines.length-1;
            }
            if(allWordsAreAlreadyShown()){
                alreadyShownLines =  new Array();
            }
            return '<div class="word">'+lines[currentLine][wordCol]+'</div>';
        }
    };

    var allWordsAreAlreadyShown = function(){
        return alreadyShownLines.length==lines.length;
    };

    var getPreviousContent= function(){
        if($('#card').find('div').length > 3){
            return '<div class="word">'+lines[currentLine][wordCol]+'</div>';
        }
        else{
            if(currentLinePosition == 0){
                alert('reached first word');
                return;
            }
            currentLinePosition = currentLinePosition-1;
            currentLine = alreadyShownLines[currentLinePosition];
            return '<div class="word">'+lines[currentLine][wordCol]+"</div><div>Meaning: "+lines[currentLine][meaningCol]+"</div><div>Sentence: "+lines[currentLine][sentenceCol]+"</div><div>Antonyms: "+lines[currentLine][antonymCol];
        }
    };

    var getNextRandomLine = function(){
        var randomLine = Math.floor(Math.random()*lines.length);
        if(jQuery.inArray(randomLine,alreadyShownLines)==-1)
            return randomLine;
        else
            return getNextRandomLine();
    };

    var getNextLine = function(){
        return ((currentLine + 1) % lines.length);
    }
});