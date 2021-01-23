import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Card, Dimmer, Loader } from 'semantic-ui-react';
import HeaderIcon from './components/HeaderIcon';
import WasteItemCard from './components/WasteItemCard';

const queryClient = new QueryClient();

function App() {
  const extractStringFromHTML = (str: string) => {
    const span = document.createElement("span");
    span.innerHTML = str;
    return span.innerText;
  }

  const fetchWasteItems = async () => {
    const res = await fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1");
    return res.json();
  }

  const WasteItems = () => {
    const { data, status } = useQuery("wasteItems", fetchWasteItems);
    let key: number = 0;
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
            <Card.Group itemsPerRow={5} centered>
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
              <div>{wasteItemList.map((wasteItem: WasteItem) => (
                <WasteItemCard key={key++} wasteItem={wasteItem} />
              ))}</div>
            </Card.Group>
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
        <div className="gird">
          <WasteItems />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
