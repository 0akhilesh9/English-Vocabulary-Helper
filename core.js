class Word {
  constructor(value, partsOfSpeech, meaning, relatedWords) {
    this.value = capFirst(value);
    this.partsOfSpeech = capFirst(partsOfSpeech);
	this.meaning = capFirst(meaning);
	this.relatedWords = capFirst(relatedWords);
  }
  /*   // Getter
  get value() {
    return this.value;
  }
  get partsOfSpeech(){
	  return this.partsOfSpeech;
  }
  get relatedWords(){
	  return this.relatedWords;
  }
    // Setter
  set value(value) {
    this.value = value;
  }
  set partsOfSpeech(partsOfSpeech){
	  this.partsOfSpeech = partsOfSpeech;
  }
  set relatedWords(relatedWords){
	  this.relatedWords = relatedWords;
  } */
}

class RefWord{
    constructor(value, meaning) {
    this.value = capFirst(value);
	this.meaning = capFirst(meaning);    
}
}

separator = "###";
wordList = [];
var wordListIndex = 0;
refWordList = [];
var refWordListIndex = 0;
testWordIndex = [];
loadedFileList = [];
loadedRefFileList = [];

document.addEventListener('DOMContentLoaded', function() {
    var box1_findWord = document.getElementById("box1_findWord_value");
    box1_findWord.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
        event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
        // Trigger the button element with a click
            searchWord();
        }
    });
}); 


function readSingleFileParam(e) {
    for(i=0;i<e.target.files.length;i++){
        let file = e.target.files[i];
        //console.log(file.name);
        if (!file) {
            return;
        }
        var reader = new FileReader();
        if(this.id=='box1_fileInput'){
            reader.onload = function(e) {      
                var contents = e.target.result;            
                
                    if(loadedFileList.indexOf(file.name)<0){
                        loadedFileList.push(file.name);
                        populateContents(contents,0);
                        document.getElementById('box1_loadedFilesInfo').innerText = document.getElementById('box1_loadedFilesInfo').innerText + file.name + "\r\n";
                    }
                    else{
                        alert('File: "'+file.name+'" already loaded!!');
                    }            
            };
            reader.readAsText(file);
        }
        else if(this.id=='box1_refFileInput'){
            reader.onload = function(e) {      
                var contents = e.target.result;            
                
                    if(loadedRefFileList.indexOf(file.name)<0){
                        loadedRefFileList.push(file.name);
                        populateContents(contents,1);
                        document.getElementById('box1_loadedRefFilesInfo').innerText = document.getElementById('box1_loadedRefFilesInfo').innerText + file.name + "\r\n";
                    }
                    else{
                        alert('File: "'+file.name+'" already loaded!!');
                    }            
            };
            reader.readAsText(file);
        }
    }
}

function populateContents(contents,refNum) {
	var element = document.getElementById('box2');
	element.textContent = null;
	
    if(refNum == 0){
        var lines = contents.split('\n');
        for(var line = 0; line < lines.length; line++){
            if(lines[line].length>2){
                switch(lines[line].split(separator).length){
                    case 1: wordList[wordListIndex] = new Word(lines[line].split(separator)[0],"na","na","na");
                        wordListIndex++;
                        break;
                    case 2: wordList[wordListIndex] = new Word(lines[line].split(separator)[0],lines[line].split(separator)[1],"na","na");
                        wordListIndex++;
                        break;
                    case 3: wordList[wordListIndex] = new Word(lines[line].split(separator)[0],lines[line].split(separator)[1],lines[line].split(separator)[2],"na");
                        wordListIndex++;
                        break;		
                    case 4: wordList[wordListIndex] = new Word(lines[line].split(separator)[0],lines[line].split(separator)[1],lines[line].split(separator)[2],lines[line].split(separator)[3]);
                        wordListIndex++;
                        break;		
                    default: break;
                }
            }
        }
        document.getElementById('box1_wordCountValue').innerText = wordListIndex;
    }
/*     else if(refNum == 1){
        for(var line = 0; line < lines.length; line++){
            if(lines[line].length>2){
                var n = lines[line].search(/ /i);
                refWordList[refWordListIndex] = new RefWord(lines[line].substring(0,n),lines[line].substring(n,lines[line].len));
                refWordListIndex++;
            }
        }
        document.getElementById('box1_refWordCountValue').innerText = refWordListIndex;
    } */
    else if(refNum == 1){
        var lines = contents.split('####');
        for(var line = 0; line < lines.length; line++){
            if(lines[line].length>2){
                var n = lines[line].search(/ /i);
                //console.log(n);
                refWordList[refWordListIndex] = new RefWord(lines[line].substring(0,n),lines[line].substring(n,lines[line].len));
                refWordListIndex++;
            }
        }
        document.getElementById('box1_refWordCountValue').innerText = refWordListIndex;
    }
	//console.log(wordList);
}

