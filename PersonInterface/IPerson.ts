//Interface defining person
interface IPerson{
    name: string;
    age: number;
    oldest (other: IPerson): IPerson;
}

//class implementing Iperson med metode til at finde ældst
class Person implements IPerson{
    constructor(public name: string, public age: number){}
    oldest(other: IPerson): IPerson {
        return this.age >= other.age ? this : other;
    }
    //method for is adult
    isAdult(): boolean {
        return this.age >= 18;
    }
}

//opretter instanser
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);
const person3 = new Person("Charlie", 14);


//find den ældste person
const oldestPerson = person1.oldest(person2);
console.log(`The oldest person is ${oldestPerson.name} with age ${oldestPerson.age}.`);

//check if person3 is an adult
console.log(`${person3.name} is an adult: ${person3.isAdult()}.`);