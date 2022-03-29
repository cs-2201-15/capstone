import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setRoutineCamera } from "../../store/camera";
import { deleteStretch, setRoutine } from "../../store/routine";
import EditDetails from "../EditDetails/EditDetails";

const SingleRoutine = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(false);

  const dispatch = useDispatch();
  let params = useParams();
  const navigate = useNavigate();

  const routineId = params.id;
  let routine = useSelector((state) => state.routine) || {};
  if (!routine.stretches) {
    routine.stretches = [];
  }
  console.log(routine);

  useEffect(() => {
    dispatch(setRoutine(routineId));
    setLoading(false);
  }, [details]);

  const handleClick = () => {
    dispatch(setRoutineCamera(routine.stretches));
    navigate(`/testwindow`);
  };

  const handleDelete = (stretchId, routineId) => {
    dispatch(deleteStretch(stretchId, routineId));
  };

  const openDetails = () => {
    setDetails(!details); //
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="single-stretch">
        <h2>{routine.name}</h2>
        <h3>{routine.notes}</h3>
        {routine.stretches.length ? (
          <button type="button" onClick={() => handleClick()}>
            Start Routine
          </button>
        ) : (
          <h4>
            No current stretches. Go to "Stretches" tab to add some stretches
            here!
          </h4>
        )}

        <button type="button" onClick={() => openDetails()}>
          Edit Details
        </button>
        {details ? <EditDetails routine={routine} /> : null}

        {routine.stretches.map((stretch, i) => {
          return (
            <div className="stretch-preview" key={i}>
              <Link to={`/stretches/${stretch.id}`}>
                <p>{stretch.name}</p>
                <img src={stretch.image_url} alt="Stretch Img" />
                <p>{`Target: ${stretch.target}`}</p>
              </Link>
              <button onClick={() => handleDelete(stretch.id, routine.id)}>
                Remove Stretch
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default SingleRoutine;