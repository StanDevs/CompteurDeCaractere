var txt = document.getElementById('txt').value ;

function isLetter(letter){
    if((letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z') || (letter >= 'À' && letter >= 'Ö')|| (letter >= 'Ù' && letter >= 'Ý') || (letter >= 'à' && letter >= 'ö') || (letter >= 'ù' && letter >= 'ü')){
        return true ;
    } 
    return false ;
}

function countChars() {
    txt = document.getElementById('txt').value ;
    return txt.length ;
}

function countWords(){
    txt = document.getElementById('txt').value ;
    let containChar = false ;
    let wordCounter = 0 ;
    for(let i = 0 ; i < txt.length ; i++){
        if(isLetter(txt.charAt(i))){
            containChar = true ;
        } else {
            if(containChar === true){
                wordCounter++ ;
                containChar=false ;
            }
            containChar=false ;
        }
    }
    if(!isLetter() && containChar === true){
        wordCounter++ ;
    }
    return wordCounter ;
}

function countSpaces() {
    txt = document.getElementById('txt').value ;
    let counter = 0 ;
    for(let i = 0 ; i < txt.length ; i++){
        if(txt.charAt(i) === ' '){
            counter++ ;
        }
    }
    return counter ;
}

function wordsDensity(){
    txt = document.getElementById('txt').value.toLowerCase() ;
    let wordTab = [] ;
    let word = '' ;
    const length = txt.length ;
    for(let i = 0 ; i < length ; i++){
        if(isLetter(txt.charAt(i))){
            word += txt.charAt(i) ;
        } else if(word.length > 0) {
            wordTab.push(word) ;
            word = '' ;
        }
        
        if(i === length - 1 && word.length > 0){
            wordTab.push(word) ;
        }
    }
    
    /*-----------------------------------------------*/
    
    wordTab.sort() ;
    
    var wordCounter = [] ;
    var current = null ;
    var cpt = 0 ;
    for(let i = 0 ; i < wordTab.length ; i++){
        if(wordTab[i] !== current){
            current = wordTab[i] ;
            cpt = 1 ;
            wordCounter.push({'word': current, 'iteration': cpt})
        } else {
            wordCounter[wordCounter.length - 1].iteration++ ;
        }
    }
    wordCounter.sort(function(a, b){
        return b.iteration - a.iteration ;
    })
    
    return wordCounter ;
}

document.getElementById('txt').addEventListener('input', init) ;
function init(){
    var nbWords = document.getElementById('words').innerHTML = countWords() ;
    document.getElementById('char').innerHTML = countChars() ;
    document.getElementById('space').innerHTML = countSpaces() ;
    
    var wordDensity = wordsDensity() ;
    var wordDensityContainer = document.getElementById('wordDensity') ;
    wordDensityContainer.innerHTML = '' ;
    for(var i = 0 ; i < wordDensity.length ; i++){
        wordDensityContainer.innerHTML += 
        '<li><span>' + wordDensity[i].word + '</span><span>' +  wordDensity[i].iteration + '</span><span>' + Number((wordDensity[i].iteration / nbWords * 100).toFixed(1)) + '%</span></li>' ;
    }
}
init() ;