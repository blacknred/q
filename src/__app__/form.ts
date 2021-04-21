import Q from "../lib";
import store from "./store";

export default new Q({
  name: "Form",
  debug: true,
  state: {
    text: ""
  },
  template({ text }, props) {
    const disabled = !text.length ? "disabled" : "";

    return `<section style="border: 2px solid #03a9f4;padding: 1rem;"
    <small><small>renders: ${++props.renders}</small></small>
    <br />
    <div style="display: flex; height: 1.5rem;">
      <input style="flex: 1;" value="${text}" oninput="q.onChange(this.value);"/>
      <button ${disabled} onclick="q.onSubmit()">&nbsp;add&nbsp;</button>
    </div>
    </section>
    `;
  },
  methods: {
    onSubmit() {
      if (!this.state.text.length) return;

      store.data.todos.push({
        text: this.state.text,
        id: Date.now(),
        done: false
      });

      this.state.text = "";
    },
    onChange(val: string) {
      this.state.text = val;
    },
    onKeyDown(key: any) {
      if (key.code === "Enter" || key.code === "NumpadEnter") {
        this.onSubmit();
      }
    }
  },
  mounted(vm) {
    vm.props.renders = 0;
    document.addEventListener("keydown", q.onKeyDown);
  },
  before(prev) {
    return prev.text.length > 1;
  },
  unmounted(vm) {
    document.removeEventListener("keydown", q.onKeyDown);
  }
});
