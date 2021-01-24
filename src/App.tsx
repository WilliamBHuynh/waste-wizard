import React, { ChangeEvent, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Card, Container, Dimmer, Input, Loader } from 'semantic-ui-react';
import HeaderIcon from './components/HeaderIcon';
import WasteItemCard from './components/WasteItemCard';

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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

  const fetchWasteItemsGrid = async () => {
    const res = await fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=10");
    return res.json();
  }

  const WasteItemsGrid = () => {
    const { data, status } = useQuery("WasteItemsGrid", fetchWasteItemsGrid);
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
      <div>
        <div className="header">
          <HeaderIcon />
        </div>
        <div>
          <Input
            placeholder="Search for for household item"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <div>
          <WasteItemsGrid />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
