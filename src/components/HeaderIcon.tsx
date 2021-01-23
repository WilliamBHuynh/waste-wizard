import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const HeaderIcon = () => {
    return (
        <Header as="h1">
            <Icon name="magic" />
            <Header.Content>
                Waste Wizard
                <Header.Subheader>Casting the right bucket</Header.Subheader>
            </Header.Content>
        </Header>
    )
}

export default HeaderIcon