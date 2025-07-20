import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { TimeSelectedType } from ".";

export interface StatusPopupPropsType {
  key: number;
  status: string;
  bookingId: string;
  refetch?: any;
  // showStatus: boolean;
  // setShowStatus: Dispatch<SetStateAction<boolean>>;
}
export interface ReactPopupType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  thisBooking: string;
  bookingId: string;
  starValue: number | null | undefined;
  commentText: string | null | undefined;
  setStarValue: React.Dispatch<React.SetStateAction<number>>;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  updateComment: any;
  refetch?: any;
  /*    UseMutation<MutationDefinition<
  any,
      BaseQueryFn<
        // string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      "users",
      any,
      "api"
    >
  >*/
}
export interface SearchBarPropsType {
  placeholder: string;
  handler?: ChangeEventHandler<HTMLInputElement>;
}
export interface SideBarPropsType {
  setContent: Dispatch<SetStateAction<string>>;
}
export interface CoachTimeContainerPropType {
  data: TimeSelectedType[]; // time
  header: string;
  fn: () => void;
  setTimeSelected: Dispatch<SetStateAction<TimeSelectedType[]>>;
}

export interface DayPickerPropType {
  setCurrentDay: Dispatch<SetStateAction<number>>;
  setDayAdded: Dispatch<SetStateAction<number>>;
  currentDay: number;
  currentDate: string;
}

export interface CommonBtnPropsType {
  placeholder: string;
  onClick?: () => void;
  // | React.ChangeEvent<HTMLInputElement>
  // | FormEvent<HTMLInputElement>;
}

export interface CoachCardProps {
  userId: string;
  // coachData: CoachDataType[] | undefined;
}

export interface FilterBarPropType {
  filterState: string;
  setFilterState: Dispatch<SetStateAction<string>>;
}

export interface IPageHeaderCover {
  header: string;
  background: string;
}
export interface JustAButtonPropType {
  name: string;
}
export interface Formprops {
  setPageState: React.Dispatch<React.SetStateAction<string>>;
  pageState: string;
  name: string;
}
