// types/constants

// other
import { updateUserRole } from "utils/mocks/mockReduxStore";
import { useAppDispatch } from "store/store";
import MockProviders from "utils/mocks/MockProviders";

// we have to wrap some of our stories with these providers because they use hooks which require them
export const ContextDecorator = (Story: any) => (
  <MockProviders>
    <Story />
  </MockProviders>
);

export const StoreDecorator = (role: string, Story: any) => {
  const dispatch = useAppDispatch();

  dispatch(updateUserRole(role));

  return <Story />;
};
