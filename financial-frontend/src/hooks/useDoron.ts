import { useEffect, useState } from 'react';
import { finalize } from 'rxjs/operators';
import { doOnSubscribe } from '../utils/rxjs.utils';
import { Designation } from '../../typings/structures';
import api from '../api';



const useDoronList = () => {
  const [designations, setDesignations] = useState<Array<Designation>>([
    {
      id: 0,
      title: 'ধরণ বাছাই করুন' 
    }
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
            setDesignations([
              {
                id: 0,
                title: 'ধরণ বাছাই করুন' 
              },
              ...designationData
            ]);
          },
          error: (error) => console.log(error)
        });
  }, [setDesignations]);

  return {
    designationLoading,
    designations
  };
};

export default useDoronList;