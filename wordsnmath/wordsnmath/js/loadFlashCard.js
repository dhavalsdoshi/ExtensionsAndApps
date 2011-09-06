$(document).ready(function() {
    var startString = getParameterByName("startString");

    $(document).keydown(function (evt) {
        if (evt.keyCode == 38||evt.keyCode == 39) {
            flipCard();
        }
		if (evt.keyCode == 37||evt.keyCode == 40) {
            revertCard();
        }
    });

    var revertCard = function(){
        $("#card").flip({
            direction:'tb',
            content: getPreviousContent(),
            color: '#6D1D7C'
        });
    };


    var flipCard = function(){
        $("#card").flip({
            direction:'tb',
            content: getNextContent(),
            color: '#6D1D7C'
        });
    };

    $('#card').bind("click",flipCard);

    var lines;
    var onSuccess = function(data) {
        lines = jQuery.csv()(data);
        var newLines = new Array();
        if (startString != null) {
            function getSubsetOfWordsWith(substring, lines) {
                newLines[0] = lines[0];
                var j=1;
                for (i = 1; i < lines.length; i++) {
                    if (lines[i][0].substring(0, substring.length) === substring) {
                        newLines[j] = lines[i];
                        j++;
                    }
                }
                return newLines
            }
            lines = getSubsetOfWordsWith(startString, lines);
        }
    }
    $.get("data/data.csv", onSuccess);
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
                currentLine = getNextRandomLine();
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

    var getNextLine = function() {
        return ((currentLine + 1) % lines.length);
    };

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };
});