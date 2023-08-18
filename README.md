# asic-tycoon

## Install
Clone the repo, and install the dependencies. `npm run start` will begin serving files locally on port 8080 using webpack-dev-server and accessible from the browser (requires `npm`).

    $ git clone https://github.com/ValuedMammal/asic-tycoon-web.git
    $ cd asic-tycoon-web
    $ npm install
    $ npm run start

Besides dev dependencies, the project uses a single dependency in the form of a webassembly module which can be found in the registry at [asic-tycoon](https://www.npmjs.com/package/asic-tycoon).

## What is this?
ASIC Tycoon is a concept for a game where the player collects hashrate to earn mining rewards. The money and items are fictional and hold no value. Gameplay is meant to be in the style of a SIMS, Farmville, or Rollercoaster Tycoon. The only objectives are to grow your operation and capital stock while investing in energy-efficient projects, and reaching various milestones, etc. More details around design and rationale are in the [explainer](doc/explainer.md).