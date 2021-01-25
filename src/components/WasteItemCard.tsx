import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import BlueBin from '../pictures/bluebin.png';
import GarbageBin from '../pictures/garbagebin.png';
import GreenBin from '../pictures/greenbin.png';
import HazardBin from '../pictures/hazardbin.png';

interface WasteItemProps {
    key: string;
    wasteItem: WasteItem;
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

const consolidateBinTypes = (binType: string) => {
    if (binType === BinTypes.GARBAGE || binType === BinTypes.OVERSIZE || binType === BinTypes.METAL_ITEMS || binType === BinTypes.ELECTRONIC) {
        return BinTypes.GARBAGE;
    } else if (binType === BinTypes.YARD_WASTE || binType === BinTypes.DEPOT || binType === BinTypes.CHRISTMAS) {
        return BinTypes.YARD_WASTE;
    } else if (binType === BinTypes.BLUE_BIN) {
        return BinTypes.BLUE_BIN;
    } else {
        return BinTypes.HAZARD;
    }
}

const getBinIcon = (binType: BinTypes) => {
    if (binType === BinTypes.GARBAGE) {
        return GarbageBin;
    } else if (binType === BinTypes.BLUE_BIN) {
        return BlueBin;
    } else if (binType === BinTypes.YARD_WASTE) {
        return GreenBin;
    } else if (binType === BinTypes.HAZARD) {
        return HazardBin;
    }
    return null;
}

const WasteItemCard: React.FC<WasteItemProps> = ({ wasteItem }) => {
    const itemName: string = wasteItem.itemName;
    const binType: BinTypes = consolidateBinTypes(wasteItem.binType);
    const description: string = wasteItem.description;

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    <span className="itemName">{itemName}</span>
                </Card.Header>
                <Card.Meta>
                    <div className="binType">
                        <Card.Description>
                            <Image src={getBinIcon(binType)} alt={"Waste bin"} size={"mini"} />
                        </Card.Description>
                        <Card.Description>
                            {binType}
                        </Card.Description>
                    </div>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Meta>
            </Card.Content>
            <Button binType={binType} itemName={itemName} onClick={wasteItem.handleOnClick}>Add to waste room</Button>
        </Card>
    );
}

export default WasteItemCard