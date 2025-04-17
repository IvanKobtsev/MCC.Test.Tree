import styles from "./styles/App.module.scss";
import Tree from "./components/Tree.tsx";

function App() {
  return (
    <div className={styles.App}>
      <Tree />
    </div>
  );
}

export default App;
