import Select from "react-select";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTo } from "../../redux/filterSlice";
function SelectUniversity({
  loading,
  cities,
  universities,
  setValidation,
  homeToUni,
  setHomeToUni,
}) {
  const [university, setUniversity] = useState(null);
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
    } else if (homeToUni === true) {
      return universitiesOptions;
    } else if (homeToUni === false) {
      return citiesOptions;
    }
  };
  const options = getOptions();
  const destinationChangeHandler = (destination) => {
    !destination && setHomeToUni(null);
    citiesOptions.includes(destination) && setHomeToUni(false);
    universitiesOptions.includes(destination) && setHomeToUni(true);

    destination ? setUniversity(destination.value) : setUniversity(null);
    dispatch(setTo(destination ? destination.value : null));
    setValidation(true);
  };
  return (
    <div className="form-group border-bottom pb-2">
      <label htmlFor="university" className="mb-2">
        <span className="icofont-google-map text-danger"></span> To
      </label>
      <br />
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={loading}
        isClearable
        isSearchable
        name="university"
        options={options}
        onChange={destinationChangeHandler}
        defaultValue={
          options &&
          options[
            options?.findIndex(
              (selectedOption) =>
                selectedOption.value ==
                JSON.parse(localStorage?.getItem("filter"))?.to
            )
          ]
        }
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
export default SelectUniversity;
