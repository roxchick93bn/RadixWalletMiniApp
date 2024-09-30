import "./App.css";
import ConnectButton from "./components/ConnectButton";
import InputResource from "./components/InputResource";

function App() {
  const data = window.Telegram.WebApp.initData;
  const platform = window.Telegram.WebApp.platform;

  console.log(platform);
  return (
    <>
      <div className="p-5">
        <ConnectButton />
      </div>
      {platform === "tdesktop" ? (
        <div>This is Desktop</div>
      ) : platform === "tmobile" ? (
        <div>This is Mobile</div>
      ) : (
        <div>Undefined</div>
      )}
    </>
  );
}

export default App;
