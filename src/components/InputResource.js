import { useState } from "react";
import {
  GatewayApiClient,
  RadixNetwork,
} from "@radixdlt/babylon-gateway-api-sdk";

const InputResource = () => {
  const [resourceAddress, setResourceAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState();
  const [divisibility, setDivisibility] = useState();
  const [description, setDescription] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [infoURL, setInfoURL] = useState("");

  const gatewayApi = GatewayApiClient.initialize({
    networkId: RadixNetwork.Mainnet,
    applicationName: "Your dApp Name",
    applicationVersion: "1.0.0",
    applicationDappDefinitionAddress:
      "account_rdx12y4l35lh2543nfa9pyyzvsh64ssu0dv6fq20gg8suslwmjvkylejgj",
  });
  const { state } = gatewayApi;

  const request = async (e) => {
    e.preventDefault();

    try {
      const tokenDetails = await state.getEntityDetailsVaultAggregated(
        resourceAddress
      );
      setTotalSupply(tokenDetails.details.total_supply);
      setDivisibility(tokenDetails.details.divisibility);
      tokenDetails.metadata.items.map((val, key) => {
        if (val.key == "description") {
          setDescription(val.value.typed.value);
        } else if (val.key === "icon_url") {
          setIconURL(val.value.typed.value);
        } else if (val.key === "symbol") {
          setSymbol(val.value.typed.value);
        } else if (val.key === "name") {
          setName(val.value.typed.value);
        } else if (val.key === "info_url") {
          setInfoURL(val.value.typed.value);
        }
      });

      console.log(tokenDetails, "asdfasdf");
    } catch (error) {
      console.error("Error fetching token details:", error);
    }
  };

  return (
    <>
      <div className="p-5">
        <form className="flex justify-center gap-10">
          <input
            className="border-2 px-4 py-2 rounded-lg w-2/5"
            value={resourceAddress}
            onChange={(e) => {
              setResourceAddress(e.target.value);
            }}
            placeholder="Enter Resource Address"
          />
          <button
            className="bg-[#2e00ba] rounded-lg text-white px-4 py-2"
            onClick={(e) => {
              request(e);
            }}
          >
            Request
          </button>
        </form>
        <ul className="mt-10 flex flex-col gap-5 p-5">
          <li>
            <div className="flex gap-2">
              <h2>Total Supply:</h2>
              <p>{totalSupply}</p>
            </div>
          </li>
          <li>
            <div className="flex gap-2">
              <h2>Divisibility:</h2>
              <p>{divisibility}</p>
            </div>
          </li>
          <li>
            <div className="flex gap-2">
              <h2>Description:</h2>
              <p>{description}</p>
            </div>
            {description ? (
              <div className="flex justify-end">
                <button className="bg-[#2e00ba] rounded-lg text-white text-sm px-2 py-1">
                  Update
                </button>
              </div>
            ) : (
              ""
            )}
          </li>
          <li>
            <div className="flex gap-2">
              <h2>Icon URL:</h2>
              <p>
                <a href={iconURL} target="_blank" className="text-[#3a4cf7]">
                  {iconURL}
                </a>
              </p>
            </div>
            {iconURL ? (
              <div className="flex justify-end">
                <button className="bg-[#2e00ba] rounded-lg text-white text-sm px-2 py-1">
                  Update
                </button>
              </div>
            ) : (
              ""
            )}
          </li>
          <li>
            <div className="flex gap-2">
              <h2>Symbol:</h2>
              <p>{symbol}</p>
            </div>
          </li>
          <li>
            <div className="flex gap-2">
              <h2>Name:</h2>
              <p>{name}</p>
            </div>
          </li>
          <li>
            <div className="flex gap-2">
              <h2>Info URL:</h2>
              <p>
                <a href={infoURL} target="_blank" className="text-[#3a4cf7]">
                  {infoURL}
                </a>
              </p>
            </div>
            {infoURL ? (
              <div className="flex justify-end">
                <button className="bg-[#2e00ba] rounded-lg text-white text-sm px-2 py-1">
                  Update
                </button>
              </div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default InputResource;
