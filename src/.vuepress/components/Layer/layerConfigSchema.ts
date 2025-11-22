
export type LayerConfigOutput = {
    to: string,
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
    outputs?: LayerConfigOutput[]
}
export type LayerConfigAlphaDataLayer = {
    name: string,
    type: "alpha_data_layer",
    description: string,
    children?: LayerConfigLayer[],
    outputs?: LayerConfigOutput[]
}


export type LayerConfig = {
    layers: LayerConfigLayer[]
}