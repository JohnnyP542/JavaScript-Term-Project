/* typing function */

function typeLine(text, speed){
return new Promise(resolve=>{
let i=0

function type(){
if(i<text.length){
$("#boot").append(text.charAt(i))
i++
setTimeout(type,speed)
}
else{
$("#boot").append("\n")
resolve()
}
}

type()

})
}

/* boot phase */

async function bootSequence(){

await typeLine("INITIALIZING SYSTEM...",30)
await typeLine("LOADING KERNEL MODULES...",25)
await typeLine("CHECKING MEMORY...",20)
await typeLine("MEMORY OK",20)
await typeLine("CONNECTING TO GAME DATABASE...",20)
await typeLine("ACCESS GRANTED",20)
await typeLine("STARTING TERMINAL UI...",20)

setTimeout(()=>{

$("#boot").fadeOut(500,function(){

$("#main").fadeIn(500)
$(".menu").css("display","flex")

})

},600)

}

/* menu */

$(".menu button").click(function(){

let game=$(this).data("game")

$(".menu").hide()
$(".game-screen").show()

if(game==1){
typeGame("LOADING GAME 01...\nSYSTEM PROCESSING\n\n(Work in progress...)\n\nThis will be a reflex based module designed to log a users speed and hand eye coordination. Targets will appear on random points of the screen, and the user will click on them in rapid succession. Total score and time will be recorded.")
}

if(game==2){
typeGame("LOADING GAME 02...\nSYSTEM PROCESSING\n\n(Work in progress...)\n\nThis module will test the user's skill with angles and physics. Bounce a core across multiple platforms to reach the power supply unit.")
}

if(game==3){
typeGame("LOADING GAME 03...\nSYSTEM PROCESSING\n\n(Work in progress...)\n\nThis module will test the user's visual puzzle solving skills and their ability to escape a labyrinth of neon walls.")
}

})

function typeGame(text){

let i=0
$(".typing").text("")

function type(){

if(i<text.length){

$(".typing").append(text.charAt(i))
i++

setTimeout(type,20)

}

}

type()

}

$(".back").click(function(){

$(".game-screen").hide()
$(".menu").css("display","flex")

})

/* start */

bootSequence()