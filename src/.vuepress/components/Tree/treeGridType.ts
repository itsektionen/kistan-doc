export type TreeGridNodeContent = {
    text: string
}

export type TreeNodeTypes = "big" | "header" | "connector" | "dot"

export type TreeGridNodeConnector = {
    sideInput?: TreeGridNode,
    nodeType: TreeNodeTypes,
    content?: TreeGridNodeContent
}
export type TreeGridNode = {
    content: TreeGridNodeContent,
    nodeType: TreeNodeTypes,
    children?: TreeGridNodeConnector[],
    endOfChain?: boolean
}