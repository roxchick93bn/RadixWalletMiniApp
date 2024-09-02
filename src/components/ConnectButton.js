import React, { useEffect } from "react";
import { RadixDappToolkit, RadixNetwork } from "@radixdlt/radix-dapp-toolkit";

const ConnectButton = () => {
  useEffect(() => {
    // Initialize the Radix Dapp Toolkit
    const rdt = RadixDappToolkit({
      dAppDefinitionAddress:
        "account_rdx1283mafsdzvsg5ymht7wem794vg8r4k52kapjlffmxn70cc7n0aqwlv", // Replace with your dApp address
      networkId: RadixNetwork.Mainnet, // Use RadixNetwork.Testnet for testnet
      applicationName: "test",
      applicationVersion: "1.0.0",
    });

    // Select the connect button element
    const radixConnectButton = document.querySelector("radix-connect-button");

    // Add event listeners for connect and disconnect events
    radixConnectButton.addEventListener("onConnect", () => {
      console.log("User connected their wallet");
    });

    radixConnectButton.addEventListener("onDisconnect", () => {
      console.log("User disconnected their wallet");
    });
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <radix-connect-button />
      </div>
    </>
  );
};

export default ConnectButton;
