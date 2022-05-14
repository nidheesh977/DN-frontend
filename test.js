class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.tail = null
    }
    
    add_val = (val) => {
        if (this.head){
            this.tail.next = node
            this.tail = node
        }
    }
}