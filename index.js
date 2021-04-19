var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('heroku-self-ping').default("http://tele-bot12.herokuapp.com");

const PORT = 8080;

var Status = false;
var Repeat = 60000;
var chat_id = '';
var my_bot_id = '791554317'; // My Bot Chat ID
var my_chat_id = '-404666273'; // My Group ID

//var client_group_id = '-1001201417785';
//var client_group_id = '-1001211133336';
//var client_group_id =  '-1001196568371';
var client_group_id = '-1001309075611';

var Msg_Array = new Array();
//Msg_Array.push("string 1");
//Msg_Array.push("string 2");

var Msgs_len = 0;

var r = 0;

const Promise = require('bluebird');
Promise.config({
  cancellation: true
});


http.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on ${ PORT }`);
});

const TelegramBot = require('node-telegram-bot-api');
//const token_old = '1144359118:AAFBwWNIDmFgYkLs_BOHfjsgb2ieCzk3eCo';
//const token = '1237628283:AAH9PwgRHSiJ67G3kp2uSSOLWslOCS4nONg';

const token_new = '1364403004:AAEi12oY8ovykAGGssFGaaBNxzA-iGszgmU';

const bot = new TelegramBot(token_new, {polling: true});

function repeat_now(){
	console.log('Repeat Function');
	Msgs_len = Msg_Array.length;
	r = 0;
	
	if(Msgs_len == 0){
		io.emit('alert',"Msgs List Is Empty Bot Is Stopped Now \nAdd Msgs To List Then Turn On Bot");
		console.log('No Msgs to Send');
		Status = false
		//console.log('Changed Bot Status: '+Status);
		io.emit('bot_status_changed',Status);
	   return;
	}

	let myVar = setInterval(function(){ timer() }, Repeat);

		function timer() {
			if(!Status){
				stopFunction();
				return;
			}
			var msg_b = Msg_Array[r];
			if(msg_b.includes('@BU@')){
				var b_split = msg_b.split('@BU@');
				//send_link_button(b_split[0],b_split[1],b_split[2]);
				test_img(b_split[0],b_split[1],b_split[2],b_split[3]);
			}else{
				bot.sendMessage(client_group_id,msg_b);
			}
			if(Msgs_len-1 == r){
			  r = 0;
			}else{
			 r++;
			}
			//bot.sendMessage(my_chat_id,"Repeating Msg here");
			//bot.sendMessage(msg.chat.id,"Repeating Msg here");
			//chat_id = msg.chat.id; // Get Group ID Here
			
			console.log('Sending Msg');
		//do stuff here
		}

		function stopFunction() {
		clearInterval(myVar);
	}
}

function test_img(Msg,Name,Link,img_link){
	//var photo = 'http://lorempixel.com/400/200/cats/';
	var photo_n = 'https://stenoworld.000webhostapp.com/bot/'+img_link;
	//var photo_q = 'http://botupload221.epizy.com/bot_uploads/green.jpeg';
	bot.sendPhoto(client_group_id, photo_n,
	{"reply_markup":{"inline_keyboard":[
          [
            {
              text: Name,
              url: Link,
            },
          ],
        ]}, caption: Msg});
}

function test_vid(Msg,Name,Link,img_link){
	//var photo = 'http://lorempixel.com/400/200/cats/';
	//var photo_n = 'https://stenoworld.000webhostapp.com/bot/'+img_link;
	var video_n = 'https://stenoworld.000webhostapp.com/bot/'+img_link;
	//var photo_q = 'http://botupload221.epizy.com/bot_uploads/green.jpeg';
	bot.sendVideo(client_group_id, video_n,
	{"reply_markup":{"inline_keyboard":[
          [
            {
              text: Name,
              url: Link,
            },
          ],
        ]}, caption: Msg});
}

function send_link_button(Msg,Name,Link){
	
	    bot.sendMessage(client_group_id,Msg, {
      "reply_markup": {
        "inline_keyboard": [
          [
            {
              text: Name,
              url: Link,
            },
          ],
        ],
      },
    });
}


io.on('connection', function(socket) {
	//socket.emit('chat_id',chat_id);
	console.log('User Connected: '+socket.id); 
	socket.on('status' , function(data){
		console.log('Bot Status: '+Status); 
		socket.emit('bot_status',Status);
		console.log('Repeat_Mins: '+Repeat/60000);
		socket.emit('repeat_min',(Repeat/60000));
		Msgs_len = Msg_Array.length;
		if(Msgs_len == 0){
			io.emit('alert',"Msgs List Is Empty Bot Is Stopped Now \nAdd Msgs To List Then Turn On Bot");
		}
	});
	
	socket.on('set_status' , function(data){
		console.log('Changed Bot Status: '+data); 
		if(data == '0'){
		   Status = false
		}else{
		   Status = true;
		   repeat_now();
		}
		console.log('Changed Bot Status: '+Status);
		socket.emit('bot_status_changed',Status);
		//socket.emit('chat_id',chat_id);
		//bot.sendMessage(client_group_id,"<img src=https://img.youtube.com/vi/JeyxolsJ3aE/0.jpg",{parse_mode: 'HTML'});
		//socket.emit('bot_status',Status);
	});
	
	socket.on('set_repeat_min' , function(data){
		Repeat = data*(1000*60);
		console.log('Changed Repeat to : '+data+' Minutes'); 
		socket.emit('repeat_min_changed',(Repeat/60000));
		//socket.emit('bot_status',Status);
	});
	
	socket.on('get_list' , function(data){
		//Repeat = data*(1000*60);
		console.log('Sending Msgs List');
		var list_send = '';
		Msg_Array.forEach(element => add_string(element));
		
		function add_string(to_add){
			if(list_send == ''){
				list_send = to_add;
			}else{
				list_send = list_send +'<@>'+ to_add;
			}
		}
		socket.emit('list_msgs',list_send)
		console.log("sent list: "+list_send);
	});
	
	socket.on('update_list' , function(data){
		//Repeat = data*(1000*60);
		console.log('List Received : '+data);
		var list_rec = data.split('<@>');
		Msg_Array = list_rec;
		console.log('List Updated');
		io.emit('alert','Msgs List Updated Successfully');
		Msgs_len = Msg_Array.length;
		r = 0;
		//socket.emit('repeat_min_changed',(Repeat/60000));
		//socket.emit('bot_status',Status);
	});
	
});


bot.on('message', (msg) => {
	//socket.emit('chat_id',msg.chat.id);

    //console.log('new msg: '+msg.text.toString());
	//bot.sendMessage("Hello dear user");
     //anything
	 chat_id = msg.chat.id;
	 console.log('Chat ID: '+chat_id);
	 //bot.sendMessage(my_chat_id,chat_id);
	 
});
//7554
// FORWARD Msg to Other Groups
/* 
bot.on('message', (msg) => {
    
var Hi = "forward_me";
if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
bot.sendMessage(my_chat_id,msg.text.toString());
//bot.sendMessage("Hello dear user");
} 
    
});
*/

/*
let myVar = setInterval(function(){ timer() }, 5000);

function timer() {
	
//do stuff here
}

function stopFunction() {
    clearInterval(myVar);
}
*/
