import { useTree } from "../hooks/TreeProvider.tsx";
import TreeNode from "./TreeNode.tsx";
import styles from "../styles/Tree.module.scss";
import { TreeData } from "../common/interfaces";

const defaultTree: TreeData = {
  id: "0",
  name: "New tree",
  root: {
    id: "0",
    children: [],
    parent: null,
    text: "TreeRoot",
    path: "0",
  },
};

export default function Tree() {
  const treeContext = useTree();

  if (!treeContext.treeData.current) {
    treeContext.treeData.current = structuredClone(defaultTree);
  }

  const resetTree = () => {
    treeContext.treeData.current = null;
    treeContext.update();
  };

  return (
    <div className={styles.Tree}>
      <div className={styles.header}>
        <h1 className={styles.mainHeader}>MCC.Test.Tree</h1>
        <button
          className={`${styles.resetButton} ${
            treeContext.treeData.current.root.children.length === 0 &&
            treeContext.treeData.current.root.text === defaultTree.root.text
              ? styles.inactive
              : null
          }`}
          onClick={() => resetTree()}
        >
          Reset the tree
        </button>
      </div>
      <div className={styles.body}>
        <TreeNode
          key={treeContext.treeData.current.root.path}
          nodeData={treeContext.treeData.current.root}
        />
      </div>
    </div>
  );
}
