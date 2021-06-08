var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('heroku-self-ping').default("http://tele-bot-121-1.herokuapp.com");

// tele-bot-121-1 

const PORT = 8080;

var Status = false;
var Repeat = 5000;
var chat_id = '';
var my_bot_id = '791554317'; // My Bot Chat ID
var my_chat_id = '-403822704'; // My Group ID

var client_group_id = '-403822704';

var Msg_Array = new Array();

var Groups_Array = new Array();

	/*Groups_Array.push("-403822704@BU@name");
	Groups_Array.push("-473706806@BU@name");
	Groups_Array.push("-422666632@BU@name");
	Groups_Array.push("-554445952@BU@name");
	Groups_Array.push("-425839699@BU@name");
	Groups_Array.push("-543188428@BU@name");
	Groups_Array.push("-482845738@BU@name");
	Groups_Array.push("-573131030@BU@name");
	Groups_Array.push("-564101641@BU@name");
	Groups_Array.push("-548565185@BU@name");*/

var Groups_len = 0;

var Msgs_len = 0;

var g = 0; // g for group
var r = 0;

let myVar;

const Promise = require('bluebird');
Promise.config({
  cancellation: true
});


http.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on ${ PORT }`);
});


const TelegramBot = require('node-telegram-bot-api');

var Bots_array = new Array();

const token_new_1 = '1802161362:AAEt_cqp0fv6IET2KWoDylIRKUrAChrGflw';
const token_new_2 = '1802161362:AAEt_cqp0fv6IET2KWoDylIRKUrAChrGflw';
const token_new_3 = '1802161362:AAEt_cqp0fv6IET2KWoDylIRKUrAChrGflw';
const token_new_4 = '1802161362:AAEt_cqp0fv6IET2KWoDylIRKUrAChrGflw';
const token_new_5 = '1802161362:AAEt_cqp0fv6IET2KWoDylIRKUrAChrGflw';

const bot_1 = new TelegramBot(token_new_1, {polling: true});
const bot_2 = new TelegramBot(token_new_1, {polling: true});
const bot_3 = new TelegramBot(token_new_1, {polling: true});
const bot_4 = new TelegramBot(token_new_1, {polling: true});
const bot_5 = new TelegramBot(token_new_1, {polling: true});

Bots_array.push(bot_1);
Bots_array.push(bot_2);
Bots_array.push(bot_3);
Bots_array.push(bot_4);
Bots_array.push(bot_5);

var B = 0; // b for bots loop

Bots_length = Bots_array.length();

function repeat_now(){
	console.log('Repeat Function');
	Msgs_len = Msg_Array.length;
	r = 0;
	
	if(Msgs_len == 0){
		io.emit('alert',"Msgs List Is Empty Bot Is Stopped Now \nAdd Msgs To List Then Turn On Bot");
		console.log('No Msgs to Send');
		Status = false
		io.emit('bot_status_changed',Status);
	    return;
	}
	
	if(Groups_len == 0){
		io.emit('alert',"Groups List Is Empty Bot Is Stopped Now \nAdd Groups To List Then Turn On Bot");
		console.log('No Groups to Send Msgs to');
		Status = false
		io.emit('bot_status_changed',Status);
	    return;
	}

	myVar = setInterval(function(){ timer() }, Repeat);

		function timer() {
			if(!Status){
				stopFunction();
				return;
			}
			var msg_b = Msg_Array[r];
			if(msg_b.includes('@BU@')){
				var b_split = msg_b.split('@BU@');
				//send_link_button(b_split[0],b_split[1],b_split[2]);
				//test_img(b_split[0],b_split[1],b_split[2],b_split[3]);
				Send_img(b_split[0],b_split[1],b_split[2],b_split[3]);
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

function Send_img(Msg,Name,Link,img_link){
	
	var photo_n = 'https://stenoworld.000webhostapp.com/bot_2/'+img_link;
	
	Groups_Array.forEach(element => send_img_msg(element));
	
	function send_img_msg(element){
	var b_split = element.split('@BU@');
	Bots_array[B].sendPhoto(b_split[0], photo_n,
	{"reply_markup":{"inline_keyboard":[
          [
            {
              text: Name,
              url: Link,
            },
          ],
        ]}, caption: Msg});
		
		if(Bots_length-1 == B){
			  B = 0;
			}else{
			 B++;
			}
	}	
}

function test_img(Msg,Name,Link,img_link){
	//var photo = 'http://lorempixel.com/400/200/cats/';
	var photo_n = 'https://stenoworld.000webhostapp.com/bot_2/'+img_link;
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
	//var photo_n = 'https://stenoworld.000webhostapp.com/bot_2/'+img_link;
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


function restart_repeat(){
	if(Status == true){
		clearInterval(myVar);
		Status = true;
		repeat_now();
	}
}

io.on('connection', function(socket) {
	//socket.emit('chat_id',chat_id);
	console.log('User Connected: '+socket.id); 
	socket.on('status' , function(data){
		console.log('Bot Status: '+Status); 
		socket.emit('bot_status',Status);
		console.log('Repeat_Seconds: '+Repeat/1000);
		socket.emit('repeat_secs',(Repeat/1000));
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
	});
	
	socket.on('set_repeat_sec' , function(data){
		Repeat = data*(1000);
		console.log('Changed Repeat to : '+data+' Seconds'); 
		socket.emit('repeat_sec_changed',(Repeat/1000));
		/////////////////////////
		restart_repeat();
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
		console.log("sent msgs list: "+list_send);
	});
	
	socket.on('update_msgs' , function(data){
		//Repeat = data*(1000*60);
		console.log('Msgs List Received : '+data);
		var list_rec = data.split('<@>');
		Msg_Array = list_rec;
		console.log('List Updated');
		io.emit('alert','Msgs List Updated Successfully');
		Msgs_len = Msg_Array.length;
		r = 0;
		restart_repeat();
		//socket.emit('repeat_min_changed',(Repeat/60000));
		//socket.emit('bot_status',Status);
	});
	
	socket.on('get_groups_list' , function(data){
		//Repeat = data*(1000*60);
		console.log('Sending Groups List');
		var list_send = '';
		Groups_Array.forEach(element => add_string(element));
		
		function add_string(to_add){
			if(list_send == ''){
				list_send = to_add;
			}else{
				list_send = list_send +'<@>'+ to_add;
			}
		}
		socket.emit('list_groups',list_send)
		console.log("sent groups list: "+list_send);
	});
	
	socket.on('update_groups' , function(data){
		console.log('Groups List Received : '+data);
		var list_rec = data.split('<@>');
		Groups_Array = list_rec;
		console.log('List Updated');
		io.emit('alert','Groups List Updated Successfully');
		Groups_len = Groups_Array.length;
		g = 0;
		restart_repeat();
	});
	
});

/*
bot.on('message', (msg) => {
	//socket.emit('chat_id',msg.chat.id);

    //console.log('new msg: '+msg.text.toString());
	//bot.sendMessage("Hello dear user");
     //anything
	 chat_id = msg.chat.id;
	 console.log('Chat ID: '+chat_id);
	 //bot.sendMessage(my_chat_id,chat_id);
	 
});
*/

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
