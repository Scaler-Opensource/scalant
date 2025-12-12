export function convertSingletonToObject(item) {
  if (item) return { label: item, value: item };
  else return null;
}

export function convertArraySingletonsToObject(array) {
  return array.map((item) => ({ label: item, value: item }));
}

export function convertObjectToSelectOptions(obj) {
  return Object.keys(obj).map((key) => ({ value: key, label: obj[key] }));
}

export function handleIsValidNewOption(inputValue, selectValue, selectOptions) {
  const optionExists = selectOptions.find(
    (option) => option.value === inputValue
  );
  return inputValue && selectValue && !optionExists;
}
