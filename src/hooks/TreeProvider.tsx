import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useRef,
} from "react";
import { TreeContextData, TreeData, TreeNodeData } from "../common/interfaces";

const TreeContext = createContext<TreeContextData | null>(null);

export function TreeProvider({ children }: { children: ReactNode }) {
  const treeData = useRef<TreeData | null>(null);
  const [_, update] = useReducer((x) => x + 1, 0);

  function searchForNode(currentNode: TreeNodeData, path: string) {
    const nextNodeId = path.substring(0, path.indexOf("."));
    const pathLeft = path.substring(path.indexOf("."));

    for (let i = 0; i < currentNode.children.length; i++) {
      const childNode = currentNode.children[i];

      if (childNode.id === nextNodeId) {
        if (pathLeft.length > 0) searchForNode(childNode, pathLeft);
        else {
          return childNode;
        }
        return null;
      }
    }
    return null;
  }

  function getNode(path: string, rerenderAfterwards: boolean = false) {
    if (treeData.current) {
      const foundNode = searchForNode(treeData.current.root, path);

      if (rerenderAfterwards) {
        update();
      }

      return foundNode;
    }
    throw new Error("There's no tree to get node of");
  }

  return (
    <TreeContext.Provider
      value={{
        treeData,
        getNode,
        update,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}

export function useTree() {
  const treeContext = useContext(TreeContext);

  if (!treeContext) {
    throw new Error(
      "You know that you're supposed to use TreeContext inside the corresponding provider, right?",
    );
  }

  return treeContext;
}
