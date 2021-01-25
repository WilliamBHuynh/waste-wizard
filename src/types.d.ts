type WasteItemRaw = {
    body: string;
    category: string;
    keywords: string;
}

type WasteItem = {
    itemName: string;
    binType: string;
    description: string;
    handleOnClick: (e: any, { ...data }) => any;
}

type SelectedWasteItem = {
    itemName: string;
    binType: string;
}