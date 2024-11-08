import Characters from "./Characters";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <h1 className="bg-red-950 p-12 font-bold text-3xl">
        City of Heroes - Hardcore Toon Tracker
      </h1>
      <Characters />
    </div>
  );
}
