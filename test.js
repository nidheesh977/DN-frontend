let a1 = [4,7,2,10]

for(let i =0;i<=a1.length;i++){
    let outerElement = a1[i]
    for(let j= 0;j<=a1.length;j++){
        let innerElement = a1[j]
        if(innerElement>outerElement){
            a1[i] = innerElement;
            a1[j] = outerElement;

            innerElement = a1[j]
            outerElement = a1[i]
        }
    }
}

console.log(a1)
console.log("Min Value = " + a1[0])