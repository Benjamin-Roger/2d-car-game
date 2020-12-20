This is a [Next.js](https://nextjs.org/) and React 2D car game created to test simultaneous React hooks, context and frame animations. It works on both desktop and mobile and use vocal controls.

## Getting Started

First, clone this repository to your machine.

```bash
git clone https://github.com/Benjamin-Roger/2d-car-game.git

cd 2d-car-game

```

Then, install the packages:
```bash
npm i

```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How does it work ?

### Controls
There are 3 types of controls :
- keyboard, managed by event listener in hook "useKeys"
- mobile, managed with a set of buttons in the component "Mobile Controls" and the context "mobileControls"
- vocal, managed with the hook "useVolume"

### Render
There are 2 elements to render to animate the game: the canvas and the car.
The game is refreshed 60 times per second with the use of setInterval method. Both the canvas and the car are refreshed in the same file (useCar hook), as it is not possible to have 2 intervals running concurrently in the same component.

The useWindows hook resizes the window on every window resize.



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FBenjamin-Roger%2F2d-car-game.git)




## Credits

<a href="https://www.freepik.com/vectors/car">Car vector created by pch.vector - www.freepik.com</a> 
[Juha Lindstedt](https://github.com/pakastin/car) for the car physics and canvas logic