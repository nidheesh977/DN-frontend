class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}
class LinkedList {
    constructor(value){
        let newNode = new Node(value)
        this.head = newNode;
        this.tail = this.head
        this.length = 1
    }
    push(value){
        let newNode = new Node(value)
        if(!this.head){
            this.head = newNode
            this.tail = this.head
        }else{
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
        return this
    }
    pop(){
        if(!this.head){
            return undefined
        }
        let temp = this.head
        let pre = this.head
        while(temp.next){
            pre= temp
            temp = temp.next
        }
        this.tail = pre
        this.tail.next = null
        this.length--
        if(this.length === 0){
            this.head = null
            this.tail = null
        }
        return temp

    }
    unshift(value){
        const newNode = new Node(value)
        if(!this.head){
            this.head = newNode
            this.tail = this.head
        }
        else{
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
        return newNode

    }
    shift(){
        if(!this.head){
            return undefined
        }
        let temp = this.head
        this.head = this.head.next
        temp.next = null
        this.length--
        if(this.length === 0){
            this.tail = null
        }
        return this
    }
    get(index){
        if(index < 0 || index >= this.length){
            return undefined
        }
        let temp = this.head
        for(let i = 0; i<index ; i++){
            temp = temp.next
        }
        return temp
    }
    set(index,value){
        let temp = this.get(index)
        if(temp){
            temp.value = value
            return true
        }
        return false

    }
}
const newLinkedList = new LinkedList(5)

newLinkedList.unshift(6)
newLinkedList.push(3)
console.log(newLinkedList.get(0))