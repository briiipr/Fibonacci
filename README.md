# Fibonacci
A small C# + Angular project to request a Fibonacci number by its index.

## Tech stack:
- .NET6
- Angular 13
- Angular Material
- LiteDB

## Demo/Showcase:
To try and see a demo, [click here](https://fibonacci-calculator.azurewebsites.net/)

## Requirements to run Fibonacci locally:
- Visual Studio 2022
- Nodejs & npm
- npm install

## How to run Fibonacci locally:
1. Wait until Visual Studio has restored the corresponding NuGet packages, or do it manually.
2. Run: `npm install` in the `/ClientApp` folder.
3. Start the project by pressing F5 or clicking the "Fibonacci" button at top.

## Design choices
I have decided to use `Angular Material` combined with `flex` to quickly create a (mostly) responsive application, which combined with `NSwag` (automatic typescript model and http client generator), accelerates a lot the whole process.

As for styling, I just wanted a simple UI and tried to be as simple as it could be, while having a respectable appearance.
