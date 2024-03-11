export default function Tabs({ view, setView }) {
  return (
    <>
      <div className="flex text-sm font-semibold justify-center my-16">
        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Pitch Table"
              ? "bg-pYellow scale-105"
              : "hover:bg-yellow-200"
          } transition duration-300`}
          onClick={() => setView("Pitch Table")}
        >
          Pitch Table
        </button>
        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Performance"
              ? "bg-pYellow scale-105"
              : "hover:bg-yellow-200"
          }  transition duration-300`}
          onClick={() => setView("Performance")}
        >
          Performance
        </button>

        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Pitch Design"
              ? "bg-pYellow scale-105"
              : "hover:bg-yellow-200"
          } transition duration-300`}
          onClick={() => setView("Pitch Design")}
        >
          Pitch Design
        </button>
      </div>
    </>
  );
}
