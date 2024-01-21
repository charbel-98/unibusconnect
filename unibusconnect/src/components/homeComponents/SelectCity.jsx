import Select from "react-select";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFrom, setIsDeparting } from "../../redux/filterSlice";
import { set } from "date-fns";
function SelectCity({
  loading,
  cities,
  universities,
  setValidation,
  homeToUni,
  setHomeToUni,
}) {
  const [city, setCity] = useState(null);
  const dispatch = useDispatch();
  const citiesOptions =
    cities &&
    cities[0].map((city) => {
      console.log(city);
      return {
        value: city,
        label: city,
      };
    });
  const universitiesOptions =
    universities &&
    universities[0].map((university) => {
      return {
        value: university,
        label: university,
      };
    });
  const getOptions = () => {
    if (homeToUni === null) {
      return (
        citiesOptions &&
        universitiesOptions && [...citiesOptions, ...universitiesOptions]
      );
    } else if (
      homeToUni === true ||
      JSON.parse(localStorage?.getItem("filter"))?.isDeparting
    ) {
      return citiesOptions;
    } else if (
      homeToUni === false ||
      !JSON.parse(localStorage?.getItem("filter"))?.isDeparting
    ) {
      return universitiesOptions;
    }
  };
  const options = getOptions();
  const departureChangeHandler = (departure) => {
    !departure && setHomeToUni(null);
    const isDeparting = !departure ? null : citiesOptions.includes(departure);
    isDeparting && setHomeToUni(true);
    universitiesOptions.includes(departure) && setHomeToUni(false);

    departure ? setCity(departure.value) : setCity(null);
    dispatch(setFrom(departure ? departure.value : null));
    dispatch(setIsDeparting(isDeparting));
    console.log(isDeparting);
    setValidation(true);
  };

  return (
    <div className="form-group border-bottom pb-2">
      <label htmlFor="city" className="mb-2">
        <span className="icofont-search-map text-danger"></span> From
      </label>
      <br />
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={loading}
        isClearable={true}
        isSearchable={true}
        name="city"
        options={options}
        defaultValue={
          options &&
          options[
            options?.findIndex(
              (selectedOption) =>
                selectedOption.value ==
                JSON.parse(localStorage?.getItem("filter"))?.from
            )
          ]
        }
        onChange={departureChangeHandler}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#bbdefb",
            primary: "#f0ad4e",
          },
        })}
      />
    </div>
  );
}
export default SelectCity;
