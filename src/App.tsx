import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Card, Container, Dimmer, Input, Loader, Menu } from 'semantic-ui-react';
import HeaderIcon from './components/HeaderIcon';
import WasteItemCard from './components/WasteItemCard';

enum Menus {
  SEARCH = "Search items",
  VIEW = "View bins"
}

const queryClient = new QueryClient();

function App() {
  const [activeMenu, setActiveMenu] = useState(Menus.SEARCH);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchMenuClick = (e: SyntheticEvent<HTMLElement>) => {
    setActiveMenu(Menus.SEARCH);
  }

  const handleViewMenuClick = (e: SyntheticEvent<HTMLElement>) => {
    setActiveMenu(Menus.VIEW);

  }

  const MenuPages: React.FC = () => {
    if (activeMenu === Menus.SEARCH) {
      return (
        <div>
          <div className="searchBar">
            <Input
              className="searchInput"
              placeholder="Search for for household item"
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
          <div>
            <WasteItemsGrid />
          </div>
        </div>
      );
    }
    return (
      <div>

      </div>
    );
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const keywordMatchesSearchTerm = (keyword: string) => {
    if (keyword.indexOf(searchTerm) !== -1) {
      return true;
    }
    return false;
  }

  const extractStringFromHTML = (str: string) => {
    const span = document.createElement("span");
    span.innerHTML = str;
    return span.innerText;
  }

  const fetchWasteItems = async () => {
    const res = await fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=10");
    return res.json();
  }

  const WasteItemsGrid = () => {
    const { data, status } = useQuery("WasteItemsGrid", fetchWasteItems);
    console.log(data);

    const wasteItemList: WasteItem[] = [];

    return (
      <div>
        {status === "error" &&
          <div>Error loading data.</div>}

        {status === "loading" &&
          <div>
            <Dimmer active inverted>
              <Loader inverted content="Loading.." />
            </Dimmer>
          </div>}

        {status === "success" &&
          <div>
            {data.map((wasteItemRaw: WasteItemRaw) => {
              const description: string = extractStringFromHTML(extractStringFromHTML(wasteItemRaw.body));
              const binType: string = wasteItemRaw.category;
              const names = wasteItemRaw.keywords.split(",");

              names.forEach((wasteItemName: string) => {
                const wasteItem: WasteItem = {
                  itemName: wasteItemName,
                  binType: binType,
                  description: description
                };
                wasteItemList.push(wasteItem);
              });
            })}
            <Container>
              <Card.Group itemsPerRow={5}>
                {wasteItemList.map((wasteItem: WasteItem) => (
                  keywordMatchesSearchTerm(wasteItem.itemName) ? <WasteItemCard key={wasteItem.itemName} wasteItem={wasteItem} /> : null
                ))}
              </Card.Group>
            </Container>
          </div>}
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="header">
          <HeaderIcon />
        </div>
        <div>
          <Menu secondary className="menu">
            <Menu.Item
              name={Menus.SEARCH}
              active={activeMenu === Menus.SEARCH}
              onClick={handleSearchMenuClick}
            />
            <Menu.Item
              name={Menus.VIEW}
              active={activeMenu === Menus.VIEW}
              onClick={handleViewMenuClick}
            />
          </Menu>
        </div>
        <div>
          <MenuPages />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
