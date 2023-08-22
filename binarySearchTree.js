class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

function splitArrayInHalf(array) {
    let midpoint = Math.ceil(array.length / 2); // Using Math.ceil ensures that if the length is odd, the first half will have one more element than the second half.

    let leftSide = array.slice(0, midpoint);
    let rightSide = array.slice(midpoint);

    return [leftSide, rightSide];
}

function merge(leftArray, rightArray) {

    let newArray = [];

    let leftPointer = 0;
    let rightPointer = 0;

    while (leftPointer < leftArray.length && rightPointer < rightArray.length) {
        if (leftArray[leftPointer] < rightArray[rightPointer]) {
            newArray.push(leftArray[leftPointer]);
            leftPointer++;
        } else {
            newArray.push(rightArray[rightPointer]);
            rightPointer++;
        }
    }

    // Handle any leftover elements in the left array
    while (leftPointer < leftArray.length) {
        newArray.push(leftArray[leftPointer]);
        leftPointer++;
    }

    // Handle any leftover elements in the right array
    while (rightPointer < rightArray.length) {
        newArray.push(rightArray[rightPointer]);
        rightPointer++;
    }

    return newArray;
}


function mergeSort(array) {

    // base case 
    if (array.length == 1) {
        return array;
    }

    let leftSide = (splitArrayInHalf(array)[0]);
    let rightSide = (splitArrayInHalf(array)[1]);


    let sortedLeft = mergeSort(leftSide);
    let sortedRight = mergeSort(rightSide)


    return orderedArray = merge(sortedLeft, sortedRight);
}

function checkDuplicates(array) {
    // This fn checks duplicates after an array has been sorted

    let arrayLength = array.length;
    let currentIndex = 0;
    let comparisonValue = 1;
    let filteredArray = [];


    while (currentIndex < arrayLength) {
        
        if (currentIndex + comparisonValue < arrayLength && array[currentIndex] == array[currentIndex + comparisonValue]) {
            comparisonValue += 1;
        } else {
            filteredArray.push(array[currentIndex]);
            currentIndex += comparisonValue;
            comparisonValue = 1;
        }
    }

    return filteredArray;
}

function removeDuplicates(arr) {
    if (arr.length === 0) return [];

    let wPtr = 1;  // Start write pointer at the second position since the first value is always unique

    for (let rPtr = 1; rPtr < arr.length; rPtr++) {
        if (arr[rPtr] !== arr[rPtr - 1]) {
            arr[wPtr] = arr[rPtr];
            wPtr++;
        }
    }

    // Trim array to its new size
    arr.length = wPtr;

    return arr;
}

function buildTree (array, start, end) {

    if (start > end) {
        return null;
    }

    let middle = parseInt((start + end) / 2);
    let newNode = new Node(array[middle]);

    newNode.left = buildTree(array, start, middle - 1);
    newNode.right = buildTree(array, middle + 1, end);

    return newNode;
}

class Tree {
    constructor(array) {
        this.sortedArray = mergeSort(array);
        this.filteredArray = removeDuplicates(sortedArray);
        this.root = buildTree(this.filteredArray, 0, this.filteredArray.length - 1);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {  // <-- Set a default value of node to this.root
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);  // <-- Modified to use `this.prettyPrint`
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);  // <-- Modified to use `this.prettyPrint`
        }
    }
}


let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6345];

let sortedArray = mergeSort(testArray);
let array = removeDuplicates(sortedArray);
let length = array.length;

let treeBoyo = new Tree(array);

treeBoyo.prettyPrint();