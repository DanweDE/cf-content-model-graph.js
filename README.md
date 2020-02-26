Reads a `input.csv` file in the same folder and creates [Graphviz] dot markup.

```bash
node src/index.js
```

### Installation
Clone this repository:
```bash
git clone https://github.com/DanweDE/cf-content-model-graph.js.git
cd cf-content-model-graph.js
```

Then install dependencies to get started:
```bash
nvm use
npm install
```

### Drawing the graph

The generated dot markup can either be copy pasted to [viz-js.com](http://viz-js.com)
 or the output can be piped directly to the `dot` command to generate a rendered graph: [Graphviz installation][install Graphviz]:

```bash
node . --file path/to/input.csv | dot -o graph.svg -T svg -K dot
```

Instead of `-K dot` any other Graphviz layout engine like `neato`, `fdp` or `circo`
can be used to influence the layout of the generated graph.

[Graphviz]: https://www.graphviz.org
[install Graphviz]: https://graphviz.gitlab.io/download