function startTest(){
	if(((wordListIndex <=0) && (document.getElementById('refWordListOnly').checked == false)) || ((document.getElementById('refWordListOnly').checked == true) && (refWordListIndex <=0))){
		var element = document.getElementById('box2');
		element.textContent = "No data loaded";
	}
	else{
		testWordIndex=[];
		var node = document.getElementById('box2');
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}	
		var maxIter = document.getElementById('box1_maxTestCount').value ;
        
//        var testIndexArray = Array.from(Array(parseInt(maxIter)).keys())
//        for(var i = maxIter, j, tmp; i; j = parseInt(Math.random() * i), tmp = testIndexArray[--i], testIndexArray[i] = testIndexArray[j], testIndexArray[j] = tmp);

        
        if(document.getElementById('refWordListOnly').checked == false){
            if(maxIter > wordListIndex){
                maxIter = wordListIndex;              
//                testIndexArray = Array.from(Array(parseInt(maxIter)).keys())
//                for(var i = maxIter, j, tmp; i; j = parseInt(Math.random() * i), tmp = testIndexArray[--i], testIndexArray[i] = testIndexArray[j], testIndexArray[j] = tmp);
            }
            
            var testMap = new Map();
            for(; testMap.size<maxIter;){
                testMap.set(parseInt(Math.random() * wordListIndex),0);
            }            
            var testIndexArray = Array.from(testMap.keys())
          
            for(var iter=0;iter<maxIter;iter++){
                var encapObj = document.createElement("div");
                encapObj.setAttribute('style','width:500px;padding-bottom:10px;');
                var node = document.createElement("li"); 
                node.setAttribute('style','display:inline-block');
                
/*              testIndex = Math.floor(Math.random() * wordListIndex);
                while(testWordIndex.indexOf(testIndex)>0){
                    testIndex = Math.floor(Math.random() * wordListIndex);
                }
 */             
                testIndex = testIndexArray[iter]
                testWordIndex.push(testIndex);
                var textNode = document.createTextNode(wordList[testIndex].value);
                node.id = "box2_"+iter.toString();
                window.event.cancelBubble = true;	
                node.onclick = function(e) {
                                    elementNode = document.getElementById(e.target.id);
                                    elementNode.style.color=elementNode.style.color == "red" ? "green" : "red" ; 
                                };
                node.appendChild(textNode);		

                encapObj.appendChild(node)
                but = document.createElement('button')
                but.innerHTML = 'close'
                but.setAttribute('style','float:right')
                but.setAttribute('id','but_'+testIndex)
                but.onclick = function() {
                    testWordIndex.splice(testWordIndex.indexOf(parseInt(this.id.substr(4))),1);
                    this.parentNode.parentNode.removeChild(this.parentNode);}
                encapObj.appendChild(but)
                
                document.getElementById('box2').appendChild(encapObj);
                document.getElementById('showButton').style.display="block";
            }
        }
        else if(document.getElementById('refWordListOnly').checked == true){
            if(maxIter > refWordListIndex){
                maxIter = refWordListIndex;
//                testIndexArray = Array.from(Array(parseInt(maxIter)).keys())
//                for(var i = maxIter, j, tmp; i; j = parseInt(Math.random() * i), tmp = testIndexArray[--i], testIndexArray[i] = testIndexArray[j], testIndexArray[j] = tmp);
            }
            
            var testMap = new Map();
            for(; testMap.size<maxIter;){
                testMap.set(parseInt(Math.random() * refWordListIndex),0);
            }            
            var testIndexArray = Array.from(testMap.keys())            
            
            for(var iter=0;iter<maxIter;iter++){
                
                var encapObj = document.createElement("div");
                encapObj.setAttribute('style','width:500px;padding-bottom:10px;');
                var node = document.createElement("li");
                node.setAttribute('style','display:inline-block');

/*              testIndex = Math.floor(Math.random() * refWordListIndex);
                while(testWordIndex.indexOf(testIndex)>= 0){
                    testIndex = Math.floor(Math.random() * refWordListIndex);
                }
 */             
                testIndex = testIndexArray[iter]
                testWordIndex.push(testIndex);
                var textNode = document.createTextNode(refWordList[testIndex].value);
                node.id = "box2_"+iter.toString();
                window.event.cancelBubble = true;	
                node.onclick = function(e) {
                                    elementNode = document.getElementById(e.target.id);
                                    elementNode.style.color=elementNode.style.color == "red" ? "green" : "red" ; 
                                };
                node.appendChild(textNode);	

                encapObj.appendChild(node)
                but = document.createElement('button')
                but.innerHTML = 'close'
                but.setAttribute('style','float:right')
                but.setAttribute('id','but_'+testIndex)
                but.onclick = function() {
                    testWordIndex.splice(testWordIndex.indexOf(parseInt(this.id.substr(4))),1);
                    this.parentNode.parentNode.removeChild(this.parentNode);}
                encapObj.appendChild(but)
                
                document.getElementById('box2').appendChild(encapObj);
                document.getElementById('showButton').style.display="block";
            }
        }        
	}
}

