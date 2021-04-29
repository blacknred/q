import Q from "../lib";
import Form from "./form";
import List from "./list";
import { asyncConfirm } from "./helpers";

// add global helpers
Q.use("warn", asyncConfirm);

// entry point
new Q({
  name: "App",
  // debug: true,
  state: {
    i: 0
  },
  children: { Form, List },
  template({ renders }, { i }) {
    return `<section style="border: 2px dashed pink;width: 450px;margin: 2rem auto;">
      <small>renders: ${renders}</small><button onclick="gg()">upd</button>
      <br/>
      <div style="padding: 1rem;">
        <Form />
        <Form />
        <br/>
        <List />
      </div>
      </section>`;
  },
  methods: {
    gg() {
      this.state.i++;
    }
  },
  before(prevState) {
    this.data.renders++;
    // recompute any properties here
    // render prevention also goes here with returning true
  },
  after() {
    // watch side effects here
  },
  mounted() {
    // initial bindings go here
    this.data.renders = 1;
    // async function fetchTodos() {
    //   await wait(5000);
    //   store.data.todos.push(99)
    // }
    // fetchTodos();
  },
  unmounted() {
    // side effects clearance go here
    // this.log?.("before removed");
    // clearInterval(this.data.interval);
    // await wait(5000);
    // this.log?.("after removed");
  }
}).mount("#app");
