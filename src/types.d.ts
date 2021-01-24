type WasteItemRaw = {
    body: string;
    category: string;
    keywords: string;
}

type WasteItem = {
    itemName: string;
    binType: string;
    description: string;
}

enum BinTypes {
    BLUE_BIN = "Blue Bin",
    GARBAGE = "Garbage",
    METAL_ITEMS = "Metal Items",
    DEPOT = "Depot",
    ORGANIC = "HHW",
}