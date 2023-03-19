let word,newWord,wordCopy;
let numberOfLives;
let usedLetters;

document.getElementById("beg").onclick=function(){
    document.getElementById("lab1").style.visibility="visible";
    document.getElementById("lab2").style.visibility="visible";
    document.getElementById("usedLet").style.visibility="visible";
    document.getElementById("inl").style.visibility="visible";
    document.getElementById("subLetter").style.visibility="visible";
    document.getElementById("H2").style.visibility="visible";
    usedLetters="";
    newWord="";
    word=window.prompt("Please enter a word!");
    word=word.toUpperCase(word);
    wordCopy=word;
    numberOfLives=6;
    document.getElementById("lab1").innerHTML=`Number of lives remaining: ${numberOfLives}`;
   
    for(let i=0;i<word.length;i++){
        newWord+="_ ";
        
    }
    newWord=newWord.substring(0,newWord.length-1);
    console.log(newWord);
    document.getElementById("H2").innerHTML=newWord;
}

document.getElementById("res").onclick=function(){
    usedLetters="";
    document.getElementById("usedLet").innerHTML=`Used letter:${usedLetters}`;
    document.getElementById("lab1").style.visibility="hidden";
    document.getElementById("lab2").style.visibility="hidden";
    document.getElementById("usedLet").style.visibility="hidden";
    document.getElementById("inl").style.visibility="hidden";
    document.getElementById("subLetter").style.visibility="hidden";
    document.getElementById("H2").style.visibility="hidden";
    

}

function modifyChar(sir,index,car){
    sir=String(sir);
    let inter1=sir.substring(0,index);
    let inter2=sir.substring(index+1);
    return (inter1+car+inter2);
}
//_ _ _ _ _
//012345678

function check(){
    if(numberOfLives==0){
        window.alert(`You lose!\nThe word was:${word}`);
    }
}

document.getElementById("subLetter").onclick=function(){
    let letter=document.getElementById("inl").value;
    usedLetters=String(usedLetters);
    wordCopy=String(wordCopy);
    newWord=String(newWord);
    letter=letter.toUpperCase(letter);
    if(letter.length!=1) {
        window.alert("Wrong input! 1 letter please!");
    }
    else if(wordCopy.indexOf(letter)==-1 && usedLetters.indexOf(letter)==-1){
            numberOfLives--;
            document.getElementById("lab1").innerHTML=`Number of lives remaining: ${numberOfLives}`;
            check();
        }
         else{
            let l1;
            l1=wordCopy.indexOf(letter);
            while(l1!=-1){
                newWord=modifyChar(newWord,l1*2,letter);
                wordCopy=modifyChar(wordCopy,l1,"-");
                l1=wordCopy.indexOf(letter);
            }   
            document.getElementById("H2").innerHTML=newWord;
             }
    
    if(letter.length==1 && usedLetters.indexOf(letter)==-1){
        if(usedLetters.length==0){
            usedLetters+=letter;
        }
        else{
            usedLetters+=` , ${letter}`;
        }
        document.getElementById("usedLet").innerHTML="Used letters:"+usedLetters;
    
    }
       
}

