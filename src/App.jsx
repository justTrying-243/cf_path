import { useEffect, useState } from "react";
import QuestionWindow from "./components/questionsWindow";
import loader from "./components/loader.gif";

function App() {
  const [handle1, setHandle1] = useState("Dominater069");
  const [handle2, setHandle2] = useState("Shivansh_243");
  const [handle3, setHandle3] = useState("__grind");
  const [QuestionsOfFirst, setQuestionsOfFirst] = useState({});
  const [QuestionsOfSecond, setQuestionsOfSecond] = useState({});
  const [QuestionsOfThird, setQuestionsOfThird] = useState({});
  const [rating, setRating] = useState(1600);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showInputTab, setShowInputTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const search = async () => {
    setLoading(true);
    const response1 = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle1}&from=1&count=10000`
    );
    const response2 = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle2}&from=1&count=10000`
    );
    const response3 = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle3}&from=1&count=10000`
    );
    let data1 = await response1.json();
    let data2 = await response2.json();
    let data3 = await response3.json();
    if (data1.status === "FAILED" || data2.status === "FAILED") {
      if (data1.status === "FAILED") alert(`${handle1} username not found`);
      if (data2.status === "FAILED") alert(`${handle2} username not found`);
      setQuestionsOfFirst({});
      setQuestionsOfSecond({});
      setQuestionsOfThird({});
    } else {
      setQuestionsOfFirst(data1.result);
      setQuestionsOfSecond(data2.result);
      if (data3.status === "FAILED") {
        setQuestionsOfThird({});
        alert(`${handle3} username not found`);
      } else setQuestionsOfThird(data3.result);
    }
    setLoading(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      search();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (handle1.trim() !== "" && handle2.trim() !== "") {
        setDebouncedSearchTerm(`${handle1}-${handle2}`);
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [handle1, handle2]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      try {
        search();
      } catch (error) {
        alert(error);
      }
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-700 p-5 space-y-4">
      {!loading ? (
        <>
          {showInputTab ? (
            <>
              <div className="flex flex-col items-center w-full space-y-4 bg-white bg-opacity-10 rounded-lg p-5 shadow-md">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Compare Handles
                </h3>
                <div className="flex flex-row gap-5 justify-center w-full">
                  <div className="flex flex-col items-center">
                    <label className="text-gray-200 mb-1">Handle 1</label>
                    <input
                      className="p-2 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={handle1}
                      onChange={(e) => setHandle1(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-gray-200 mb-1">Handle 2</label>
                    <input
                      className="p-2 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={handle2}
                      onChange={(e) => setHandle2(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-gray-200 mb-1">Handle 2</label>
                    <input
                      className="p-2 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={handle3}
                      onChange={(e) => setHandle3(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-5 mt-4">
                  <input
                    className="p-2 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <button
                    onClick={search}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setShowInputTab(false)}
                    className="text-indigo-200 hover:text-white font-medium"
                  >
                    Hide Input Tab
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div
              className="h-[20vh] flex items-center justify-center w-full max-w-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white p-4 rounded-lg relative overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setShowInputTab(true)}
            >
              <div className="absolute inset-0 bg-gradient-radial from-blue-700 via-purple-800 to-transparent opacity-20 animate-pulse"></div>
              <h2 className="text-3xl font-extrabold font-serif tracking-wide text-center text-white drop-shadow-lg">
                <span>Do The Tasks:</span>
                <span className="italic opacity-90 animate-pulse block mt-1">
                  If you want to excel
                </span>
              </h2>
            </div>
          )}
          <div className="w-full max-w-4xl h-[80vh] mt-5 p-4 rounded-lg bg-white bg-opacity-10 shadow-md overflow-auto">
            <QuestionWindow
              QuestionsOfFirst={QuestionsOfFirst}
              QuestionsOfSecond={QuestionsOfSecond}
              QuestionsOfThird={QuestionsOfThird}
              rating={rating}
              setLoading={setLoading}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <img src={loader} alt="Loading..." className="w-50 h-40" />
        </div>
      )}
    </div>
  );
}

export default App;
