import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  //key와 Fn을 설정해준다
  const { data, isPending, isError, error } = useQuery({
    // queryKey 에는 해당 요청을 식별하는 키를 지정한다. queryKey 를 통해 HTTP 요청을 식별하고 캐싱에 활용할 수 있다.
    queryKey: ["events", { max: 3 }],
    //프로미스 객체를 리턴하는 함수를 넣어줘야 함
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    staleTime: 5000, //캐시에 데이터가 있을 때 업데이트된 데이터를 가져오기 위한 요청을 전송하기 전에 기다릴 시간 설정(기본값 0)
    //gcTime: 1000, //가비지 수집 시간, 데이터와 캐시를 얼마나 오랫동안 보관할지 제어 보관 후 폐기(기본값 5분)
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events"}
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
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
