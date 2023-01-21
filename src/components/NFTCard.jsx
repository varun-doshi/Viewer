import React from "react";

const NFTCard = ({ nft }) => {
  return (
    <div className="w-1/4 mt-8 flex flex-col">
      <div className="rounded-md">
        <img
          className="object-cover rounded-t-md w-full "
          src={nft.media[0].gateway}
          alt=""
        />
      </div>
      <div className="flex flex-col y-gap-2 px-2 bg-slate-300 rounded-b-md text-gray-800  ">
        <div>
          <h2 className="text-2xl text-center my-4 font-poppins font-medium">
            {nft.title}
          </h2>
          <p className=" text-base italic font-josefin">
            ID: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <p className="text-base font-josefin">
            {`${nft.contract.address.substr(
              0,
              6
            )}...${nft.contract.address.substr(
              nft.contract.address.length - 4
            )}`}
          </p>
        </div>
        <div className="flex-grow mt-2 text-lg">
          <p className="font-openSans font-semibold">
            {nft.description?.substr(0, 150) + "..."}
          </p>
        </div>
        <div className="flex justify-center my-4">
          <a
            className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-sm text-white cursor-pointer font-poppins "
            target={"blank"}
            href={`https://etherscan.io/address/${nft.contract.address}`}
          >
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
