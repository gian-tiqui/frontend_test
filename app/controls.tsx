import Select from "react-select";
import useFieldStore, { Field } from "./store/useFieldStore";
import { Direction, useDirectionStore } from "./store/useDirectionStore";

const Controls = () => {
  const fieldOptions: Field[] = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const { setField } = useFieldStore();
  const { setDirection } = useDirectionStore();

  const handleFieldChange = (selectedField: unknown) => {
    setField(selectedField as Field);
  };

  const handleDirection = (selectedDirection: unknown) => {
    setDirection(selectedDirection as Direction);
  };

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          inputId="sort-field"
          onChange={handleFieldChange}
          className="input"
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          onChange={handleDirection}
          options={directionOptions}
          inputId="sort-direction"
          className="input"
        />
      </div>
    </div>
  );
};

export default Controls;
