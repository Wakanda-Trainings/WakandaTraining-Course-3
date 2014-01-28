//this is a comment

/*
this is how
you comment a bunch of lines
think of them like opening and closing comment parenthesis
*/

var x = 1; //variable with a simple scalar value
var y = x; //copies the value, so now independent
x = 2;
x + y;

//x = [1,2]; //simple array, more on this later
//y = x; //copies the REFERENCE to the array
//x.push(3); //add an element to the array in x
//y; //notice that it also affects y! 

//most things you deal with in javascript will be by reference
//notice that I can change the type on the fly

//var g = 'abcdefghijdpiea'; //simple scalar string
//g = "abcdefghijdpiea"; //can use double quotes
//g = "abcdef'ghi'jdpiea"; //can use both
//g.split("'"); //very useful string function

