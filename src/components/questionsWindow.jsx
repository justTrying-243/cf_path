import { useEffect, useState } from "react";
import getFilteredContestData from "./Questions";
const QuestionWindow = ({
  QuestionsOfFirst,
  QuestionsOfSecond,
  QuestionsOfThird,
  rating,
  setLoading,
}) => {
  const result = (item) => {
    const [url, name, contestId, ind, tags] = item.split("::");
    const tagArray = tags.split(",");
    return [url, name, contestId, ind, tagArray];
  };
  setLoading(true);
  const set1 = getFilteredContestData(QuestionsOfFirst, rating);
  const set2 = getFilteredContestData(QuestionsOfSecond, rating);
  const set3 = getFilteredContestData(QuestionsOfThird, rating);
  const commonSet = new Set();
  const distinctSet = new Set();
  const [showTagsToDo, setShowTagsToDo] = useState(false);
  const [showTagsDone, setShowTagsDone] = useState(false);
  set1.forEach((entry) => {
    if (set2.has(entry) || set3.has(entry)) {
      commonSet.add(result(entry));
    } else {
      distinctSet.add(result(entry));
    }
  });
  setLoading(false);
  const ToDoTagClick = () => {
    if (showTagsToDo == false) setShowTagsToDo(true);
    else setShowTagsToDo(false);
  };
  const DoneTagClick = () => {
    if (showTagsDone == false) setShowTagsDone(true);
    else setShowTagsDone(false);
  };
  useEffect(() => {
    setShowTagsToDo(false);
    setShowTagsDone(false);
  }, [rating]);
  return (
    <div className=" bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-400 rounded-lg overflow-y-auto">
      <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-400">
        <h3 className="text-lg font-semibold mb-2">To-Do Questions</h3>
        <ul className="list-none p-0">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Question</th>
                <th
                  className="border border-gray-300 p-2 cursor-pointer"
                  onClick={() => ToDoTagClick()}
                >
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {[...distinctSet].map((entry, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <a
                      href={entry[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline hover:text-blue-800 transition-colors duration-200"
                    >
                      {entry[1]}
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex flex-wrap gap-1">
                      {showTagsToDo &&
                        entry[4].map((data, idx) => (
                          <span key={data + idx}>
                            {data}
                            {idx < entry[4].length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
      <br />
      <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-400">
        <h3 className="text-lg font-semibold mb-2 ">Done Questions</h3>
        <ul className="list-none p-0">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Question</th>
                <th
                  className="border border-gray-300 p-2 cursor-pointer"
                  onClick={() => DoneTagClick()}
                >
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {[...commonSet].map((entry, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <a
                      href={entry[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline hover:text-blue-800 transition-colors duration-200"
                    >
                      {entry[1]}
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex flex-wrap gap-1">
                      {showTagsDone &&
                        entry[4].map((data, idx) => (
                          <span key={data + idx}>
                            {data}
                            {idx < entry[4].length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </div>
  );
};
export default QuestionWindow;
