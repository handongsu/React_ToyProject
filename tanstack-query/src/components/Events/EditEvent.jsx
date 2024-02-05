import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    //eventDetail 컴포넌트와 동일한 쿼리에 동일한 키이기 때문에 캐시된 이 데이터는 두 컴포넌트 간 재사용하기 때문에 세부 정보 페이지에서 편집 페이지가 즉시 열린다
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    //onSuccess를 사용하면 백엔드에서 정보를 처리할때 까지 기다려야한다. 사용자경험을 높이기 위해 onMutate사용 mutate 즉시 실행 응답받기 전
    //queryClient를 통해 리액트 쿼리와 상호작용하며 쿼리를 무효화하라고 지시하거나 이제 볼 데이터를 변경하라고 지시 가능
    onMutate: async (data) => {
      const newEvent = data.event; //밑에 event:formData 가져옴
      await queryClient.cancelQueries({ queryKey: ["events", params.id] });
      //특정 키의 모든 활성 쿼리를 취소, 쿼리를 취소하려는 키를 넣는다. (충돌 방지)
      //이전 데이터를 가져오는 것을 방지하기 위해 async await을 넣어 기다리게 함
      const previousEvent = queryClient.getQueryData(["events", params.id]);
      queryClient.setQueryData(["events", params.id], newEvent); //이미 저장된 데이터 응답을 기다리지 않고 수정(두 인수 필요 1.수정하려는 쿼리 키 2. 쿼리키에 저장하려는 새 데이터)
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", params.id], context.previousEvent);
    },
    onSettled: () => {
      // 성공여부 상관없이 mutation이 완료될 때마다 호출, 백과 프론트가 동일한 데이터인지 확인하기 위해 쿼리를 무효화
      queryClient.invalidateQueries(["events", params.id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate();
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message || "Failed to load  event"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
