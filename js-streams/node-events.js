import { EventEmitter } from "node:events";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on("event", (a, b) => {
  console.log(a, b);
  setImmediate(() => {
    console.log("this happens asynchronously");
  });
});
myEmitter.emit("event", "a", "b");
