import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Card, Container, Dimmer, Input, Loader, Menu } from 'semantic-ui-react';
import HeaderIcon from './components/HeaderIcon';
import WasteItemCard from './components/WasteItemCard';
import WasteRoom from './components/WasteRoom';

enum Menus {
  SEARCH = "Search items",
  ROOM = "Waste Room"
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

const queryClient = new QueryClient();

function App() {

  const extractStringFromHTML = (str: string) => {
    const span = document.createElement("span");
    span.innerHTML = str;
    return span.innerText;
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

  const [activeMenu, setActiveMenu] = useState(Menus.SEARCH);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWasteItem, setSelectedWasteItem] = useState<SelectedWasteItem | null>(null);

  const handleSearchMenuClick = (e: SyntheticEvent<HTMLElement>) => {
    setActiveMenu(Menus.SEARCH);
  }

  const handleROOMMenuClick = (e: SyntheticEvent<HTMLElement>) => {
    setActiveMenu(Menus.ROOM);

  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleButtonClick = (e: SyntheticEvent<HTMLElement>, { ...data }) => {
    const itemName: string = data.itemName;
    const binType: BinTypes = consolidateBinTypes(data.binType);
    const newSelectedWasteItem: SelectedWasteItem = {
      itemName: itemName,
      binType: binType.toString()
    };
    setSelectedWasteItem(newSelectedWasteItem);
  }

  const keywordMatchesSearchTerm = (keyword: string) => {
    if (keyword.indexOf(searchTerm) !== -1) {
      return true;
    }
    return false;
  }

  const fetchWasteItems = async () => {
    const res = await fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=100");
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
                  description: description,
                  handleOnClick: handleButtonClick.bind(null)
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
      <div className="wasteRoom">
        <WasteRoom selectedWasteItem={selectedWasteItem} />
      </div>
    );
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
              name={Menus.ROOM}
              active={activeMenu === Menus.ROOM}
              onClick={handleROOMMenuClick}
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
