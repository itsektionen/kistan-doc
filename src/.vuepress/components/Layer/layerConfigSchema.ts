import { TreeGridNode, TreeGridNodeConnector } from "../Tree/treeGridType";

export type LayerConfigOutput = {
    to: string,
    port: number,
    description: string
}
export type LayerConfigInput = {
    port: number,
    description: string
}

export type LayerConfigOperators = "add" | "mul" | "sub" | "div";
export type LayerConfigLayer = LayerConfigDataLayer | LayerConfigAlphaDataLayer;
export type LayerConfigDataLayer = {
    name: string,
    type: "layer",
    op: LayerConfigOperators,
    size: number,
    description: string,
    children?: LayerConfigLayer[],
    outputs?: LayerConfigOutput[],
    inputs?: LayerConfigInput[]
}
export type LayerConfigAlphaDataLayer = {
    name: string,
    type: "alpha_data_layer",
    description: string,
    children?: LayerConfigLayer[],
    outputs?: LayerConfigOutput[],
    inputs?: LayerConfigInput[]
}


export type LayerConfig = {
    layers: LayerConfigLayer[]
}


function LayerToTreeRecursive(layer: LayerConfigLayer): TreeGridNodeConnector {
    let children: TreeGridNodeConnector[] = [];

    layer.inputs?.forEach((input) => {
        children.push({
            nodeType: "dot",
            sideInput: {
                content: {
                    text: "Input UDP:" + input.port
                },
                nodeType: "header"
            }
        })
    });

    let operator = "";
    if (layer.type == "alpha_data_layer") {
        const alpha_layer: TreeGridNodeConnector = {
            nodeType: "dot",
            sideInput: {
                content: {
                    text: layer.name + "_alpha"
                },
                nodeType: "header"
            }
        }

        children = [alpha_layer];
        operator = "Alpha Mix";
    } else {
        operator = layer.op
    }

    children = children.concat((layer.children ?? [])?.map((x) => LayerToTreeRecursive(x)));

    layer.outputs?.forEach((output) => {
        children.push({
            nodeType: "dot",
            sideInput: {
                content: {
                    text: "Output: " + output.to + ":" + output.port
                },
                nodeType: "header"
            }
        })
    });

    let sideInput: TreeGridNode = {
        content: {
            text: layer.name
        },
        nodeType: "header",
        children: children
    };

    if (children.length == 0) {
        sideInput.children = undefined
    }

    return {
        nodeType: "connector",
        content: {
            text: operator,
        },
        sideInput: sideInput
    }
}
export function LayerToTree(layer: LayerConfigLayer): TreeGridNode {
    if (layer.type == "alpha_data_layer") {
        throw "Root node on layer cannot be alpha-data-layer"
    }
    let children: TreeGridNodeConnector[] = [];

    layer.inputs?.forEach((input) => {
        children.push({
            nodeType: "dot",
            sideInput: {
                content: {
                    text: "Input UDP:" + input.port
                },
                nodeType: "header"
            }
        })
    });

    children = children.concat(layer.children?.map((x) => LayerToTreeRecursive(x)) ?? []);

    layer.outputs?.forEach((output, index) => {
        if (index == (layer.outputs?.length ?? 1) - 1) {
            children.push({
                nodeType: "header",
                content: {
                    text: "Output: " + output.to + ":" + output.port
                },
            })
        } else {
            children.push({
                nodeType: "dot",
                sideInput: {
                    content: {
                        text: "Output: " + output.to + ":" + output.port
                    },
                    nodeType: "header"
                }
            })
        }
    });
    return {
        content: {
            text: layer.name,
        },
        nodeType: "header",
        children: children
    }
}