function clearTest(){
	if((wordListIndex <=0) && (refWordListIndex <=0)){
		var element = document.getElementById('box2');
		element.textContent = "No data loaded";
	}
	else{
		testWordIndex=[];
		var node = document.getElementById('box2');
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
        document.getElementById('showButton').style.display="none";        
    }
}

function showAll(){
	var childNodes = document.getElementById('box2').childNodes;
    if(document.getElementById('refWordListOnly').checked == false){
        for(var iter=0;iter<childNodes.length;iter++ ){
            var outerNode = document.createElement("div"); 
            var innerNode = document.createElement("ul");
            var textNode = document.createTextNode("Word: "+wordList[testWordIndex[iter]].value);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            innerNode = document.createElement("ul");
            textNode = document.createTextNode("Parts Of Speech: "+wordList[testWordIndex[iter]].partsOfSpeech);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            innerNode = document.createElement("ul");
            textNode = document.createTextNode("Meaning: "+wordList[testWordIndex[iter]].meaning);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            innerNode = document.createElement("ul");
            textNode = document.createTextNode("Related Words: "+wordList[testWordIndex[iter]].relatedWords);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
                                        
            innerNode = document.createElement("button");
            textNode = document.createTextNode("Show More");
            innerNode.appendChild(textNode);
            innerNode.onclick=function(evtObj){
                wordValue = this.parentNode.parentNode.childNodes[0].textContent;
                window.open('https://www.thefreedictionary.com/' + wordValue)};
            innerNode.setAttribute("style","margin-bottom:10px;");
            outerNode.appendChild(innerNode);                            
            
            outerNode.onclick = function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                };        
            childNodes[iter].appendChild(outerNode);
        }
    }
    else if(document.getElementById('refWordListOnly').checked == true){
        for(var iter=0;iter<childNodes.length;iter++ ){
            var outerNode = document.createElement("div"); 
            var innerNode = document.createElement("ul");
            var textNode = document.createTextNode("Word: "+refWordList[testWordIndex[iter]].value);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            
            innerNode = document.createElement("ul");
            textNode = document.createTextNode("Ref Meaning: "+refWordList[testWordIndex[iter]].meaning);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            
           /*  innerNode = document.createElement("ul");
            textNode = document.createTextNode("Parts Of Speech: "+wordList[testWordIndex[iter]].partsOfSpeech);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            innerNode = document.createElement("ul");
            textNode = document.createTextNode("Meaning: "+wordList[testWordIndex[iter]].meaning);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode);
            innerNode = document.createElement("ul");
            textNode = document.createTextNode("Related Words: "+wordList[testWordIndex[iter]].relatedWords);
            innerNode.appendChild(textNode);
            outerNode.appendChild(innerNode); */
                                        
            innerNode = document.createElement("button");
            textNode = document.createTextNode("Show More");
            innerNode.appendChild(textNode);
            innerNode.onclick=function(evtObj){
                wordValue = this.parentNode.parentNode.childNodes[0].textContent;
                window.open('https://www.thefreedictionary.com/' + wordValue)};
            innerNode.setAttribute("style","margin-bottom:10px;");
            outerNode.appendChild(innerNode);                            
            
            outerNode.onclick = function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                };        
            childNodes[iter].appendChild(outerNode);
        }        
    }
	document.getElementById('showButton').style.display="none";
}

