// hooks/methods
import { useGetUsersQuery } from "services/api/gatherapp";
import useRecusivePagination from "hooks/useRecursivePagination";

// components
import ProfilePicture from "components/Reusable/ProfilePicture/ProfilePicture";
import Button from "components/Reusable/Button/Button";
import ChangeRoleSelect from "components/ChangeRoleSelect/ChangeRoleSelect";

// types and constants
import { RoleFilterValueType } from "constants/selectOptions";

import { ButtonType } from "ts/enums/ButtonType";
import UserRoleNames from "ts/enums/UserRoleNames";
import { UserDetails } from "ts/types/User";

// styles
import {
  STableRow,
  STableData,
  SUserProfilePicture,
  LoadMoreButtonStyles,
  STableFlex,
  STableFlexLabel,
  STableFlexData,
  SNotificationMessage,
} from "./styles";

type Props = {
  page?: number;
  searchInputValue: string;
  role: RoleFilterValueType;
  currentUserRole: string;
  headers: string[];
};

const AdminPanelCardTableRow = (props: Props) => {
  const { page = 1, searchInputValue, role, currentUserRole, headers } = props;
  const { isNextPageLoaded, handleLoadNextPage, isFirstPage } =
    useRecusivePagination({ page, resetPageOn: [role, searchInputValue] });

  const { data, isError, isLoading, isSuccess } = useGetUsersQuery({
    role,
    name: searchInputValue,
    pageSize: 9,
    page,
  });

  if (isLoading)
    return (
      <STableRow>
        <STableData colSpan={6}>
          <SNotificationMessage type="loading" />
        </STableData>
      </STableRow>
    );
  if (isError || !isSuccess)
    return (
      <STableRow>
        <STableData colSpan={6}>
          <SNotificationMessage
            type="error"
            message="Oops! Something went wrong :O"
          />
        </STableData>
      </STableRow>
    );

  const shouldLoadNextPage = page < data.totalPageCount;

  return (
    <>
      {data.users.length
        ? data.users.map((user: UserDetails) => (
            <STableRow key={user.id}>
              <STableData colSpan={1}>
                <ProfilePicture
                  image={user.profilePicture}
                  imageStyle={SUserProfilePicture}
                />
              </STableData>
              <STableData colSpan={1}>
                <STableFlex>
                  <STableFlexLabel>
                    <span>{headers[1]}: </span>
                  </STableFlexLabel>
                  <STableFlexData>
                    {user.firstName} {user.lastName}
                  </STableFlexData>
                </STableFlex>
              </STableData>
              <STableData colSpan={1}>
                <STableFlex>
                  <STableFlexLabel>
                    <span>{headers[2]}: </span>
                  </STableFlexLabel>
                  <STableFlexData>{user.email}</STableFlexData>
                </STableFlex>
              </STableData>
              <STableData colSpan={1}>
                <STableFlex>
                  <STableFlexLabel>
                    <span>{headers[3]}: </span>
                  </STableFlexLabel>
                  <STableFlexData>{user.countryName}</STableFlexData>
                </STableFlex>
              </STableData>
              <STableData colSpan={2}>
                <STableFlex>
                  <STableFlexLabel>
                    <span>{headers[4]}: </span>
                  </STableFlexLabel>
                  <STableFlexData>
                    <ChangeRoleSelect
                      user={user}
                      currentUserRole={currentUserRole}
                    />
                  </STableFlexData>
                </STableFlex>
              </STableData>
            </STableRow>
          ))
        : isFirstPage && (
            <STableRow>
              <STableData colSpan={6}>
                <SNotificationMessage
                  message={`No ${
                    role === "" ? UserRoleNames.User : role
                  }s with the name "${searchInputValue}" found.`}
                />
              </STableData>
            </STableRow>
          )}

      {shouldLoadNextPage && !isNextPageLoaded && (
        <STableRow isLoadMoreButton>
          <STableData isLoadMoreButton colSpan={5}>
            <Button
              onClick={handleLoadNextPage}
              buttonType={ButtonType.SOLID}
              customStyles={LoadMoreButtonStyles}
            >
              Load More
            </Button>
          </STableData>
        </STableRow>
      )}

      {shouldLoadNextPage && isNextPageLoaded && (
        <AdminPanelCardTableRow {...props} page={page + 1} />
      )}
    </>
  );
};

export default AdminPanelCardTableRow;
