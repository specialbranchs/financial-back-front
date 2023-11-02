import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "../../state/actions";

type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
       dispatch(actions.appState.saveAppState({
        appState:props.state
       }));
    }
    // console.log(props.state)
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;