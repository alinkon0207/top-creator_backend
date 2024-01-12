function greet(name: string): string {
  return `Hello, ${name}!`;
}
const user = 'World' as never;
console.log(greet(user));
