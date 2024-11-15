import Characters from "./Characters";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hidden pt-20">
      <Characters />
    </div>
  );
}
