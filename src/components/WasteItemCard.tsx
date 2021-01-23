import React from 'react';
import { Card } from 'semantic-ui-react';

interface WasteItemProps {
    key: number;
    wasteItem: WasteItem;
}

const WasteItemCard: React.FC<WasteItemProps> = ({ wasteItem }) => {
    const itemName: string = wasteItem.itemName;
    const binType: string = wasteItem.binType;
    const description: string = wasteItem.description;

    return (
        <Card>
            <Card.Content>
                <Card.Header>{itemName}</Card.Header>
                <Card.Meta>
                    <Card.Description>
                        {binType}
                    </Card.Description>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default WasteItemCard