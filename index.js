var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('heroku-self-ping').default("http://tele-bot-121-1.herokuapp.com");

const { promisify } = require('util')
const sleep_new = promisify(setTimeout)

const {Api, TelegramClient } = require('telegram')
const { Logger } = require('telegram/extensions');

Logger.setLevel('error'); // only errors
Logger.setLevel('none'); // warnings too
Logger.setLevel('none'); // info too

const { StringSession } = require('telegram/sessions')
const input = require('input') // npm i input
const random = require('random-bigint')

var sleep = require('system-sleep');

const PORT = 8080;

var Status = false;

var Repeat_secs = 2; //////////////

var call_after_secs = 60; //////////////

var chat_id = '';
var my_bot_id = '791554317'; // My Bot Chat ID
var my_chat_id = '-403822704'; // My Group ID

var client_group_id = '-403822704';

var Msg_Array = new Array();

var Groups_Array = new Array();

//https://t.me/testorbot123

Groups_Array.push("@testorbot123");
Groups_Array.push("@testorbot124");
Groups_Array.push("@testorbot125");
//Groups_Array.push("@BSC_CHINA");
//Groups_Array.push("@BSC_TURKEY");
//Groups_Array.push("@BSCApe");
//Groups_Array.push("@CRYPTOMOONGEMs");
//Groups_Array.push("@Defiexperts");
//Groups_Array.push("@bsc_lovers");
//Groups_Array.push("@CryptoFamilyGroup");
//Groups_Array.push("@Pumpchads");
//Groups_Array.push("@CaptainJackApeGroup");
//Groups_Array.push("@BSCStreetBetsCaptain");
//Groups_Array.push("@whalers_club");

var Msg_ids = new Array();

var last_msgs_num = 5;

var Groups_len = 0;

Groups_len = Groups_Array.length;

var Msgs_len = 0;

var g = 0; // g for group
var m = 0; // m for message num
var r = 0;

let myVar;

const Promise = require('bluebird');
Promise.config({
  cancellation: true
});


