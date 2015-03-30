/**
 * Created by malikasinger on 30-Mar-15.
 */
function olf() {
    totalcustomer = JSON.parse(localStorage.getItem("creditrecord"));
    if(totalcustomer == null){
        totalcustomer = [];
    }
    filllist();

}



function Client(name,limit,current){
    this.name = name;
    this.limit = limit;
    this.current = current;
}
function clearlist() {
    document.getElementById("namelist").innerHTML    = "";
    document.getElementById("limitlist").innerHTML   = "";
    document.getElementById("currentlist").innerHTML = "";
    document.getElementById("no.").innerHTML = "";
}
function filllist() {
    for(i=0;i<totalcustomer.length;i++){
        document.getElementById("namelist").innerHTML += totalcustomer[i].name + "<br />" ;
        document.getElementById("limitlist").innerHTML += totalcustomer[i].limit + "<br />" ;
        document.getElementById("currentlist").innerHTML += totalcustomer[i].current + "<br />" ;
        document.getElementById("no.").innerHTML += i+1 + "<br />" ;

    }
}
function addcustomer() {
    var a = prompt("customer name","");
    if(a == ""){
        alert("you leave box empty");
        return;
    }
    if(a.indexOf(" ") !== -1){
        alert("space is not allowed in name");
        return;
    }
    if(a.length > 10){
        alert("plese enter name under ten charecters");
        return;
    }
    for(i=0;i<totalcustomer.length;i++){
        if(a == totalcustomer[i].name){
            alert("this name already exists, plz enter some different name");
            return;
        }
    }

    var b = +prompt("credit limit","");

    if(isNaN(b)){
        alert("Error: please enter amount in digits");
        return;
    }
    if(b<=0){
        alert("limit can not be zero or negative");
        return;
    }


    var c = +prompt("current credit","");

    if(isNaN(c)){
        alert("Error: please enter amount in digits");
        return;
    }
    if(b<=0){
        alert("limit can not be zero or negative");
        return;
    }
    if(c>b){
        alert("Error: current credit can not be more then limit");
        return;
    }



    var newcustomer = new Client(a,b,c);

    totalcustomer.push(newcustomer);
    localStorage.setItem("creditrecord",JSON.stringify(totalcustomer));

    clearlist();
    filllist();


}
function credit(){
    var a = prompt("enter client name:");

    for(i=0;i<totalcustomer.length;i++){
        if(a == totalcustomer[i].name){


            var b = +prompt("enter amount:");

            if(isNaN(b)){
                alert("Error: please enter amount in digits");
                return;
            }
            if(b<=0){
                alert("Error: amount can not be negative or zero");
            }
            if(b>totalcustomer[i].limit){
                alert("Error: your limit is: " + totalcustomer[i].limit );
                return;

            }else if(b > (totalcustomer[i].limit-totalcustomer[i].current)) {
                alert("sorry in this situation you can get only " + (totalcustomer[i].limit - totalcustomer[i].current));
                return;

            }else if(b < (totalcustomer[i].limit-totalcustomer[i].current) ){

                totalcustomer[i].current += b;
                alert("credit granted");
            }
            localStorage.setItem("creditrecord",JSON.stringify(totalcustomer));

            clearlist();
            filllist();


        }

    }
}
function debit(){
    var a = prompt("enter client name:");

    for(i=0;i<totalcustomer.length;i++){
        if(a == totalcustomer[i].name){
            if(totalcustomer[i].current == 0){
                alert("you have no dues");
                return;
            }
            var b = +prompt("enter debit amount: ");
            if(isNaN(b)){
                alert("Error: amount must be in digits");
                return;
            }
            if(b<=0){
                alert("Error: amount can not be negative or zero");
                return;
            }
            if(b == totalcustomer[i].current){
                totalcustomer.current = 0;
                alert("debit successfull, you have no dues now")
            }else if(b > totalcustomer[i].current){

                alert("debit successfull, your dues was not Rs."+b+" we" +
                    " returning you Rs."+(b - totalcustomer[i].current));
                totalcustomer[i].current = 0;
            }else if(b < totalcustomer[i].current){

                totalcustomer[i].current -= b;
                alert("debit successfull, your remaining credit is Rs." + totalcustomer[i].current);
            }
            localStorage.setItem("creditrecord",JSON.stringify(totalcustomer));

            clearlist();
            filllist();
        }
    }
}

function del(){
    var a = prompt("enter name: ");

    for(i=0;i<totalcustomer.length;i++){
        if(a == totalcustomer[i].name){
            totalcustomer.splice(i,1);
            localStorage.setItem("creditrecord",JSON.stringify(totalcustomer));
            clearlist();
            filllist();
        }
    }
}
function delall(){
    if(confirm("are you sure to delet all customers?")){
        totalcustomer = [];
        localStorage.setItem("creditrecord",JSON.stringify(totalcustomer));
        clearlist();
    }

}
