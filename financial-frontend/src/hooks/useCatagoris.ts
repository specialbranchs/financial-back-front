import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import { Designation } from "../../typings/structures";
import api from "../api";
import { useDispatch } from "react-redux";
import actions from "../state/actions";
import { CatagoryType } from "../../typings/formData";

const useDesignation = () => {
  const dispatch = useDispatch();
  const [designations, setDesignations] = useState<Array<Designation>>([
    {
      id: 0,
      title: "ক্যাটাগরি বাছাই করুন",
    },
  ]);
  const [designationLoading, setDesignationLoading] = useState(false);

  useEffect(() => {
    api.common
      .getDesignationList()
      .pipe(
        doOnSubscribe(() => setDesignationLoading(true)),
        finalize(() => setDesignationLoading(false))
      )
      .subscribe({
        next: (designationData) => {
          const designLIst: CatagoryType[] = [
            {
              id: 0,
              title: "ক্যাটাগরি বাছাই করুন",
            },
            ...designationData,
          ];
          dispatch(actions.catagorry.saveCatagoryType(designLIst));
        },
        error: (error) => console.log(error),
      });
  }, [setDesignations]);

  return {
    designationLoading,
    designations,
  };
};

export default useDesignation;
