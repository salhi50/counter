import React from "react";
import { defaultCountersListView, CountersListView, Counter } from "../counter";
import { BsGrid, BsList } from "react-icons/bs";
import Button from "./Button";
import CounterCard from "./CounterCard";

interface Props {
  counters: Counter[];
  title: string;
}

const CountersList = React.memo<Props>(({ counters = [], title = "" }) => {
  const [view, setView] = React.useState<CountersListView>(defaultCountersListView);

  const layoutClass = React.useMemo(() => {
    if (view === "grid") {
      return "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4";
    }
    return "row row-cols-1 g-4";
  }, [view]);

  return (
    counters.length > 0 && (
      <>
        {/* List Header */}
        <div className="d-flex justify-content-between border-bottom py-2 align-items-center">
          <h5 className="mb-0 me-2">{title}</h5>
          <div className="btn-group">
            <Button
              size="sm"
              onClick={() => setView("grid")}
              contrast={view === "grid" ? "high" : "low"}
            >
              <BsGrid />
            </Button>
            <Button
              size="sm"
              onClick={() => setView("list")}
              contrast={view === "list" ? "high" : "low"}
            >
              <BsList />
            </Button>
          </div>
        </div>
        {/* Counters */}
        <ul className={`list-unstyled my-3 ${layoutClass}`}>
          {counters.map((counter) => (
            <li key={counter.id}>
              <CounterCard
                view={view}
                counter={counter}
              />
            </li>
          ))}
        </ul>
      </>
    )
  );
});

export default CountersList;
