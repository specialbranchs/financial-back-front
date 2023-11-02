import { useEffect, useState } from 'react';
import { finalize } from 'rxjs/operators';
import { doOnSubscribe } from '../utils/rxjs.utils';
import { Designation } from '../../typings/structures';
import api from '../api';



const useDesignation = () => {
  const [designations, setDesignations] = useState<Array<Designation>>([
    {
      id: 0,
      title: 'ক্যাটাগরি বাছাই করুন' 
    }
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
            setDesignations([
              {
                id: 0,
                title: 'ক্যাটাগরি বাছাই করুন'
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

export default useDesignation;