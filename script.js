function convert(str){  
    if(str.match(/[x]/g))
        str=str.replace(/[x]/g, "*");
    if(str.match(/[%]/g))
         str=str.replace(/[%]/g, "/100");
    let len=str.length;
    for(let i=0;i<len;i++){
        if(str.charAt(i)==document.getElementById("root").innerText){
            console.log(str.charAt(i));
            let j=i;
            while(++j<len){
                if(str.charAt(j).match(/[*]|[-]|[+]|[/]|[)]/g)){
                    console.log(str.charAt(j)+"   i"+i+"   j"+j);
                    break;
                }
            }
            if(i!=0&&str.charAt(i-1).match(/[0-9]/g))
                str=(str.substring(0,i)+"*"+Math.sqrt(str.substring((i+1),j))+str.substring(j,len));
            else
                str=(str.substring(0,i)+Math.sqrt(str.substring((i+1),j))+str.substring(j,len));
            i=j;
         }
    }
    return str;
}



function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}


function equal(){
    let str =convert(document.getElementById("exp").value);
    try{
        document.getElementById("exp").value="0";
            document.getElementById("answer").value="Ans:"+roundNumber(eval(str),7);  
    }catch(error){
        if(error instanceof SyntaxError)
            document.getElementById("exp").value="Syntax Error";
        else if(error instanceof ReferenceError)
        document.getElementById("exp").value="0";
        else
            document.getElementById("exp").value=error.toString();
    }
}



function allclear(){
    document.getElementById("exp").value="0";
    document.getElementById("answer").value="Ans:0";
}
function deleteone(){
    let str =document.getElementById("exp").value;
    if(str.length==1||str=="Syntax Error")
        document.getElementById("exp").value="0";
    else
        document.getElementById("exp").value= str.substring(0, str.length-1);  
}



const operators = new Set(["+","x","/",".","-"]);
function input(){
    x = document.activeElement.innerText;
    let str = document.getElementById("exp").value;
    let len =str.length-1;
    if(len+1<14){
        if(x.match(/[0-9]/)){
            if(str=="0"){
                if(x!="0"&&x!="00"){
                    deleteone();
                    document.getElementById("exp").value=x;
                }
            }
            else{
                if(str.charAt(len)!="%")
                    document.getElementById("exp").value=str+x;
            }    
        }else{
            if(str.charAt(len)!=document.getElementById("root").innerText){
                if(x=="."){
                    if(str.charAt(len).match(/[0-9]/)){
                        while(--len>0){
                            if(operators.has(str.charAt(len)))
                                break;
                        }
                        if(len<0||str.charAt(len)!=".")
                            document.getElementById("exp").value+=x;
                    }
                }
                else if(x=="x"||x=="+"||x=="/"){
                    if(str.charAt(len).match(/[0-9]|[)]|[%]/g))
                        document.getElementById("exp").value+=x;
                    else{
                        deleteone();
                        document.getElementById("exp").value+=x;
                    }
                }
                else if(x=="-"){
                    if(operators.has(str.charAt(len))){
                        deleteone();
                    }
                    if(document.getElementById("exp").value=="0"){
                        document.getElementById("exp").value="";
                    }
                    document.getElementById("exp").value+=x;
                }
                else if(x=="("){
                    if(operators.has(str.charAt(len))&&len+1>=2)
                        document.getElementById("exp").value+=x;
                    if(str=="0"){
                        document.getElementById("exp").value=x;
                    }
                }
                else if(x==")"){
                    let countopen = (str.match(/[(]/g) || []).length;
                    let countclose = (str.match(/[)]/g) || []).length;
                    if(countopen>countclose&& str.charAt(len).match(/[0-9]|%/g))
                        document.getElementById("exp").value+=x;
                }
                else{
                    if(x=="%"&&str.charAt(len).match(/[0-9]|[)]/g))
                        document.getElementById("exp").value+=x;
                }
            }
        }
    }
}


function sqroot(){
    let str = document.getElementById("exp").value;
    let len =str.length-1;
        //str.charAt(len).match(/[0-9]|[%]|[x]|[+]|[-]|[/]|[(]|/g
    if(!str.charAt(len).match(/[)]|[!]|[.]|[%]/g)&&str.charAt(len)!=document.getElementById("root").innerText){
        if(len>0&&str.charAt(len).match(/[0-9]/g)){
            while(--len>0){
                if(operators.has(str.charAt(len))||str.charAt(len)==document.getElementById("root").innerText){
                    console.log(len);
                    break;
                }
            }
            if(len<0||str.charAt(len)!=document.getElementById("root").innerText)
                document.getElementById("exp").value+=document.getElementById("root").innerText;
        }else{
            if(str=="0")
             document.getElementById("exp").value="";
            document.getElementById("exp").value+=document.getElementById("root").innerText;
        }
    }   
}






document.addEventListener("keypress", function(event) {
    console.log(event.key+"  "+event.keyCode)
    if (event.which===13) {
        document.getElementById("evl").focus();
        equal();
    }else{
        if (event.keyCode===57) {
            document.getElementById("num9").focus();
        }else if (event.keyCode===56) {
            document.getElementById("num8").focus();
        }else if (event.keyCode===55) {
            document.getElementById("num7").focus();
        }else if (event.keyCode===54) {
            document.getElementById("num6").focus();
        }else if (event.keyCode===53) {
            document.getElementById("num5").focus();
        }else if (event.keyCode===52) {
            document.getElementById("num4").focus();
        }else if (event.keyCode===51) {
            document.getElementById("num3").focus();
        }else if (event.keyCode===50) {
            document.getElementById("num2").focus();
        }else if (event.keyCode===49) {
            document.getElementById("num1").focus();
        }else if (event.keyCode===48){
            document.getElementById("num0").focus();
        }else if (event.keyCode===47){// .
            document.getElementById("division").focus();
        }else if (event.keyCode===46) {
            document.getElementById("point").focus();
        }else if (event.keyCode===45) {
            document.getElementById("substract").focus();
        }else if (event.keyCode===43) {
            document.getElementById("add").focus();
        }else if (event.keyCode===42) {
            document.getElementById("multiply").focus();
        }else if (event.keyCode===41) {
            document.getElementById(")").focus();
        }else if (event.keyCode===40) {
            document.getElementById("(").focus();
        }else if (event.keyCode===37) {
            document.getElementById("percent").focus();
        }else{
            return;
        }
        input();
    }
  });


function lastanswer(){
    let ans=document.getElementById("answer").value;
    let str=document.getElementById("exp").value;
    ans=(ans.substring(4, ans.length));
    if(str=="0")
        document.getElementById("exp").value=ans;
    else{
        if(str.charAt(str.length-1).match(/[x]|[/]|[+]|[-]|[(]/g)){
            document.getElementById("exp").value+=ans;
        }else{
            if(str.charAt(str.length-1)==document.getElementById("root").innerText && ans>=0)
                document.getElementById("exp").value+=ans;
        }    
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key==="Delete"||event.key==="Backspace"){
        document.getElementById("DEL").focus();
        deleteone();
    }
})