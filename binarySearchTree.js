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

// Worst case is O n*2, as it loops through the array twice. With a large enough data set I could compare an array of all duplicates
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

// Worst case is O n
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

    insert(value) {

        let currentPointer = this.root;
        let newNode = new Node(value);
        let i = 0;

        while (currentPointer) {
            if (value < currentPointer.data) {
                if (!currentPointer.left) {
                    currentPointer.left = newNode;
                    return;
                }
                currentPointer = currentPointer.left;
            } else if (value > currentPointer.data) {
                if (!currentPointer.right) {
                    currentPointer.right = newNode;
                    return;
                }
                currentPointer = currentPointer.right;
            } else {
                console.log("Value Already Exists in Tree");
                return;
            }
        }
    }

    delete(value) {


        let currentPointer = this.root;
        let previousPointer = currentPointer;
        let isLeftChild = false;
        let isRightChild = false;

        while (currentPointer.data != value) {


            if (value < currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.left;
                isLeftChild = true;
                isRightChild = false;
            } 
    
            if (value > currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.right;
                isLeftChild = false;
                isRightChild = true;
            }

            console.log(currentPointer);
          
        }

   

        // Node to be deleted has no children
        if (currentPointer.data == value && currentPointer.right == null && currentPointer.left == null) {
            if (isLeftChild) {
                previousPointer.left = null;
                return;
            }

            if (isRightChild) {
                previousPointer.right = null;
                return;
            }
        }

        let hasLeftChild = false;
        let hasRightChild = false;
        let isRootNumber = false;
        let children = 0;
        
        if (currentPointer.left) {
            children++;
            hasLeftChild = true;
        }

        if (currentPointer.right) {
            children++;
            hasRightChild = true;
        }

        if (currentPointer.data == this.root.data) {
            isRootNumber = true;
        }

        // Node to be deleted has exactly 1 child
        if (currentPointer.data == value && children == 1) {
            if (hasLeftChild) {
                if(isLeftChild) {
                    previousPointer.left = currentPointer.left;
                    return;
                }

                if (isRightChild) {
                    previousPointer.right = currentPointer.left;
                    return;
                }
            }

            if (hasRightChild) {
                if(isLeftChild) {
                    previousPointer.left = currentPointer.right;
                    return;
                }

                if (isRightChild) {
                    previousPointer.right = currentPointer.right;
                    return;
                }
            }
        }

        if (currentPointer.data == value && children == 2) {

            let nodeToBeRemoved = currentPointer;
            previousPointer = currentPointer;
            currentPointer = currentPointer.right;
            
            while (currentPointer.left != null) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.left;
            }

            console.log(currentPointer);

            // replacement node found / check if 0 or 1 children exist

            // 0 children case
            if (isRightChild || isRootNumber) {
                if (!currentPointer.right && !currentPointer.left) {

                    if (currentPointer == previousPointer.left) {
                        nodeToBeRemoved.data = currentPointer.data;
                        previousPointer.left = null;
                    } else {
                        nodeToBeRemoved.data = currentPointer.data;
                        previousPointer.right = null;
                    }


                // 1 child case
                }  else {
                    if (currentPointer.right > previousPointer.data) {
                        previousPointer.right = currentPointer.right
                    } else {
                        previousPointer.left = currentPointer.right
                    } 
            }
             nodeToBeRemoved.data = currentPointer.data;
          }

          if (isLeftChild) {
            if (!currentPointer.right && !currentPointer.left) {

                if (currentPointer.data == previousPointer.right.data) {
                    nodeToBeRemoved.data = currentPointer.data;
                    previousPointer.right = null;
                }

                if (currentPointer.data == previousPointer.left.data) {
                    nodeToBeRemoved.data = currentPointer.data;
                    previousPointer.left = null;
                }

            } 
            // else {
            //     previousPointer.right = currentPointer.right;
            // }
          }
        }

    }
}


let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 10, 9, 67, 6345, 324, 6345, 2];

let sortedArray = mergeSort(testArray);
let array = removeDuplicates(sortedArray);
let length = array.length;


let treeBoyo = new Tree(array);



treeBoyo.insert(300);
treeBoyo.insert(6);
treeBoyo.insert(600)
treeBoyo.insert(0);
treeBoyo.insert(6.5)
treeBoyo.insert(5.5)
treeBoyo.prettyPrint();
// treeBoyo.insert(2);
// treeBoyo.insert(250);
// treeBoyo.delete(325325);
treeBoyo.delete(4.2);
treeBoyo.prettyPrint();