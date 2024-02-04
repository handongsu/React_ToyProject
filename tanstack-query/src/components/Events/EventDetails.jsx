import { Link, Outlet } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";

import Header from "../Header.jsx";
import { deleteEvent, fetchEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isPending, isError } = useQuery({
    queryKey: ["events", { id: id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  console.log(data);
  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events/"],
      });
      navigate("/events/");
    },
  });

  function handleDelete() {
    mutate({ id: id });
  }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <p>Loading EventsDetails...</p>}
      {isError && <ErrorBlock title="Failed EventDetails" />}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {data.date}@{data.time}
                </time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