function capFirst(strValue) 
{
    return strValue[0].toUpperCase() + strValue.slice(1);
}

function displayContents(contents) {
  var element = document.getElementById('box2');
  var lines = contents.split('\n');
    for(var line = 0; line < lines.length; line++){
        //console.log(lines[line]);
    }
  element.textContent = contents;
}

function searchWord(){
    if(document.getElementById('box1_findWord_value').validity.valid){
        textValue = document.getElementById('box1_findWord_value').value.trim()
        for(corpusIndex=0;corpusIndex<wordListIndex;corpusIndex++){
            if(textValue.toLowerCase() == wordList[corpusIndex].value.toLowerCase()){
                document.getElementById('box1_findWord_Result').innerHTML = "Word Found!!!"                
                
                var outerNode = document.createElement("div"); 
                var innerNode = document.createElement("ul");
                var textNode = document.createTextNode("Word: "+wordList[corpusIndex].value);
                innerNode.appendChild(textNode);
                outerNode.appendChild(innerNode);
                innerNode = document.createElement("ul");
                textNode = document.createTextNode("Parts Of Speech: "+wordList[corpusIndex].partsOfSpeech);
                innerNode.appendChild(textNode);
                outerNode.appendChild(innerNode);
                innerNode = document.createElement("ul");
                textNode = document.createTextNode("Meaning: "+wordList[corpusIndex].meaning);
                innerNode.appendChild(textNode);
                outerNode.appendChild(innerNode);
                innerNode = document.createElement("ul");
                textNode = document.createTextNode("Related Words: "+wordList[corpusIndex].relatedWords);
                innerNode.appendChild(textNode);
                outerNode.appendChild(innerNode);
                                            
                innerNode = document.createElement("button");
                textNode = document.createTextNode("Show More");
                innerNode.appendChild(textNode);
                innerNode.onclick=function(evtObj){
                    wordValue = this.parentNode.childNodes[0].textContent.replace('Word: ','');
                    window.open('https://www.thefreedictionary.com/' + wordValue)};
                innerNode.setAttribute("style","margin-bottom:10px;");
                outerNode.appendChild(innerNode);                            
                
                outerNode.onclick = function(e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    };        
                document.getElementById('box1_findWord_Result').appendChild(outerNode);
                
                return;
            }
        }
        document.getElementById('box1_findWord_Result').innerHTML = "Word Not Found!!!"
    }
}

function clearSearch(){
    var node = document.getElementById('box1_findWord_Result');
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    document.getElementById('box1_findWord_Result').innerHTML = '';
    document.getElementById('box1_findWord_value').value = '';
}