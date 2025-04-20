import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useRef,
} from "react";
import { TreeContextData, TreeData } from "../common/interfaces";

const TreeContext = createContext<TreeContextData | null>(null);

export function TreeProvider({ children }: { children: ReactNode }) {
  const treeData = useRef<TreeData | null>(null);
  const [_, update] = useReducer((x) => x + 1, 0);

  return (
    <TreeContext.Provider
      value={{
        treeData,
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
