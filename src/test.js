// this object
let user = {
  name: "danial",
  family: "kelidari",
  age: 20,
  f: function () {
    console.log(this.name);
  },
};

user.f();
console.log(user.age);

let admin = {
  name: "ali",
  age: 30,
  printname() {
    console.log(admin.name);
  },
};

admin.printname()


admin.family = "rezaii"
console.log(admin)

// // arrow function this nadarad
// user.newfunction = () => {
//     console.log(this.family)
// }

// console.log(user);
// user.newfunction() //error

function sayname() {
    console.log(this.name)
}

user.n = sayname
admin.n = sayname

user.n()
admin.n()

//////////////////////////////////////////////////////////////////////////////////////





