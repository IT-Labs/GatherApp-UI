// hooks/methods
import { useAppSelector } from "store/store";
import useFormInput from "hooks/useFormInput";
import { useCustomSelect } from "hooks/useCustomSelect";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";
import Input from "components/Reusable/Input/Input";
import CustomSelect from "components/Reusable/Select/CustomSelect";
import AdminPanelCardBody from "components/AdminPanelCard/AdminPanelCardBody";

// types and constants
import { roleFilterData } from "constants/selectOptions";

// styles
import {
  SMainContainer,
  SAdminCardHeader,
  SFirstChild,
  SSecondChild,
} from "./styles";

const AdminPanel = () => {
  const currentUserRole = useAppSelector((state) => state.login.user.roleName);
  const searchInputState = useFormInput({ initialValue: "" });

  const roleFilterState = useCustomSelect({
    defaultValue: roleFilterData[0],
    options: roleFilterData,
    id: "user-role-filter",
    placeholder: "Select a Role",
  });

  return (
    <>
      <PageTitle>Admin Panel</PageTitle>
      <SMainContainer>
        <SAdminCardHeader>
          <SFirstChild>
            <Input
              name="search"
              id="search-users"
              type="text"
              required={false}
              state={searchInputState}
              placeholder="Search for a specific user..."
            />
          </SFirstChild>
          <SSecondChild>
            <CustomSelect {...roleFilterState} hasMessage={false} />
          </SSecondChild>
        </SAdminCardHeader>

        <AdminPanelCardBody
          searchInputValue={searchInputState.value}
          role={roleFilterState.getSelectValue()}
          currentUserRole={currentUserRole}
        />
      </SMainContainer>
    </>
  );
};

export default AdminPanel;
