// const square = function(num){
//     return num * num; 
// }

const square =(num)=> num * num; 

const event = {
    name           : 'birthday party', 
    guestList      : ['Andrew', 'Jen', 'Mike'], 
    printGuestList() {
        console.log('guest list for '+ this.name);
        console.log('Guests are : '); 
        
        this.guestList.forEach((guest) =>{
            console.log(guest + ' is attending '+this.name); 
        }); 
    }
}

console.log(square(60)); 

event.printGuestList(); 