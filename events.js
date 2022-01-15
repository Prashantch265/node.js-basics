var events = require('events');
var eventEmitter = new events.EventEmitter();   //EventEmitter obj created
// creating events
eventEmitter.on('print',function(msg){
    //here print is the type or name of event
    console.log(msg);
});

eventEmitter.emit('print','print event is emmited');



var events = require('events');
var util = require('util');
// parameterized constructor named Person
var Person = function(name){
    this.name = name;
}
//Person inherits the EventEmitter obj
util.inherits(Person,events.EventEmitter);
//new obj created of Person
var Prashant = new Person('Prashant');
var Ashim = new Person('Ashim');
var people = [Prashant,Ashim];  //array holding the objects 

people.forEach(function(Person){
    Person.on('speak',function(msg){
        console.log(`${Person.name}:${msg}`);
    });
});

Prashant.emit('speak','hi');
Ashim.emit('speak','hello');