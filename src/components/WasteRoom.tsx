import React from 'react';
import { Grid } from 'semantic-ui-react';

interface SelectedWasteItemProps {
    selectedWasteItem: SelectedWasteItem | null;
}

enum BinTypes {
    GARBAGE = "Garbage",
    OVERSIZE = "Oversize",
    METAL_ITEMS = "Metal Items",
    ELECTRONIC = "Electronic Waste",
    BLUE_BIN = "Blue Bin",
    YARD_WASTE = "Yard Waste",
    DEPOT = "Depot",
    CHRISTMAS = "Christmas Tree",
    HAZARD = "HHW",
    NOT_ACCEPTED = "Not Accepted"
}

const WasteRoom: React.FC<SelectedWasteItemProps> = ({ selectedWasteItem }) => {
    if (selectedWasteItem) {
        const itemName: string = selectedWasteItem.itemName;
        const binType: string = selectedWasteItem.binType;
        const newListEntry = document.createElement("li");
        newListEntry.appendChild(document.createTextNode(itemName));

        if (binType === BinTypes.GARBAGE) {
            const garbageList = document.getElementById("garbageList");
            garbageList?.appendChild(newListEntry);
        } else if (binType === BinTypes.BLUE_BIN) {
            const recyclingList = document.getElementById("recyclingList");
            recyclingList?.appendChild(newListEntry);
        } else if (binType === BinTypes.YARD_WASTE) {
            const yardList = document.getElementById("yardList");
            yardList?.appendChild(newListEntry);
        } else {
            const hazardList = document.getElementById("hazardList");
            hazardList?.appendChild(newListEntry);
        }
    }

    return (
        <Grid celled columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <h2>Garbage:</h2>
                    <ul id="garbageList"></ul>
                </Grid.Column>
                <Grid.Column>
                    <h2>Recycling:</h2>
                    <ul id="recyclingList"></ul>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <h2>Compost and Yard Waste:</h2>
                    <ul id="yardList"></ul>
                </Grid.Column>
                <Grid.Column>
                    <h2>Hazard Waste:</h2>
                    <ul id="hazardList"></ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default WasteRoom;