http.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on ${ PORT }`);
});

const apiId = 4313210
const apiHash = 'c0114de8404c65aaf7357b67a8f254d1'
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTEBu6aS9mGn4oiuMmW+1vPoSHd+5pJEqegyIYV8+uqhPX0xG7uhAEXNOYa8I/4TDS1BH0KylfWuFRBFiw19HbMchZ8y647ukYmMx+ZnFBi398yLllUj1cyzvrsSBZxAJmtFbEDFPvrz4eb67JlgxmL5i+uNkLorFE/IMTXj/DJ+n2nP+5aSqHoDGP0uSVo6wOslQVSRb7rntFwHSW9FgNG4KoMUegrDtJGJYQSLgnkPCtOtvBOKh4AzyhgO2qNC5dn+O3RvllZrnmFCodmLi4xEMFtcFP2UJfcf/8+ZALP3z9+Jknqb4leDyHGIFZ4mNl1lRsbJiM/Zr2JrfJiVdlUV8Cc=');
//const stringSession = new StringSession('');

/** Generates BigInts between low (inclusive) and high (exclusive) */
function generateRandomBigInt(lowBigInt, highBigInt) {
  if (lowBigInt >= highBigInt) {
    throw new Error('lowBigInt must be smaller than highBigInt');
  }

  const difference = highBigInt - lowBigInt;
  const differenceLength = difference.toString().length;
  let multiplier = '';
  while (multiplier.length < differenceLength) {
    multiplier += Math.random()
      .toString()
      .split('.')[1];
  }
  multiplier = multiplier.slice(0, differenceLength);
  const divisor = '1' + '0'.repeat(differenceLength);

  const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);

  return lowBigInt + randomDifference;
}

const from_group = '@forwardmsg999';

var client;

///////////////////////////


main_function();

function main_function(){
	
	Msg_ids = new Array();

	(async () => {
				client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
				await client.start({
					phoneNumber: ('+17327072749'),
					password: async () => await input.text('password?'),
					phoneCode: async () => await input.text('Code ?'),
					onError: (err) => console.log(err),
				});


		const msgs = await client.getMessages(from_group,{
					limit: last_msgs_num,
				});
				console.log("the total number of msgs are", msgs.total);
				console.log("what we got is ", msgs.length);
				for await (const msg of msgs) {
						Msg_ids.push([msg.id]);
						console.log(msg.id);
					}
					
				
				/*for await (const group_now of Groups_Array) {
					console.log(group_now);
					(async function run() {
						const result = await client.invoke(new Api.channels.JoinChannel({
						channel: group_now
					}));
						console.log(result); // prints the result
					})();
				}*/
					
					
					//Status = true;
					
				myVar = setInterval(function(){ timer() }, Repeat_secs*1000);
				
					//msg_ = Msg_ids[m];

					function timer() {
						
						if(!Status){
							stopFunction();
							return;
						}
						
						msg_ = Msg_ids[m];
						
						var group_now = Groups_Array[g];
							
							console.log(group_now);
						
							(async function run() {
							//await sleep(10*1000);
							const result = await client.invoke(new Api.messages.ForwardMessages({
							fromPeer: from_group,
							id: [msg_],
							randomId: [BigInt(Math.floor(Math.random() * -10000000000000).toString())],
							toPeer: group_now,
							withMyScore: true,
							scheduleDate: 43
						}));
							//console.log(result); // prints the result
						})();
						
						if(Groups_len-1 == g){
						  g = 0;
						  
							  if(Msg_ids.length-1 == m){
								  console.log("m = 0");
									m = 0;
										call_after_time();
									stopFunction();
							  }	else{
								  console.log("m++");
								m++
							  }
						  
						}else{
						  g++;
						}
						
						//console.log('Sending Msg');
					//do stuff here
					}

					function stopFunction() {
					clearInterval(myVar);
				}
				
				

	})()

}


function call_after_time(){
	
	console.log("Will Run again After Waiting for: "+call_after_secs+" Seconds");
	
	//sleep(call_after_secs*1000);
	
	sleep_new(call_after_secs*1000).then(() => {
		
		if(Status){
			console.log("Running Now");
			main_function();
		}else{
			console.log("Status False Not Running Again");
		}
	})
	
	/*console.log("Running Now");
	
	if(Status){
		main_function();
	}*/
}

function join_groups_now(){
	
	for (const group_now of Groups_Array) {
					console.log(group_now);
					(async function run() {
						const result = await client.invoke(new Api.channels.JoinChannel({
						channel: group_now
					}));
						console.log(result); // prints the result
					})();
	}
	
}

function restart_repeat(){
	if(Status == true){
		clearInterval(myVar);
		Status = true;
		main_function();
	}
}

io.on('connection', function(socket) {
	//socket.emit('chat_id',chat_id);
	console.log('User Connected: '+socket.id); 
	socket.on('status' , function(data){
		console.log('Bot Status: '+Status); 
		socket.emit('bot_status',Status);
		console.log('Repeat_Seconds: '+call_after_secs);
		socket.emit('repeat_secs',(call_after_secs));
		socket.emit('last_msgs_changed',(last_msgs_num));
		Msgs_len = Msg_Array.length;
		/*if(Msgs_len == 0){
			io.emit('alert',"Msgs List Is Empty Bot Is Stopped Now \nAdd Msgs To List Then Turn On Bot");
		}*/
	});
	
	socket.on('set_status' , function(data){
		console.log('Changed Bot Status: '+data); 
		if(data == '0'){
		   Status = false
		   clearInterval(myVar);
		}else{
			if(!Status){
				Status = true;
				main_function();
			}
		}
		console.log('Changed Bot Status: '+Status);
		socket.emit('bot_status_changed',Status);
	});
	
	socket.on('set_repeat_sec' , function(data){
		call_after_secs = data;
		console.log('Changed Repeat to : '+data+' Seconds'); 
		socket.emit('repeat_secs',(call_after_secs));
		/////////////////////////
		//restart_repeat();
		//socket.emit('bot_status',Status);
	});
	
	socket.on('set_last_msgs' , function(data){
		last_msgs_num = data;
		console.log('Changed Last Msgs to : '+data+' Msgs'); 
		socket.emit('last_msgs_changed',(last_msgs_num));
		/////////////////////////
		//restart_repeat();
		//socket.emit('bot_status',Status);
	});
	
	/*socket.on('get_list' , function(data){
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
	});*/
	
	/*socket.on('update_msgs' , function(data){
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
	});*/
	
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
	
	socket.on('join_groups' , function(data){
		join_groups_now();
	});
	
	socket.on('update_groups' , function(data){
		console.log('Groups List Received : '+data);
		var list_rec = data.split('<@>');
		Groups_Array = list_rec;
		console.log('List Updated');
		io.emit('alert','Groups List Updated Successfully');
		Groups_len = Groups_Array.length;
		m = 0;
		g = 0;
		//restart_repeat();
	});
	
});