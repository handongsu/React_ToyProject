import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setsearchTerm] = useState();

  //isLoading & isPending : isLoading의 경우 쿼리가 비활성화됐다고 해서 true가 되지 않는다.

  const { data, isLoading, isError, error } = useQuery({
    //키가 이벤트 전체를 읽어오는 것이 아니기 때문에 search를 추가로 설정
    queryKey: ["events", { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined, //true=요청하겠다, false= 요청x 빈문자열이 아니라면 true 데이터가 없고, 검색어 입력 후 빈 값을 검색했을 때 모든 데이터 뜨게 하고 싶다면 undefined
  });

  function handleSubmit(event) {
    event.preventDefault();
    setsearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
