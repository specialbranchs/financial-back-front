import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import { Designation } from "../../typings/structures";
import api from "../api";
import { useDispatch } from "react-redux";
import actions from "../state/actions";

const useDoronList = () => {
  const dispatch = useDispatch();
  const [designations, setDesignations] = useState<Array<Designation>>([
    {
      id: 0,
      title: "ধরণ বাছাই করুন",
    },
  ]);
  const [designationLoading, setDesignationLoading] = useState(false);

  useEffect(() => {
    api.common
      .getDororList()
      .pipe(
        doOnSubscribe(() => setDesignationLoading(true)),
        finalize(() => setDesignationLoading(false))
      )
      .subscribe({
        next: (designationData) => {
          const doronlist = [
            {
              id: 0,
              title: "ধরণ বাছাই করুন",
            },
            ...designationData,
          ];
          dispatch(actions.doron.saveDoronType(doronlist));
        },
        error: (error) => console.log(error),
      });
  }, [setDesignations]);

  return {
    designationLoading,
    designations,
  };
};

export default useDoronList;
