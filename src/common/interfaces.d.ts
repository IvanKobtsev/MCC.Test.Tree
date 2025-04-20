import { RefObject } from "react";

export interface TreeContextData {
  treeData: RefObject<TreeData | null>;
  update: () => void;
}

export interface TreeData {
  id: string;
  root: TreeNodeData;
  name: string;
}

export interface TreeNodeData {
  id: string;
  parent: TreeNodeData | null;
  children: TreeNodeData[];
  path: string;
  text: string;
}
