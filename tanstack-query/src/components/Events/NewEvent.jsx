import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
//useMutation - 서버의 데이터를 patch,put,delete와 같이 수정하고자 한다면 사용
//요약하자면 R은 useQuery, CUD(Create,Update,Delete)는 useMutation

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/http.js";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    //mutationKey - 반드시 필요 x -> 변형은 응답 데이터를 캐시 처리 x
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      // exact속성을 통하여 정확히 key가 맞는 query만 무효화 할 수 있다.
      //데이터 무효화가 되면 react query는 무효화된 데이터를 다시 요청하여 새로운 데이터로 업데이트 됨.
      //참고로 onSuccess 코드 블럭에는 주로 queryClient.invalidateQueries(QUERY_KEY) 가 포함된다. invalidateQueries 는 해당 키의 데이터를 초기화 하고, 이는 해당 키의 요청을 다시 실행시킨다.
      // queryClient.invalidateQueries({ queryKey: ["events"], exact:true });
      navigate("/events/");
    },
  });
  //mutate는 특정 이벤트시 요청되도록 하는 함수

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            "Failed to create event. Please check your inputs and try again later."
          }
        />
      )}
    </Modal>
  );
}
