/* Asynchronous (the function someOtherThing will be 
    called instantly with no freeze because the file 
    read happens independently) 
*/

system.readFileAsync("path/to/file.txt",file -> {
    System.out.println("We found a file! " + file.name);
});
someOtherThing();

/* Synchronous (the second line of code will not run
    until the first line finishes,
    freezing the program) */

File file = system.readFileSync("path/to/file.txt");
System.out.println("We found a file! " + file.name);
someOtherThing();

