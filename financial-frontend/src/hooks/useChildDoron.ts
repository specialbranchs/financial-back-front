import { useEffect, useState } from 'react';
import { finalize } from 'rxjs/operators';
import { doOnSubscribe } from '../utils/rxjs.utils';
import { Designation } from '../../typings/structures';
import api from '../api';



const useChildDoronList = (id:number) => {
  const [designations, setDesignations] = useState<Array<Designation>>([
    {
      id: 0,
      title: 'উপ-ক্যাটাগরি বাছাই করুন' 
    }
  ]);

  const [designationLoading, setDesignationLoading] = useState(false);

  useEffect(() => {
    // console.log('iddeas ',id)
      api.common
        .getChildPodokList(id)
        .pipe(
          doOnSubscribe(() => setDesignationLoading(true)),
          finalize(() => setDesignationLoading(false))
        )
        .subscribe({
          next: (designationData) => {
            setDesignations([
              {
                id: 0,
                title: 'উপ-ক্যাটাগরি বাছাই করুন'
              },
              ...designationData
            ]);
          },
          error: (error) => console.log(error)
        });
  }, [id]);

  return {
    designationLoading,
    designations
  };
};

export default useChildDoronList;