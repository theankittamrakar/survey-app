import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys() {
  const {surveys} = useStateContext();
  console.log(surveys);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys();
        showToast('The survey was deleted');
      });
    }
  };

  return (
    <PageComponent
      title="Surveys"
      buttons={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </TButton>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You don't have surveys created
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyListItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
        </div>
      )}
    </PageComponent>
  );
}

