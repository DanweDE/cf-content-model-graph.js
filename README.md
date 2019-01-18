Reads a `input.csv` file in the same folder and creates [Graphviz] dot markup.

```bash
node src/index.js examples/space.cf-example-app.json | dot -o graph.svg -T svg -K neato
```


[Graphviz]: https://www.graphviz.org
[install Graphviz]: https://graphviz.gitlab.io/download


### Drawing the graph

The generated dot markup can either be copy pasted to [viz-js.com](http://viz-js.com)
or it can be processed by a local [Graphviz installation][install Graphviz]:

```js
node src/index.js | dot -o graph.svg -T svg -K dot
```

Instead of `-K dot` any other Graphviz layout engine like `neato`, `fdp` or `circo`
can be used to influence the layout of the generated graph.
