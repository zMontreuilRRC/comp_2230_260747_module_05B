// console.log("Start script");

// console.log(waitForSomething());

// console.log("End script");

// function waitForSomething() {
//     let baseballStats = getBaseballStats();

//     setTimeout(() => {
//         stringValue = "new value";
//     }, 1000);

//     return stringValue;
// } 
function simulateAsyncOperation() {
    return new Promise((resolve) => {
        // invoking resolve "ends" the promise with the resolve argument returned
        setTimeout(() => {
            resolve("new value");
        }, 3000);
    });
}

async function waitForChange() {
    console.log("Starting asynchronous operation");
    let stringValue = "initial value";
    // await stops the code in a function from running until whatever it is awaiting 
    // "resolves"
    let resultPromise = simulateAsyncOperation();
    console.log(resultPromise);

    newValue = await resultPromise;
    console.log(resultPromise);
    console.log(stringValue);

    console.log("Function finished");
}

waitForChange();