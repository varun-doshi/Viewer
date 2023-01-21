import { useEffect, useState } from "react";
import "./App.css";
import NFTCard from "./components/NFTCard";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [network, setNetwork] = useState("ETH");
  const [API_KEY, setAPIKEY] = useState("");

  const fetchNFTs = async () => {
    let nfts;

    const baseURL = `https://${network}-mainnet.g.alchemy.com/v2/${API_KEY}`;
    console.log(baseURL);
    console.log("Fetching NFTs:");

    var requestOptions = {
      method: "get",
    };
    if (!collectionAddress.length) {
      const fetchUrl = `${baseURL}/getNFTs/?owner=${walletAddress}`;
      nfts = await fetch(fetchUrl, requestOptions).then((data) => data.json());
    } else {
      console.log("Getting NFTs for collection");
      const fetchURL = `${baseURL}/getNFTs/?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      var requestOptions = {
        method: "GET",
      };
      const baseURL = `https://${network}-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  useEffect(() => {
    setAPIKEY(process.env.REACT_APP_ETH_API_KEY);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <h1 className="font-josefin font-bold text-3xl text-white">
        VI
        <span class="material-symbols-outlined text-[#03C988] font-bold text-3xl">
          visibility
        </span>
        WER
      </h1>
      <div className="flex flex-row w-full justify-around items-center px-10 mb-8">
        <input
          disabled={fetchForCollection}
          className="px-2 w-1/5 bg-slate-100 py-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-200 disabled:text-gray-300"
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={walletAddress}
          type={"text"}
          placeholder="Add Wallet Address"
        />
        <div className="flex flex-col gap-y-2 w-1/5">
          <input
            className="px-2 w-full bg-slate-100 py-2 rounded-lg text-gray-800 focus:outline-blue-300"
            onChange={(e) => {
              setCollectionAddress(e.target.value);
            }}
            value={collectionAddress}
            type={"text"}
            placeholder="Add Collection Address"
          />
          <label className="text-gray-100 absolute top-36 font-josefin font-light text-xl">
            <input
              className="mr-2 "
              onChange={(e) => {
                setFetchForCollection(e.target.checked);
              }}
              type="checkbox"
            />
            Fetch Collection
          </label>
        </div>
        <button
          className="disabled:bg-slate-500  bg-gradient-to-r from-yellow-600 to-red-600 text-2xl p-2 rounded-md text-white"
          onClick={() => {
            if (fetchForCollection) fetchNFTsForCollection();
            else fetchNFTs();
          }}
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        <label
          htmlFor=""
          className="text-xl font-poppins uppercase font-semibold text-white "
        >
          Network:
          <select
            className="ml-4 rounded-md font-poppins font-light bg-[#03C988]"
            value={network}
            onChange={(e) => {
              setNetwork(e.target.value);
            }}
          >
            <option value="eth">Ethereum</option>
            <option value="polygon">Polygon</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-y-12 justify-center gap-x-4">
        {NFTs.length &&
          NFTs.map((NFT) => {
            return <NFTCard nft={NFT} key={NFTs.indexOf(NFT)} />;
          })}
      </div>
    </div>
  );
}

export default App;
