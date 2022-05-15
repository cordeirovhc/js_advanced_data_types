function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "hello";
  yield "world";
  yield* calculation(3, 5); // o * é necessário para que fn seja executado
}

const generator = main();

// retorna um valor por vez
console.log(generator.next()); // { value: 'hello', done: false }
console.log(generator.next()); // { value: 'world', done: false }
console.log(generator.next()); // { value: 15, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// retorna todos os valores
console.log(Array.from(main())); // [ 'hello', 'world', 15 ]
console.log([...main()]); // [ 'hello', 'world', 15 ]

// --------------------------------------------------------

const { readFile, stat, readdir } = require("fs/promises");

/* function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey Dude");
} */

// Promise.all([...promisified()]).then((results) => console.log(results));

/* (async () => {
  for await (const item of systemInfo()) {
    console.log(item);
  }
})(); */

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname); // traz todos os arquivos que estao no diretorio
  yield { dir };
}

(async () => {
  let result = {};

  for await (const item of systemInfo()) {
    result = { ...result, ...item };
  }

  console.log(result);

  // Promise.all([...systemInfo()]).then((results) => console.log(results)); // error
})();
