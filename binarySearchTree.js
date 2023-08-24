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
        this.filteredArray = removeDuplicates(this.sortedArray);
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

       

        while (currentPointer !== null && currentPointer.data != value) {


            if (value < currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.left;
                isLeftChild = true;
                isRightChild = false;
            } else if (value > currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.right;
                isLeftChild = false;
                isRightChild = true;
            }
 
        }

        // Value does not exist in the tree
        if (currentPointer === null) {
            console.log("Value not found in the tree.");
            return false;
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

    find (value) {
        
        let currentPointer = this.root;
        let previousPointer = currentPointer;


        while (currentPointer !== null && currentPointer.data != value) {


            if (value < currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.left;
            } else if (value > currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.right;
            }
        }

        // Value does not exist in the tree
        if (currentPointer === null) {
            console.log("Value not found in the tree.");
            return false;
        }
        // console.log(currentPointer);
        return currentPointer;


    }

    levelOrder(node = this.root) {

        let queue = [];
        let result = []

        if (node == null) {
            return;
        } else {
            queue.push(node);
        }

        while (queue.length != 0) {

            if (queue[0].left) {
                queue.push(queue[0].left)
            }
    
            if (queue[0].right) {
                queue.push(queue[0].right)
            }

            result.push(queue[0].data);
            queue.shift();
        }

        console.log(result);
        return result;
    }


    preorder(node = this.root, resultArray = []) {

        if (node == null) {
            return;
        }

        resultArray.push(node.data);

        this.preorder(node.left, resultArray);
        this.preorder(node.right, resultArray);

        return resultArray;
    }

    inorder(node = this.root, resultArray = []) {

        if (node == null) {
            return;
        }

        this.inorder(node.left, resultArray);
        resultArray.push(node.data);
        this.inorder(node.right, resultArray);

        return resultArray;
    }

    postorder(node = this.root, resultArray = []) {

        if (node == null) {
            return;
        }

        this.postorder(node.left, resultArray);
        this.postorder(node.right, resultArray);
        resultArray.push(node.data);

        return resultArray;
    }

    getHeight(node) {

        // Once you have the node, the rest remains the same.
        if (!node) {
            return -1;  // Note: This might be redundant given the above condition, but is kept for clarity.
        }

        let leftHeight = this.getHeight(node.left);
        let rightHeight = this.getHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    getDepth(node) {

        let currentPointer = this.root;
        let previousPointer = currentPointer;
        let value = node.data;
        let depth = 0;

        if (node == false) {
            console.log("Illegal Node Found");
            return node;
        }

        if (node == this.root) {
            return depth;
        }

        while (value != currentPointer) {
            
            if (value < currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.left;
                depth++;
            } else if (value > currentPointer.data) {
                previousPointer = currentPointer;
                currentPointer = currentPointer.right;
                depth++;
            } else {
                return depth;
            }
        }
    }

    isBalanced(node = this.root) {

    // Base case: an empty tree is balanced
    if (node == null) {
        return true;
    }

    let leftHeight = this.getHeight(node.left);
    let rightHeight = this.getHeight(node.right);

    let diff = Math.abs(leftHeight - rightHeight);

    // Check the balance condition for the current node and for its left and right subtrees
    if (diff > 1) {
        return false;
    }
    
    if (!this.isBalanced(node.left)) {
        return false;
    }
    
    if (!this.isBalanced(node.right)) {
        return false;
    }
    
    return true;
    }

    rebalance() {
        let rebalancedArray = this.inorder();
        return rebalancedArray;
    }
}

function randomLessThan100() {
    return Math.floor(Math.random() * 100);
}

function randomGreaterThan100() {
    return 100 + Math.floor(Math.random() * 900); // This generates a number between 101 and 999
}

function randomBetween0And10() {
    return Math.floor(Math.random() * 11); // This includes both 0 and 10
}

function driverScript () {

    let newArray = []
    let arraySize = randomLessThan100();

    for (let i = 0; i < arraySize; i++) {
        newArray.push(randomLessThan100());
    }
    
    let newTree = new Tree(newArray);

    // newTree.prettyPrint();

    if (newTree.isBalanced) {
        console.log("Balanced");
        // console.log(newTree.levelOrder());
        // console.log(newTree.preorder());
        // console.log(newTree.postorder());
        // console.log(newTree.inorder());
    } else {
        console.log("False")
    }

    let unbalanceValue = randomBetween0And10();

    for (let i = 0; i < unbalanceValue; i++) {
        newTree.insert(randomGreaterThan100());
    }

    if (newTree.isBalanced() == false) {
        console.log("Unbalanced");
        let rebalancedArray = newTree.rebalance()
        let newestTree = new Tree (rebalancedArray);
        if (newestTree.isBalanced()) {
            console.log("Balanced")
            console.log(newestTree.levelOrder());
            console.log(newestTree.preorder());
            console.log(newestTree.postorder());
            console.log(newestTree.inorder());
            newestTree.prettyPrint();
        }
    }

}

driverScript();


// let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 10, 9, 67, 6345, 324, 6345, 2];

// let sortedArray = mergeSort(testArray);
// let array = removeDuplicates(sortedArray);
// let length = array.length;


// let treeBoyo = new Tree(array);
// treeBoyo.insert(600)
// treeBoyo.insert(601)



// treeBoyo.prettyPrint();
// let x = treeBoyo.find(3);
// let y = treeBoyo.find(600);
// // console.log(treeBoyo.getHeight(x));
// // console.log(treeBoyo.getDepth(y))

// if (treeBoyo.isBalanced()) {
//     console.log("Tree is balanced");
// } else {
//     console.log("Tree is Unbalanced");
//     let rebalancedArray = treeBoyo.inorder();
//     let treeBoyo2 = new Tree(rebalancedArray);
//     treeBoyo2.prettyPrint()
//     if (treeBoyo2.isBalanced()) {
//         console.log("Tree is balanced")
//     }
// }




// console.log(treeBoyo.postorder());

