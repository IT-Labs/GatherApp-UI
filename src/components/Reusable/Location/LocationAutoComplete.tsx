/* eslint-disable react/require-default-props */
// hooks/methods
import { useEffect, useRef, useState } from "react";
import { FormInputReturnType } from "hooks/useFormInput";

// libraries
import { toast } from "react-toastify";

// types and constants
import { toastMessages } from "constants/toastMessages";

import Maps, { defaultMapPosition } from "./Maps"; // must be imported after "constants/toastMessages"

// styles
import {
  SList,
  SListItem,
  SListItemIcon,
  SListItemText,
  SDivider,
} from "./styles";

type Props = {
  inputState: FormInputReturnType;
};

export default function LocationAutoComplete({ inputState }: Props) {
  const [listPlace, setListPlace] = useState<any[]>([]);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState(defaultMapPosition);
  const [startFetch, setStartFetch] = useState<boolean>(false);

  //  Hide dropdown list on click outsite
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target as Node)) {
        setIsListOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setStartFetch(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputState.value]);

  // Fetching data after each change of the searchText
  useEffect(() => {
    const queryString = `q=${inputState.value}&format=json&addressdetails=0&limit=5`;
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };
    if (startFetch) {
      fetch(
        `${process.env.REACT_APP_NOMINATIM_BASE_URL}${queryString}`,
        requestOptions
      )
        .then((jsonResult) => jsonResult.json())
        .then((result) => {
          setStartFetch(false);
          setListPlace(result);
          setIsListOpen(true);
        })
        .catch(() => {
          toast.error(toastMessages.errorLocation);
        });
    }
  }, [inputState.value, startFetch]);

  return (
    <>
      {isListOpen && listPlace.length ? (
        <SList ref={ref} id="dropdownList">
          {listPlace.map((item) => {
            return (
              <div key={item.place_id}>
                <SListItem
                  onClick={() => {
                    inputState.setValue(item?.display_name);
                    setSelectedPosition([item.lat, item.lon]);
                    setIsListOpen(false);
                  }}
                >
                  <SListItemIcon>
                    <img
                      src="/images/Placeholder.png"
                      alt="Placeholder"
                      style={{ width: 10, height: 10 }}
                    />
                  </SListItemIcon>
                  <SListItemText
                    primary={item.display_name}
                    style={{ fontSize: "0.625rem" }}
                  >
                    {item.display_name}
                  </SListItemText>
                  <SDivider />
                </SListItem>
              </div>
            );
          })}
        </SList>
      ) : null}

      <Maps selectedPosition={selectedPosition} />
    </>
  );
}
