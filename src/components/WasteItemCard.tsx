import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import BlueBin from '../pictures/bluebin.png';
import GarbageBin from '../pictures/garbagebin.png';
import GreenBin from '../pictures/greenbin.png';
import YardBin from '../pictures/yardwaste.png';

interface WasteItemProps {
    key: string;
    wasteItem: WasteItem;
}

enum BinTypes {
    BLUE_BIN = "Blue Bin",
    GARBAGE = "Garbage",
    METAL_ITEMS = "Metal Items",
    DEPOT = "Depot",
    ORGANIC = "HHW",
}

const translateBinType = (binType: string) => {
    if (binType === BinTypes.BLUE_BIN) {
        return BinTypes.BLUE_BIN;
    } else if (binType === BinTypes.DEPOT) {
        return BinTypes.DEPOT;
    } else if (binType === BinTypes.GARBAGE) {
        return BinTypes.GARBAGE;
    } else if (binType === BinTypes.METAL_ITEMS) {
        return BinTypes.METAL_ITEMS;
    } else {
        return BinTypes.ORGANIC;
    }
}

const getBinIcon = (binType: string) => {
    if (binType === BinTypes.BLUE_BIN) {
        return BlueBin;
    } else if (binType === BinTypes.GARBAGE) {
        return GarbageBin;
    } else if (binType === BinTypes.ORGANIC) {
        return GreenBin;
    } else {
        return YardBin;
    }
}

const WasteItemCard: React.FC<WasteItemProps> = ({ wasteItem }) => {
    const itemName: string = wasteItem.itemName;
    const binType: string = wasteItem.binType;
    const description: string = wasteItem.description;

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    <span className="itemName">{itemName}</span>
                </Card.Header>
                <Card.Meta>
                    <Card.Description>
                        <Image src={getBinIcon(binType)} alt={"Waste bin"} size={"mini"} />
                    </Card.Description>
                    <Card.Description>
                        {binType}
                    </Card.Description>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Meta>
            </Card.Content>
            <Button>Select</Button>
        </Card>
    );
}

export default WasteItemCard